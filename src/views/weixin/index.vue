<template>
	
</template>
<script>
	import API from "@/config/api";
	export default {
		data(){
			return{
				token:""	
			}
		},
		methods:{
			init(){
				let _this = this ;
				let xhr = new XMLHttpRequest();
				xhr.open("post",API.POST_WEI_XIN,true);
				xhr.send();
				xhr.onload = function() {
					var str = xhr.responseText;
					var result = JSON.parse(str);
					if(result.result == "success") {
						var url = result.data ;
						window.location.href = url ;
					}
				};  
			},
			

		},
		created () {
			//this.token = this.$route.query.token ;
			this.init() ;
		}
		
	
	}
</script>
