<template>
	<div id="contain" :style="{height:height+'px'}">
		<header id="header"></header>
		<section id="section">
			<article class="nums news">
				<div class="phoneNum list clear">
					<span>手机号码</span>
					<!--<input type="text" placeholder="请输入手机号码" v-model="mobilePhone" onkeyup="value=value.replace(/[^\d]/g,'')" />-->
					<input type="text" placeholder="请输入手机号码" v-model="mobilePhone" />
				</div>
				<div class="verificationCode list clear">
					<span>验证码</span>
					<input type="text" placeholder="请输入验证码" v-model="authCode" />
					<input id="getCode" @click="changeCode()" :class="{ changeCode: isSetCode }" :disabled="isSetCode"  type="button" v-model="setCode" />
				</div>
				<div class="pass list clear">
					<span>登录密码</span>
					<input :type="type" v-model="password" placeholder="请设置鑫火云贷登录密码" />
					<i id="view" @click="view()" :class="[isView ? 'seeView':'','view']"></i>
				</div>
			</article>
			<article id="agree">
				<p class="clear">
					<input type="checkbox" id="check" checked="checked" disabled="disabled"/>
					<span>阅读并同意</span>
					<a @click="isShow = true">&lt;&lt;用户服务协议&gt;&gt;</a>
				</p>
			</article>
		</section>
		<footer id="footer">
			<p class="list1">
				<button id="btn" class="btn" @click="register()" >注册</button>	
			</p>
			<p class="list2">
				<a @click="goLogin">已有账户，可直接登录>></a>
			</p>
		</footer>
		<modelShow v-if="isShow" @isShow="credit" />
	</div>
</template>
<script>
	import credit from '../components/certificate/authorize/index' ;	  //服务协议
	import Base64 from "js-base64";
	let BASE64 = Base64.Base64 ;
	export default {
		components:{
			"modelShow" : credit ,
		},
		data(){
			return{
				height:"" ,
				setCode:"获取验证码" ,
				i:"" ,
				isSetCode:false ,
				isView : false ,
				type : "password" ,
				isShow : false ,
				md5:"",	//md5字符串
				mobilePhone:"",
				authCode:"",
				password:"",
				pwd:""
			}
		},
		methods:{
			//获取MD5串
			loginMd5:function(){
				let _this = this ;
				_this.$fetch(_this.$API.GET_PWD_STR)
				.then((result) => {
					console.log(result)
					_this.md5 = result.data;
				})
			},
			//获取手机验证码，倒计时
            changeCode(){
                let _this = this ;
				   if(_this.$fn.checkModile(_this.mobilePhone)){
                    _this.getCode() ;   //调取手机验证码接口
                    _this.i = 60;
                    var timer = setInterval(function() {
                        _this.setCode = "重新发送" + _this.i + "s" ;
                        _this.isSetCode = true ;
                        _this.i = _this.i - 1;
                        if(_this.i < 0) {
                            clearInterval(timer);
                            _this.setCode = "获取验证码" ;
                            _this.isSetCode = false ;
                        } 
                    }, 1000);
                }else{
                    _this.$toast('请输入正确的手机格式')
                }
            },
			//获取手机验证码，调接口
            getCode(){
				let _this = this ;
				let params = {
					mobilePhone:_this.mobilePhone,
				    codeType:1001,
				} 
				_this.$post(_this.$API.GET_FORGET_PASSWORD_CODE , params)
				.then((result) => {
					console.log(result)
					if(result.result == "success"){
						_this.$toast("发送成功")
					}else{
						_this.$toast(result.msg)
						this.i = 0 ;
					}
				})
			},
			view(){
				this.isView = !this.isView ;
				if(this.isView){
					this.type = "text" ;
				}else{
					this.type = "password" ;
				}
			},
			credit(data){
				this.isShow = false ;
			},
			//点击注册按钮
			register(){
				let _this = this ;
				//校验手机号
				if(!_this.$fn.checkModile(_this.mobilePhone)){
					_this.$toast('请输入正确的手机格式')
					return false ;
				}
				//校验验证码
				if(_this.authCode == ""||_this.authCode == null){
					_this.$toast('请输入验证码')
					return false ;
				};
				//校验密码
				if(!_this.$fn.checkPwd(_this.password)){
					_this.$toast("密码不正确！");
					return false ;
				}else{
					_this.pwd = BASE64.encode(BASE64.encode(_this.password)+_this.md5) ;
				}
				let saasId = _this.$route.query.saasId ;
				let shopNo = _this.$route.query.shopNo ;
				let params = {
					saasId:saasId,
					shopNo:shopNo,
					mobilePhone:_this.mobilePhone,
					authCode:_this.authCode,
					pwd:_this.pwd
				} 
			
				_this.$post(_this.$API.POST_REGISTER , params)
				.then((result) => {
					if(result.result == "success"){
						_this.$toast("注册成功")
						_this.$router.push({
							path:"/login",
							query: { 
								"saasId": saasId ,
								"shopNo": shopNo 
							}	
						}) ;
					}else{
						_this.$toast(result.msg)
						
					}
				}) 
			},
			//直接去登录
			goLogin(){
				let saasId = this.$route.query.saasId ;
				let shopNo = this.$route.query.shopNo ;
				this.$router.push({
					path:"/login",
					query: { 
						"saasId": saasId ,
						"shopNo": shopNo 
					}	
				}) ;
			}

		},
		updated(){
			
		},
		created () {
			this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
			this.loginMd5();
		}
		
	
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>