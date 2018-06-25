<template>
	<div class="contain">
		<header class="header"></header>
		<i></i>
		<section class="section">
			<article class="list1 list clear">
				<span></span>
				<input type="text" class="phone" v-model="userData.mobilePhone" placeholder="请输入手机号" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="11" />
			</article>
			<article class="list2 list clear">
				<span></span>
				<input :type="typeStyle" v-model="userData.pwd" class="password" placeholder="请输入密码"  autocomplete="new-password" />
				<i :class="[!isShow ? 'view_1' : '','view']"  @click="isView"></i>
			</article>
		</section>
		<footer class="footer clear">
			<p class="btn" @click="login">登录</p>
			<p style="height: 30px;"></p>
			<a class="forget" @click="forgetPassword()">忘记密码？</a>
		</footer>
	</div>
</template>
<script type="text/javascript">
	//let BASE64 = require('js-base64').Base64;
	import { MessageBox } from 'mint-ui';
	import Base64 from "js-base64";
	let BASE64 = Base64.Base64 ;
	import MD5 from 'js-md5';
	let userData = {
		mobilePhone: "",
		pwd: ""
	}
	export default{
		data(){
			return{
				userData,
				basePwd:"" ,
				typeStyle:"password" ,
				isShow:true ,
				md5:"",	//md5字符串
			}
		},
		methods:{
			//是否显示密码
			isView:function(){
				this.isShow = !this.isShow ;
				if(this.isShow) {
					this.typeStyle = "password" ;
				}else{
					this.typeStyle = "text" ;
				}
			},
			//获取MD5串
			loginMd5:function(){
				let _this = this ;
				_this.$fetch(_this.$API.GET_PWD_STR)
				.then((result) => {
					console.log(result)
					_this.md5 = result.data;
				})
			},
			//点击登录
			login:function(){
				let _this = this ;
				//校验手机号
				if(!_this.$fn.checkModile(_this.userData.mobilePhone)){
					_this.$toast('请输入正确的手机格式')
					return false ;
				}
				//校验密码
				if(!_this.$fn.checkPwd(_this.userData.pwd)){
					_this.$toast("密码不正确！");
					return false ;
				}else{
					_this.basePwd = BASE64.encode(BASE64.encode(_this.userData.pwd)+_this.md5) ;
				}
				let saasId = _this.$route.query.saasId ;
				let shopNo = _this.$route.query.shopNo ;
				let params={
					mobilePhone : _this.userData.mobilePhone ,
					pwd : _this.basePwd,
					saasId : saasId ,
					shopNo : shopNo
				}
				_this.$post(_this.$API.GET_LOGIN,params)
				.then((result) => {
					if(result.result == "success"){
						sessionStorage.setItem('myron', result.data.token);
						sessionStorage.setItem('sn', result.data.shopNo);
						sessionStorage.setItem('si', result.data.saasId);
						let status = result.data.status ;
						//状态0:待激活1:正常2:冻结3:待授权
						if(status == 3){
							MessageBox.alert('您还没有绑定新店铺,请绑定您的新店铺').then(action => {
								_this.$router.push({
									path:"/shopList",
								})
							});
						}else{
							_this.$router.push({
								path:"/loan",
								query: { "loanFlag": 1 }
							}) ;							
						}
					}else{
						_this.$toast(result.msg) ;
						_this.loginMd5() ;
					}
				})
			},
			forgetPassword:function(){
				this.$router.push({
					path:"/forgetPassword",	//我的账户
				}) ;
			},
		},
		created(){
			this.loginMd5();
			this.userData.pwd = "";
			this.userData.mobilePhone = this.$route.query.mobile ;	//待激活用户
		},
		watch: {
			
		},
	}//end---export default
	
</script>



<style lang="scss" scoped type="text/css">
	@import "./index.scss";
</style>