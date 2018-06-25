import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'             //首页
import Authorize from "@/views/authorize/index"         //授权
import Register from "@/views/register/index"         //注册
import Login from '@/views/login/index'         //登录
import ForgetPassword from '@/views/modify/forgetPassword/index'  //忘记密码
import ModifyPassword from '@/views/modify/modifyPassword/index'  //修改密码  
import ModifyPhone from '@/views/modify/modifyPhone/index'  //修改手机号 
import BasicInfo from '@/views/info/basicInfo/index'  //基本信息
import ContactInfo from '@/views/info/contactInfo/index'  //联系人信息
import DetaileInfo from '@/views/info/detaileInfo/index'  //详细信息
import ShopInfo from '@/views/info/shopInfo/index'  //店铺信息
import Loan from '@/views/loan/loan/index'  //贷款信息
import LoanDetail from '@/views/loan/loanDetail/index'  //贷款详情
import LoanSuccess from '@/views/loan/loanSuccess/index'  //贷款成功
import PayAgencyFeeZJ from '@/views/agencyFee/zhongjin/payAgencyFeeZJ/index'  //支付居间费(中金)
import PayAgencyResultZJ from "@/views/agencyFee/zhongjin/payAgencyResultZJ/index" //支付居间费(中金)结果
import Sign from '@/views/agencyFee/sign/index'  //签约
import ModifySign from "@/views/agencyFee/modifySign/index"  //修改签约
import RepayYinHang from '@/views/repay/yinHang/index'  //还款计划（银行）
import RepayHanHua from '@/views/repay/hanHua/index'  //还款计划（瀚华）
import Find from '@/views/find/index'  //发现
import User from '@/views/user/index'  //我的
import MyAccount from '@/views/user/myAccount/index'  //我的账户
import ShopList from '@/views/user/shopList/index'  //我的店铺列表
import BankCards from '@/views/user/bankCards/index'  //我的银行卡列表
import BindCardsZJ from "@/views/user/bankCards/bindcardsZJ/index" //绑定中金银行
import Record from '@/views/user/record/index'  //交易记录
import RecordDetail from "@/views/user/record/recordDetail/index"//交易详情
import Help from '@/views/user/help/index'  //帮助与反馈
import About from '@/views/user/about/index'  //关于鑫火
import Weixin from '@/views/weixin/index'  //微信登录
import Empty from '@/views/empty/index'  //加载iframe授权（二维火）
import Callback from '@/views/callback/index'  //授权回调

