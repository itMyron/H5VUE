<template>
	<div id="contain" :style="{height:height+'px'}">
			<header id="header">
			<p class="ip" hidden="hidden">1</p>
			</header>
			<section id="section">
				<article class="news1 news clear">
					<div class="list1 list clear">
						<b>居间费</b>
						<span>支付金额</span>
						<strong id="factoragePrice">{{factoragePrice}}元</strong>
					</div>
				</article>
				<article class="news2 news clear">
					<p class="list list1 clear"></p>
				</article>
				<article class="news3 news clear">
					<p class="list1 list clear">
						本次交易需短信确认验证码已发送至您的手机
					</p>
					<p class="list2 list clear">
						<input class="num" type="text" id="authCode" v-model="verifyCode" onkeyup="value=value.replace(/[^\d]/g,'')" />
						<input id="getCode" class="send" @click="changeCode()" :class="{ changeCode: isSetCode }" :disabled="isSetCode"  type="button" v-model="setCode" />
					</p>
				</article>
				<article class="news4 news clear">
					<p class="agree clear">
						<input type="checkbox" v-model="isFlag" />
						<span>阅读并同意</span>
						<button id="Agreement" class="list list1 clear" @click="isShow = true"  style="border: none; background: #F4F4F4;">	
								<a>&lt;&lt;居间服务协议&gt;&gt;</a>
						</button>
					</p>
					<p class="btn" id="confirm" @click="confirm()">确认支付</p>
				</article>
			</section>
			<modelShow v-if="isShow" @isShow="credit" :creditData = "creditData" />
		</div>
	
</template>
<script type="text/javascript">
	import credit from '../../../components/certificate/payAgencyFeeZJ/index' ;	  //协议授权书
	let creditData = {
			userName:"",	//甲方姓名
			idCard:"",	//甲方身份证号码
			address:"", //甲方注册地址
			applyAmount:"",	//申请金额
			rate:"" ,	//申请利率
			openAccountName:"杭州鑫火信息科技有限公司" ,
			openAccountBank:"杭州兴业银行高新支行" ,
			openAccount:"356920100100098740"
		}
	export default{
		components:{
			"modelShow" : credit ,
		},
		data(){
			return{
				height:"" ,
				'setCode':"获取验证码" ,
				'i':"" ,
				'isSetCode':false ,
				objectId:'',
				objectType:'',
				bankInfoId:'',
				factoragePrice:"居间服务费",
				isShow:false ,
				isFlag:false ,
				creditData , //协议数据
				isSendCode : "" ,
				amount : "" ,
				paymentNo : '' ,
				verifyCode : ''
			}
		},
		methods: {
			init(){
				let _this = this ;
				_this.$post(_this.$API.GET_PAY_AGENCY_ZJ_MSG)
				.then((result) => {
					console.log(result)
					if(result.result == "success"){
						let obj = result.data;
						_this.factoragePrice = obj.factoragePrice ;	//居间费
						let contract = obj.contract ;		//合同签约
						_this.creditData.userName = contract.userName ;	
						_this.creditData.idCard = contract.idCard ; 		
						_this.creditData.address = contract.address ;
						_this.creditData.applyAmount = contract.applyAmount ;
						_this.creditData.applyAmount = contract.rate ;
						if(contract.openAccountName){
							_this.creditData.openAccountName = contract.openAccountName ;
						}
						
						if(contract.openAccountBank){
							_this.creditData.openAccountBank = contract.openAccountBank;
						}
						
						if(contract.openAccount){
							_this.creditData.openAccount = contract.openAccount ;
						}
					/*支付通道代码*/
						//"101", "汇付天下支付通道"
						//"102", "兴业银行支付通道"
						//"103", "融信通支付通道"
						//"104", "中金支付通道"
					/*end支付通道代码*/
						if(obj.channel.payCode=="104"){
							_this.isSendCode = obj.channel.isSendCode ;		//??????
							_this.objectId = obj.objectId ;					//252
							_this.objectType = obj.objectType ;
							_this.bankInfoId = obj.bankList.bankInfoId ;
							
						}
					}else{
						_this.$toast(result.msg)
					}
				})
			},
			//获取手机验证码，倒计时
            changeCode(){
				let _this = this ;
				_this.getCode() ;   //调取手机验证码接口
				_this.i = 60;
				var timer = setInterval(function() {
					_this.setCode = "重新发送" + _this.i + "s" ;
					_this.isSetCode = true ;
					_this.i = _this.i - 1;
					if(_this.i < 0) {
						clearInterval(timer);
						_this.setCode = "获取验证码" ;
						_this.isSetCode = false ;
					} 
				}, 1000);
            },
			//获取手机验证码，调接口
            getCode(){
				let _this = this ;
				let params = {
					objectId:_this.objectId,
					objectType:_this.objectType,
					bankInfoId:_this.bankInfoId,
					remark:"居间服务费"
				} 
				_this.$post(_this.$API.POST_PAY_CODE_ZJ , params)
				.then((result) => {
					console.log("手机验证码",result)
					if(result.result == "success"){
						_this.$toast("发送成功")
						_this.amount = result.data.amount;
						_this.paymentNo = result.data.paymentNo;
					}else{
						_this.$toast(result.msg)
						this.i = 0 ;
					}
				})
			},
			//协议框
			credit(data){
				this.isShow = data ;
				this.isFlag = true ;
			},
			//点击确认支付按钮
			confirm(){
				let _this = this ;
				if(!_this.isFlag){
					_this.isShow = true ;
				}
				if(_this.verifyCode == ""||_this.verifyCode == null){
					_this.$toast("请填写手机验证码")
				}
				let params = {
					objectId:_this.objectId,
					objectType:_this.objectType,
					amount:_this.amount,
					paymentNo:_this.paymentNo,
					verifyCode:_this.verifyCode,
					bankInfoId:_this.bankInfoId,
				} 
				_this.$post(_this.$API.POST_FAST_PAY_ZJ , params)
				.then((result) => {
					console.log(result)
					if(result.result == "success"){
						_this.$router.push({
							path:"/payAgencyResultZJ",	
						}) ;
					}else{
						_this.$toast(result.msg)
					}
				})
				
			}
		},
		created () {
			this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
			this.init();
		}
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>