<template>
	<div id="contain">
		<table border="0" cellspacing="0" cellpadding="">
			<tr>
				<th>{{getData.applySection}}</th>
				<th style="border-left: 1px solid #DDDDDD;">{{getData.applySuccess}}</th>
				<th id="btn"><span @click="isLoan(getData.applyFlag)">+</span></th>
			</tr>
			<tr>
				<td>申请贷款(笔)</td>
				<td style="border-left: 1px solid #DDDDDD;">成功贷款(笔)</td>
				<td>申请贷款</td>
			</tr>
		</table>
		<div id="saasList">
			<mt-radio
				v-model="shopValue"
				:options="shopList">
			</mt-radio>
			<div class="btnWrap">
				<p class="btn no" @click="pre()">取消</p>
				<p class="btn confirm" @click="next()">确定</p>
			</div>
		</div>
		<section>
			<aside id="concernsFlag" v-if="!concernsFlag">
				<article>
					<h5>关注鑫火云金融公众号</h5>
					<div>
						为了能够让您及时收到我们贷款审批的结果，请关注<font style="font-weight: 600; color: #FF5001;">鑫火云金融</font>公众号，并通过公众号登录一下您在鑫火云贷注册的账号，完成绑定即可。
					</div>
					<p>
						<textarea id="copy">搜索公众号鑫火云金融或是点击如下地址：https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI3NzU4NTk1Ng==#wechat_redirect关注我们的公众号</textarea>
						<button @click="copy()">去微信黏贴</button>
					</p>
				</article>
			</aside>
			<div class="wrap" v-for="(item,index) in getData.loanList">
				<div class="detail">
					<article class="news news1 clear" style="margin-bottom:0.5rem">
						<p class="list list1 clear">
							<span>贷款状态：</span>
							<strong class="status" style="color:#ff5001;">{{item.applyStateName}}</strong>
							<a class="store right" style = "float:right;">{{item.storeName}}</a>
						</p>
						<p class="list list2 clear" style="text-align: left;">{{item.productName}}</p>
						<div v-if = "item.approveAccount">
							<p class="list list3 clear" style="text-align: center;">审批金额：</p>
							<p class="list list4 clear" style="text-align: center;">{{item.approveAccount}}</p>
						</div>
						<div v-else>
							<p class="list list3 clear" style="text-align: center;">申请金额：</p>
							<p class="list list4 clear" style="text-align: center;">{{item.applyAmount}}</p>
						</div>
					</article>
					<article class="news news2 clear" style="border-bottom: 1px dashed #e1e6ea;padding-bottom:0.2rem">
						<p class="list list1 clear">
							<span>还款方式：</span>
							<a>{{item.productName}}</a>
						</p>
						<p class="list list2 clear">
							<span>申请单号：</span>
							<a>{{item.applyId}}</a>
						</p>
					</article>
				</div>
				<article class="news news3 clear" style="border-bottom: 2PX solid #e1e6ea; margin-buttom = 10px">
					<p class="list list1 clear">
						<span @click="details(item.id,item.status,item.operationStatus,item.refundType)" class="detail" style="padding:0 0 0 10%;">查看详情</span>
						<a class="right">&gt;</a>
						<strong v-if="item.loanFlag" @click="changeLoan()" id="lending1" class="lending" style="padding-left: 35%; color:#ff5001;">可转贷</strong>		
					</p>
				</article>
			</div>
		</section>
		<mt-actionsheet
		  	:actions="actions"
		  	v-model="sheetVisible">
		</mt-actionsheet>	

	</div>
