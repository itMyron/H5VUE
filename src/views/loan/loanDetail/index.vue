<template>
	<div class="contain">
		<header class="header">
			<p class="list1 list clear">{{headerText}}</p>
			<p class="list2 list clear">
				<label id="hopePrice">{{hopePrice}}</label><span>元</span>
			</p>
			<p class="list3 list clear">
				<span>还款方式</span>
				<b id="repaymentMode">{{repayText}}</b>
				<b id="rate">{{rate}}</b>
			</p>
		</header>
		<section class="section">
			<article class="news1 news clear">
				<div class="list2 list clear">
					<i></i>
					<span>状态</span>
					<strong id="statusText">{{statusText}}</strong>
					<p class="list1 list clear" id="remark">{{remark}}</p>
				</div>
				<div class="list3 list clear" id="passMoney" v-if="isShow">
					<i></i>
					<span>放款前您要支付</span>
					<p>
						担保费
						<a id="guaranteeFeePrice">{{guaranteeFeePrice}}元</a>
					</p>
					<p style="padding-top: 0.1rem;">
						居间费
						<a id="factoragePrice">{{factoragePrice}}元</a>
					</p>
				</div>
			</article>
			<!--审核通过支付居间费-->
			<article class="news2 news clear" id="passPay" v-if="isShow">
				<p class="declaration">如果您对上面的费用无异议，请进入下一步支付居间费。</p>
				<p class="btn" id="next" @click="next()">下一步</p>
			</article>
			<!--审核不过修改-->
			<article class="news2 news clear" id="updateMes" v-if="isModify">
				<p class="declaration"></p>
				<p class="btn" id="toModify" @click="toModify()">点击修改基本信息</p>
			</article>
			<article class="news3 news clear">
				<p class="list list1 clear">
					<span></span>
					<a href="tel:0571-85890982" style="color: #ff5b00;">0571-85890982</a>
				</p>
				<p class="list list2 clear">
					<span></span>10:00-18:00
				</p>
			</article>
		</section>
	</div>
