<template>
	<div class="contain clear"  :style="{height:height+'px'}">
		<header class="header">
			<p>您绑定的银行卡很重要，很可能是您的收款账户</p>
		</header>
		<section class="section">
			<article class="news1 news clear">
				<p class="list1 list clear">
					<span>姓名</span>
					<input type="text" placeholder="请输入姓名" v-model="bankData.accountName"/>
				</p>
				<p class="list2 list clear">
					<span>身份证</span>
					<input type="text" placeholder="请输入身份证" v-model="bankData.idNumber" />
				</p>
				<p class="list1 list clear">
					<span>银行名称</span>
					<select v-model="bankData.bank_value">
						<option v-for="key in bankList" :value="key.id+','+key.name">{{key.name}}</option>
					</select>
				</p>
				<p class="list4 list clear">
					<span>银行卡号</span>
					<input type="text" v-model="bankData.account_number" placeholder="请输入银行卡号" onkeyup="value=value.replace(/[^\d]/g,'')" />
				</p>
			</article>
			<article class="news4 news clear">
				<p class="list1 list clear">
					<span id="phoneTxt">手机号</span>
					<input type="text" v-model="bankData.bank_reserved_phone" placeholder="请输入预留手机号" maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')"  />
				</p>
				<p class="list1 list clear">
					<span>手机验证码</span>
					<input type="text" v-model="bankData.verifyCode" id="authCode" placeholder="请输入验证码" onkeyup="value=value.replace(/[^\d]/g,'')"  />
					<input id="getCode" @click="changeCode()" :class="{ changeCode: isSetCode }" :disabled="isSetCode"  type="button" v-model="setCode" />
				</p>
			</article>
		</section>
		<footer class="footer">
			<p class="btn" @click="submit()">下一步</p>
		</footer>
	</div>
</template>
<script type="text/javascript">
let bankList = [						//中金对接银行
                {id:"104",name:"中国银行"},
                {id:"102",name:"工商银行"},
                {id:"105",name:"建设银行"},
                {id:"103",name:"农业银行"},
                {id:"303",name:"光大银行"},
                {id:"302",name:"中信银行"},
                {id:"307",name:"平安银行"},
                {id:"100",name:"邮储银行"},
                {id:"301",name:"交通银行"},
                {id:"309",name:"兴业银行"},
                {id:"306",name:"广发银行"},
                {id:"316",name:"浙商银行"},
                {id:"310",name:"浦发银行"},
                {id:"401",name:"上海银行"},
                {id:"424",name:"南京银行"},
				]
	let bankData = {
			bank_card_type : "10" ,
			accountName : "" ,
			idNumber : "" ,
			bank_value : "" ,
			account_number : "" ,
			bank_reserved_phone : "" ,
			verifyCode : "",
			txSNBinding : ""
		}
	export default{
		data(){
			return{
				height:"",
				'setCode':"获取验证码" ,
				'i':"" ,
				'isSetCode':false ,
				bankList ,
				bankData ,
				bank_value : "" ,
			}
		},
		methods: {
			init(){

			},
			//获取手机验证码，倒计时
            changeCode(){
				let _this = this ;
				//验证用户名
				if(_this.bankData.accountName == "" || _this.bankData.accountName == null){
					_this.$toast("请输入姓名")
					return false ;
				}
				//验证身份证号码
				if(!_this.$fn.checkIdNum(_this.bankData.idNumber)){
					_this.$toast('请正确输入身份证号码')
					return false ;
                }
				if(_this.bankData.bank_value == "" || _this.bankData.bank_value == null){
					_this.$toast("请选择银行名称")
					return false ;
				}
				if(!_this.$fn.checkModile(_this.bankData.bank_reserved_phone)){
					_this.$toast('请正确输入手机号')
					return false ;
                }
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
				let params = _this.bankData ;
				_this.$post(_this.$API.GET_MOBILE_CODE, params)
				.then((result) => {
					console.log("手机验证码：",result)
					if(result.result == "success"){
						_this.$toast("发送成功")
						_this.bankData.txSNBinding = result.data.txSNBinding ;
					}else{
						_this.$toast(result.msg)
						this.i = 0 ;
					}
				})
			},
			submit(){
				let _this = this ;
				if(_this.bankData.verifyCode == "" || _this.bankData.verifyCode == null){
					_this.$toast("请输入手机验证码")
					return false ;
				}
				let params = _this.bankData ;
				_this.$post(_this.$API.GET_BANK_CARD_SUBMIT, params)
				.then((result) => {
					console.log("信息提交：",result)
					if(result.result == "success"){
						_this.$toast("绑卡成功")
						_this.$router.push({
							path:"/bankCards",	//我的账户
						}) ;
					}else{
						_this.$toast(result.msg)
						
					}
				})
			}
		},
		created () {
			this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
			this.init() ;
		},
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>