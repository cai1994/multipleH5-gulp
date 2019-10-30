<template>
	
	<div class="fileList">
		<div class="fileListBox">
			<ul id="example-1">
				<li v-for="item in listData" @click="clickEvent(item.fileId, item.fileName)">
					{{item.fileName}}
				</li>
			</ul>		
			<no-data :showNoData="showNoData" :show="show"></no-data>
		</div>
		
	</div>
	

</template>

<script>
import './fileList.js'
import noData from '@src/common/noData/noData'

export default {
	data(){
		return{
			listData: null,
			showNoData:false,
			show: 'show'
		}
	},
	components:{
      noData,
  },
	created:function(){
		this.getDetailInfo();
	},
	methods:{
		getDetailInfo(){

		  var _this = this;

            this.$axiosHttp.http({
                    name:'项目文件列表',
                    url: apiUrl.produdtFileApi,
                    needFailCallback:true,
                    params: {
                    	projectId:splitUrl()['projectId'],
											type: splitUrl()['type'],
                    }
            }, (res) => {
				this.showNoData = false;
				console.log(res.data)
                this.listData = res.data.data;

            },(res) => {
							console.log(res)
				this.showNoData = true;
			})

		},
		clickEvent(fileId, fileName){
			window.location.href = '/gjzb/file/fileDetail/fileDetail.html?fileId=' + fileId + '&fileName=' + encodeURI(fileName);
		}

	}
}
</script>

<style lang="less">
@import './fileList.less';
</style>