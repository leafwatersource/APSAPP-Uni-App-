<template>
	<view class="content">
		<view class="title">
			<text class="name">workID:</text>
			<text class="value">{{ workItem.workID }}</text>
		</view>
		<view class="messageBox">
			<view class="message">
				<view class="chart">统计图</view>
				<view class="messageContent">
					<view class="messageContentWrap">
						<text>计划开始:{{ workItem.planStartTime }}</text>
						<text>计划结束:{{ workItem.planendtime }}</text>
						<text>实际开始:</text>
						<text>实际结束:</text>
						<text>差异工时:10分钟</text>
						<text>工序达成率:80%</text>
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<ul>
				<li>
					<text class="name">产品:</text>
					<text class="value">{{ workItem.productID }}</text>
				</li>
				<li>
					<text class="name">产品单价</text>
					<text class="value">0.0</text>
				</li>
				<li>
					<text class="name">设备名称</text>
					<text class="value">{{ workItem.pmResName }}</text>
				</li>
				<li>
					<text class="name">工序</text>
					<text class="value">{{ workItem.pmOpName }}</text>
				</li>
				<li>
					<text class="name">班次</text>
					<text class="value">{{ workItem.dayShift }}</text>
				</li>
				<li>
					<text class="name">交货日期</text>
					<text class="value">{{ workItem.planendtime }}</text>
				</li>
				<li>
					<text class="name">执行时间</text>
					<text class="value">{{ workItem.planStartTime }}-{{ workItem.planendtime }}</text>
				</li>
				<li>
					<text class="name">工作时长</text>
					<text class="value">10分钟</text>
				</li>
				<li>
					<text class="name">BOM倍率</text>
					<text class="value">{{ workItem.bomComused }}</text>
				</li>
				<li>
					<text class="name">描述</text>
					<text class="value">{{ workItem.itemDesp }}</text>
				</li>
				<li>
					<text class="name">产品分类</text>
					<text class="value">{{ workItem.itemAttr1 }}</text>
				</li>
				<li>
					<text class="name">客户名称</text>
					<text class="value">{{ workItem.itemAttr2 }}</text>
				</li>
				<li>
					<text class="name">图纸版本号</text>
					<text class="value">{{ workItem.itemAttr3 }}</text>
				</li>
			</ul>
		</view>
		<view class="tableTitle">工单操作记录</view>
		<view class="tableWrap">
			<view class="tabContent">
				<ul class="fixedFiled">
					<li>事件名称</li>
					<li>切换结束并生产</li>
					<li>报工</li>
				</ul>
				<view class="filedContent">
					<ul class="filed">
						<li>
							<span>执行时间</span>
							<span>不良数</span>
							<span>完成数</span>
							<span>订单数</span>
							<span>操作人</span>
						</li>
						<li>
							<span>213</span>
							<span>789</span>
							<span>12312</span>
							<span>78686</span>
							<span>132123</span>
						</li>
						<li>
							<span>213</span>
							<span>789</span>
							<span>12312</span>
							<span>78686</span>
							<span>132123</span>
						</li>
					</ul>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			workItem: {}
		};
	},
	onLoad(option) {
		console.log(option);
		try {
			this.workItem = JSON.parse(decodeURIComponent(option.workItem));
			console.log(this.workItem);
		} catch (e) {
			//TODO handle the exception
		}
		// console.log("加载完成");
		// console.log("github项目文件")
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.content {
	padding: 0;
	.title {
		padding: 10upx 30upx;
		color: $uni-btn-active-color;
		font-weight: bolder;
	}
	.messageBox {
		padding: 10upx 30upx;
		.message{
			border-top: 2upx solid $uni-btn-active-color;
			border-bottom: 2upx solid $uni-btn-active-color;
			display: flex;
			.chart {
				display: block;
				width: 260upx;
				height: 260upx;
				text-align: center;
				line-height: 260upx;
			}
			.messageContent {
				flex-grow: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				.messageContentWrap {
					text {
						color: $uni-btn-active-color;
						font-size: 26upx;
						display: block;
					}
				}
			}
		}
		
	}
	.main {
		padding: 4upx 30upx;
		ul {
			padding: 0;
			li {
				border-bottom: 1upx solid #dddddd;
				list-style: none;
				padding: 1upx 0;
				text {
					color: #999999;
					font-size: 27upx;
				}
				.value {
					float: right;
				}
			}
		}
	}
	.tableTitle {
		padding: 0 30upx;
		background-color: $uni-btn-active-color;
		height: 60upx;
		line-height: 60upx;
		color: $uni-text-color-white;
		font-size: 28upx;
	}
	.tableWrap {
		padding: 10upx 30upx;
		width: 100%;
		height: 200upx;
		box-sizing: border-box;
		overflow: hidden;

		.tabContent {
			width: 100%;
			height: 100%;
			overflow-x: hidden;
			position: relative;
			ul {
				padding: 0;
				li {
					list-style: none;
				}
			}
			.fixedFiled {
				width: 200upx;
				text-align: center;
				position: absolute;
				left: 0;
				z-index: 10;
				li {
					font-size: 26upx;
					height: 50upx;
					line-height: 50upx;
					border-left: 1upx solid #c0c0c0;
					border-right: 1upx solid #c0c0c0;
					color: #999999;
				}
				li:first-child,
				li:last-child {
					border: 1upx solid #c0c0c0;
				}
			}
			.filedContent {
				width: calc(100% - 200upx);
				height: 100%;
				position: absolute;
				left: 101px;
				overflow-x: auto;
				overflow-y: hidden;
				padding: 0;
				.filed {
					width: 1010upx;
					li {
						text-align: center;
						height: 50upx;
						span {
							display: block;
							float: left;
							height: 100%;
							width: 200upx;
							font-size: 26upx;
							border-bottom: 1upx solid #c0c0c0;
							border-right: 1upx solid #c0c0c0;
							color: #999999;
							line-height: 50upx;
						}
					}
					li:first-child {
						span {
							border-top: 1upx solid #c0c0c0;
						}
					}
				}
			}
			.filedContent::-webkit-scrollbar {
				display: none;
			}
		}
		.tabContent::-webkit-scrollbar {
			display: none;
		}
	}
}
</style>
