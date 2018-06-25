let root = process.env.API_ROOT ;

let API = {
  // 接口备注
  POST_AUTHORIZATION: root + "/app/login/authorization.do", //授权页面
  GET_PWD_STR: root + "/app/login/get", //获取MD5加密串
  POST_REGISTER: root + "/app/login/register.do", //注册
  GET_LOGIN: root + "/app/login/login.do", //登录接口
  GET_LOGIN_OUT: root + "/app/login/loginOut", //退出接口
  GET_LOAN_MSG: root + "/app/loan/applyLoan.do", //贷款页面初始化
  PST_LOAN_SUBMIT: root + "/app/loan/applyLoanAdd.do", //贷款页面信息提交
  GET_SUCCESS_MSG: root + "/app/loan/queryLoanRecord", //贷款成功页面初始化
  GET_SUCCESS_LOAN: root + "/app/user/shopList", //贷款成功中贷款按钮
  GET_LOAN_DETAILS_MSG: root + "/app/loan/applyLoan", //贷款店铺详情
  GET_QUERY_PAY_TYPE: root + "/app/loan/queryPayType", //贷款详情去支付居间费
  GET_FORGET_PASSWORD_CODE: root + "/app/login/getAuthCode", //忘记密码获取手机验证码
  POST_FORGET_PASSWORD: root + "/app/login/forgetPaw", //忘记密码提交
  GET_MODIFY_PHONE: root + "/app/user/findUserMessage.do", //修改手机号码页面初始化
  POST_MODIFY_PHONE_SUBMIT: root + "/app/user/updateMobilePhone", //修改手机号码页面提交
  POST_MODIFY_PASSWORD_SUBMIT: root + "/app/user/updatePaw", //修改密码页面提交
  GET_CONTACT_MSG: root + "/app/user/findUserMessage.do", //联系人信息页面初始化
  POST_CONTACT_MSG_SUBMIT: root + "/app/user/renewalUser.do", //联系人信息页面提交
  GET_DETAIL_MSG: root + "/app/user/findUserMessage.do", //详细信息页面初始化
  POST_DETAIL_MSG_SUBMIT: root + "/app/user/renewalUser.do", //详细信息页面提交
  GET_BASE_MSG: root + "/app/user/findUserMessage.do", //基本信息页面初始化
  POST_BASE_MSG_SUBMIT: root + "/app/user/renewalUser.do", //基本信息页面提交
  GET_USER_MSG: root + "/app/user/myAccount", //"我的"页面初始化
  GET_SHOP_LIST: root + "/app/user/shopList", //获取店铺列表
  GET_SHOP_MSG: root + "/app/user/findUserMessage.do", //店铺详情页面初始化
  POST_SHOP_MSG_SUBMIT: root + "/app/user/renewalUser.do", //店铺详情页面提交信息
  GET_SAAS_LIST: root + "/app/saas/saasList", //获取saas列表
  POST_SELECT_SAAS: root + "/app/saas/saasAuthUrl", //选择SAAS去授权
  GET_BANK_LIST: root + "/app/user/bankInfoList", //获取银行卡列表
  GET_PAY_CODE: root + "/app/user/payChannelByBankInfo", //获取支付通道
  GET_PAY_AGENCY_ZJ_MSG: root + "/app/loan/queryPayType", //中金支付页面初始化
  GET_MOBILE_CODE: root + "/app/zj/getBankInfoVerifyCode.do", //中金绑卡手机验证码
  GET_BANK_CARD_SUBMIT: root + "/app/zj/bindBankInfo.do", //中金绑卡信息提交
  POST_PAY_CODE_ZJ: root + "/app/zj/getPayVerifyCode.do", //中金支付居间费获取验证码
  POST_FAST_PAY_ZJ: root + "/app/zj/fastPay.do", //中金支付居间费提交
  POST_FAST_PAY_RESULT_ZJ: root + "/app/loan/queryPayLoanResult", //中金支付居间费结果
  GET_LOAN_DATA: root + "/app/loan/queryRecord", //加载贷款记录数据
  GET_LOAN_DETAILS: root + "/app/loan/queryRecordDetail", //查看贷款记录详情，
  GET_APPOINT_TIME: root + "/app/loan/appointmentTime", //获取签约时间
  POST_CHANGE_APPOINT_TIME: root + "/app/loan/appointmentRenewal", //修改签约时间
  GET_REFUND_DETAIL_LIST: root + "/app/loan/refundDetailList.do", //还款计划列表
  POST_IMG: root + "/pc/fileResource/uploadImg.do", // 上传图片地址
  POST_WEI_XIN: root + "/app/login/webpageAuthorize" , //微信登录
  POST_AUTHORIZE_CALLBACK: root + "/app/inform/addShop" ,	//店铺授权回调函数
};

export default API;
