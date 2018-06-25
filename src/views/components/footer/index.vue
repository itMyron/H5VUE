<template>
	<div id="footerWrap" v-show="isShow">
		<footer id="footer">
			<p :class="['home_1',index==1?'home':'']" @click="tab(1)">
				<span></span>
				<a>首页</a>
			</p>
			<p :class="['loan_1',index==2?'loan':'']" @click="tab(2)">
				<span></span>
				<a>贷款</a>
			</p>
			<p :class="['find_1',index==3?'find':'']" @click="tab(3)">
				<span></span>
				<a>发现</a>
			</p>
			<p :class="['mine_1',index==4?'mine':'']"  @click="tab(4)">
				<span></span>
				<a>我的</a>
			</p>
		</footer>
	</div>	
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				isShow : true ,
				index : "1"
			}
		},
		methods: {
			tab(index){
				let _this = this ;
				_this.index = index ;
				switch (index) {
					case 1:
						_this.$router.push({
							path:"/index",
						}) ;
						break;
					case 2:
						_this.$router.push({
							path:"/loan",
							query:{
								//id:1,
								//name:"myron"
							}
						}) ;
						break;
					case 3:
						_this.$router.push({
							path:"/find",
						}) ;
						break;
					case 4:
						_this.$router.push({
							path:"/user",
							title:"我的",
							query:{
								
							}
						}) ;
						break;
				}
			}
		},
		created () {
			let key = sessionStorage.getItem('index');
			let flag = sessionStorage.getItem('flag');
			if(key){
				this.index = key ;
			}
			if(flag == true){
				this.isShow = true
			}else{
				this.isShow = false
			}
		},
		watch: {
	        $route(to) {
				sessionStorage.setItem('index', this.index);
				if(to.meta.isFooter == true){
					this.isShow = true ;
					this.index = to.meta.item ;
				}else{
					this.isShow = false ;
				}
				sessionStorage.setItem('flag', this.isShow);
				if(to.path == "/index"){
					this.index = 1 ;
				}
				if(to.path == "/loan"){
					this.index = 2 ;
				}
				if(to.path == "/find"){
					this.index = 3 ;
				}
				if(to.path == "/user"){
					this.index = 4 ;
				}
	        }
    	}
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>