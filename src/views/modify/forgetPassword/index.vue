<template>
	<div class="contain" :style="{height:height+'px'}">
		<section class="section">
			<p class="phoneNum list clear">
				<span>手机号码</span>
				<input type="text" v-model="mobilePhone" placeholder="请输入手机号码" onkeyup="value=value.replace(/[^\d]/g,'')" />
			</p>
			<p class="verificationCode list clear">
				<span>验证码</span>
				<input type="text" v-model="authCode" placeholder="请输入验证码" onkeyup="value=value.replace(/[^\d]/g,'')" id="authCode" />
				<input id="getCode" @click="changeCode()" :class="{ changeCode: isSetCode }" :disabled="isSetCode"  type="button" v-model="setCode" />
			</p>
			<p class="newPass list clear">
				<span>新密码</span>
				<input type="password" v-model="pwd" placeholder="请输入新的登录密码" id="pwd" />
			</p>
		</section>
		<footer class="footer">
			<p class="btn" id="sub" @click="submit">提交</p>
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
				height:"",
				md5:"",	//md5字符串
				setCode:"获取验证码" ,
				i:"" ,
				isSetCode:false ,
				mobilePhone:'',
				authCode:'',
				pwd:'',
				basePwd:"" ,
			}
		},
		methods: {
			//获取MD5串
			loginMd5(){
				let _this = this ;
				_this.$fetch(_this.$API.GET_PWD_STR)
				.then((result) => {
					//console.log(result)
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
				    codeType:1002,
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
			submit(){
				let _this = this ;
                //校验是否填写验证码
				if(_this.authCode==""||_this.authCode==null){
					_this.$toast("请输入验证码") ;
					return false ;
				}
                //校验密码格式
				if(!_this.$fn.checkPwd(_this.pwd)){
					_this.$toast("密码格式不正确") ;
					return false ;
				}else{
					_this.basePwd = BASE64.encode(BASE64.encode(_this.pwd)+_this.md5) ;
				}
				let params = {
					'mobilePhone':_this.mobilePhone,
					'authCode': _this.authCode,
					'pwd': _this.basePwd,
				}
				_this.$post(_this.$API.POST_FORGET_PASSWORD , params)
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
			this.loginMd5 ()
		}

	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>