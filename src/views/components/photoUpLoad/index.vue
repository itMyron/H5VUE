<template>
    <div class="clear">
        <div class="modelWrap" v-if="show" >
			<div class="wrap"></div>
			<div class="box">
				<span @click="close()">x</span>
				<img class="img1" :src="photo" />
				<p></p>
			</div>
		</div>
		<p class="news news1" >
			<img :src="photo" v-if="photo" />
		</p>
		<div class="news news2 clear">
			<p class="list list1">
				<input  type="file" @change="upload($event)" />
			</p>
			<p class="list list2">
				修改
				<input type="file" @change="upload($event)" />
			</p>
			<p class="list list3" @click="review()">
				查看
			</p>
		</div>
    </div>
</template>
<script>
import API from "@/config/api";
export default {
    data(){
        return{
			show:false,
			token:"",
        }
    },
    props: {
			"photo":{
				type:String,		//Array,Boolean,Number
				default:false
			}
	    },
    methods:{
        close(){
            let _this = this ;
			_this.show = false ;
        },
        init(){
            //ESC关闭模态框
            let _this = this ;
           _this.token = sessionStorage.getItem('myron');
		},
		review(){
			this.show = true ;
		},
		upload(e,index){
			let file = e.target.files[0];
			let _this = this ;
			this.sign = index ;
			if(file){
				let formData = new FormData();
				//限制上传图片大小
				if(file.size>5*1024*1024) {
					
				}else{   
					//formData.append("fileImg", file); 
				}
				formData.append("fileImg", file); 
				let xhr = new XMLHttpRequest();
				xhr.open("post",API.POST_IMG+"?token="+this.token, true);
				xhr.send(formData);
				xhr.onload = function() {
					var str = xhr.responseText;
					var result = JSON.parse(str);
					if(result.result == "success") {
						console.log(result) ;
						let imgUrl = result.data.showUrl + result.data.fileName ;
                        _this.photo = imgUrl ;
                        _this.$emit("postPhoto",result.data.fileName) ;

					}
				};  
			}  //end --if
		}, 
    },
    created(){
        this.init() ;
    }
}
</script>
<style lang="scss" scoped type="text/css">
	.modelWrap{
		.wrap{
			position: fixed ;
			left: 0;
			right: 0;
			top:0;
			bottom: 0;
			background: #000000;
			z-index:11111;
			opacity: 1;
		}
		.box{
            top:150px;
            left: 0;
            position: fixed ;
			opacity: 1;
            z-index: 99999 ;
			background: #ffffff ;
			text-align: center;
			max-height: 100%;
			width: 100%;
			span{
				position: fixed ;
				top:10px;
				right:10px;
				color: #ffffff;
				border: 1px solid #fff;
				padding: 5PX;
				width:14PX;
				text-align: center;
				height: 14PX;
				line-height: 10PX;
				border-radius: 100% ;
				font-size: 22PX;
				opacity: 1;
			}
			img{
				display: inline-block;
  				max-height: 1200px;
  				max-width: 100%;
			}
		}
	}
	.news1{
		width: 100%;
		height: 180px;
        margin-bottom: 10px;
        border: 1PX solid #ccc ;
		img{
			width: 100%;
			height: 180px;
		}
	}
	.news2{
        width: 100%;
        padding: 5px 0 ;
		.list{
			position: relative;
			width: 70px;
			text-align: center ;
			height: 50px;
			line-height: 50px;
			display: inline-block ;
			float: left ;
			border: 1PX solid #000000 ;
			border-radius: 5PX ;
			margin:0 12px;
            color: #000333;
            font-size: 14px;
			input{
				position: absolute ;
				width: 100% ;
				height: 100%;
				opacity: 0 ;
				left: 0 ;
				top:0 ;
			}
		}
		.list1{
			background:url(../../../assets/info/basicInfo/camera.jpg) no-repeat center ;
			background-size: 75% ;
		}
	}
</style>

