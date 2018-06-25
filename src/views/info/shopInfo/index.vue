<template>
  	<div class="contain">
			<header class="header">
				<p>以下均为必填项</p>
			</header>
			<section id="section">
				<article class="news1 news">
					<p class="list1 list clear">
						<span><font>店铺名称</font></span>
						<input type="text" v-model="shopData.storeName" placeholder="请输入店铺名称" />
					</p>
					<div class="list2 list clear">
						<span><font>店铺地址</font></span>
						<div>
							<v-distpicker :province="shopData.storeProvince" :city="shopData.storeCity" :area="shopData.storeArea" @province="selectProvince" @city="selectCity" @area="selectArea"></v-distpicker>
						</div>
					</div>
					<div class="list3 list clear">
						<span><font>店铺详细地址</font></span>
						<p><input type="text" v-model="shopData.storeAddress" placeholder="请输入详细店铺地址" /></p>
					</div>
					<p class="list4 list clear">
						<span><font>单店年销售额</font></span>
						<input type="text" v-model="shopData.storeYearSale" placeholder="请输入年销售额" onkeyup="value=value.replace(/[^\d.]/g,'')" />
						<b>元</b>
					</p>
					<p class="list5 list clear">
						<span><font>单店月房租</font></span>
						<input type="text" v-model="shopData.storeMonthRent" placeholder="请输入月房租" onkeyup="value=value.replace(/[^\d.]/g,'')" />
						<b>元</b>
					</p>
					<p class="list6 list clear">
						<span><font>单月水电费用</font></span>
						<input type="text" v-model="shopData.monthForWaterAndElectric" placeholder="请输入单月水电费用" onkeyup="value=value.replace(/[^\d.]/g,'')" />
						<b>元</b>
					</p>
					<p class="list7 list clear">
						<span><font>单月员工工资</font></span>
						<input type="text" v-model="shopData.monthForWages"  placeholder="请输入单月员工工资" onkeyup="value=value.replace(/[^\d.]/g,'')" />
						<b>元</b>
					</p>
					
					<p class="list8 list clear" style="border: none;">
						<span><font>食材占比</font></span>
						<input type="text" v-model="shopData.percentage" placeholder="请输入食材占比" onkeyup="value=value.replace(/[^\d.]/g,'')" />
						<b>(%)</b>
					</p>
				</article>
				<article class="news2 news">
					<div class="list list1 clear">
						<span><font>工商字号名称或者公司名称</font></span>
						<p>
							<input type="text" v-model="shopData.commercialNames" placeholder="请输入工商字号名称或者公司名称" />
						</p>
					</div>
					<div class="list list2 clear">
						<span><font>经营者或者法人名称</font></span>
						<p>
							<input type="text" v-model="shopData.storeProprietor" placeholder="请输入经营者或者法人名称" /> 
						</p>
					</div>
					<div class="list list3 clear">
						<div style="float:left;">
							<p class="title">营业执照拍照上传</p>
							<div class="photoList photoList1 clear">
								<storeLicensePhoto :photo = "storeLicensePhoto" @postPhoto = "getStoreLicensePhoto" />
							</div>
						</div>
						<div style="float:right;">
							<p class="title">经营者身份证拍照上传</p>
							<div class="photoList photoList2 clear">
								<idcardFrontoPhoto :photo = "idcardFrontoPhoto" @postPhoto = "getIdcardFrontoPhoto" />
							</div>
						</div>		
					</div>
				</article>
				<article class="news3 news">
					<div class="list5 list clear">
						<span>租赁合同拍照上传</span>
						<font class="clear">
							* 首页、签章页、其他页（内容包含：租赁方、承租方、租赁地址、期限、付款方式、租金等）,最多上传十张照片
						</font>
						<div class="otherPhotoBox">
							<p class="wrap clear" v-for="(item,index) in listUrl.length">
								<a class="del" @click="del(index)">x</a>
								<input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg;capture=camera"/>
								<img id="otherPhotoList" alt="" :src="listUrl[index]" />
							</p>
							<p id="add" class="wrap clear add">
								<input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg;capture=camera"  @change="upload($event)"/>
								<strong>+</strong>
								<span>添加图片</span>
							</p>
						</div>
					</div>
				</article>
			</section>
			<footer id="footer">
				<p class="btn" @click="submit()">保存</p>
			</footer>
		</div>
