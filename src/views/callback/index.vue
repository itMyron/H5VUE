<template>
  	<span id="add">
  		
  	</span>
</template>
<script>
	import { Indicator } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		data(){
			return{
				url : "" ,
				height : ''
			}
		},
		methods:{
			init(){
				let _this = this ;
				console.log("token:",_this.$route.query.token)
					let params = {
						sign: _this.$route.query.sign,
						entityCode: _this.$route.query.entityCode,
						entityId: _this.$route.query.entityId,
						callback: _this.$route.query.token,
						timestamp: _this.$route.query.timestamp
					}
					_this.$post(_this.$API.POST_AUTHORIZE_CALLBACK,params)
					.then((result) => {
						Indicator.close();
						if(result.result == "success"){
							sessionStorage.setItem('sn', _this.$route.query.entityId);
							sessionStorage.setItem('si', "A001");
							_this.$router.push({
								path:"/loan",
								query:{
									shopNo : _this.$route.query.entityId ,
									saasId : "A001"
								}
							})
						}else{
							MessageBox.alert(result.msg).then(action => {
								 _this.$router.push({
									path:"/shopList",
								});
							});
						}
					})
			},
			
		},
		created () {
			this.init() ;
			Indicator.open({
			  	text: '加载中...',
			  	spinnerType: 'fading-circle'
			});
		},
	}
</script>
