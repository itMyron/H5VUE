<template>
	<div class="contain" :style="{height:height+'px'}">
		<section class="section">
			<p class="list1 list clear">
				<span>旧密码</span>
				<input type="password" placeholder="请输入旧密码" v-model="pwd" />
			</p>
			<p class="list2 list clear">
				<span>新密码</span>
				<input type="password" placeholder="请输入新密码" v-model="pwdNew" />
			</p>
			<p class="list3 list clear">
				<span>确认密码</span>
				<input type="password" placeholder="请输入确认密码" v-model="_pwdNew" />
				<i></i>
			</p>
		</section>
		<footer class="footer">
			<p class="btn" @click="submit">提交</p>
		</footer>
	</div>
</template>
<script type="text/javascript">
	import Base64 from "js-base64";
	let BASE64 = Base64.Base64 ;
	export default{
		data(){
			return{
				height:"",
				md5:'',
				pwd:"" ,
				pwdNew:"" ,
				_pwdNew:"" ,
				basePwd:"" ,
				basePwdNew:""
			}
		},
		methods: {
			//获取MD5串
			getMd5(){
				let _this = this ;
				_this.$fetch(_this.$API.GET_PWD_STR)
				.then((result) => {
					console.log(result)
					_this.md5 = result.data;
				})
			},
			//点击提交按钮
			submit(){
				let _this = this ;
				//校验旧密码格式
				if(!_this.$fn.checkPwd(_this.pwd)){
					_this.$toast("旧密码格式不正确") ;
					return false ;
				}else{
					_this.basePwd = BASE64.encode(BASE64.encode(_this.pwd)+_this.md5) ;
				}
				//校验新密码格式
				if(!_this.$fn.checkPwd(_this.pwdNew)){
					_this.$toast("新密码格式不正确") ;
					return false ;
				}else{
					_this.basePwdNew = BASE64.encode(BASE64.encode(_this.pwdNew)+_this.md5) ;
				}
				//校验新密码与旧密码不能一直
				if(_this.pwdNew == _this.pwd){
					_this.$toast("新密码与旧密码不能相同") ;
					return false ;
				}
				//校验确认密码格式
				if(!_this.$fn.checkPwd(_this._pwdNew)){
					_this.$toast("确认密码格式不正确") ;
					return false ;
				}
				//校验新密码与确认密码是否一致
				if(_this.pwdNew != _this._pwdNew){
					_this.$toast("确认密码与新密码要一致") ;
					_this._pwdNew = "" ;
					return false ;
				}
				let params = {
					pwd : _this.basePwd ,
					pwdNew : _this.basePwdNew
				}
				_this.$post(_this.$API.POST_MODIFY_PASSWORD_SUBMIT , params)
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
			this.getMd5() ;
		}

	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>