</template>
<script>
	import API from "@/config/api";
	import photoLoad from '../../components/photoUpLoad/index';
	import VDistpicker from 'v-distpicker' ;
	let shopData = {
		step : 2 ,
		id : "" ,
		storeName : "" ,
		storeProvince:"",
		storeCity:"",
		storeArea:"",
		storeAddress : "" ,
		storeYearSale : "" ,
		storeMonthRent : "" ,
		monthForWaterAndElectric : "" ,
		monthForWages : "" ,
		percentage : "" ,
		commercialNames : "" ,
		storeProprietor : "" ,
		storeLicensePhoto : "" ,
		idcardFrontoPhoto : "" ,
		otherPhoto : "" ,
		saasId : "" ,
		shopNo : ""
	}	
    export default {
		components:{
			"storeLicensePhoto" : photoLoad ,
			"idcardFrontoPhoto" : photoLoad ,
			VDistpicker
        },
		data(){
			return{
				token:"",
				shopData ,
				listUrl: [] ,
				storeLicensePhoto : "" ,
				idcardFrontoPhoto : "" ,
				otherPhoto : [] ,
			}
		},
		methods: {
			init(){
				let _this = this ;
				_this.shopData.shopNo = _this.$route.query.shopNo ;
				_this.shopData.saasId = _this.$route.query.saasId ;
				let params={
						step : 2 ,
						shopNo : _this.shopData.shopNo ,
						saasId : _this.shopData.saasId 
					}
				_this.$post(_this.$API.GET_SHOP_MSG,params)
				.then((result) => {
					console.log(result)
					if(result.result == "success"){
						let showUrl = result.data.showUrl ;
						_this.showUrl = result.data.showUrl ;
						_this.shopData.id = result.data.id ;
						_this.shopData.storeName = result.data.storeName ;
						_this.shopData.storeProvince = result.data.storeProvince ;
						_this.shopData.storeCity = result.data.storeCity ;
						_this.shopData.storeArea = result.data.storeArea ;
						_this.shopData.storeAddress = result.data.storeAddress ;
						_this.shopData.storeYearSale = result.data.storeYearSale ;
						_this.shopData.storeMonthRent = result.data.storeMonthRent ;
						_this.shopData.monthForWaterAndElectric = result.data.monthForWaterAndElectric ;
						_this.shopData.monthForWages = result.data.monthForWages ;
						_this.shopData.percentage = result.data.percentage ;
						_this.shopData.commercialNames = result.data.commercialNames ;
						_this.shopData.storeProprietor = result.data.storeProprietor ;
						_this.shopData.storeLicensePhoto = result.data.storeLicensePhoto ;
						if(result.data.storeLicensePhoto != null){
							_this.storeLicensePhoto =showUrl + result.data.storeLicensePhoto ;
						}else{
							_this.storeLicensePhoto = '' ;
						}
						_this.shopData.idcardFrontoPhoto = result.data.idcardFrontoPhoto ;
						if(result.data.idcardFrontoPhoto != null){
							_this.idcardFrontoPhoto =showUrl + result.data.idcardFrontoPhoto ;
						}else{
							_this.idcardFrontoPhoto ='' ;
						}
						//_this.shopData.otherPhoto = result.data.otherPhoto ;
						if(result.data.otherPhoto){
							let _otherPhoto = result.data.otherPhoto.split(",") ;
							for(var i = 0 ; i < _otherPhoto.length-1 ; i++){
								_this.listUrl.push(showUrl+_otherPhoto[i].trim());
								_this.otherPhoto.push(_otherPhoto[i].trim());
							}
						}
					}else{
						_this.$toast(result.msg) ;
					}
				})
			},
			upload(e){
				let _this = this ;
                let file = e.target.files[0];
            	if(file){
            		let formData = new FormData();
            		//限制上传图片大小
					if(file.size>5*1024*1024) {
		                
		            }else{   
		                //formData.append("fileImg", file); 
		            }
					formData.append("fileImg", file); 
					let xhr = new XMLHttpRequest();
					//监听图片上传进度 
					//xhr.upload.addEventListener("progress", this.uploadProgress, false); 
					xhr.open("post",API.POST_IMG+"?token="+this.token, true);
					xhr.send(formData);
					xhr.onload = function() {
						var str = xhr.responseText;
						var result = JSON.parse(str);
						console.log(result)
						if(result.result == "success") {
							let imgUrl = result.data.showUrl + result.data.fileName ;
							_this.listUrl.push(imgUrl) ;
							_this.otherPhoto.push(result.data.fileName) ;
						} 
					};
            	}  //end --if
			},
			//接收改变省份
			selectProvince(data){
				this.shopData.storeProvince = data.value ;
			},
			//接收改变市
			selectCity(data){
				this.shopData.storeCity = data.value ;
			},
			//接收改变区域
			selectArea(data){
				this.shopData.storeArea = data.value ;
			},
			//接收营业执照照片
			getStoreLicensePhoto(data){
				this.shopData.storeLicensePhoto = data ;
				this.storeLicensePhoto =this.showUrl+data ;
			},
			//接收法人身份证照
			getIdcardFrontoPhoto(data){
				this.shopData.idcardFrontoPhoto = data ;
				this.idcardFrontoPhoto =this.showUrl+data ;
			},
			del(index){
				this.listUrl.splice(index, 1) ;
				this.otherPhoto.splice(index, 1) ;
			},
			submit(){
				let _this = this ;
				if(_this.shopData.storeName == "" || _this.shopData.storeName ==null){
					_this.$toast("请输入您的店铺名称") ;
					return false ;
				}
				if(_this.shopData.province == "省"||_this.shopData.city == "市"||_this.shopData.area == "区"){
					_this.$toast("请选择您的店铺地址") ;
					return false ;
				}
				if(_this.shopData.storeAddress == "" || _this.shopData.storeAddress ==null){
					_this.$toast("请输入您的店铺详细地址") ;
					return false ;
				}
				if(_this.shopData.storeYearSale == "" || _this.shopData.storeYearSale ==null){
					_this.$toast("请输入您的单店年销售额") ;
					return false ;
				}
				if(_this.shopData.storeMonthRent == "" || _this.shopData.storeMonthRent ==null){
					_this.$toast("请输入您的单店月房租") ;
					return false ;
				}
				if(_this.shopData.monthForWaterAndElectric == "" || _this.shopData.monthForWaterAndElectric ==null){
					_this.$toast("请输入您的店铺单月水电费") ;
					return false ;
				}
				if(_this.shopData.monthForWages == "" || _this.shopData.monthForWages ==null){
					_this.$toast("请输入单店员工工资") ;
					return false ;
				}
				if(_this.shopData.percentage == "" || _this.shopData.percentage ==null){
					_this.$toast("请输入食材占比") ;
					return false ;
				}
				if(_this.shopData.commercialNames == "" || _this.shopData.commercialNames ==null){
					_this.$toast("请输入工商字号名称或者公司名称") ;
					return false ;
				}
				if(_this.shopData.storeProprietor == "" || _this.shopData.storeProprietor ==null){
					_this.$toast("请输入经营者或者法人名称") ;
					return false ;
				}
				if(_this.shopData.storeLicensePhoto == "" || _this.shopData.storeLicensePhoto ==null){
					_this.$toast("请上传营业执照") ;
					return false ;
				}
				if(_this.shopData.idcardFrontoPhoto == "" || _this.shopData.idcardFrontoPhoto ==null){
					_this.$toast("请上传经营者身份证照") ;
					return false ;
				}
				if(_this.otherPhoto.length == 0){
					_this.$toast("请上传租赁合同照") ;
					return false ;
				}
				_this.shopData.otherPhoto = "" ;
				for(var i = 0 ; i < _this.otherPhoto.length ; i++){
					_this.shopData.otherPhoto += _this.otherPhoto[i]+"," ;	
				}
				console.log(_this.otherPhoto.length)
				let params = _this.shopData ;
				_this.$post(_this.$API.POST_SHOP_MSG_SUBMIT,params)
				.then((result) => {
					if(result.result == "success"){
						if(_this.$route.query.direction){	//用来判断是从贷款页面跳转过来，还是我的信息里跳转过来的
							_this.$router.push({
								path:"/loan",	//申请贷款
								query: { 
									"flag": _this.$route.query.flag ,
									"direction": true ,
								}
							}) ;
						}else{
							_this.$router.push({
								path:"/user",	//我的账户
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