Vue.use(Router)
const routes = [
  {
    path: "/",
    component: Authorize,
    name: "默认授权",
    meta: {
      title: "杭州鑫火信息科技有限公司",
      isFooter: false
    }
  },
  {
    path: "/authorize",
    component: Authorize,
    name: "授权",
    meta: {
      title: "杭州鑫火信息科技有限公司",
      isFooter: false
    }
  },
  {
    path: "/register",
    component: Register,
    name: "用户注册",
    meta: {
      title: "用户注册",
      isFooter: false
    }
  },
  {
    path: "/index",
    component: Index,
    name: "首页",
    meta: {
      title: "杭州鑫火信息科技有限公司",
      isFooter: true,
      item: 1
    }
  },
  {
    path: "/login",
    name: "登录",
    component: Login,
    meta: {
      title: "登录",
      isFooter: false
    }
  },
  {
    path: "/forgetPassword",
    name: "忘记密码",
    component: ForgetPassword,
    meta: {
      title: "忘记密码",
      isFooter: false
    }
  },
  {
    path: "/modifyPassword",
    name: "修改密码",
    component: ModifyPassword,
    meta: {
      title: "修改密码",
      isFooter: true,
      item: 4
    }
  },
  {
    path: "/modifyPhone",
    name: "修改手机号",
    component: ModifyPhone,
    meta: {
      title: "修改手机号",
      isFooter: true,
      item: 4
    }
  },
  {
    path: "/basicInfo",
    name: "基本信息",
    component: BasicInfo,
    meta: {
      title: "基本信息",
      isFooter: false
    }
  },
  {
    path: "/contactInfo",
    name: "联系人信息",
    component: ContactInfo,
    meta: {
      title: "联系人信息",
      isFooter: false
    }
  },
  {
    path: "/detaileInfo",
    name: "详细信息",
    component: DetaileInfo,
    meta: {
      title: "详细信息",
      isFooter: false
    }
  },
  {
    path: "/shopInfo",
    name: "店铺信息",
    component: ShopInfo,
    meta: {
      title: "店铺信息",
      isFooter: false
    }
  },
  {
    path: "/loan",
    name: "我要贷款",
    component: Loan,
    meta: {
      title: "我要贷款",
      isFooter: false,
      item: 2
    }
  },
  {
    path: "/loanDetail",
    name: "贷款详情",
    component: LoanDetail,
    meta: {
      title: "贷款详情",
      isFooter: true,
      item: 2
    }
  },
  {
    path: "/loanSuccess",
    name: "贷款详情成功页面",
    component: LoanSuccess,
    meta: {
      title: "贷款详情",
      isFooter: true,
      item: 2
    }
  },
  {
    path: "/payAgencyFeeZJ",
    name: "支付居间费（中金）",
    component: PayAgencyFeeZJ,
    meta: {
      title: "支付居间费",
      isFooter: true,
      item: 2
    }
  },
  {
    path: "/payAgencyResultZJ",
    name: "支付居间费结果",
    component: PayAgencyResultZJ,
    meta: {
      title: "支付居间费",
      isFooter: true,
      item: 2
    }
  },
  {
    path: "/sign",
    name: "签约（线下）",
    component: Sign,
    meta: {
      title: "预约签约时间",
      isFooter: true,
      item: 2
    }
  },
  {
    path: "/modifySign",
    name: "修改签约",
    component: ModifySign,
    meta: {
      title: "修改签约时间",
      isFooter: true,
      item: 2
    }
  },
  {
    //还款计划（银行）
    path: "/repayYinHang",
    name: "还款计划（银行）",
    component: RepayYinHang,
    meta: {
      title: "还款列表",
      isFooter: true,
      item: 2
    }
  },
  {
    //还款计划（瀚华）
    path: "/repayHanHua",
    name: "还款计划（瀚华）",
    component: RepayHanHua,
    meta: {
      title: "还款列表",
      isFooter: true,
      item: 2
    }
  },
  {
    path: "/find",
    name: "发现",
    component: Find,
    meta: {
      title: "发现",
      isFooter: true,
      item: 3
    }
  },
  {
    path: "/user",
    name: "我的",
    component: User,
    meta: {
      title: "我的",
      isFooter: true,
      item: 4
    }
  },
  {
    path: "/myAccount",
    name: "我的账户",
    component: MyAccount,
    meta: {
      title: "我的账户",
      isFooter: true,
      item: 4
    }
  },
  {
    path: "/shopList",
    name: "店铺列表",
    component: ShopList,
    meta: {
      title: "店铺列表",
      isFooter: false,
      item: 4
    }
  },
  {
    path: "/bankCards",
    name: "银行卡列表",
    component: BankCards,
    meta: {
      title: "我的银行卡",
      isFooter: true,
      item: 4
    }
  },
  {
    path: "/BindCardsZJ",
    name: "绑定银行卡",
    component: BindCardsZJ,
    meta: {
      title: "我的银行卡",
      isFooter: true,
      item: 4
    }
  },
  {
    path: "/record",
    name: "交易记录",
    component: Record,
    meta: {
      title: "交易记录",
      isFooter: true,
      item: 2
    }
  },
  {
    path: "/recordDetail",
    name: "交易记录详情",
    component: RecordDetail,
    meta: {
      title: "交易记录",
      isFooter: true,
      item: 2
    }
  },
  {
    path: "/help",
    name: "帮助与反馈",
    component: Help,
    meta: {
      title: "帮助与反馈",
      isFooter: false
    }
  },
  {
    path: "/about",
    name: "关于鑫火",
    component: About,
    meta: {
      title: "关于鑫火",
      isFooter: false
    }
  },
  {
    path: "/weixin",
    name: "微信登录",
    component: Weixin,
    meta: {
      title: "微信登录",
      isFooter: false
    }
  },
  {
    path: "/empty",
  	 name: "授权回调", 
    component: Empty,
    meta: {
      title: "杭州鑫火信息科技有限公司",
      isFooter: false
    }
  },
  {
    path: "/callback",
    name: "iframe加载授权",
    component: Callback,
    meta: {
      title: "杭州鑫火信息科技有限公司",
      isFooter: false
    }
  }
];

export default new Router({
  mode: "history",
  routes
});