</template>
<script type="text/javascript">
	import API from "@/config/api";
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	import { Radio } from 'mint-ui';
	import { Actionsheet } from 'mint-ui';
	let getData = {
			
	};
	export default{
		data(){
			return{
				getData ,
				shopValue :"",
				shopList:[],
				concernsFlag : true ,
				actions : [],
				sheetVisible : false
			}
		},
		methods: {
			init(){
				let _this = this ;
				_this.$fetch(_this.$API.GET_SUCCESS_MSG)
				.then((result) => {
					if('success' == result.result) {
						console.log(result)
						let obj = result.data
						for(var i = 0 ; i < obj.loanList.length ; i++){
							let status = obj.loanList[i].status ;
							let operationStatus = obj.loanList[i].operationStatus ;
							let statusText = "" ;
							//未审核
							if(status == 0&&operationStatus == 1){
								statusText = "审核中";
							}
							//驳回
							if(status == 0&&operationStatus == 3){
								statusText = "驳回";
							}
							//拒绝
							if(status == 0&&operationStatus == 4){
								statusText = "拒绝";
							}
							//初审中
							if(status == 1){
								statusText = "初审中";
							}
							//复审中
							if(status == 2){
								statusText = "复审中";
							}
							//审核通过
							if(status == 3){
								statusText = "审核通过";
							}
							//居间费待付
							if(status == 4&&operationStatus == 6){
								statusText = "居间费待付";
							}
							//居间费已付
							if(status == 4&&operationStatus == 7){
								statusText = "居间费已付";
							}
							//居间费退款中
							if(operationStatus == 8){
								statusText = "居间费退款中";
							}
							//居间费退款成功
							if(operationStatus == 9){
								statusText = "居间费退款成功";
							}
							//放款
							if(status == 5&&operationStatus == 5){
								statusText = "放款";
							}
							//已还款
							if(status == 5&&operationStatus == 10){
								statusText = "已还款";
							}
							obj.loanList[i].applyStateName = statusText ;
						}
						_this.concernsFlag = obj.concernsFlag ;
						_this.getData = obj ;
					}else{
							_this.$toast(result.msg)
						}
					
					
				})
			},
			copy(){
				console.log("开始复制")
				var url = document.getElementById("copy");
					console.log(url.select())
					document.execCommand("copy");
					Toast('复制成功！');
			},
			checkShop(actions){
				sessionStorage.setItem('sn', actions.shopNo);
				sessionStorage.setItem('si', actions.saasId);
				this.$router.push({
					path:"/loan",	
				}) ;
			},
			isLoan(key){
				let _this = this ;
				let applyFlag = _this.getData.applyFlag ;
				const params = {
					wayType : 1
				};
				if(applyFlag){
					_this.$post(_this.$API.GET_SUCCESS_LOAN,params)
					.then((result) => {
						console.log(result)	
						if(result.result == "success"){
							let shopList = result.data ;
							if(shopList.length > 0){
								_this.actions = [] ;
								_this.sheetVisible = true ;
								for(let i = 0 ; i < shopList.length ; i ++){
									let item = {
										name: shopList[i].shopName ,
										saasId: shopList[i].saasId ,
										shopNo: shopList[i].shopNo ,
										method: _this.checkShop
									}
									_this.actions.push(item) ;
								} 
							}else{
								MessageBox.confirm('您还没有关联新店铺,请关联您的新店铺').then(action => {
									_this.$router.push({
										path:"/shopList",	
									}) ;
								},() => {
										//取消按钮
								});
							}
						}else{
							_this.$toast(result.msg)
						}
					})	
				}else{
					MessageBox.confirm('您还没有关联新店铺,请关联您的新店铺').then(action => {
						_this.$router.push({
							path:"/shopList",	
						}) ;
					},() => {
							//取消按钮
					});
				} 
				
			},
			changeLoan(){
				MessageBox.confirm('因您本次贷款的信用良好，可申请转贷的业务','可转贷申请?').then(action => {
					Toast('转贷成功！');
				},() => {
							//取消按钮
						});
			},
			details(id,a,b,c){
				console.log(a,b,c)
				let _this = this ;
				if((a == 5&&b == 5)||(a == 5&&b == 10)){
					switch(c){
						case 1 : 
								_this.$router.push({	//银行资金方
									path:"/RepayYinHang",
									query: { "loanId": id }	
								}) ;
								break ;
						case 2 : 
								_this.$router.push({	//瀚华资金方
									path:"/RepayHanHua",
									query: { "loanId": id }	
								}) ;
								break ;
					}
				}else{
					_this.$router.push({
						path:"/loanDetail",
						query: { "loanId": id }	
					}) ;
				}
				
			}
        },
		created () {
			this.init()
		}

	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>