<template>
	<div class="contain">
		<header class="header"></header>
		<section class="section">
			<article class="news clear" v-for="(item,index) in pageData" :key="index">
				<p class="title" v-html="item.question" @click="handleFold(index)"></p>
				<div class="content" v-html="item.answer" v-show="item.show"></div>
			</article> 
		</section>
	</div>	
</template> 
<script type="text/javascript">
let pageData=[
    {
        question:"鑫火云贷流水贷贷款申请条件是什么？",
        answer:"有实体营业满一年的个体商户或是企业,没有工商税务行政处罚记录的.",
        show:false
    },
    {
        question:"我可以申请到多少钱?",
        answer:"鑫火云贷目前可申请的常规额度是5万到50万.经过SAAS系统您的授权,我们会自动分析您店铺状况给出可预计贷款金额.多个店铺可叠加额度,可以放大到200万左右，银行会根据鑫火云贷的预贷款金额审批贷款.",
        show:false
    },
    {
        question:"我可以多久拿到钱?",
        answer:"通常5个工作日.",
        show:false
    },
    {
        question:"鑫火云贷是如何分配银行的?",
        answer:"提交申请后,鑫火云贷根据您所居住的城市及店铺数据分析匹配相应的银行,若对匹配的结果有疑问可咨询客服.",
        show:false
    },
    {
        question:"鑫火云贷的贷款是如何放款的?",
        answer:"您在鑫火云贷的贷款申请成功后,申请人可以主动预约银行,到指定的银行网点进行签约放款（或由银行直接线上开户，并快递银行卡给您）.放款时会开立相应银行的银行卡,授信的金额会在开立的银行卡中.",
        show:false
    },
    {
        question:"鑫火云贷的贷款如何还款付息?",
        answer:"您还款时可以通过转账的方式，向贷款的银行卡账户存钱,银行会定期进行还款付息.还款放还是有两种：随借随贷，按月还息到期还本。 ",
        show:false
    },
    {
        question:"我已经申请贷款,能否再申请?",
        answer:"按照银行信贷规则,信用贷款可以多次申请,如果申请人已经申请到一家银行的贷款,可以再次申请其他家银行的信用贷款.",
        show:false
    },
    {
        question:"预计贷款金额和最终审批金额为何不同?",
        answer:"鑫火云贷的预计贷款金额是根据您的实际店铺经营数据由模型测算出来的,该额度是系统认为您的店铺可申请的贷款额度,最终银行审批的金额会由您所在的地区,个人负债情况与系统计算的额度有所差异.",
        show:false
    },
    {
        question:"鑫火云贷如何收费?利息如何算?",
        answer:"薪火是贷款咨询和服务机构，会在放款前收取一定比例的服务费。目前是优惠期，暂时（2017年6月之前）收取1.5%年化利率；后续还会有类似优惠活动，敬请期待。",
        show:false
    },
    {
        question:"拒绝原因：信用评分不足，短期内无法获批，是什么意思?",
        answer:"提示：“信用评分不足，短期内无法获批”是因为店铺经营数据或者个人信用方面存在一些问题而导致无法申请鑫火云贷的贷款.",
        show:false
    },
    {
        question:"有其他贷款,能否申请鑫火云贷的贷款?",
        answer:"可以,具体规则联系我们的客服人员,号码是<br /> <a href='tel:0571-85890982' style='color: #ff5b00;'>0571-85890982</a>",
        show:false
    },
    {
        question:"什么是征信授权书?",
        answer:"银行只有获得您的书面授权（后续会根据银行情况完善线上授权）后,才能查询您的个人征信报告或企业征信报告,并结合此报告为您评估出最终授权结果.",
        show:false
    },
    {
        question:"如何联系我们的客服?",
        answer:"亲,有任何问题都可联系我们客服电话<br /> <a href='tel:0571-85890982' style='color: #ff5b00;'>0571-85890982</a><br />工作时间:10:00-18:00",
        show:false
    },
]
export default{
    data(){
        return{
            pageData
        }
    },
    methods: {
        handleFold(index){
            this.pageData.map((v,i)=>{
                if(i==index){
                    v.show=!v.show;
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped type="text/css"> 
      @import "./index.scss";
</style>