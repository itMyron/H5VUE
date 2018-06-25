<template>
  <div id="app">
    <router-view class="sectionBody clear" :backOff="backOff" />
    <bmp-footer />
  </div>
</template>
<script>
import Footer from '@/views/components/footer';
export default {
  	components:{
	  		'bmp-footer':Footer
		},
		data(){  
		    return{  
		        backOff:''  
		    }  
	  },  
		watch: {
		  	'$route' (to, from) {
		  		//console.log("来自于哪儿1：",to)
		  		//console.log("来自于哪儿2：",from)
			    	this.backOff = from.path ;
		  	}
		}
}
</script>
