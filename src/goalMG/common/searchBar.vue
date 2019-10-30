<template>
	<div class="searchBar">
		<div class="searchBtn" @click="clickBtn">
			<span v-show="openFlag" class="mui-icon mui-icon-search"></span>
			<p v-show="openFlag">{{titleNmae}}</p>
			<p v-show="!openFlag" class="cancel">取消</p>
		</div>
		<div :class="{'searchInpt':openFlag}" class="searchBox">
			<form action="javascript:return true;">
				<input
					type="search"
					@keyup.13="enterClick"
					:placeholder="`请输入${titleNmae}名称...`"
					maxlength="50"
					v-model="searchName"
					class="search_input"
				/>
			</form>
			<span @click="enterClick" class="search mui-icon mui-icon-search"></span>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			openFlag: true,
			orgName: "",
			searchName: ""
		};
	},
	props: ["titleNmae"],
	methods: {
		clickBtn() {
			this.openFlag = !this.openFlag;
			this.searchName = this.openFlag ? "" : this.searchName;
			if (this.searchName == "" && this.openFlag) {
				this.$emit("searchName", this.searchName);
			}
			if (!this.openFlag) {
				this.$nextTick(() => {
					$(".searchBar input").focus();
				});
			}
		},
		enterClick() {
			this.$emit("searchName", this.searchName);
		}
	},
	created() {
		if (
			window.location.href.indexOf("/teamPERFList/") != -1 &&
			splitUrl().orgName
		) {
			//如果是路由跳转赋上初始值
			this.openFlag = false;
			this.searchName = decodeURI(decodeURI(splitUrl().orgName));
		}
		this.$emit("searchName", this.searchName);
	}
};
</script>
<style lang="less" scoped>
.searchBar {
	position: fixed;
	top: 80vh;
	right: 10vw;
	z-index: 1000;
	.searchInpt {
		display: none !important;
	}
	.searchBox {
		color: #d3d2d2;
		padding: 0;
		background: #fff;
		height: 1.75rem;
		width: 65vw;
		border-radius: 1rem;
		position: relative;
		z-index: -1;
		right: 0rem;
		top: 0.5rem;
		border: #d3d2d2 0.1rem solid;

		form {
			width: 90%;
			height: 1.75rem;
			margin-left: 2rem;
		}

		.search_input {
			width: 60%;
			height: 0.95rem;
			background-color: #fff;
			text-align: left;
			font-size: 0.7rem;
			line-height: 0.95rem;
			margin-top: 0.4rem;
		}
	}
	span.search {
		position: absolute;
		font-size: 1.4rem;
		left: 3%;
		top: 0.1rem;
		z-index: 2;
	}
	.searchBtn {
		position: absolute;
		top: 0rem;
		right: 0rem;
		width: 3rem;
		height: 3rem;
		background-color: #fff;
		border-radius: 50%;
		text-align: center;
		box-shadow: 0.05rem 0.05rem 0.05rem #d3d2d2,
                0.05rem -0.05rem 0.05rem #d3d2d2, -0.05rem 0.05rem 0.05rem #d3d2d2,
                -0.05rem -0.05rem 0.05rem #d3d2d2;
		span.mui-icon {
			font-size: 1rem;
			color: darkorange;
			padding-top: 0.4rem;
			padding-bottom: 0rem;
		}
		p {
			font-size: 0.6rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.cancel {
			color: darkorange;
			line-height: 3rem;
			font-size: 0.75rem;
		}
	}
}
</style>
