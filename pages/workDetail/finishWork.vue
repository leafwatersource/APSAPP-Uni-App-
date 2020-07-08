<template>
	<view class="content">
		<view class="title">
			<text class="name">工单号码:</text>
			<text class="value">{{ workItem.workID }}</text>
		</view>
		<view class="messageBox">
			<!-- 切换达成，生产达成，良率统计 -->
			<ul class="messageTab">
				<li class='active'>切换达成</li>
				<li>生产达成</li>
				<li>良率统计</li>
			</ul>
			<view class="message">
				<!-- <view class="chart" id="chart"> -->
					<view class="qiun-charts chart"><canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas></view>
				<!-- </view> -->
				<view class="messageContent">
					<view class="messageContentWrap">
						<text>计划开始:{{ workItem.planStartTime }}</text>
						<text>计划结束:{{ workItem.planendtime }}</text>
						<text>实际开始:{{ workItem.planStartTime }}</text>
						<text>实际结束:{{ workItem.planendtime }}</text>
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
					<text class="value">{{workItem.unitPrice}}</text>
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
					<text class="name">工作时长</text>
					<text class="value">{{workItem.workHours}}</text>
				</li>
				<li>
					<text class="name">BOM倍率</text>
					<text class="value">{{ workItem.bomComused }}</text>
				</li>
				<li>
					<text class="name">描述</text>
					<text class="value">{{ workItem.itemDesp }}</text>
				</li>
				<li v-if="workItem.itemAttr1">
					<text class="name">产品分类</text>
					<text class="value">{{ workItem.itemAttr1 }}</text>
				</li>
				<li v-if="workItem.itemAttr2">
					<text class="name">客户名称</text>
					<text class="value">{{ workItem.itemAttr2 }}</text>
				</li>
				<li v-if="workItem.itemAttr3">
					<text class="name">图纸版本号</text>
					<text class="value">{{ workItem.itemAttr3 }}</text>
				</li>
			</ul>
		</view>
		<view class="tableTitleWrap">
		<view class="tableTitle">订单生产记录</view>
		</view>
		<view class="tableWrap" >
			<view class="tabContent">
				<ul class="fixedFiled">
					<li>事件名称</li>
					<li v-for="item in OpFinishHistory" v-text='item.eventMessage'></li>
					<!-- <li>切换结束并生产</li>
					<li>报工</li> -->
				</ul>
				<view class="filedContent">
					<ul class="filed">
						<li>
							<span>执行时间</span>
							<span>不良数</span>
							<span>完成数</span>
							<span>订单数</span>
							<span>计划数</span>
							<span>操作人</span>
						</li>
						<li v-for="item in OpFinishHistory">
							<span>{{item.eventTime}}</span>
							<span>{{item.failedQty}}</span>
							<span>{{item.finishedQty}}</span>
							<span>{{item.jobQty}}</span>
							<span>{{item.jobQty}}</span>
							<span>{{item.mesOperator}}</span>
						</li>
					</ul>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uCharts from '../../commom/u-charts/u-charts.js';
