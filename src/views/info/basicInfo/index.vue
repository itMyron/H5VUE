<template>
  <div class="contain">
		<header class="header">
			<p>以下均为必填项</p>
		</header>
		<section class="section">
			<article class="personal news news1">
				<p class="list userName clear">
					<span><font>姓名</font></span>
					<input type="text" v-model="baseData.userName" placeholder="请输入姓名" />
				</p>
				<p class="list phoneNum clear">
					<span><font>手机号码</font></span>
					<input type="text" v-model="baseData.userMobile" readonly placeholder="请输入手机号码" onkeyup="value=value.replace(/[^\d]/g,'')" />
				</p>
				<p class="list userName clear">
					<span><font>身份证号码</font></span>
					<input type="text" v-model="baseData.idcardNo" placeholder="请输入身份证号码" />
				</p>
				<p class="list clear">
					<span><font>银行卡号</font></span>
					<input type="text" v-model="baseData.bankCard" placeholder="请输入银行卡号" />
				</p>
				<p class="list clear" style="border: none;">
					<span><font>银行名称</font></span>
					<select v-model="baseData.bankName">
						<option v-for="key in bankList" :value="key">{{key}}</option>
					</select> 
				</p>
				
			</article>
			<article class="family news news2">
				<div class="address list1 list clear">
					<p><span><font>居住地址</font></span></p>
					<div>
						<v-distpicker :province="baseData.province" :city="baseData.city" :area="baseData.area" @province="selectProvince" @city="selectCity" @area="selectArea"></v-distpicker>
					</div>
				</div>
				<div class="detailedAddress list2 list clear">
					<p><span><font>详细地址</font></span></p>
					<p><input type="text" v-model="baseData.detailAddress" placeholder="请输入详细地址" /></p>
				</div>
				<div class="marriageState list3 list clear">
					<p>
						<span><font>婚姻状况</font></span>
						<select v-model="baseData.marryType">
							<option value="0">请选择</option>
							<option value="1">已婚</option>
							<option value="2">未婚</option>
							<option value="3">离异</option>
							<option value="4">丧偶</option>
						</select>
					</p>
				</div>
				<div class="children list4 list clear" style="border: none;">
					<p>
						<span><font>有无子女</font></span>
						<select v-model="baseData.boolenChildren">
							<option value="0">请选择</option>
							<option value="1">有</option>
							<option value="2">无</option>
						</select>
					</p>
				</div>
			</article>
			<article class="upload news news3 clear">
				<p class="title">身份证拍照上传</p>
				<div class="photoList photoList1 clear">
					<cardFrontPhoto :photo = "cardFrontPhoto" @postPhoto = "getCardFrontPhoto" />
				</div>
				<div class="photoList photoList2 clear">
					<cardBackPhoto :photo = "cardBackPhoto" @postPhoto = "getCardBackPhoto" />
				</div>
			</article>
			<article class="upload news news4 clear" >
				<div style="float:left;">
					<p class="title">申请人正面免冠半身照</p>
					<div class="photoList photoList3 clear">
						<papersPhoto :photo = "papersPhoto" @postPhoto = "getPapersPhoto" />
					</div>
				</div>
				<div style="float:right;">
					<p class="title">申请人与店铺门头合照</p>
					<div class="photoList photoList4 clear">
						<selfShopPhoto :photo = "selfShopPhoto" @postPhoto = "getSelfShopPhoto" />
					</div>
				</div>	
			</article>
		</section>
		<footer class="footer">
			<p class="btn" @click="submit()">提交</p>
		</footer>
	</div>
