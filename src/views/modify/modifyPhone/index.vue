<template>
  		<div class="contain" :style="{height:height+'px'}">
			<section class="section">
				<p class="oldPhoneNum list clear">
					<span>原手机号码</span>
					<input type="text" v-model="mobilePhone" placeholder="请输入原手机号码" onkeyup="value=value.replace(/[^\d]/g,'')" />
				</p>
				<p class="pass list clear">
					<span>登录密码</span>
					<input type="password" v-model="pwd" placeholder="请输入登录密码" />
					<i></i>
				</p>
				<p class="newPhoneNum list clear">
					<span>新手机号码</span>
					<input type="text" v-model="mobilePhoneNew" placeholder="请输入新手机号码" onkeyup="value=value.replace(/[^\d]/g,'')" />
				</p>
				<p class="verificationCode list clear">
					<span>验证码</span>
					<input type="text" v-model="authCode" placeholder="请输入验证码" onkeyup="value=value.replace(/[^\d]/g,'')" />
					<input id="getCode" @click="changeCode()" :class="{ changeCode: isSetCode }" :disabled="isSetCode"  type="button" v-model="setCode" />
				</p>
			</section>
			<article id="notice">
				修改成功后将以新的手机号码作为新的登录账号
			</article>
			<footer class="footer">
				<p class="btn" @click="submit()">提交</p>
			</footer>
		</div>
</template>
<script type="text/javascript">
	import Base64 from "js-base64";
	let BASE64 = Base64.Base64 ;
	import MD5 from 'js-md5';
	export default{
		data(){
			return{
				"height":"",
				'setCode':"获取验证码" ,
				'i':"" ,
				'isSetCode':false ,
				"md5":'',
				'mobilePhone': '',
				'authCode': '',
				'pwd': '',
				'mobilePhoneNew': '',
				'basePwd':"" ,
			}
		},
		methods: {
			//页面初始化
			init(){
				let _this = this ;
				let params={
						step : 1 
					}
				_this.$post(_this.$API.GET_MODIFY_PHONE,params)
				.then((result) => {
					console.log(result)
					if(result.success){
						_this.mobilePhone = result.data.mobilePhone;
					}
					
				})
			},
			//获取MD5串
			getMd5(){
				let _this = this ;
				_this.$fetch(_this.$API.GET_PWD_STR)
				.then((result) => {
					console.log(result)
					_this.md5 = result.data;
				})
			},
			//获取手机验证码，倒计时
            changeCode(){
				console.log("点击提交")
                let _this = this ;
				if(!_this.$fn.checkModile(_this.mobilePhone)){
					_this.$toast('旧手机号码格式不正确')
					return false ;
                }
				if(!_this.$fn.checkModile(_this.mobilePhoneNew)){
					_this.$toast('新手机号码格式不正确')
					return false ;
				}
				if(_this.mobilePhone == _this.mobilePhoneNew){
					_this.$toast('新手机号与旧手机号不能相同')
					return false ;
				}
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
            },
			//获取手机验证码，调接口
            getCode(){
				let _this = this ;
				let params = {
					mobilePhone:_this.mobilePhoneNew,
				    codeType:1003,
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
			//点击登录
			submit(){
				let _this = this ;
                //校验是否填写验证码
				if(_this.authCode==""||_this.authCode==null){
					_this.$toast("请输入验证码") ;
					return false ;
				}
                //校验密码格式
				if(!_this.$fn.checkPwd(_this.pwd)){
					_this.$toast("密码不正确") ;
					return false ;
				}else{
					_this.basePwd = BASE64.encode(BASE64.encode(_this.pwd)+_this.md5) ;
				}
				let params = {
					'mobilePhone':_this.mobilePhone,
					'authCode': _this.authCode,
					'pwd': _this.basePwd,
					'mobilePhoneNew':_this.mobilePhoneNew
				}
				_this.$post(_this.$API.POST_MODIFY_PHONE_SUBMIT , params)
				.then((result) => {
					console.log(result)
					if(result.result == "success"){
						_this.$router.push({
							path:"/login",
						}) ;
					}else{
						_this.$toast(result.msg)
					}
				})

			}
        },
		created () {
			this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
			this.init() ;
			this.getMd5() ;
		}

	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>
