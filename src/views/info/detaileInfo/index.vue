<template>
  	<div class="contain" :style="{height:height+'px'}">
		<header class="header">
			<p>以下均为必填项</p>
		</header>
		<section class="section">
			<article class="news1 news">
				<p class="list1 list clear">
					<span><font>最高学历</font></span>
					<select v-model="educationType">
						<option value="0">请选择</option>
						<option value="1">高中及以下</option>
						<option value="2">大专</option>
						<option value="3">本科</option>
						<option value="4">本科及以上</option>
					</select>
				</p>
				<p class="list2 list clear" style="border: none;">
					<span><font>信用状况</font></span>
					<select v-model="creditCardType">
						<option value="0">请选择</option>
						<option value="1">无信用卡或贷款</option>
						<option value="2">信用良好</option>
						<option value="3">1年内逾期少于3次且少于90天</option>
						<option value="4">1年内逾期超过3次或超过90天</option>
					</select>
				</p>
			</article>
			<article class="news2 news">
					<p class="list1 list clear">
						<span><font>是否购车</font></span>
						<select v-model="booleanBuyCar">
							<option value="0">请选择</option>
							<option value="1">无车</option>
							<option value="2">有车 有车贷</option>
							<option value="3">有车 无车贷</option>
						</select>
					</p>
					<div class="list2 list clear driverLicense" v-show="isDrivePhoto">
						<span>行驶证拍照上传</span>
						<div class="license wrap">
							<drivePhoto :photo = "_drivePhoto" @postPhoto = "getDrivePhoto" />
						</div>
					</div>
			</article>
			<article class="news3 news">
				<p class="prompt">
					您提供的资料可以提高您的贷款额度
				</p>
			</article>
			<article class="news2 news">
				<p class="list1 list clear">
					<span><font>房产状况</font></span>
					<select v-model="houseType">
						<option value="0">请选择</option>
						<option value="1">没有房产</option>
						<option value="2">有房 有房贷</option>
						<option value="3">有房 无放贷</option>
					</select>
				</p>
				<div class="list2 list clear hourseLicense" v-show="isHouseCertificatePhoto" >
					<span>房产证拍照上传</span>
					<div class="license wrap">
						<houseCertificatePhoto :photo = "_houseCertificatePhoto" @postPhoto = "getHouseCertificatePhoto" />
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
import photoLoad from '../../components/photoUpLoad/index';
export default {
	components:{
		"drivePhoto" : photoLoad ,
		"houseCertificatePhoto" : photoLoad ,
	},
  	data(){
		return{
			height:"",
			educationType:"0",
			creditCardType:"0",
			booleanBuyCar:"0" ,
			houseType:"0" ,
			drivePhoto:"" ,
			_drivePhoto:"" ,
			houseCertificatePhoto:"" ,
			_houseCertificatePhoto:"" ,
			isDrivePhoto :true ,
			isHouseCertificatePhoto :true ,
		}
	},
	methods:{
		//页面信息初始化
		init(){
			let _this = this ;
			let params={
					step : 3 
				}
			_this.$post(_this.$API.GET_DETAIL_MSG,params)
			.then((result) => {
				console.log(result)
				if(result.result == "success"){
					let showUrl = result.data.showUrl ;
					_this.educationType = result.data.educationType ;
					_this.creditCardType = result.data.creditCardType ;
					_this.booleanBuyCar = result.data.booleanBuyCar ;
					_this.houseType = result.data.houseType ;
					_this.drivePhoto  = result.data.drivePhoto ;	//图片名称
					if(_this.drivePhoto){
						_this._drivePhoto  = showUrl + _this.drivePhoto ;	//存储带url的图片地址
					}
					_this.houseCertificatePhoto  = result.data.houseCertificatePhoto ;
					if(_this.houseCertificatePhoto){
						_this._houseCertificatePhoto  = showUrl + _this.houseCertificatePhoto ;
					}
				}else{
					_this.$toast(result.msg) ;
				}
			})
		},
		//接收驾驶证照片
		getDrivePhoto(data){
			this.drivePhoto = data ;
		},
		//接收房产证照片
		getHouseCertificatePhoto(data){
			this.houseCertificatePhoto = data ;
		},
		submit(){
			let _this = this ;
			if(_this.educationType == 0){
				_this.$toast("请选择最高学历") ;
				return false ;
			}
			if(_this.creditCardType == 0){
				_this.$toast("请选择信用状况") ;
				return false ;
			}
			if(_this.booleanBuyCar == 0){
				_this.$toast("请选择是否购车") ;
				return false ;
			}
			if(_this.booleanBuyCar != 1){
				if(_this.drivePhoto == ""||_this.drivePhoto == ""){
					_this.$toast("请上传您的驾驶证照片") ;
					return false ;
				}
			}else{
				_this.drivePhoto = "" ;
			}
			if(_this.houseType == 0){
				_this.$toast("请选择房产状况") ;
				return false ;
			}
			if(_this.houseType != 1){
				if(_this.houseCertificatePhoto == ""||_this.houseCertificatePhoto == ""){
					_this.$toast("请上传您的房产证照片") ;
					return false ;
				}
			}else{
				console.log("没有房产")
				_this.houseCertificatePhoto = "" ;
			}
			let params={
					step : 3 ,
					educationType: _this.educationType ,
					creditCardType: _this.creditCardType ,
					booleanBuyCar: _this.booleanBuyCar ,
					houseType: _this.houseType ,
					drivePhoto: _this.drivePhoto ,
					houseCertificatePhoto: _this.houseCertificatePhoto ,
				}
			_this.$post(_this.$API.POST_DETAIL_MSG_SUBMIT,params)
			.then((result) => {
				console.log("提交详细信息：",result)
				if(result.result == "success"){
					_this.$router.push({
						path:"/myAccount",	//我的账户
					}) ;
				}else{
					_this.$toast(result.msg) ;
				}
			})	
		}
	},
	created () {
		this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
		this.init() ;
	},
	watch:{
		//监听是否购车
		booleanBuyCar : {
			handler(val,oldVal){
				if(val == 1){
					this.isDrivePhoto = false ;
				}else{
					this.isDrivePhoto = true ;
				}
			},
			deep:true
		},
		//监听房产状况
		houseType :{
			handler(val,oldVal){
				if(val == 1){
					this.isHouseCertificatePhoto = false ;
				}else{
					this.isHouseCertificatePhoto = true ;
				}
			},
			deep:true
		}
	}
}
</script>



<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>
