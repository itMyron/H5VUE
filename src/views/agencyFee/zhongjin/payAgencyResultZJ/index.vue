<template>
	<div id="contain" :style="{height:height+'px'}">
		<header id="header">
			<p class="state clear">
				<span class="green"></span>
				<strong style="color: rgb(115, 234, 128);">支付成功</strong>
			</p>
		</header>
		<section id="section">
			<p class="news1 news">
				<span>订单号：</span>
				<font>{{applyId}}</font>
			</p>
			<p class="news2 news">
				<span>产品名称：</span>
				<font>{{productName}}</font>
			</p>
			<p class="news3 news">
				<span>居间费：</span>
				<strong>{{amount}}</strong>
				<font>元</font>
			</p>
			<p class="news4 news">
				<span>支付时间：</span>
				<font>{{new Date().toLocaleDateString()}}</font>
			</p>
			<p class="news7 btn news" v-if="payErr" @click="repay()" >重新支付</p>
			<p class="news5 btn news" v-else-if="signWay" @click="online()" >立即签约</p>
			<p class="news6 btn news" v-else @click="line()" >预约签约</p>
			
		</section>
	</div>
</template>
<script type="text/javascript">
	export default{
		
		data(){
			return{
				height:"" ,
				signWay : true ,
				amount :"" ,
				applyId : "" ,
				productName : "" ,
				payErr : false ,
				redirectUrl : "" ,//线上签约地址
			}
		},
		methods: {
			init(){
				let _this = this ;
				_this.$post(_this.$API.POST_FAST_PAY_RESULT_ZJ)
				.then((result) => {
					console.log(result)
					if(result.result == "success"){
						let obj = result.data ;
						_this.amount = obj.amount ;
						_this.applyId = obj.applyId ;
						let payStatus = obj.payStatus ;
						_this.productName = obj.productName ;
						//是否支付成功
						if(payStatus == "1"){	
							//signWay （1---线上签约 ， 2---线下签约）
							if(obj.signWay == "1"){
								_this.redirectUrl = obj.redirectUrl ;
							}else{
								_this.signWay = false ;
							}
						}else{
							_this.payErr = true ;	
						}
					}else{
						_this.$toast(result.msg)
					}
				})
			},
			//点击重新支付
			repay(){
				this.$router.push({
					path:"/payAgencyFeeZJ",	
				}) ;
			},
			//线上签约
			online(){
				console.log("试试")
				window.location.href = this.redirectUrl
			},
			//线下签约
			line(){
				this.$router.push({
					path:"/sign",
					query: {loanId: this.applyId}	
				}) ;
			},
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