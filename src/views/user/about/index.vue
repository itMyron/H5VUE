<template>
	<div class="contain">
		<header class="header"></header>
		<section class="section">
			<article class="news1 news clear" >
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;鑫火云贷是公司主体作为贷款居间服务商，上游资金方接入各银行等金融机构，下游客户方接入各个行业Saas平台的小微企业，
				通过获得目标群体的日常经营流水及相关数据，建立风控模型，简化借贷流程，帮助小微企业贷款。
			</article>
			<article class="news2 news clear" >
				<p><strong>公司地址：</strong></p>
				<p>浙江省拱墅区教工路552号二维火科技大厦403</p>
			</article>
			<article class="news3 news clear" >
				<div class="Ditumap">  
					<div id="BaiduDitu"></div>
				</div>
				<div class="panel panel-default">
					<div id="allmap"></div>
				</div>
			</article>
		</section>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
								
			}
		},
		methods:{
			//百度地图
				initMap(){
				    this.createMap();//创建地图
				    this.setMapEvent();//设置地图事件
				},
				 createMap(){
				    var map = new BMap.Map("BaiduDitu");//在百度地图容器中创建一个地图
				    map.centerAndZoom('杭州',11);//设定地图的中心点和坐标并将地图显示在地图容器中
				    window.map = map;//将map变量存储在全局
				},
				//地图事件设置函数：
				 setMapEvent(){
				    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
				    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
				    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
				    map.enableKeyboard();//启用键盘上下左右键移动地图
				},
		},
		mounted(){
			this.initMap();//创建和初始化地图
			 
		},
	}

</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>