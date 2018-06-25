<template>
	<div>
		<section>
			<header class="header">
				<p class="clear">
					<i></i>
					<span>公告：</span>
					<marquee scrollamount="2">
							鑫火云贷
					</marquee>
				</p>
			</header>
			<!--轮播图-->
			<nav id="nav" class="swiper-container">
				<!--<template>
					<div class="block">
						<span class="demonstration"></span>
						<el-carousel autoplay=true arrow="never" height="150px">
						<el-carousel-item v-for="item in 4" :key="item"></el-carousel-item>
						</el-carousel>
					</div>
				</template>-->
				<mt-swipe :auto="3000">
				  	<mt-swipe-item><img src="../assets/home/banners.jpg" /></mt-swipe-item>
				  	<mt-swipe-item><img src="../assets/home/banners.jpg" /></mt-swipe-item>
				  	<mt-swipe-item><img src="../assets/home/banners.jpg" /></mt-swipe-item>
				</mt-swipe>
				
				
			</nav>
			<!--end轮播图-->
			<div class="section">
				<article class="news1 news">
					<h3>云贷产品</h3>
					<div class="list list1">
						<a>餐饮&bull;流水贷</a>
						<img src="../assets/home/list1.png" />
					</div>
					<div class="list list2 clear">
						<div class="news-1 newsNum clear">
							<h4>最高贷款金额</h4>
							<h5>授信服务费：免费</h5>
						</div>
						<div class="news-2 newsNum">
							<strong>50万</strong>
						</div>
						<div class="news-3 newsNum">
							<a class="btnApply">申请贷款</a>
						</div>
					</div>
				</article>
				<article class="news2 news">
					<div class="list1 list">
						<a>商超&bull;供应链贷</a>
						<img src="../assets/home/list2.png" />
					</div>
					<div class="list2 list clear">
						<div class="news-1 newsNum clear">
							<h4>最高贷款金额</h4>
							<h5>授信服务费：免费</h5>
						</div>
						<div class="news-2 newsNum">
							<strong>50万</strong>
						</div>
						<div class="news-3 newsNum">
							<a class="btnApply">申请贷款</a>
						</div>
					</div>
				</article>
				<article class="news3 news" >
					<h3>SAAS合作商</h3>
					<div class="list1 list">
						<a >SAAS服务商合作</a>
						<img src="../assets/home/list3.png" />
					</div>
					<div class="list2 list clear">
						<div class="news-1 newsNum" style="width: 60%; ">
							<h4 style="color: #000333;">只要您是SAAS服务商，我们都可以合作哦！</h4>
						</div>
						<div class="news-2 newsNum" style="align-self: 40%;">
							<a style="margin-left: 0.55rem; display:none;" class="btnApply">申请加入</a>
						</div>
					</div>
				</article>
			</div>
		</section>
	</div>
</template>
<script>
	export default {
    name: 'app',
		data(){
			return{
				
			}
		},
		methods:{
			

		},
		updated(){
			
		},
		created () {
			
		}
		
	
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "./index.scss";
</style>