</template>
<script type="text/javascript">
import API from "@/config/api";
import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				token:"821dd0ea-4133-4338-ac4c-2757bed489ce0",
				headerText:"您申请的贷款金额",
				isShow:false,
				isModify:false,
				loanId:"",	//贷款id
				factoragePrice:"" ,//居间服务费
				guaranteeFeePrice:"" ,//担保费
				hopePrice:"" ,//贷款申请金额
				//repaymentMode:"" ,//贷款类型
				repayText:"",	//还款方式
				statusText:"",	//状态说明
				remark:"",	//备注说明
				rate:"",	//年利率
			}
		},
		methods: {
				init(){
					let _this = this ;
					let params={
						loanId : _this.loanId ,	
					}
					_this.$post(_this.$API.GET_LOAN_DETAILS_MSG,params)
					.then((result) => {
						console.log("贷款详情：",result)
						if('success' == result.result) {
							let obj = result.data ;
							_this.loanId = obj.id; //贷款申请记录
							_this.factoragePrice = obj.factoragePrice == null ? 0 : obj.factoragePrice; //居间服务费
							_this.guaranteeFeePrice = obj.guaranteeFeePrice == null ? 0 : obj.guaranteeFeePrice; //担保费
							_this.hopePrice = obj.hopePrice == null ? 0 : parseInt(obj.hopePrice.toFixed(2)); //贷款申请金额
							let repaymentMode = obj.repaymentMode == null ? "" : obj.repaymentMode; //贷款类型
							switch (repaymentMode) {
								case "1":
									_this.repayText = "随借随贷12个月" ;
									break;
								case "2":
									_this.repayText = "先息后本3个月" ;
									break;
								case "3":
									_this.repayText = "先息后本12个月" ;
									break;
							}
							if(obj.repaymentName != null && obj.repaymentName != '') {
								_this.repayText = obj.repaymentName;
							}
							if(obj.rate&&(obj.rate!=""||obj.rate!=null)){
								_this.rate ="年利率："+obj.rate+"%" ;		//年利率
							}
							//未审核
							if(obj.status == 0&&obj.applyStatus == 1){
								_this.statusText = "审核中";
								_this.remark = "亲~我们会在3个工作日内给您反馈信息哦~";
							}
							//驳回
							if(obj.status == 0&&obj.applyStatus == 3){
								_this.statusText = "驳回";
								_this.remark = "原因：" + (obj.modifyContent == null ? "" : obj.modifyContent);
								_this.isModify = true ;
							}
							//拒绝
							if(obj.status == 0&&obj.applyStatus == 4){
								_this.statusText = "拒绝";
								_this.remark = "信用评分不足，短期内无法获批！";
							}
							//初审中
							if(obj.status == 1){
								_this.statusText = "初审中";
								_this.remark = "我们正在处理中，请耐心等待！";
							}
							//复审中
							if(obj.status == 2){
								_this.statusText = "复审中";
								_this.remark = "我们已经进入复审阶段，请耐心等待！";
							}
							//审核通过
							if(obj.status == 3){
								_this.statusText = "审核通过";
								_this.remark = "您提交的贷款申请已通过,等待放款！";
								_this.headerText = "您获批的贷款金额" ;
							}
							//居间费待付
							if(obj.status == 4&&obj.applyStatus == 6){
								_this.statusText = "居间费待付";
								_this.remark = "";
								_this.isShow = true ;
								_this.headerText = "您获批的贷款金额" ;
							}
							//居间费待付
							if(obj.status == 4&&obj.applyStatus == 2){
								_this.statusText = "审批通过";
								_this.remark = "您提交的贷款申请已通过,等待放款！";
							}
							//居间费已付
							if(obj.status == 4&&obj.applyStatus == 7){
								_this.statusText = "居间费已付";
								_this.remark = "您申请的贷款居间费已付，请立即签约！";
								_this.headerText = "您获批的贷款金额" ;
								if(obj.signWay == "0"){		//线下签约
									if(obj.timeStatus){
										_this.$router.push({
											path:"/sign",	//签约时间
											query: {loanId: _this.loanId}
										}) ;
									}else{
										_this.$router.push({
											path:"/modifySign",	//修改签约时间
											query: {loanId: _this.loanId}
										}) ;
									}
								}
								if(obj.signWay == "1"){		//线上签约
									window.location.href= obj.redirectUrl ;
								}
							}
							//居间费退款中
							if(obj.applyStatus == 8){
								_this.statusText = "居间费退款中";
								_this.remark = "我们正在处理中，请耐心等待！";
							}
							//居间费退款成功
							if(obj.applyStatus == 9){
								_this.statusText = "居间费退款成功";
								_this.remark = "";
							}
							//放款
							if(obj.status == 5&&obj.applyStatus == 5){
								_this.$router.push({
									path:"/loanSuccess",	
								}) 
							}
						}else{
							_this.$toast(result.msg)
							 _this.$router.push({
								path:"/loanSuccess",	
							})  
						}
					})
				},
				//点击下一步支付居间费
				next(){
					let _this = this ;
					_this.$post(_this.$API.GET_QUERY_PAY_TYPE)
					.then((result) => {
						console.log("贷款详情：",result)
						if('success' == result.result) {
							let data = result.data ;
							let channel = data.channel.payCode ;	//支付通道通道
							if(channel == "104") {		//104中金支付
								var zjBank = data.bankList;
								if(zjBank==null||zjBank == ""){
									MessageBox.confirm('您还未绑定银行卡，请先绑定银行卡！').then(action => {
										_this.$router.push({
											path:"/bindcardsZJ",	
										}) ;
									}); 
								}else{
									_this.$router.push({
										path:"/payAgencyFeeZJ",		//中金支付居间费
									}) ;
								}
							}else{
								_this.$toast("暂不可以支付居间费，请及时联系客服人员")
							} 
						}else{
							_this.$toast(result.msg)
						}
					})
					
				},
				//点击“修改基本信息”
				toModify(){
					this.$router.push({
						path:"/loan",	
						query: {flag: true}
					}) ;
				}
		},
		created() {
			this.loanId = this.$route.query.loanId
			this.init()
		}

	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>