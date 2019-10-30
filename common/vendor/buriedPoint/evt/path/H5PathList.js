/**
 * wap项目页面路径和evtList对应表
 *
 * 金服wap&app可用
 */
var pathList = {
	"/description/description.html" : { evtid: '0', topic: '关于明泽', info: ''} ,
	"/oauth2Login/toAuthLogin.html" : { evtid: '1', topic: '恒乐汇商城-登录', info: ''} ,
	"/about/views/aboutJF.html" : { evtid: '2', topic: '关于明泽', info: ''} ,
	"/about/views/recruit.html" : { evtid: '3', topic: '举贤荐才', info: ''} ,
	"/about/views/recruitIndex.html" : { evtid: '4', topic: '举贤荐才', info: ''} ,
	"/about/views/startup.html" : { evtid: '5', topic: '周年盛典', info: ''} ,
	"/cashTreasure/views/bankList.html" : { evtid: '6', topic: '页面加载', info: ''} ,
	"/cashTreasure/views/cashXml.html" : { evtid: '7', topic: '中融货币E规则', info: ''} ,
	"/cashTreasure/views/totalAssets.html" : { evtid: '8', topic: '现金宝', info: ''} ,
	"/cashTreasure/views/tradeDetail.html" : { evtid: '9', topic: '转入详情', info: ''} ,
	"/cashTreasure/views/tradeList.html" : { evtid: '10', topic: '交易明细', info: ''} ,
	"/cashTreasure/views/treasureTrade.html" : { evtid: '11', topic: '转入', info: ''} ,
	"/club/views/activitiesList.html" : { evtid: '12', topic: '社区活动', info: ''} ,
	"/club/views/activitiesTemplate.html" : { evtid: '13', topic: '页面加载', info: ''} ,
	"/club/views/activityDetail.html" : { evtid: '14', topic: '社区活动', info: ''} ,
	"/club/views/club.html" : { evtid: '15', topic: '恒乐汇', info: ''} ,
	"/club/views/entery.html" : { evtid: '16', topic: '社区活动', info: ''} ,
	"/club/views/leaguerDetail.html" : { evtid: '17', topic: '详情', info: ''} ,
	"/club/views/leaguerList.html" : { evtid: '18', topic: '会员权益', info: ''} ,
	"/club/views/leaguerTemplate.html" : { evtid: '19', topic: '页面加载', info: ''} ,
	"/club/views/member.html" : { evtid: '20', topic: '会员权益', info: ''} ,
	"/commonResources/views/index.html" : { evtid: '21', topic: '页面加载', info: ''} ,
	"/compliance/views/certificationResult.html" : { evtid: '22', topic: '投资者分类认证', info: ''} ,
	"/compliance/views/classification.html" : { evtid: '23', topic: '投资者分类认证', info: ''} ,
	"/compliance/views/referanceMaterial.html" : { evtid: '24', topic: '投资者分类认证', info: ''} ,
	"/compliance/views/uploadMaterial.html" : { evtid: '25', topic: '专业投资者认证', info: ''} ,
	"/demo/views/demo.html" : { evtid: '26', topic: '页面加载', info: ''} ,
	"/error/views/404.html" : { evtid: '27', topic: '404', info: ''} ,
	"/error/views/coding.html" : { evtid: '28', topic: '系统维护页', info: ''} ,
	"/error/views/update.html" : { evtid: '29', topic: '系统维护页', info: ''} ,
	"/financialEducation/views/createPlan.html" : { evtid: '30', topic: '创建成长计划', info: ''} ,
	"/financialEducation/views/growthPlan.html" : { evtid: '31', topic: '专属成长计划', info: ''} ,
	"/financialEducation/views/guidePage.html" : { evtid: '32', topic: '恒天财富财商教育', info: ''} ,
	"/financialEducation/views/landingPage.html" : { evtid: '33', topic: '恒天财富恒乐汇', info: ''} ,
	"/financialPlanner/views/employeeInformation.html" : { evtid: '34', topic: '员工信息', info: ''} ,
	"/financialPlanner/views/employeeQuery.html" : { evtid: '35', topic: '员工信息查询', info: ''} ,
	"/include/views/activityModel.html" : { evtid: '36', topic: '活动专题服务协议模板', info: ''} ,
	"/include/views/agreementModel.html" : { evtid: '37', topic: '用户服务协议模板', info: ''} ,
	"/include/views/bankAuthorization.html" : { evtid: '38', topic: '银行自动转账授权书', info: ''} ,
	"/include/views/header.html" : { evtid: '39', topic: '埋点头部页面', info: ''} ,
	"/include/views/imgModel.html" : { evtid: '40', topic: '图片拼接模板', info: ''} ,
	"/include/views/investorinterests.html" : { evtid: '41', topic: '投资者权益须知', info: ''} ,
	"/include/views/investorsPromise.html" : { evtid: '42', topic: '合格投资者承诺', info: ''} ,
	"/include/views/networkservicesAgreement.html" : { evtid: '43', topic: '网络服务协议', info: ''} ,
	"/include/views/onlineCustomer.html" : { evtid: '44', topic: '在线客服', info: ''} ,
	"/include/views/qrCode.html" : { evtid: '45', topic: '二维码跳转页', info: ''} ,
	"/include/views/riskDisclosure.html" : { evtid: '46', topic: '风险揭示函', info: ''} ,
	"/include/views/serviceAgreement.html" : { evtid: '47', topic: '用户服务协议', info: ''} ,
	"/include/views/tradeserviceAgreement.html" : { evtid: '48', topic: '基金网上交易服务协议', info: ''} ,
	"/index/views/index.html" : { evtid: '49', topic: '首页', info: ''} ,
	"/inrock/views/inRock.html" : { evtid: '50', topic: '恒天中岩', info: ''} ,
	"/inrock/views/news.html" : { evtid: '51', topic: '新闻公告', info: ''} ,
	"/inrock/views/newsDetail.html" : { evtid: '52', topic: '资讯详情', info: ''} ,
	"/intelligentInvestment/views/adjustment.html" : { evtid: '53', topic: '调仓', info: ''} ,
	"/intelligentInvestment/views/adjustmentRecord.html" : { evtid: '54', topic: '调仓记录', info: ''} ,
	"/intelligentInvestment/views/assetBuyAndRedemptionDetails.html" : { evtid: '55', topic: '资产详情', info: ''} ,
	"/intelligentInvestment/views/buyAndRedemptionDetails.html" : { evtid: '56', topic: '买入—买入完成', info: ''} ,
	"/intelligentInvestment/views/buyCombination.html" : { evtid: '57', topic: '买入', info: ''} ,
	"/intelligentInvestment/views/combinationDetails.html" : { evtid: '58', topic: '恒小智', info: ''} ,
	"/intelligentInvestment/views/incomeDetail.html" : { evtid: '59', topic: '收益明细', info: ''} ,
	"/intelligentInvestment/views/investmentIndex.html" : { evtid: '60', topic: '恒小智', info: ''} ,
	"/intelligentInvestment/views/myCombination.html" : { evtid: '61', topic: '恒小智', info: ''} ,
	"/intelligentInvestment/views/programFail.html" : { evtid: '62', topic: '恒小智', info: ''} ,
	"/intelligentInvestment/views/redemption.html" : { evtid: '63', topic: '赎回', info: ''} ,
	"/intelligentInvestment/views/transactionList.html" : { evtid: '64', topic: '交易明细', info: ''} ,
	"/intelligentInvestment/views/transactionResult.html" : { evtid: '65', topic: '赎回结果/买入结果', info: ''} ,
	"/pay/views/bankList.html" : { evtid: '66', topic: '页面加载', info: ''} ,
	"/pay/views/payDetails.html" : { evtid: '67', topic: '申请详情', info: ''} ,
	"/pay/views/payFundStepOne.html" : { evtid: '68', topic: '购买基金(1/2)', info: ''} ,
	"/pay/views/payMX.html" : { evtid: '69', topic: '交易明细', info: ''} ,
	"/pay/views/payThemeCash.html" : { evtid: '70', topic: '我的资产', info: ''} ,
	"/pay/views/prvPayRansomOne.html" : { evtid: '71', topic: '赎回', info: ''} ,
	"/pay/views/prvPayRansomTwo.html" : { evtid: '72', topic: '赎回', info: ''} ,
	"/pay/views/pubPayRansom.html" : { evtid: '73', topic: '赎回', info: ''} ,
	"/personal/views/accountMerge.html" : { evtid: '74', topic: '我的账户', info: ''} ,
	"/personal/views/bankCard.html" : { evtid: '75', topic: '银行卡', info: ''} ,
	"/personal/views/bankcardDetail.html" : { evtid: '76', topic: '银行卡详情', info: ''} ,
	"/personal/views/detailLists.html" : { evtid: '77', topic: '赎回明细', info: ''} ,
	"/personal/views/myAccount.html" : { evtid: '78', topic: '我的账户', info: ''} ,
	"/personal/views/myAsset.html" : { evtid: '79', topic: '我的资产', info: ''} ,
	"/personal/views/myDetail.html" : { evtid: '80', topic: '我的明细', info: ''} ,
	"/personal/views/myPots.html" : { evtid: '81', topic: '我的积分', info: ''} ,
	"/personal/views/orderDetail.html" : { evtid: '82', topic: '预约明细', info: ''} ,
	"/personal/views/pledge.html" : { evtid: '83', topic: '定融/定投', info: ''} ,
	"/personal/views/publicOpen.html" : { evtid: '84', topic: '公募持仓开通', info: ''} ,
	"/personal/views/pulicNobind.html" : { evtid: '85', topic: '公募持仓绑定', info: ''} ,
	"/personal/views/questionnaire.html" : { evtid: '86', topic: '风险测评调查问卷', info: ''} ,
	"/personal/views/regulatoryAccounts.html" : { evtid: '87', topic: '公募监管账户', info: ''} ,
	"/personal/views/rightsCenter.html" : { evtid: '88', topic: '权益中心', info: ''} ,
	"/personal/views/risk.html" : { evtid: '89', topic: '投资者风险承受能力', info: ''} ,
	"/personal/views/riskTip.html" : { evtid: '90', topic: '风险提示', info: ''} ,
	"/personal/views/tradeDetail.html" : { evtid: '91', topic: '交易明细', info: ''} ,
	"/mobilePage/views/homePage.html" : { evtid: '92', topic: '恒天财富高端投资理财平台-财富管理_资产管理_理财教育_高端理财_私募投资_资产配置', info: ''} ,
	"/mobilePage/views/navListTemplate.html" : { evtid: '93', topic: '列表导航', info: ''} ,
	"/planner/views/plannerSearch.html" : { evtid: '94', topic: '理财师', info: ''} ,
	"/productPrivate/views/hisValue.html" : { evtid: '95', topic: '历史净值', info: ''} ,
	"/productPrivate/views/prdPrvDetails.html" : { evtid: '96', topic: '产品详情', info: ''} ,
	"/productPrivate/views/prdPrvLists.html" : { evtid: '97', topic: '私募超市', info: ''} ,
	"/productPrivate/views/prdPrvSure.html" : { evtid: '98', topic: '产品详情', info: ''} ,
	"/productPrivate/views/prvIndex.html" : { evtid: '99', topic: '私募产品', info: ''} ,
	"/productPrivate/views/PrvMarticial.html" : { evtid: '100', topic: '产品材料', info: ''} ,
	"/productPrivate/views/prvPic.html" : { evtid: '101', topic: '产品亮点', info: ''} ,
	"/productPrivate/views/prvRecom.html" : { evtid: '102', topic: '猜你喜欢', info: ''} ,
	"/productPrivate/views/search.html" : { evtid: '103', topic: ' 私募产品列表查询', info: ''} ,
	"/productPublic/views/fundFile.html" : { evtid: '104', topic: '基金档案', info: ''} ,
	"/productPublic/views/notice.html" : { evtid: '105', topic: '基金公告', info: ''} ,
	"/productPublic/views/oldIncome.html" : { evtid: '106', topic: '历史净值', info: ''} ,
	"/productPublic/views/payNotice.html" : { evtid: '107', topic: '购买须知', info: ''} ,
	"/productPublic/views/productDetail.html" : { evtid: '108', topic: '产品详情', info: ''} ,
	"/productPublic/views/publicList.html" : { evtid: '109', topic: '公募产品', info: ''} ,
	"/productPublic/views/pubSearch.html" : { evtid: '110', topic: '公募产品列表查询', info: ''} ,
	"/productSearch/views/productSearch.html" : { evtid: '111', topic: '页面加载', info: ''} ,
	"/recommend/views/award.html" : { evtid: '112', topic: '启新十年 悦享礼遇', info: ''} ,
	"/recommend/views/congratulation.html" : { evtid: '113', topic: '邀请成功', info: ''} ,
	"/recommend/views/newRecommend.html" : { evtid: '114', topic: '邀请函', info: ''} ,
	"/recommend/views/recommend.html" : { evtid: '115', topic: '推荐有礼', info: ''} ,
	"/rongze/views/newsDetail.html" : { evtid: '116', topic: '资讯详情', info: ''} ,
	"/rongze/views/rongZe.html" : { evtid: '117', topic: '恒天融泽', info: ''} ,
	"/rongze/views/rzNews.html" : { evtid: '118', topic: '新闻公告', info: ''} ,
	"/subcompany/views/inRock.html" : { evtid: '119', topic: '恒天中岩', info: ''} ,
	"/subcompany/views/news.html" : { evtid: '120', topic: '新闻公告', info: ''} ,
	"/subcompany/views/newsDetail.html" : { evtid: '121', topic: '资讯详情', info: ''} ,
	"/subcompany/views/rongZe.html" : { evtid: '122', topic: '恒天融泽', info: ''} ,
	"/user/views/authorizationLogin.html" : { evtid: '123', topic: '授权登录', info: ''} ,
	"/user/views/login.html" : { evtid: '124', topic: '登录', info: ''} ,
	"/user/views/recommendRegister.html" : { evtid: '125', topic: '注册', info: ''} ,
	"/user/views/register.html" : { evtid: '126', topic: '注册', info: ''} ,
	"/user/views/toAuthLogin.html" : { evtid: '127', topic: '积分商城-登录', info: ''} ,
	"/webviews/views/certification.html" : { evtid: '128', topic: '页面加载', info: ''} ,
	"/webviews/views/checkout.html" : { evtid: '129', topic: '恒天金服', info: ''} ,
	"/webviews/views/detailModel.html" : { evtid: '130', topic: '混合app中h5网站公告', info: ''} ,
	"/webviews/views/helpful.html" : { evtid: '131', topic: '帮助中心', info: ''} ,
	"/webviews/views/information.html" : { evtid: '132', topic: '恒天财富', info: ''} ,
	"/webviews/views/promise.html" : { evtid: '133', topic: '页面加载', info: ''} ,
	"/webviews/views/regard.html" : { evtid: '134', topic: '关于我们', info: ''} ,
	"/about/views/baidu/baidu.html" : { evtid: '135', topic: '专业可靠的理财平台-恒天财富', info: ''} ,
	"/about/views/baidu/consult.html" : { evtid: '136', topic: '专业可靠的理财平台-恒天财富', info: ''} ,
	"/about/views/baidu/result.html" : { evtid: '137', topic: '专业可靠的理财平台-恒天财富', info: ''} ,
	"/about/views/baseEducation/baseLearning.html" : { evtid: '138', topic: '基民教育', info: ''} ,
	"/about/views/baseEducation/baseResult.html" : { evtid: '139', topic: '基民教育', info: ''} ,
	"/about/views/midAutumn/AutumnIndex.html" : { evtid: '140', topic: '中秋活动', info: ''} ,
	"/about/views/midAutumn/privateActivity.html" : { evtid: '141', topic: '中秋活动--私募会场', info: ''} ,
	"/about/views/midAutumn/publicActivityOne.html" : { evtid: '142', topic: '中秋活动--公募会场', info: ''} ,
	"/user/views/bassMessage/bassOrg.html" : { evtid: '143', topic: '基本信息', info: ''} ,
	"/user/views/bassMessage/bassOrgPd.html" : { evtid: '144', topic: '基本信息', info: ''} ,
	"/user/views/bassMessage/bassPer.html" : { evtid: '145', topic: '基本信息', info: ''} ,
	"/user/views/dealPassword/changeDealPassword.html" : { evtid: '146', topic: '修改网站交易密码', info: ''} ,
	"/user/views/dealPassword/forgetDealForm.html" : { evtid: '147', topic: '修改网站交易密码', info: ''} ,
	"/user/views/forgetLoginPassword/phoneVerify.html" : { evtid: '148', topic: '手机验证', info: ''} ,
	"/user/views/forgetLoginPassword/resetPassword.html" : { evtid: '149', topic: '重置登录密码', info: ''} ,
	"/user/views/realName/realNameResult.html" : { evtid: '150', topic: '实名认证', info: ''} ,
	"/user/views/realName/realNameStepFour.html" : { evtid: '151', topic: '实名认证', info: ''} ,
	"/user/views/realName/realNameStepOne.html" : { evtid: '152', topic: '实名认证', info: ''} ,
	"/user/views/realName/realNameStepThree.html" : { evtid: '153', topic: '实名认证', info: ''} ,
	"/user/views/setUp/resetLinkPhone.html" : { evtid: '154', topic: '更换手机号码', info: ''} ,
	"/user/views/setUp/resetLoginPassword.html" : { evtid: '155', topic: '更换登录密码', info: ''} ,
	"/user/views/setUp/setUp.html" : { evtid: '156', topic: '设置', info: ''} 
}