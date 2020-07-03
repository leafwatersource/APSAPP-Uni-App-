<template>
	<view class="content">
		<view class="workIdBox">
			<text>工单号码:</text>
			<text>{{ workItem.workID }}</text>
		</view>
		<view class="title_box">
			<view class="chartBox">统计图</view>
			<view class="message_box">
				<view class="message_content">
					<text>计划开始:2020/12/30 23:33:58</text>
					<text>计划结束:2020/12/30 23:33:58</text>
					<text>实际开始:2020/12/30 23:33:58</text>
					<text>实际结束:2020/12/30 23:33:58</text>
					<text>差异工时:30分钟</text>
					<text>工序达成率:80%</text>
				</view>
			</view>
		</view>
		<ul>
			<li>
				<text class="name">产品:</text>
				<text class="value">{{ workItem.productID }}</text>
			</li>
			<li class="item">
				<text class="name">产品单价:</text>
				<text class="value">0.0</text>
			</li>
			<li class="item">
				<text class="name">设备名称:</text>
				<text class="value">{{ workItem.pmResName }}</text>
			</li>
			<li class="item">
				<text class="name">工序:</text>
				<text class="value">{{workItem.pmOpName}}</text>
			</li>
			<li class="item">
				<text class="name">班次:</text>
				<text class="value">{{ workItem.dayShift }}</text>
			</li>
			<li class="item">
				<text class="name">交货时间:</text>
				<text class="value">{{ workItem.planendtime }}</text>
			</li>
			<li class="item">
				<text class="name">执行时间:</text>
				<text class="value">{{ workItem.planStartTime }}</text>
			</li>
			<li class="item">
				<text class="name">工作时长:</text>
				<text class="value">{{ workItem.workHours }}</text>
			</li>
			<li class="item">
				<text class="name">BOM倍率:</text>
				<text class="value">{{ workItem.bomComused }}</text>
			</li>
			<li class="item">
				<text class="name">描述:</text>
				<text class="value">{{ workItem.pmOpName }}</text>
			</li>			
			<li class="item">
				<text class="name">产品分类:</text>
				<text class="value">{{ workItem.itemAttr1 }}</text>
			</li>
			<li class="item">
				<text class="name">客户名称:</text>
				<text class="value">{{ workItem.itemAttr2 }}</text>
			</li>
			<li class="item">
				<text class="name">图纸版本号:</text>
				<text class="value">{{ workItem.itemAttr3 }}</text>
			</li>
		</ul>
		<view class="history-title">工单操作历史记录</view>
		<view class="table_content">
			<table>
				<tr>
					<th>事件名称</th>
					<th>执行时间</th>
					<th>不良数</th>
					<th>完成数</th>
					<th>订单数</th>
				</tr>
				<tr v-for="item in 8">
					<td>开始切换</td>
					<td>2020/07/01 10:10:10</td>
					<td>0.0</td>
					<td>0.0</td>
					<td>100</td>
				</tr>
				<tr>
					<td>结束切换并生产</td>
					<td>2020/07/01 10:10:10</td>
					<td>0.0</td>
					<td>0.0</td>
					<td>100</td>
				</tr>
				<tr>
					<td>报工</td>
					<td>2020/07/01 10:10:10</td>
					<td>0.0</td>
					<td>0.0</td>
					<td>100</td>
				</tr>
			</table>
		</view>
	</view>
</template>

<script>
export default {
	onLoad(option) {
		this.workItem = JSON.parse(option.workItem);
		console.log(this.workItem)
	},
	data() {
		return {
			workItem: []
		};
	}
};
</script>

<style lang="scss" scoped>
.content {
	padding: 0;
	.workIdBox {
		padding: 10upx 15upx;
		text {
			color: $uni-btn-active-color;
			font-weight: bolder;
		}
		text:last-child {
			float: right;
		}
	}
	.title_box {
		width: 100%;
		box-sizing: border-box;
		height: 260upx;
		display: flex;
		border-top: 2upx solid #c0c0c0;
		border-bottom: 2upx solid #c0c0c0;
		padding: 10upx 0;
		.chartBox {
			width: 40%;
			height: 100%;
			padding: 0 15upx;
		}
		.message_box {
			width: 60%;
			height: 100%;
			padding-right: 15upx;
			.message_content {
				float: right;
				margin: auto 0;
				text {
					display: block;
					font-size: 24upx;
					margin: 2upx 0;
					color: $uni-btn-active-color;
				}
			}
		}
	}
	ul {
		padding: 0;
		li {
			width: 100%;
			position: relative;
			padding: 0 15upx;
			box-sizing: border-box;
			list-style: none;
			border-bottom: 1px solid #ddd;
			text {
				color: #999;
				font-size: 27upx;
			}
			.value {
				position: absolute;
				right: 15upx;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
	.history-title {
		height: 60upx;
		width: 100%;
		background-color: $uni-btn-active-color;
		color: $uni-text-color-white;
		padding: 0 15upx;
		line-height: 60upx;
		box-sizing: border-box;
	}
	.table_content {
		width: 100%;
		height: 290upx;
		box-sizing: border-box;
		overflow-y: scroll;
		table {
			border: 1px solid #ccc;
			width: 100%;
			th,
			td {
				height: 20upx;
				border: 1px solid #c0c0c0;
				font-size: 24upx;
				color: #888;
				text-align: center;
			}
		}
	}
}
</style>
