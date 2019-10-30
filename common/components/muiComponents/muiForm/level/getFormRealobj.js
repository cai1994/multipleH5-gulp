/**
 * 在这里判断是何种表单元素，将生成的实例return 回去
 *
 * 
 *  
 */ 


import staticForm from './basic/basicStaticConfig.js'

//根据formList.fileName，判断当前是什么表单元素并初始化
//返回初始化后的实例
export default function realObj ( formList ){

	//根据obj初始化实例
	var obj = new staticForm(formList);

	return obj;
}

