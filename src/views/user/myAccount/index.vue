<template>
    <div class="contain" :style="{height:height+'px'}">
			<section class="section">
				<article class="news1 news">
					<p class="list list1 clear" @click="tab(1)">
						<a>基本信息</a>
						<i></i>
					</p>
					<p class="list list2 clear" @click="tab(2)">
						<a>详细信息</a>
						<i></i>
					</p>
					
					<p class="list list3 clear" @click="tab(3)" style="border: none;">
						<a>联系人信息</a>
						<i></i>
					</p>
				</article>
				<article class="news2 news">
					<p class="list list1 clear" @click="tab(4)">
						<a>修改密码</a>
						<i></i>
					</p>
					<p class="list list2 clear" @click="tab(5)" style="border: none;">
						<a>修改手机号码</a>
						<i></i>
					</p>
				</article>
				<article class="news3 news" @click="tab(6)" >
					<button class="list list1 clear" style="border: none; background: none;">
						退出登录
						<i></i>
					</button>
				</article>
			</section>
			
	</div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
		data(){
			return{
				height:""
			}
		},
		methods:{
			tab(key){
				let _this = this ;
				switch (key) {
					case 1:
						_this.$router.push({
							path:"/basicInfo",	//基本信息
						}) ;
						break;
					case 2:
						_this.$router.push({
							path:"/detaileInfo",	//详细信息
						}) ;
						break;
					case 3:
						_this.$router.push({
							path:"/contactInfo",	//联系人信息
						}) ;
						break;
					case 4:
						_this.$router.push({
							path:"/modifyPassword",	//修改密码
						}) ;
						break;
					case 5:
						_this.$router.push({
							path:"/modifyPhone",	//修改手机号码
						}) ;
						break;
					case 6:
						
						MessageBox.confirm('是否确定退出?').then(action => {
							//确定按钮
							_this.$fetch(_this.$API.GET_LOGIN_OUT)
							.then((result) => {
								if(result.result == "success"){
									_this.$router.push({
										path:"/login",	//修改手机号码
									}) ;
								}else{
									_this.$toast(result.msg)
								}
							})
						},() => {
							//取消按钮
						}); 
						break;
				}

			}
		},
		updated(){
			
		},
		created () {
			this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
		}
		
	
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>

