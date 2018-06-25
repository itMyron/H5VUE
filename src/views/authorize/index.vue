<template>
	<div class="contain" :style="{height:height+'px'}" v-show="loading">
			
			<header class="header"></header>
			<section class="section">
				<article class="news1 news">
					<div class="list list1 clear">
						<p class="p1 p">
							<span></span> 申请简易
						</p>
						<p class="p2 p">在线申请，急速审批</p>
					</div>
					<div class="list list2 clear">
						<p class="p1 p">
							<span></span> 额度高，手续方便
						</p>
						<p class="p2 p">最高50万，手续3分钟</p>
					</div>
					<div class="list list3 clear">
						<p class="p1 p">
							<span></span> 利息低，按日收费
						</p>
						<p class="p2 p">一万元一天只要3元，不借款不收费</p>
					</div>
				</article>
				<article class="news2 news">
					<p class="list list1 clear">
						<input type="radio" checked="checked" />
						<span>阅读并同意</span>
						<button class="list list1 clear"  @click="isShow = true" style="border: none; background: #F4F4F4;">	
							<a>&lt;&lt;用户服务协议&gt;&gt;</a>
						</button>
					</p>
					<p class="list list2 clear">
						同意在签订贷款协议后，为对方提供本店营业数据。
					</p>
				</article>
			</section>
			<footer class="footer">
				<button id="btn" class="btn" @click="register()">获取预审额度</button>
			</footer>
			<modelShow v-if="isShow" @isShow="credit" />
			
    
  		
	</div>
</template>
<script>
	import credit from '../components/certificate/authorize/index' ;	  //服务协议
	import { Indicator } from 'mint-ui';
	export default {
		components:{
			"modelShow" : credit ,
		},
		data(){
			return{
				height:"" ,
				isShow : false ,
				saasId: "",
				shopNo: "",
				url: "",
				agree: 1,
				sign_time: "" ,
				sign : "" ,
				loading: true 
			}
		},
		props: {
			"backOff":{
				type:String,		//Array,Boolean,Number
				default:false
			}
	    },
		methods:{
			init(){
				let _this = this ;
				_this.saasId = _this.$route.query.saasId
				_this.shopNo = _this.$route.query.shopNo
				_this.url = _this.$route.query.url
				_this.sign_time = _this.$route.query.sign_time
				_this.sign = _this.$route.query.sign
				
				if(_this.saasId == null || _this.saasId == "A001") {
				
					_this.saasId = 'A001';
					_this.shopNo = _this.$route.query.dianmianid;
					let params = {
						saasId: _this.saasId,
						shopNo: _this.shopNo,
						url: _this.url,
						agree: 1,
						sign_time: _this.sign_time ,
						sign :_this.sign
					}
					_this.$post(_this.$API.POST_AUTHORIZATION,params)
					.then((result) => {
						console.log(result)
						if(result.result == "success"){
							let needAccredit = result.data.needAccredit; //是否允许授权
							let allowinvite = result.data.allowinvite; //是否允许注册
							let token = result.data.token ; //获取token值
							if(token != null){
								sessionStorage.setItem("myron",result.data.token)	//存储token值
								_this.$router.push({
									path:"/loan",
									query: { "loanFlag": 1 }
								}) ;
								return false ;
							}
							//是否允许注册
							if(allowinvite) {
								_this.$router.push({
									path:"/register",
									query: { 
										"saasId": _this.saasId ,
										"shopNo":_this.shopNo
									}
								}) ;
							} else {
								let account = result.data.account ;
								if(account != null) {
									let status = account.accountStatus;
									let mobile = account.mobile;
									_this.$router.push({
										path:"/login",
										query: { 
											"saasId": _this.saasId ,
											"shopNo": _this.shopNo ,
											"status": _this.status ,
											"mobile": _this.mobile
										}
									}) ;
								} else {
									_this.$router.push({
										path:"/login",
										query: { 
											"saasId": _this.saasId ,
											"shopNo": _this.shopNo ,
										}
									}) ;
								}
							}
						}else{
							_this.$toast(result.msg)
						}
					})
				}else{	//不是二维火过来的客户
					let params = {
						saasId: _this.saasId,
						shopNo: _this.shopNo,
						url: _this.url,
						sign_time: _this.sign_time ,
						sign :_this.sign
					}
					_this.$post(_this.$API.POST_AUTHORIZATION,params)
					.then((result) => {
						console.log(result)
						if(result.result == "success"){
							let needAccredit = result.data.needAccredit; //是否允许授权
							let allowinvite = result.data.allowinvite; //是否允许注册
							let token = result.data.token ; //获取token值
							if(token != null){
								sessionStorage.setItem("myron",result.data.token)	//存储token值
								_this.$router.push({
									path:"/loan",
									query: { "loanFlag": 1 }
								}) ;
								return false ;
							}
							//是否允许注册
							if(allowinvite) {
								_this.$router.push({
									path:"/register",
									query: { 
										"saasId": _this.saasId ,
										"shopNo":_this.shopNo
									}
								}) ;
							} else {
								let account = result.data.account ;
								if(account != null) {
									let status = account.accountStatus;
									let mobile = account.mobile;
									_this.$router.push({
										path:"/login",
										query: { 
											"saasId": _this.saasId ,
											"shopNo": _this.shopNo ,
											"status": _this.status ,
											"mobile": _this.mobile
										}
									}) ;
								} else {
									_this.$router.push({
										path:"/login",
										query: { 
											"saasId": _this.saasId ,
											"shopNo": _this.shopNo ,
										}
									}) ;
								}
							}
						}else{
							_this.$toast(result.msg)
						}
					})



				}
			},
			credit(data){
				console.log(data)
				this.isShow = false ;
			},
			//点击去授权
			register(){
				let _this = this ;
				let params = {
						saasId: _this.saasId,
						shopNo: _this.shopNo,
						url: _this.url,
						agree: 1,
						sign_time: _this.sign_time ,
						sign :_this.sign
					}
				_this.$post(_this.$API.POST_AUTHORIZATION,params)
					.then((result) => {
						console.log(result)
						if(result.result == "success"){
							_this.$router.push({
								path:"/login",
								query: { 
									"saasId": _this.saasId ,
									"shopNo": _this.shopNo ,
								}
							}) ;	
						}else{
							_this.$toast(result.msg)
						}
					})
			}
		},
		created () {
			this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
			if(this.backOff=="/register"||this.backOff=="/login"||this.backOff=="/loan"){
				this.loading = false ;
				Indicator.open({
				  //text: '加载中...',
				  spinnerType: 'fading-circle'
				});
			}else{
				this.init() ;
			}
			
			
		},
		
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>