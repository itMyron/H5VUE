<template>
	<div>
		<mt-actionsheet
		  	:actions="actions"
		  	v-model="sheetVisible">
		</mt-actionsheet>	
		<p>{{sheetVisible}}</p>
	</div>
  
</template>  
<script>
	import { Actionsheet } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				actions : [
					{
						name : '我们' ,
						method : this.fn ,
						key : 'A001'
					},
					{
						name : '你们' ,
						method : this.fn ,
						key : 'A002'
					}
				],
				sheetVisible : ""
			}
		},
		methods:{
			fn(actions,index){
				console.log(key,index)
			},
			init(){
				MessageBox.alert('操作成功').then(action => {
				  	console.log("点击确定")
				});
			}
		},
		created(){
			this.init();
		},
	
	}
	
</script>
<style lang="scss" scoped type="text/css">

</style>