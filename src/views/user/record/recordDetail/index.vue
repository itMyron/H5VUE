<template>
    <div class="contain" :style="{height:height+'px'}">
			<header id="header"></header>
			<section id="section">
				<article class="news1 news">
					<p class="list1 list clear">
						<span>订单编号</span>
						<font>{{ordernNo}}</font>
					</p>
					<p class="list2 list clear">
						<span>借款金额(元)</span>
						<font>{{refundInterest}}</font>	
					</p>
					<p class="list3 list clear">
						<span>当前利息(元)</span>
						<font>{{accrual}}</font>	
					</p>
					<p class="list4 list clear">
						<span>借款天数(天)</span>
						<font>{{dayNum}}</font>	
					</p>
					<p class="list5 list clear">
						<span>累计利息(元)</span>
						<font>{{accrualTotal}}</font>	
					</p>
				</article>
				<article class="news2 news">
					<p class="list1 list clear">
						<span>还款时间</span>
						<font>{{refundTime}}</font>
					</p>
					<p class="list2 list clear">
						<strong>还款账号</strong>
					</p>
					<p class="list3 list clear">
						<span>开户行</span>
						<font></font>
					</p>
					<p class="list4 list clear">
						<span>开户银行</span>
						<font></font>
					</p>
					<p class="list5 list clear">
						<span>银行账号</span>
						<font></font>
					</p>
				</article>
				<article class="news3 news" style="border: 0;">
					<p class="list1 list clear">
						<i></i>
						<span style="color: #FF5001;">支付成功</span>
						<font style="color: #FF5001;">{{payTime}}</font>
					</p>
					<p class="list2 list clear">
						<i></i>
						<span style="color: #FF5001;">开始计息</span>
						<font style="color: #FF5001;">{{nowTime}}</font>
					</p>
					<p :class="[boolanPay != 0 ? 'yi' : '','list3','list']">
						<i></i>
						<span>结息还款</span>
						<font>{{realyRefundTime}}</font>
					</p>
				</article>	
			</section>
			
	</div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
		data(){
			return{
				height:"" ,
				ordernNo:"" ,
				refundInterest:"" ,
				accrual:"" ,
				dayNum:"" ,
				accrualTotal:"" ,
				refundTime:"" ,
				payTime:"" ,
				nowTime:"" ,
				realyRefundTime:"" ,
				boolanPay:"1",
			}
		},
		methods:{
			init(){
				let _this = this ;
				let objectId = _this.$route.query.objectId ;
				let params={
					objectId : objectId 
				}
				_this.$post(_this.$API.GET_LOAN_DETAILS,params)
				.then((result) => {
					console.log("获取贷款数据：",result)
					if(result.result == "success"){

						_this.ordernNo = result.data.ordernNo ;
						_this.refundInterest = result.data.refundInterest ;
						_this.accrual = result.data.accrual ;
						_this.dayNum = result.data.dayNum ;
						_this.accrualTotal = result.data.accrualTotal ;
						_this.refundTime = result.data.refundTime ;
						_this.payTime = result.data.payTime ;
						_this.nowTime = result.data.nowTime ;
						_this.boolanPay = result.data.boolanPay ;
						_this.realyRefundTime = result.data.realyRefundTime ;
						
					}else{
						_this.$toast(result.msg)
					}
				})
			}
		},
		created () {
			this.init() ;
			this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
		}
		
	
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>