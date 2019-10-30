/**
 * 职业下拉列表
 * @author zhangweipeng 2017-11-16
 */


import vlist from '../../../../../../../web/static/data/vocation/vocation.js'

//复制一个
var v_l = util.objDeepCopy(vlist);

var arr = [];

//职业加上所属类别，拼在一起
function dealData(){
	for ( var i in v_l){
		if( !v_l[i].text ){
			//没有text，删除此项
			delete v_l[i];
			dealData();
		}
		else{
			if( !!v_l[i].children){
				for ( var m in v_l[i].children ){

					if( !v_l[i].text ){
						//没有text，删除此项
						delete v_l[i].children[m];
						dealData();
					}
					else{
						if(  !!v_l[i].children[m].children ){
							//console.log( v_l[i].children[m].children );
							for ( var n in v_l[i].children[m].children){

								if( !v_l[i].children[m].children[n].text ){
									//没有text，删除此项
									delete v_l[i].children[m].children[n];
									dealData();
								}
								else{
									var text = v_l[i].children[m].children[n].text,
										status = v_l[i].children[m].children[n].status;

									if( text.indexOf('-'+ status ) == -1){
										v_l[i].children[m].children[n].text = text + '-' + status;
									}
									
								}
							}
						}
					}
				}
			}

		}	
	}
}

dealData()

for(var z in v_l){

	arr.push(v_l[z]);
}

export default arr