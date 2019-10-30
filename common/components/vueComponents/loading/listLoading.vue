<!-- 列表请求时的loading -->

<template>
	<div class="listLoading" style="position:fixed;z-index:997;background:rgba(255,255,255,0);top:0;left:0;width:100%;height:100%;" v-if="showListLoading">
		<!-- <div class="blackBg" style="position:absolute;margin;auto;top:0;left:0;right:0;bottom:0;background:#333;line-height:5rem;width:5rem;height:5rem;margin: auto;text-align: center;border-radius: 1rem;">
			<span class="iconfont loadingIcon" style="margin:0 auto;font-size:3rem;color:#f4cf5c;display:inline-block;">&#xe602;</span>
		</div> -->
		<div class="la-ball-clip-rotate la-2x">
			<div></div>
		</div>
	</div>

	<!-- <div class="listLoading" v-if="showListLoading"> -->
		<!-- <script src="/commonResources/common/vendor/sonic/sonic.js"></script> -->
		<!-- <canvas class="sonic" height="150" width="150" v-if="showListLoading"></canvas> -->
	<!-- </div> -->
	
	

</template>

<style lang="less">
	.la-ball-clip-rotate{
		position:absolute;
		margin:auto;
		top:0;
		left:0;
		right:0;
		bottom:0;
		display: block;
		font-size: 0;
		color: #ff6b00;
	    //position: relative;
	    -webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	    width: 1.6rem;
		height: 1.6rem;

		div{
			//position: relative;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			display: inline-block;
			float: none;
			background-color: currentColor;
			border: 0 solid currentColor;
			width: 1.6rem;
			height: 1.6rem;
			background: transparent;
			border-width: 2.5rem;
			border-bottom-color: transparent;
			border-radius: 100%;
			-webkit-animation: ball-clip-rotate 0.75s linear infinite;
			-moz-animation: ball-clip-rotate 0.75s linear infinite;
			-o-animation: ball-clip-rotate 0.75s linear infinite;
			animation: ball-clip-rotate 0.75s linear infinite;
			border-width: 3px;
		}
	}


	@-webkit-keyframes ball-clip-rotate {
	    0% {
	        -webkit-transform: rotate(0deg);
	        transform: rotate(0deg)
	    }

	    50% {
	        -webkit-transform: rotate(180deg);
	        transform: rotate(180deg)
	    }

	    100% {
	        -webkit-transform: rotate(360deg);
	        transform: rotate(360deg)
	    }
	}

	@-moz-keyframes ball-clip-rotate {
	    0% {
	        -moz-transform: rotate(0deg);
	        transform: rotate(0deg)
	    }

	    50% {
	        -moz-transform: rotate(180deg);
	        transform: rotate(180deg)
	    }

	    100% {
	        -moz-transform: rotate(360deg);
	        transform: rotate(360deg)
	    }
	}

	@-o-keyframes ball-clip-rotate {
	    0% {
	        -o-transform: rotate(0deg);
	        transform: rotate(0deg)
	    }

	    50% {
	        -o-transform: rotate(180deg);
	        transform: rotate(180deg)
	    }

	    100% {
	        -o-transform: rotate(360deg);
	        transform: rotate(360deg)
	    }
	}

	@keyframes ball-clip-rotate {
	    0% {
	        -webkit-transform: rotate(0deg);
	        -moz-transform: rotate(0deg);
	        -o-transform: rotate(0deg);
	        transform: rotate(0deg)
	    }

	    50% {
	        -webkit-transform: rotate(180deg);
	        -moz-transform: rotate(180deg);
	        -o-transform: rotate(180deg);
	        transform: rotate(180deg)
	    }

	    100% {
	        -webkit-transform: rotate(360deg);
	        -moz-transform: rotate(360deg);
	        -o-transform: rotate(360deg);
	        transform: rotate(360deg)
	    }
	}
</style>

<script>
export default {
    props:{
        showListLoading:Boolean
    },
    data(){
        return {
               
        }
    }
}
</script>