var _self;
var canvaRing = null;
export default {
	data() {
		return {
			workItem: {},
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			serverData: '',
			OpFinishHistory:[],
		};
	},
	onLoad(option) {
		try {
			this.workItem = JSON.parse(decodeURIComponent(option.workItem));
		} catch (e) {
			//TODO handle the exception
			throw new Error('工单没有详细的信息');
		}
		_self = this;
		uni.getSystemInfo({
			success: function(res) {
				if (res.pixelRatio > 1) {
					//正常这里给2就行，如果pixelRatio=3性能会降低一点
					//_self.pixelRatio =res.pixelRatio;
					_self.pixelRatio = 1;
				}
			}
		});
		this.cWidth = uni.upx2px(260);
		this.cHeight = uni.upx2px(380);
		this.getServerData();
	},
	mounted() {
		this.FinishHistory();
		this.OpFinish();
		// this.initChart();
	},
	methods: {
		touchPie(e, id) {
			canvasObj[id].showToolTip(e, {
				format: function(item) {
					return item.name + ':' + item.data;
				}
			});
		},
		getServerData() {
			uni.request({
				url: 'https://www.ucharts.cn/data.json',
				data: {},
				success: function(res) {
					console.log(res.data.data);
					let Ring = { series: [] };
					//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
					Ring.series = res.data.data.Ring.series;
					_self.showRing('canvasRing', Ring);
				},
				fail: () => {
					_self.tips = '网络错误，小程序端请检查合法域名';
				}
			});
		},
		showRing(canvasId, chartData) {
			canvaRing = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'ring',
				fontSize: 11,
				legend: false,
				title: {
					name: '70%',
					color: '#7cb5ec',
					fontSize: 20 * _self.pixelRatio,
					offsetY: 200 * _self.pixelRatio
				},
				
				subtitle: {
					name: '切换达成率',
					color: '#666666',
					fontSize: 10 * _self.pixelRatio,
					offsetY: 1 * _self.pixelRatio
				},
				extra: {
					pie: {
						offsetAngle: -45,
						ringWidth: 10 * _self.pixelRatio,
						labelWidth: 10
					}
				},
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				series: chartData.series,
				animation: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				disablePieStroke: false,
				dataLabel: false,
			});
		},
		touchRing(e) {
			canvaRing.showToolTip(e, {
				format: function(item) {
					return item.name + ':' + item.data;
				}
			});
		},
		OpFinish(){
			let _this =this;
			this.$HTTP({
				url:'OpFinish',
				data:{
					'bean':JSON.stringify(this.workItem) 
				}
			}).then(finish=>{
				console.log(finish);
			})
		},
		FinishHistory(){
			console.log('历史记录');
			let _this = this;
			this.$HTTP({
				url:'OpFinishHistory',
				data:{
					'orderuid':this.workItem.orderUID
				}
			}).then(success=>{
				console.log(success);
				_this.OpFinishHistory = success.data;
			})
		}
	}
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
		.messageTab{
			padding: 0;
			border-top: 2upx solid $uni-btn-active-color;
			li{
				list-style: none;
				padding: 10upx 0;
				text-align: center;
				float: left;
				width: 200upx;
				color: $uni-btn-active-color;
				font-size: 28upx;
			}
			.active{
				background-color: $uni-btn-active-color;
				color: $uni-text-color-white;
			}
		}
		.messageTab::after{
			display: block;
			clear: both;
			content: "";
		}
		.message {
			border-top: 2upx solid $uni-btn-active-color;
			border-bottom: 2upx solid $uni-btn-active-color;
			display: flex;
			.chart {
				display: block;
				width: 260upx;
				height: 260upx;
				text-align: center;
				line-height: 260upx;
				background: #f2f2f2;
				.qiun-charts {
					width: 260upx;
					height: 260upx;
				}
				.charts {
					width: 260upx;
					height: 260upx;
				}
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
		padding: 10upx 30upx;
		ul {
			padding: 0;
			li {
				border-bottom: 1upx solid #828282;
				list-style: none;
				padding: 1upx 0;
				text {
					color: #828282;
					font-size: 27upx;
				}
				.value {
					float: right;
				}
			}
		}
	}
	.tableTitleWrap{
		padding: 0 30upx;
		height: 60upx;
		margin-top: 10upx;
		.tableTitle {
			padding: 0 30upx;
			background-color: $uni-btn-active-color;
			height: 100%;
			line-height: 60upx;
			color: $uni-text-color-white;
			font-size: 28upx;
		}
	}
	
	.tableWrap {
		padding: 10upx 30upx;
		width: 100%;
		height: 230upx;
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
					color: #828282;
				}
				li:nth-child(2){
					border-bottom: 1upx solid #c0c0c0;
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
					width: 1340upx;
					li {
						text-align: center;
						height: 50upx;
						span {
							display: block;
							float: left;
							height: 100%;
							width: 220upx;
							font-size: 26upx;
							border-bottom: 1upx solid #c0c0c0;
							border-right: 1upx solid #c0c0c0;
							color: #828282;
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
