<template>
    <div class="contain" :style="{height:height+'px'}">
			<header class="header"></header>
			<section class="section">
				<article class="news1 news clear">
					<div class="list1 list clear">
						<p class="left"></p>
						<p class="right">
							<strong>欢迎&nbsp;&nbsp;<a style="color: #ddd;">{{name}}</a></strong>
							<span>{{account}}</span>
						</p>
					</div>
				</article>
				<article class="news2 news clear">
					<div class="wrap">
						<p class="list1 list clear" @click="tab(1)">
							<b></b>
							<span>我的账户</span>
							<a><i v-show="!basicStatus">待完善</i></a>
						</p>
					</div>
					<div class="wrap">
						<p class="list3 list clear" @click="tab(2)">
							<b></b>
							<span>我的店铺</span>
							<a><i v-show="!shopStatus">无信息</i></a>
						</p>
					</div>
					<div class="wrap" style="display:none;">
						<p class="list0 list clear" @click="tab(3)">
							<b></b>
							<span>芝麻认证</span>
							<a><i>待认证</i></a>
						</p>
					</div>
					<div class="wrap">
						<p class="list4 list clear" @click="tab(4)">
							<b></b>
							<span>我的银行卡</span>
							<a></a>
						</p>
					</div>
					<div class="wrap">
						<p class="list2 list clear" @click="tab(5)">
							<b></b>
							<span>交易记录</span>
							<a><i hidden="hidden"></i></a>
						</p>
					</div>
					<div class="wrap">
						<p class="list5 list clear" @click="tab(6)">
							<b></b>
							<span>帮助与反馈</span>
							<a></a>
						</p>
					</div>
					<div class="wrap">
						<p class="list6 list clear" style="border: 0;"  @click="tab(7)">
							<b></b>
							<span>关于鑫火云贷</span>
							<a></a>
						</p>
					</div>
				</article>
				<article class="news3 news">
					<p class="list list1 clear">
						<span></span>
						<a href="tel:0571-85890982" style="color: #ff5b00;">0571-85890982</a>
					</p>
					<p class="list list2 clear">
						<span></span> 
            			10:00-18:00
					</p>
				</article>
			</section>
		</div>
</template>
<script>
import Footer from '@/views/components/footer';
	export default {
		data(){
			return{
				height:"" ,
				name : "",
				account : "" ,
				basicStatus : true ,
				shopStatus : true ,
			}
		},
		methods:{
			//页面初始化
			init(){
				let _this = this ;
				_this.$fetch(_this.$API.GET_USER_MSG) 
				.then((result) => {
					//console.log(result)
					if(result.result == "success"){
						_this.name = result.data.name ;
						_this.account = result.data.account ;
						_this.basicStatus = result.data.basicStatus ;
						_this.shopStatus = result.data.shopStatus ;
					}else{
						_this.$toast(result.msg) ;
					}
				})
			},
			tab(key){
				let _this = this ;
				switch (key) {
					case 1:
						_this.$router.push({
							path:"/myAccount",	//我的账户
						}) ;
						break;
					case 2:
						_this.$router.push({
							path:"/shopList",	//我的店铺
						}) ;
						break;
					case 3:
						_this.$router.push({
							path:"/index",	//芝麻认证
						}) ;
						break;
					case 4:
						_this.$router.push({
							path:"/bankCards",	//我的银行卡
						}) ;
						break;
					case 5:
						_this.$router.push({
							path:"/record",	//交易记录
						}) ;
						break;
					case 6:
						_this.$router.push({
							path:"/help",	//帮助与反馈
						}) ;
						break;
					case 7:
						_this.$router.push({
							path:"/about",	//关于鑫火
						}) ;
						break;
				}

			}
		},
		updated(){
			
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