</template>
<script>
	import VDistpicker from 'v-distpicker' ;
	import photoLoad from '../../components/photoUpLoad/index';	
	let bankList = [					//瀚华对接的银行
									"中国银行",
									"工商银行",
									"建设银行",
									"农业银行",
									"光大银行",
									"中信银行",
									"平安银行",
									"邮储银行",
									"交通银行",
									"兴业银行",
									"广发银行",
									"浙商银行",
									"浦发银行",
									"上海银行",
									"南京银行"
									];
	let baseData = {
		step : 1 ,
		userName : "" ,
		userMobile : "" ,
		idcardNo : "" ,
		bankCard : "" ,
		bankName : "" ,
		province : "" ,
		city : "" ,
		area : "" ,
		detailAddress : "" ,
		marryType : "0" ,
		boolenChildren : "0" ,
		cardFrontPhoto : "" ,
		cardBackPhoto : "" ,
		papersPhoto : "" ,
		selfShopPhoto : "" ,
	}
  export default {
		components:{
			"cardFrontPhoto" : photoLoad ,
			"cardBackPhoto" : photoLoad ,
			"papersPhoto" : photoLoad ,
			"selfShopPhoto" : photoLoad ,
			VDistpicker
        },
		data(){
			return{
				direction:"",	
				bankList ,
				baseData ,
				cardFrontPhoto : "" ,
				cardBackPhoto : "" ,
				papersPhoto : "" ,
				selfShopPhoto : "" ,
			}
		},
		methods: {
			//页面信息初始化
			init(){
				let _this = this ;
				let params={
						step : 1
					}
				_this.$post(_this.$API.GET_BASE_MSG,params)
				.then((result) => {
					console.log(result)
					if(result.result == "success"){
						let showUrl = result.data.showUrl ;
						_this.baseData.userName = result.data.userName ;
						_this.baseData.idcardNo = result.data.idcardNo ;
						_this.baseData.userMobile = result.data.mobilePhone ;
						_this.baseData.bankCard = result.data.bankCard ;
						_this.baseData.bankName = result.data.bankName ;
						_this.baseData.province = result.data.province ;
						_this.baseData.city = result.data.city ;
						_this.baseData.area = result.data.area ;
						_this.baseData.detailAddress = result.data.detailAddress ;
						_this.baseData.marryType = result.data.marryType ;
						_this.baseData.boolenChildren = result.data.boolenChildren ;
						_this.baseData.cardFrontPhoto =result.data.cardFrontPhoto ;
						if(result.data.cardFrontPhoto != null){
							_this.cardFrontPhoto =showUrl + result.data.cardFrontPhoto ;
						}else{
							_this.cardFrontPhoto = "" ;
						}
						_this.baseData.cardBackPhoto = result.data.cardBackPhoto ;
						if(result.data.cardBackPhoto != null){
							_this.cardBackPhoto =showUrl + result.data.cardBackPhoto ;
						}else{
							_this.cardBackPhoto = '' ;
						}
						_this.baseData.papersPhoto = result.data.papersPhoto ;
						if(result.data.papersPhoto != null){
							_this.papersPhoto = showUrl + result.data.papersPhoto ;
						}else{
							_this.papersPhoto = '' ;
						}
						_this.baseData.selfShopPhoto = result.data.selfShopPhoto ;
						if(result.data.selfShopPhoto !=null){
							_this.selfShopPhoto =showUrl + result.data.selfShopPhoto ;
						}else{
							_this.selfShopPhoto = '' ;
						}
						
						
					}else{
						_this.$toast(result.msg) ;
					}
				})
			},
			//接收改变省份
			selectProvince(data){
				this.baseData.province = data.value ;
			},
			//接收改变市
			selectCity(data){
				this.baseData.city = data.value ;
			},
			//接收改变区域
			selectArea(data){
				this.baseData.area = data.value ;
			},
			//接收身份证正面照
			getCardFrontPhoto(data){
				this.baseData.cardFrontPhoto = data ;
			},
			//接收身份证背面照
			getCardBackPhoto(data){
				this.baseData.cardBackPhoto = data ;
			},
			//接收免冠照
			getPapersPhoto(data){
				this.baseData.papersPhoto = data ;
			},
			//接收门头照
			getSelfShopPhoto(data){
				this.baseData.selfShopPhoto = data ;
			},
			submit(){
				let _this = this ;
				if(_this.baseData.userName == ""||_this.baseData.userName == null){
					_this.$toast("请填写您的姓名") ;
					return false ;
				}
				if(_this.baseData.idcardNo == ""||_this.baseData.idcardNo == null){
					_this.$toast("请填写您的身份证号码") ;
					return false ;
				}
				if(_this.baseData.idcardNo == ""||_this.baseData.idcardNo == null){
					_this.$toast("请填写您的身份证号码") ;
					return false ;
				}
				if(_this.baseData.bankCard == ""||_this.baseData.bankCard == null){
					_this.$toast("请填写您的银行卡号") ;
					return false ;
				}
				if(_this.baseData.bankName == "请选择"){
					_this.$toast("请选择您的银行名称") ;
					return false ;
				}
				if(_this.baseData.province == "省"||_this.baseData.city == "市"||_this.baseData.area == "区"){
					_this.$toast("请选择您的居住地址") ;
					return false ;
				} 
				if(_this.baseData.detailAddress == ""||_this.baseData.detailAddress == null){
					_this.$toast("请填写您的详细地址") ;
					return false ;
				}
				if(_this.baseData.marryType == 0){
					_this.$toast("请选择您的婚姻类型") ;
					return false ;
				}
				if(_this.baseData.boolenChildren == 0){
					_this.$toast("请选择您是否有子女") ;
					return false ;
				}
				if(_this.baseData.cardFrontPhoto == ""||_this.baseData.cardBackPhoto == ""){
					_this.$toast("请上传您的身份证照片") ;
					return false ;
				}
				if(_this.baseData.papersPhoto == ""||_this.baseData.papersPhoto == null){
					_this.$toast("请上传您的正面免冠照") ;
					return false ;
				}
				if(_this.baseData.selfShopPhoto == ""||_this.baseData.selfShopPhoto == null){
					_this.$toast("请上传您与店铺门头合照") ;
					return false ;
				}
				let params = _this.baseData ;
				_this.$post(_this.$API.POST_BASE_MSG_SUBMIT,params)
				.then((result) => {
					if(result.result == "success"){
						if(_this.$route.query.direction){	//用来判断是从贷款页面跳转过来，还是我的信息里跳转过来的
							_this.$router.push({
								path:"/contactInfo",	//联系人信息
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
			},	
		},
    created(){
			this.init();
		},
  }
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>

