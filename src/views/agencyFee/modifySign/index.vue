<template>
		<div class="contain" :style="{height:height+'px'}">
			<header class="header"></header>
			<section class="section">
				<article class="news1 news">
					<p class="list list1 clear">
						<span></span>
					</p>
					<p class="list list2 clear">
						<select id="time" v-model="time">
							<option v-for="(val,index) in timeList" :selected = true   >{{val}}</option>
						</select>
					</p>
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
					<input class="btn list list1 clear" type="button" value="下一步" @click="next()" />
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
	import getTime from "@/static/getTime";
	export default{
		data(){
			return{
				height:"",
				bankName:"",
				address:"",
				phone:"",
				linkman:"",
				timeList:[] ,
				loanId:"" ,
				time: "" ,
			}
		},
		methods: {
			init(){
				let _this = this ;
				_this.loanId = this.$route.query.loanId
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
						let time = result.data.time ;
						time = time == "" ? "请选择预约时间" : time ;
						_this.time = time ;
						let num = 0 ;
						for(var i = 1 ; i <= 5 ; i++){
							var dateTime = getTime.showTime(i);	//根据参数，获取今天之后第i天日期
							var day = new Date(dateTime).getDay() ;
							if(day != 0 && day != 6 && num < 3) {
								num++;
								_this.timeList.push(dateTime + ' 9:00-11:00') ;
								_this.timeList.push(dateTime + ' 14:00-16:00') ;
							}
						}
					}else{
						_this.$toast(result.msg)
					}
				})
			},
			next(){
				
				
				let _this = this ;
				let params={
					loanId : _this.loanId ,
					time : _this.time ,
				}
				_this.$post(_this.$API.POST_CHANGE_APPOINT_TIME,params)
				.then((result) => {
					console.log(result)
					if('success' == result.result) {
						_this.$router.push({
							path:"/sign",	//查看店铺详情
							query: {loanId: _this.loanId}
						}) ;
					}else{
						_this.$toast(result.msg)
					}
				})
			}		
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