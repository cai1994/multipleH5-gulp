/*
 * @page: 接口地址
 * @Author: songxiaoyu
 * @Date:   2019-01-18 13:33:35
 * @Last Modified by:   songxiaoyu
 * @description:
 */

module.exports = {
    getActivityApi: '/brand/public/getActivity',
    totalEmpApi: '/wap/user/redpacket/totalEmp',
    addApi: '/wap/user/redpacket/add',
    openApi: '/wap/user/redpacket/open',

    fundQueryApi: '/wap/pof/fund/query.action',
    //理顾宝项目

    //客户陪访
    selectCustInterviewListApi: '/app/interview/selectCustInterviewList',
    selectEmpListByCodeOrNameApi: '/app/base/selectEmpListByCodeOrName',
    selectCustListByCustNameApi: '/app/base/selectCustListByCustName',
    addCustInterviewApi: '/app/interview/addCustInterview',
    submitCustInterviewApi: '/app/interview/submitCustInterview',
    getCustInterviewInfoApi: '/app/interview/getCustInterviewInfo', //客户陪访详情
    confirmInterviewFeedbackApi: '/app/interview/confirmInterviewFeedback', //陪访评价确认反馈
    //活动/培训查询
    selectTrainingListApi: '/app/training/selectTrainingList',
    selectAreaListByNameApi: '/app/base/selectAreaListByName',
    addTrainingApi: '/app/training/addTraining',
    submitTrainingByIdApi: '/app/training/submitTrainingById',
    getTrainingInfoApi: '/app/training/getTrainingInfo', //活动详情
    confirmTrainingFeedbackApi: '/app/training/confirmTrainingFeedback', //活动评分确认反馈
    recordGetApi: '/record/v2.8.0/get', // 跟踪记录详情
    updateFeedBackApi: '/record/v2.8.0/updateFeedBack', // 更新客户跟踪记录
    //项目详情
    productDetail: '/lgb/project/detail', //项目详情

    //名片
    getBusinessCardApi: '/emp/getBusinessCard', //获取名片  
    //字典
    getDictionaryListByTypesApi: '/app/base/getDictionaryListByTypes', //获取字典值

    //恒天财富-理顾宝APP接口文档(V2.6.0增量--已废弃)
    //saveCustomerAssetFirstStepApi: '/customer/v2.6/saveCustomerAssetFirstStep', //新建资产第二步保存
    //saveCustomerAssetSecondStepsApi: '/customer/v2.6/saveCustomerAssetSecondStep', //新建资产第二步保存
    //getCustomerAssetConfigListApi:'/customer/v2.6/getCustomerAssetConfigList',//资产配置报告列表（每个人查询最新一条）
    //searchCustomerListApi:'/customer/v2.6/searchCustomerList',//查询客户接口
    selectAssetInvestSuggestInfoApi:'/customer/v2.6/selectAssetInvestSuggestInfo',//资产投资建议查询
    //getCustomerAssetDictionaryApi:'/customer/v2.6/getCustomerAssetDictionary',//字典接口
    getAssetTypeListApi:'/customer/v2.6/getAssetTypeList',//第三步获取资产分类列表
    //getCustomerAssetDetailByCusOrIdApi: '/customer/v2.6/getCustomerAssetDetailByCusOrId', //第一步回显

    //恒天财富-理顾宝APP接口文档(V2.7.5增量)
    getCustomerAssetConfigListApi: '/customer/v2.7.5/getCustomerAssetConfigList',  //资产配置列表
    getCustomerAssetDictionaryApi:'/customer/v2.7.5/getCustomerAssetDictionary',//字典接口
    downloadPdfReportApi:'/customer/v2.7.5/downloadPdfReport',//查看PDF报告
    getCustomerAssetDetailByCustomerApi : '/customer/v2.7.5/getCustomerAssetDetailByCustomer', //新建资产配置回显数据
    saveCustomerAssetFirstStepApi: '/customer/v2.7.5/saveCustomerAssetFirstStep', //新建资产第一步保存
    getCustomerAssetDetailByIdApi: '/customer/v2.7.5/getCustomerAssetDetailById', //第一步回显
    searchCustomerListApi:'/customer/v2.7.5/searchCustomerList',//查询客户接口
    selectQuesAndAnsApi: '/customer/v2.7.5/selectQuesAndAns', //请求问卷题目和答案
    getCountryCodeListApi: '/customer/v2.7.5/getCountryCodeList', //请求国家地区数据
    getCardTypeAndCustSourceApi: '/customer/v2.7.5/getCardTypeAndCustSource', //请求证件类型和客户来源数据
    saveCustomerAssetSecondStepApi: '/customer/v2.7.5/saveCustomerAssetSecondStep', //新建资产第二步保存（问卷)
    getCustomerAssetChartsApi: '/customer/v2.7.5/getCustomerAssetCharts', //资产配置画图数据请求
    savePdfReportChartImageApi:'/customer/v2.7.5/savePdfReportChartImage',//保存资产配置报告的三张图片
    getAssetsCurrentFormKeyApi : '/customer/v2.7.5/getAssetsCurrentFormKey', //获取资产配置表单
    saveCustomerAssetThirdStepApi: '/customer/v2.7.5/saveCustomerAssetThirdStep', //现状页面表单保存
    insertTrackCustomerApi: '/customer/v2.7.5/insertTrackCustomer', //保存新建客户
    getCustomerInfoByIdAndSortApi: '/customer/v2.7.5/getCustomerInfoByIdAndSort', //根据客户id和sort查客户信息
    //恒天财富-理顾宝APP接口文档(V2.7.5增量)
    selectNewAssetConfigApi : '/assert/2.9.0/selectNewAssetConfig', //根据客户信息查询最新一条资产配置详情

    // 附件
    produdtFileApi: '/lgb/project/files',
    //项目列表接口
    productListApi: '/lgb/project/list',
    selectAssetRecommendProductByAssetTypeApi:'/customer/v2.6/selectAssetRecommendProductByAssetType',//根据资产类别查询推荐产品
    addAssetConfigReportApi:'/customer/v2.6/addAssetConfigReport',//新建资产生成报告
    getCustomerAssetConfigDetailApi:'/customer/v2.6/getCustomerAssetConfigDetail',//资产配置报告详情
    selectAssetRecommendProductByCustomerApi:'/customer/v2.6/selectAssetRecommendProductByCustomer',//查询客户推荐产品列表（理顾选择产品）
    getCustomerAssetConfigListByIdApi:'/customer/v2.6/getCustomerAssetConfigListById',//根据资产配置现状金额详情（第二步回显
    //downloadPdfReportApi:'/customer/v2.6/downloadPdfReport',//查看PDF报告
    
    assetConfigForwardDetailInfoApi:'/customer/v2.6/assetConfigForwardDetailInfo',//转发接口


    // 任务与目标管理
    /*
    * @page: 接口地址
    * @Author: caijiafeng
    * @Date:   2019-07-26 09:33:35
    * @Last Modified by:   caijiafeng
    * @description:仅添加了任务与目标管理（goalMG）的接口
    */
    queryEmpMonthPerform:'/perform/queryEmpMonthPerform',//我的月度业绩模块查看
    queryEmpYearPerform:'/perform/queryEmpYearPerform',//我的年度业绩模块查看
    queryEmpPerformDetail:'/perform/queryEmpPerformDetail',//我的业绩明细模块
    queryEmpOrgType:'/perform/queryEmpOrgType',//获取层级展示接口 （tab标签）
    queryOrganisePerform:'/perform/queryOrganisePerform',//团队 业绩主页面
    queryOrganiseYearPerform:'/perform/queryOrganiseYearPerform',//团队 年度业绩展示
    queryOrganiseDetailPerform:'/perform/queryOrganiseDetailPerform',//团队  部门业绩详情
    queryEmpRankType:'/perform/queryEmpRankType',//团队 排名 切换筛选条件接口
    queryOrganisePerforms:'/perform/queryOrganisePerforms',//团队 排名  选择条件展示数据
    queryEmpNo:'/emp/queryEmpNo',


    // 我的任务列表 
    queryMyTaskListApi: '/app/queryMyTaskList',
    // 获取任务详情 
    queryTaskDetailInfoApi: '/app/queryTaskDetailInfo',
    // 查询子任务列表 
    querySubTaskListByTaskIdApi: '/app/querySubTaskListByTaskId',
    // 根据任务主键查询附件列表 
    queryFileListByTaskIdApi: '/app/queryFileListByTaskId',
    // 排名标签列表
    queryTaskRankTagListApi: '/app/queryTaskRankTagList',
    // 任务排名列表
    queryTaskRankListApi: '/app/queryTaskRankList',
    // 我的下属标签列表
    queryMySubLevelTagListApi: '/app/queryMySubLevelTagList',
    // 我的下属任务列表
    queryMySubLevelTaskListApi: '/app/queryMySubLevelTaskList',

    //获取理顾工号
    queryEmpNoApi: '/v2.9.0/emp/queryEmpNo',
};