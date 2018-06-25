<template>
    <div class="contain" :style="{height:height+'px'}">
		<header class="header"></header>
		<section class="section">
			<article  class="news1 news clear" v-if="isShow" @click="addBankCard()">
				+ 添加银行卡
			</article>
			<div id="boxWrap" v-if="!isShow">
				<div class="wrap">
					<article class="news2 news clear " id="cardInfo">
						<!-- <div class="list1 list clear " style="opacity: 0;"></div> -->
						<div class="list2 list clear ">
							<div id="box">
								<p class="top">{{bankName}}(帐号{{cardNo}})</p>
								<p class="bottom">限额：单笔5万元，单日万元，单月不限</p>
							</div>
						</div>
					</article>
				</div>
			</div>
			<article class="news3 news clear " v-if="!isShow" @click="relieve()">解除绑定</article>
		</section>
    </div>
</template>
<script>
export default{
	data(){
		return{
			height:"",
			isShow:true ,
			bankName:"***" ,
			cardNo:"***" ,
			payCode:"" ,
		}
	},
	methods:{
		//页面信息初始化
			init(){
				let _this = this ;
				_this.$fetch(_this.$API.GET_BANK_LIST)
				.then((result) => {
					if(result.result == "success"){
						if(result.data.length == 0){
							console.log("我是1")
							_this.getPayCode();
							_this.isShow = true ;
						}else{
							_this.isShow = false ;
							_this.bankName = result.data[0].bankName ;
							_this.cardNo = result.data[0].cardNo ;
						}
					}else{
						_this.$toast(result.msg) ;
					}
				})
			},
			getPayCode(){
				console.log("进来了")
				let _this = this ;
				_this.$fetch(_this.$API.GET_PAY_CODE)
				.then((result) => {
					if(result.result == "success"){
						_this.payCode = result.data.payCode ;
					}else{
						_this.$toast(result.msg) ;
					}
				})
			},
			addBankCard(){
				let _this = this
				switch (_this.payCode) {
					case "104":	//中金绑卡
						_this.$router.push({
							path:"/bindcardsZJ",	//我的账户
						}) ;
						break;
				
					
				}
			},
			relieve(){
				this.$toast("请联系客服人员") ;
			}
	},
	created () {
		this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
		this.init() ;
		
	},
}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>


