<template>
	<div id="contain">
		<header id="header">
			<span :class="['nav',item ==100 ?'navItem':'']" @click="getData(100,100)">全部</span>
			<span :class="['nav',item ==0 ?'navItem':'']" @click="getData(1,0)">计息中</span>
			<span :class="['nav',item ==1 ?'navItem':'']" @click="getData(1,1)">已还款</span>
			<span :class="['nav',item ==3 ?'navItem':'']" @click="getData(1,3)">待还款</span>
			<span :class="['nav',item ==4 ?'navItem':'']" @click="getData(1,4)">居间费</span>
		</header>
		<section id="section">
			<article class="news1 news" v-for="key in loanList" @click="details(key.saasOrderId,key.refundStatus)">
				<p class="list0 list clear" v-if="key.refundStatus == 0">
					<span class="type0">计息中</span>
					<font style="color:#ff5001;" v-if="key.surplusDay">距还款日还有{{key.surplusDay}}天</font>
				</p>
				<p class="list0 list clear" v-if="key.refundStatus == 1">
					<span class="type1">已还款</span>
					<font style="color:#ff5001;" v-if="key.realyRefundTime">已于{{key.realyRefundTime}}还款成功</font>
				</p>
				<p class="list0 list clear" v-if="key.refundStatus == 2">
					<span class="type2">已逾期</span>
					<font style="color:#ff5001;" v-if="key.surplusDay">已逾期{{key.surplusDay}}天</font>
				</p>
				<p class="list0 list clear" v-if="key.refundStatus == 3">
					<span class="type2">待还款</span>
					<font style="color:#ff5001;" v-if="key.refundInterest">待还金额{{key.refundInterest}}元</font>
				</p>
				<p class="list0 list clear" v-if="key.refundStatus == 4">
					<span class="type4">居间费</span>
					<font style="color:#ff5001;">已支付成功</font>
				</p>
				<p class="list1 list clear">
					<span>订单编号</span>
					<strong>{{key.orderNo}}</strong>
				</p>
				<p class="list2 list clear">
					<span>支付金额</span>
					<strong>{{key.payAmount}}元</strong>
					<i class="success" v-if="key.payStatus">交易成功</i>
					<i class="error" v-else="key.payStatus">交易失败</i>
				</p>
				<p class="list3 list clear">
					<span>支付时间</span>
					<strong>{{key.payTime}}</strong>
				</p>
			</article>



		</section>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){ 
			return{
				item : "100" ,
				index : 1 ,	//滑动加载记录当前页
				totalPage : "" ,
				refundStatus:"" ,
				statusHtml:"" ,
				loanList : []
			}
		},
		methods: {
			init(){
				this.getData(1,100) ;
			},
			//请求数据
			getData(index,refundStatus){	//当前页，贷款状态
				let _this = this ;
				_this.item = _this.refundStatus = refundStatus ;
				let params={
					refundStatus : _this.refundStatus ,//0计息中1已还款2逾期3待还款,其他为全部
					currentPage : index,	//分页加载的当前页
				}
				_this.$post(_this.$API.GET_LOAN_DATA,params)
				.then((result) => {
					console.log("获取贷款数据：",result)
					if(result.result == "success"){
						_this.totalPage = result.data.page.totalPage ;		//总条目数
						//_this.loanList = result.data.list ;
						_this.loanList = _this.loanList.concat(result.data.list)
					}else{
						_this.$toast(result.msg)
					}
				})
			},
			//滚动加载数据
			tabScroll(){
				let _this = this ;
				_this.scroll_ = function () {
					let docHeight = document.body.clientHeight;		//文档的高度
					let winHeight = window.screen.height ;		//可视窗口的高度
					let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop ;
					if(scrollTop >= docHeight - winHeight){
						_this.index ++ ;
						if(_this.index <= _this.totalPage){
							_this.getData(_this.index,_this.refundStatus)
						}else{
							_this.$toast("数据已加载完毕")
						}
					}
				}
					window.addEventListener("scroll",_this.scroll_);
				},
			//查看贷款详情
			details(saasId,refundStatus){
				if(refundStatus != 4){
					this.$router.push({
						path:"/recordDetail",
						query: { "objectId": saasId }
					}) ;
				}
			}
		},
		created(){
			this.init() ;
		},
		mounted() {
			this.tabScroll();
		},
		destroyed(){
			window.removeEventListener("scroll",this.scroll_);
		}
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>