<template>
	<div class="contain">
			<div style="padding-bottom: 100px;">
				<section class="section"  v-for="item in obj" >
					<article class="news news1 clear">
						<p class="list1 list clear">
							<strong>{{item.bankName==null?"":item.bankName}}贷款</strong>
							<b>编号{{item.applyId}}</b>
						</P>
						<div class="list2 list clear">
							<p class="credit">贷款金额</p>
							<p class="money">
								<strong>{{item.approveAccount==null?"0":item.approveAccount}}</strong>元</p>
						</div>	
						<div class="list3 list clear">
							<p class="startDate">
								<span>贷款日期</span>
								<strong>{{new Date(item.loadStartTime).toLocaleDateString()}}</strong>
							</p>
							<p class="endDate">
								<span>贷款到期日</span>
								<strong>{{new Date(item.loadEndTime).toLocaleDateString()}}</strong>
							</p>
						</div>
					</article>
					<article class="news2 news clear">
						<div class="list1 list2_1 list clear" v-for="(key,index) in item.refundList">
							<font class = "done" v-if="key.boolanPay">已还款</font>
							<font class = "undone" v-else>计息中</font>
							<p class="interestData">
								<span>日期</span>
								<strong>{{new Date(key.refundTime).toLocaleDateString()}}</strong>
							</p>
							<p  class="payInterest">
								<span v-if="index==item.refundList.length-1">支付本息</span>
								<span v-else>支付利息</span>
								<strong>{{key.refundInterest}}元</strong>
							</p>
						</div>
					</article>
				</section>	
			</div>
			
		</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				obj :[]
			}
		},
		methods: {
			init(){
					let _this = this ;
					let loanId = _this.$route.query.loanId
					let params={
						loanId : loanId ,	
					}
					_this.$post(_this.$API.GET_REFUND_DETAIL_LIST,params)
					.then((result) => {
						console.log("还款计划列表：",result)
						if('success' == result.result) {
							_this.obj = result.data ;
							if(_this.obj.length == 0){
								_this.$toast("暂无还款列表")	
							}

						}else{
							_this.$toast(result.msg)
						}
					})
				},
		},
		created () {
			this.init() ;
		}
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>