<template>
	<div class="contain" :style="{height:height+'px'}">
		<header class="header">
			<p>以下均为必填项</p>	
		</header>
		<section class="section">
			<article class="first news">
				<h3 class="title">第一联系人</h3>
				<p class="list list1 clear">
					<span><font>联系人姓名</font></span>
					<input type="text" v-model="dataMsg.firstLinkMan" placeholder="请输入姓名" />
				</p>
				<p class="list list2 clear">
					<span><font>关系</font></span>
					<select v-model="dataMsg.firstRelation">
						<option value="请选择">请选择</option>
						<option value="夫妻">夫妻</option>
						<option value="父母">父母</option>
						<option value="子女">子女</option>
					</select>
				</p>
				<p class="list list3 clear" style="border: none;">
					<span><font></font>手机号码</span>
					<input type="text" v-model="dataMsg.firstLinkManMobile" placeholder="请输入手机号码" onkeyup="value=value.replace(/[^\d]/g,'')" />
				</p>
			</article>
			<article class="second news">
				<h3 class="title">第二联系人</h3>
				<p class="list list1 clear">
					<span><font>联系人姓名</font></span>
					<input type="text" v-model="dataMsg.secondLinkMan" placeholder="请输入姓名" />
				</p>
				<p class="list list2 clear">
					<span><font>关系</font></span>
					<select v-model="dataMsg.secondRelation">
						<option value="请选择">请选择</option>
						<option value="朋友">朋友</option>
						<option value="同学">同学</option>
						<option value="供应商">供应商</option>
						<option value="服务商">服务商</option>
					</select>
				</p>
				<p class="list list3 clear" style="border: none;">
					<span><font id="smobile">手机号码</font></span>
					<input type="text" v-model="dataMsg.secondLinkManMobile" placeholder="请输入手机号码" onkeyup="value=value.replace(/[^\d]/g,'')" />
				</p>
			</article>
		</section>
		<footer class="footer">
			<p class="btn" @click="submit()">提交</p>
		</footer>
	</div>	
</template>
<script type="text/javascript">
	let dataMsg = {
		direction:"" ,
		firstLinkMan : "" ,	//第一联系人
		firstRelation : "请选择" , //第一联系人关系
		firstLinkManMobile : "" , //第一联系人手机号
		secondLinkMan : "" ,
		secondRelation : "请选择" ,
		secondLinkManMobile : "",
		step : 4 
	}
	export default{
		data(){
			return{
				height:"",
				dataMsg ,
			}
		},
		methods: {
			//页面信息初始化
			init(){
				let _this = this ;
				let params={
						step : 4 
					}
				_this.$post(_this.$API.GET_CONTACT_MSG,params)
				.then((result) => {
					if(result.result == "success"){
						_this.dataMsg.firstLinkMan = result.data.firstLinkMan ;
						_this.dataMsg.firstRelation = result.data.firstRelation ;
						_this.dataMsg.firstLinkManMobile = result.data.firstLinkManMobile ;
						_this.dataMsg.secondLinkMan = result.data.secondLinkMan ;
						_this.dataMsg.secondRelation = result.data.secondRelation ;
						_this.dataMsg.secondLinkManMobile = result.data.secondLinkManMobile ;
					}else{
						_this.$toast(result.msg) ;
					}
					
				})
			},
			submit(){
				let _this = this ;
				if(_this.dataMsg.firstLinkMan == ""||_this.dataMsg.firstLinkMan == null){
					_this.$toast("请填写第一联系人姓名") ;
					return false ;
				}
				if(_this.dataMsg.firstRelation == "请选择"||_this.dataMsg.firstRelation == "请选择"){
					_this.$toast("请选择与第一联系人关系") ;
					return false ;
				}
				if(!_this.$fn.checkModile(_this.dataMsg.firstLinkManMobile)){
					_this.$toast('请正确填写第一联系人手机号码')
					return false ;
				}
				if(_this.dataMsg.secondLinkMan == ""||_this.dataMsg.secondLinkMan == null){
					_this.$toast("请填写第二联系人姓名") ;
					return false ;
				}
				if(_this.dataMsg.secondRelation == "请选择"||_this.dataMsg.secondRelation == "请选择"){
					_this.$toast("请选择与第二联系人关系") ;
					return false ;
				}
				if(!_this.$fn.checkModile(_this.dataMsg.secondLinkManMobile)){
					_this.$toast('请正确填写第二联系人手机号码')
					return false ;
				}
				let params = _this.dataMsg ;
				_this.$post(_this.$API.POST_CONTACT_MSG_SUBMIT,params)
				.then((result) => {
					if(result.result == "success"){
						if(_this.$route.query.direction){	//用来判断是从贷款页面跳转过来，还是我的信息里跳转过来的
							_this.$router.push({
								path:"/shopInfo",	//店铺信息
								query: { 
									"flag": _this.$route.query.flag ,
									"direction": true 
								}
							}) ;
						}else{
							_this.$router.push({
								path:"/myAccount",	//我的账户
							}) ;
						}
					}else{
						_this.$toast(result.msg) ;
					}
				})
			}
        },
		created () {
			this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
			this.init() ;
		}
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>