<template>
	<view class="content">
		<view class="searchBox"><input type="text" placeholder="请输入设备名称" v-model="searchWord" @input="search" /></view>
		<ul>
			<li v-for="item in resList" :key="item.resourceName" @tap="resClick(item)">
				<text v-text="item.resourceName" />
				<text class="icon-right fa fa-angle-right" />
			</li>
		</ul>
	</view>
</template>

<script>
export default {
	onLoad(options) {
		console.log(options);
		this.resList = JSON.parse(decodeURIComponent(options.resList));
		this.AllRes = JSON.parse(decodeURIComponent(options.resList));
	},
	data() {
		return {
			resList: [],
			AllRes: [],
			searchWord: ''
		};
	},
	methods: {
		resClick(resName) {
			const resData = JSON.stringify(resName);
			console.log(resData);
			uni.reLaunch({
				url: '../main/main?resName=' + resData
			});
		},
		search() {
			if (this.searchWord != '') {
				this.resList = [];
				for (var i = 0; i < this.AllRes.length; i++) {
					if (this.AllRes[i]["resourceName"].indexOf(this.searchWord)!= -1) {
						this.resList.push(this.AllRes[i]);
					}
				}
			} else {
				this.resList = this.AllRes;
			}
		}
	}
};
</script>

<style scoped lang="scss">
@import '@/commom/font-awesome-4.7.0/css/font-awesome.min.css';
.content {
	background-color: #e3e3e3;
	padding: 0;
	.searchBox {
		width: 100%;
		background-color: white;
		margin-bottom: 2upx;
		padding: 10upx;
		box-sizing: border-box;
		input {
			text-align: center;
			border-radius: 40upx;
			padding: 10upx;
			border: 1px solid #c0c0c0;
			font-size: 26upx;
		}
	}
	ul {
		padding: 0;
		li {
			list-style: none;
			background-color: $uni-text-color-white;
			padding: 20upx 40upx;
			border-bottom: 1px solid #e3e3e3;
			color: #757575;
			::last-child {
				border-bottom: none;
			}
			.icon-right {
				float: right;
			}
		}
	}
}
</style>
