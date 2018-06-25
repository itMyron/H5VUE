<template>
 			<div class="contain" :style="{height:height+'px'}">
			<header class="header">
				<p class="list1 list clear">
					预计可贷
				</p>
				<p class="list2 list clear">
					<span class="predictPrice">{{predictPrice}}</span><span>元</span>
				</p>
				<p class="list3 list clear">
					实际金额以审评为准
				</p>
			</header>
			<section class="section">
				<article class="news1 news">
					<p class="list1 list clear" @click="baseInfo()">
						<b></b>
						<span>基础信息</span>
						<a>
							<i v-if="!isBaseInfo">待完善</i>
						</a>
					</p>
					<p class="list2 list clear" @click="shopInfo()" style="border: 0;">
						<b></b>
						<span>店铺信息</span>
						<a>
							<i v-if="!isShopInfo">待完善</i>
						</a>
					</p>
				</article>
				<article class="news2 news">
					<p class="list1 list clear">
						<b></b>
						<span>希望贷款金额</span>
					</p>
					<p class="list2 list clear">
						<i>￥</i>
						<input type="text" id="amount" v-model="hopePrice" onkeyup="value=value.replace(/[^\d.]/g,'')" placeholder="请输入贷款金额(5万~100万)" />
						<span>万元</span>
						
					</p>
					<p id="num" style="color: red; text-align: center;"></p>
					<p class="list3 list clear" style="border: 0;">
						<span>还款方式</span>
						<select id="instament" v-model="operateProductId">
							<option v-for = "key in products" :value="key.id">{{key.productName}}</option>
						</select>
					</p>
				</article>
			</section>
			<div id="protocol" class="clear">
				<p class="p1">
					<input id="credit" type="checkbox" v-model="isChecked" @click="check()"/>
					<span>《</span>
					<font @click="credit = true">征信授权书</font>
					<span style="width: 2px;">》</span>
				</p>
				<p class="p2">
					<span>《</span>
					<font @click="informationAcquisition = true">信息采集及融资进度反馈授权书</font>
					<span>》</span>
				</p>
			</div>
			<aside class="aside">
				<button class="btn" id="btn" @click="submit()" >提交贷款申请</button>
			</aside>
      <modelShowCredit v-if="credit" @isShow="isShowCredit"  :name = "name" :idCard = "idCard" />
      <modelShowInformationAcquisition v-if="informationAcquisition" @isShow="isShowCredit" :name = "name" :idCard = "idCard" />
		</div>

</template>

<script>
import credit from '../../components/certificate/credit/index' ;	  //征信授权书
import informationAcquisition from '../../components/certificate/informationAcquisition/index' ;	  //征信授权书
export default {
  components:{
    "modelShowCredit" : credit ,
    "modelShowInformationAcquisition" : informationAcquisition
  },
  data() {
    return {
    	height:"" ,
        credit:false ,
	    informationAcquisition :false ,
	    isChecked : true ,
        isBaseInfo : true ,
		isShopInfo : true ,
		idCard : "" ,
		name : "" ,
		predictPrice : "100000" , //预计可贷款金额
		hopePrice : "" ,
		products : [] ,//贷款产品类型
		operateProductId : "" , //用户默认的产品类型
		flag : "" ,
		shopNo: "" ,
		saasId: "" ,
		shopNo : "" ,
		saasId : ""
    };
  },
  methods: {
		//页面初始化
		init(){
			this.flag = this.$route.query.flag ;
			this.shopNo = sessionStorage.getItem('sn');
			this.saasId = sessionStorage.getItem('si');
			this.protocolInfo() ;
			this.loanInfo() ;
		},
		//初始化页面信息
		loanInfo(){
			let _this = this ;
		 	let params = {
				shopNo : _this.shopNo ,
				saasId : _this.saasId 
			}
			_this.$post(_this.$API.GET_LOAN_MSG,params)
			.then((result) => {
				console.log("页面信息初始化：",result)
				if(result.result == "success"){
					_this.shopNo = result.data.shopNo ;
					_this.saasId = result.data.saasId ;
					_this.isBaseInfo = result.data.basicStatus;	//是否完善基本信息
					_this.isShopInfo = result.data.shopStatus ;	//是否完善店铺信息
					let predictPrice = result.data.predictPrice ;//预计可贷金额
					if(predictPrice==null||predictPrice<100000){
						_this.predictPrice = 100000 ;						
					}else{
						_this.predictPrice = predictPrice ;
					}
					let applyFlag = result.data.applyFlag;
					let isOld = result.data.isOld ; //判断是否为老用户
					let loanFlag = _this.$route.query.loanFlag	//该参数从登陆页面获取到的
					_this.products = result.data.products ;	//产品类型
					
					
					if(applyFlag == true) {
						//貸款申請老客戶直接跳到成功界面
						if(isOld == true&&loanFlag=='1') {
							_this.$router.push({
								path:"/loanSuccess",	//放款成功界面
							}) ;
						}
					} else {
							let applyStatus = result.data.applyStatus; //放款状态
							//说明：flag的作用是区别，用户是否从登录页面跳转过来，如果用户从登录页面进来，直接进入到贷款详情页
							if(_this.flag != null && _this.flag == 'true' && applyStatus == 3) {
								let repaymentMode = result.data.repaymentMode;	//还款方式
								_this.hopePrice = result.data.hopePrice/10000;
								_this.repaymentName = result.data.repaymentName;	//产品名称
								return;
							}
							
							_this.$router.push({
								path:"/loanSuccess",	//放款成功界面
							}) ;
						}
				}else{
					_this.$toast(result.msg)
				}
			})
		},
		//获取协议信息
		protocolInfo(){
			let _this = this ;
				_this.$fetch(_this.$API.GET_USER_MSG)
				.then((result) => {
					if(result.result == "success"){
						_this.idCard = result.data.idCard ;
						_this.name = result.data.name ;
					}else{
						_this.$toast(result.msg)
					}
				})
		},
		isShowCredit(data){
			this.credit = data ;
			this.informationAcquisition = data ;
		},
		//基本信息
		baseInfo(val){
			this.$router.push({
				path:"/basicInfo",
				query: { 
					"flag": this.flag ,
					"direction": true 
					}	
			}) ;
		},
		//店铺信息
		shopInfo(val){
			this.$router.push({
				path:"/shopInfo",
				query: { 
					"flag": this.flag ,
					"direction": true 
				}	
			}) ;
		},
    submit(){
		let _this = this ;
		
		if(!_this.isChecked){
			_this.$toast("请勾选授权书") ;
			return false ;
		}
		if(!_this.isBaseInfo){
			_this.$toast("请完善基本信息") ;
			return false ;
		}
		if(!_this.isShopInfo){
			_this.$toast("请完善店铺信息") ;
			return false ;
		}
		if(_this.hopePrice == '' || _this.hopePrice < 5 || _this.hopePrice > 100){
			_this.$toast("输入的贷款金额不正确") ;
			return false ;
		}
		let params={
			hopePrice : _this.hopePrice * 10000 ,	//希望贷款金额
			operateProductId : _this.operateProductId , //选择还款方式
			predictPrice : _this.predictPrice ,
			saasId : _this.saasId ,
			shopNo : _this.shopNo 
		}
		_this.$post(_this.$API.PST_LOAN_SUBMIT,params)
		.then((result) => {
			if(result.result == "success"){
				_this.$router.push({
					path:"/loanSuccess",	//贷款成功
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
  }

};
</script>
<style lang="scss" scoped>
   @import "./index.scss";
</style>
