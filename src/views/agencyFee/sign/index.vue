<template>
		<div class="contain" :style="{height:height+'px'}">
			<header class="header"></header>
			<section class="section">
				<article class="news1 news">
					<p class="list list1 clear">
						<span></span>
					</p>
					<p class="list list2 clear"><strong>{{time}}</strong></p>
				</article>
				<article class="news2 news">
					<p class="list list1 clear"></p>
				</article>
				<article class="news3 news">
					<div class="list list1 clear">
						<span>银行</span>
						<p id="bankName">{{bankName}}</p>
					</div>
					<div class="list list2 clear">
						<span>地址</span>
						<p id="address">{{address}}</p>
					</div>
					<div class="list list3 clear">
						<span>电话</span>
						<p id="phone">{{phone}}</p>
					</div>
					<div class="list list4 clear">
						<span>联系人</span>
						<p id="linkman">{{linkman}}</p>
					</div>
				</article>
				<article class="news5 news">
					<input class="btn list list1 clear" type="button" value="修改签约时间" @click="modifySign()" />
				</article>
				<article class="news4 news">
					<p class="list list1 clear">
						<span></span><a href="tel:0571-85890982" style="color: #ff5b00;">0571-85890982</a>
					</p>
					<p class="list list2 clear">
						<span></span>
							10:00-18:00
					</p>
				</article>
			</section>
		</div>
</template>
<script type="text/javascript">
	import API from "@/config/api";
	export default{
		data(){
			return{
				height:"",
				bankName:"",
				address:"",
				phone:"",
				linkman:"",
				time:"",
				loanId:""
			}
		},
		methods: {
			init(){
				let _this = this ;
				let params={
					loanId : _this.loanId 
				}
				_this.$post(_this.$API.GET_APPOINT_TIME,params)
				.then((result) => {
					console.log(result)
					if('success' == result.result) {
						_this.bankName = result.data.bankName ;
						_this.address = result.data.address ;
						_this.phone = result.data.phone ;
						_this.linkman = result.data.linkman ;
						_this.time = result.data.time ;
					}else{
						_this.$toast(result.msg)
					}
				})
			},
			//修改签约时间
			modifySign(){
				this.$router.push({
					path:"/modifySign",	//查看店铺详情
					query: {loanId: this.loanId}
				}) ;
			}		
        },
		created () {
			this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
			this.loanId = this.$route.query.loanId
			this.init();
		}

	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>