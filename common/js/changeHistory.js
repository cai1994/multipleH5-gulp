/**
 * 修改当前页面上的history
 *
 * @author  yangjinlai
 *
 * url---要改成的url
 */


export default function( url, title ){

	//state是pushState方法需要的参数
	var state = {  
	    title: "title",  
	    url: "?"  
	};  

	window.history.pushState(state, "title", url);
}

