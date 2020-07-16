<template>
	<view class="content">
		<ul class="Tab">
			<li :class="{ active: index == tabActive ? true : false }" v-for="(item, index) in tabs" :key="index" v-text="item" @tap="tabClick(index)" />
		</ul>
		<view class="TabContent">
			<view class="TabLogBox" :style="{'left':-tabActive*100+'%'}">
				<ul class="LogView" v-for="(items,index) in logData">
					<li v-for="item in items">
						<view class="circleBox"><view class="circle" /></view>
						<view class="range" />
						<view class="logMessage">
							<text class="logTime" v-text="item.logTime" />
							<text class="message" v-text="'事件类型:' + item.model" />
							<text class="message" v-text="'事件详情:' + item.logMessage" />
							<text class="message" v-text="'用户名:' + item.empName" />
							<text class="message" v-text="'用户IP:' + item.ipAddress" />
							<text class="message" v-text="'操作系统:' + item.webinfomation" />
						</view>
					</li>
				</ul>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			tabs: ['今天', '近三天', '进七天', '近一个月'],
			tabActive: 0,
			logData:{
				todaylogData: [],
				thereLogData: [],
				sevenLogData: [],
				monthLogData: []
			}
		}
	},
	computed: {
		...mapState(['userInfo'])
	},
	mounted() {
		this.getLog(0);
	},
	methods: {
		tabClick(index) {
			//切换卡的点击事件
			this.tabActive = index;
			if (this.logData.todaylogData.length != 0 && index == 0) {
				return;
			} else if (this.logData.thereLogData.length != 0 && index == 1) {
				return;
			} else if (this.logData.sevenLogData.length != 0 && index == 2) {
				return;
			} else if (this.logData.monthLogData.length != 0 && index == 3) {
				return;
			}
			this.getLog(this.tabActive);
		},
		getLog(index) {
			//获取用户的操作日志
			console.log(this.userInfo);
			this.$HTTP({
				url: 'UserLog',
				data: {
					empid: this.userInfo['empID'],
					logtype: index
				}
			}).then(logList => {
				console.log(logList);
				if (index == 0) {
					this.logData.todaylogData.push(...logList.data);
				} else if (index == 1) {
					this.logData.thereLogData.push(...logList.data);
				} else if (index == 2) {
					this.logData.sevenLogData.push(...logList.data);
				} else if (index == 3) {
					this.logData.monthLogData.push(...logList.data);
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.content {
	padding: 0;
	.Tab {
		width: 100%;
		display: flex;
		background-color: $uni-text-color-white;
		justify-content: space-around;
		padding: 0;
		li {
			font-size: 26upx;
			list-style: none;
			display: block;
			margin: 20upx;
			height: 60upx;
			line-height: 60upx;
			text-align: center;
			width: 25%;
			border-radius: 16upx;
			transition: all 0.2s linear;
			background-color: #f2f2f2;
		}
		.active {
			color: $uni-text-color-white;
			background-color: $uni-btn-active-color;
		}
	}
	.TabContent{
		position: relative;
		width: 100%;
		overflow-x: hidden;
		height: 100%;
		overflow-y: scroll;
		.TabLogBox{
			position: absolute;
			left: 0;
			top: 0;
			width: 400%;
			display: flex;
			.LogView {
				width: calc(100% / 4);
				height: auto;
				padding: 15upx 0;
				margin: 20upx 0;
				background-color: $uni-text-color-white;
				li {
					position: relative;
					list-style: none;
					display: flex;
					padding: 0 50upx;
					box-sizing: border-box;
					.circleBox {
						width: 35upx;
						height: 35upx;
						.circle {
							width: 35upx;
							height: 35upx;
							border-radius: 50%;
							background-color: $uni-btn-active-color;
						}
					}
					.range {
						position: absolute;
						width: 5upx;
						height: calc(100% - 30upx);
						background-color: $uni-btn-active-color;
						left: 65upx;
						top: 33upx;
					}
					.logMessage {
						padding: 0 15upx;
						flex-grow: 1;
						text {
							display: block;
						}
						.logTime {
							color: $uni-btn-active-color;
							font-size: 32upx;
							font-weight: bold;
						}
						.message {
							font-size: 26upx;
							padding-top: 15upx;
							border-bottom: 1upx solid #f2f2f2;
							word-wrap: break-word;
							word-break: break-all;
							overflow: hidden;
						}
						.message:last-child {
							margin-bottom: 20upx;
						}
					}
				}
			}
		}
	}
	
}
</style>
