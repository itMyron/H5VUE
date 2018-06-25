<template>
	<div class="contain" :style="{height:height+'px'}">
		<article class="news1 news clear"  v-show="isShow == 1">
			<p class="notice">我的店铺列表</p>
			<div class="shopList">
				<p class="list1 list clear" v-for="key in shopList" @click="shopDetails(key.saasId,key.shopNo)">
					<font>{{key.shopName}}</font>	
					<b style="color: #CCCCCC;float: right;">></b>
				</p>
			</div>	
			<p class="relative" @click="addShop()">+&nbsp;关联店铺</p>
		</article>

		<article class="news2 news clear" v-show="isShow == 2">
			<p class="notice">请选择产品类型</p>
			<div class="saasList">
				<mt-radio
					v-model="prodectValue"
					:options="prodectList">
				</mt-radio>
			</div>
			<div class="btnWrap">
				<p class="btn" @click="pre()">上一步</p>
				<p class="btn" @click="next()">下一步</p>
			</div>
		</article>
		<article class="news3 news clear" v-show="isShow == 3">
			<p class="notice">请选择SaaS平台授权</p>
			<div class="saasList">
				<mt-radio
					v-model="SaaSValue"
					:options="SaaSList">
				</mt-radio>
			</div>
			<div class="btnWrap">
				<p class="confirm" @click="confirm()">确定</p>
			</div>
		</article>
	</div>
</template>
<script type="text/javascript">
	import { Radio } from 'mint-ui';
	export default{
		components:{
			
		},
		data(){
			return{
				height:"" ,
				isShow:1 ,
				shopList:[] ,
				prodectValue :"",
				prodectList:[
					{
						label:'供应链贷',
						value:'1'
					},
					{
						label:'流水贷',
						value:'2'
					}
				],
				SaaSValue :"",
				SaaSList:[],

			}
		},
		
		methods: {
			//页面初始化
			init(){
				let _this = this ;
				_this.$fetch(_this.$API.GET_SHOP_LIST) 
				.then((result) => {
					console.log(result)
					if(result.result == "success"){
						_this.shopList = result.data ;
					}else{
						_this.$toast(result.msg) ;
					}
				})
			},
			//点击查看店铺详情
			shopDetails(saasId,shopNo){
				console.log(saasId) ;
				console.log(shopNo) ;
				this.$router.push({
					path:"/shopInfo",	//查看店铺详情
					query: { 
						"saasId": saasId ,
						"shopNo": shopNo
					}
				}) ;
			},
			//点击添加店铺按钮
			addShop(){
				this.isShow = 2 ;	
			},
			//点击上一步
			pre(){
				this.isShow = 1 ;	
			},
			//点击下一步
			next(){
				let _this = this ;
				if( _this.prodectValue ){
					let params={
							type : _this.prodectValue 
						}
					_this.$post(_this.$API.GET_SAAS_LIST,params)
					.then((result) => {
						if(result.result == "success"){
							this.isShow = 3 ;
							let saasList = result.data.saasList ;
							for(let i = 0 ; i < saasList.length ; i ++){
								let item = {
									label: saasList[i].saasName ,
									value: saasList[i].saasId
								}
								_this.SaaSList.push(item)
							}
							console.log(_this.SaaSList)
						}else{
							_this.$toast(result.msg) ;
						}
					})
				}else{
					_this.$toast("请选择产品类型") ;
				}
			},
			//选择SAAS平台
			confirm(){
				let _this = this ;
				if(_this.SaaSValue){
					let params={
						saasId : _this.SaaSValue
					}
					_this.$post(_this.$API.POST_SELECT_SAAS,params)
					.then((result) => {
						console.log("去授权")
						console.log(result)
						if(result.result == "success"){
							if(!result.data.isSkip){
								_this.$toast("暂不可添加此店铺") ;
							}else{
								window.location.href = result.data.url ;								
							}
						}else{
							_this.$toast(result.msg) ;
						}
					})
				}else{
					_this.$toast("请选择SaaS平台") ;
				}
				
			}
		},
		created () {
			this.init() ;
			this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
		}
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>