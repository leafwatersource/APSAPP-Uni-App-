<template>
	<view class="content">
		<view class="title">
			<text class="name">工单号码:</text>
			<text class="value">{{ workItem.workID }}</text>
		</view>
		<view class="messageBox">
			<ul class="messageTab">
				<li v-for="(item, index) in tabItem" v-text="item" :class="{ active: index === tabIndex ? true : false }" @tap="TabClick(index, $event)"></li>
			</ul>
			<view class="message">
				<!-- <ul> -->
				<ul :style="{ left: -tabIndex * 100 + '%' }">
					<li>
						<view class="qiun-charts chart">
							<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas>
						</view>
						<view class="messageContent">
							<view class="messageContentWrap">
								<text>计划切换开始:{{ dataMessage.planSetupStartTime }}</text>
								<text>计划切换结束:{{ dataMessage.planSetupEndTime }}</text>
								<text>计划切换工时:{{ plannedSetupHours }}分钟</text>
								<!-- //分钟 -->
								<text>实际切换工时:{{ mesSetupHours }}分钟</text>
								<!-- //分钟 -->
								<text>差异工时:{{ mesSetupHours - plannedSetupHours }}分钟</text>
								<text>切换达成率:{{setupNum[0]}}%</text>
							</view>
						</view>
						<!-- //实际小于计划：（（（计划-实际）/计划）+1）*100 百分比
						//计划为0：-100%
						//实际>计划  （（实际-计划）/计划）*100   100-(（实际-计划）/计划）*100 -->
					</li>
					<li>
						<view class="qiun-charts chart"><canvas canvas-id="canvasRing" id="ProductCanvasRing" class="charts" @touchstart="touchRing"></canvas></view>
						<view class="messageContent">
							<view class="messageContentWrap">
								<text>计划生产开始:{{ dataMessage.planStartTime }}</text>
								<text>计划生产结束:{{ dataMessage.planEndTime }}</text>
								<text>计划生产工时:{{plannedHours }}分钟</text>
								<!-- //小时 -->
								<text>实际生产工时:{{mesHours}}分钟</text>
								<!-- //分钟 -->
								<text>差异工时:{{mesHours - plannedHours }}分钟</text>
								<!-- //计划-实际 -->
								<text>生产达成率:{{setupNum[0]}}%</text>
								<!-- // 实际>计划 实际/计划*100 1个值
								//计划>实际  plannedHours/plannedQty * (finishedQty+failedQty)/plannedHours 2个值 -->
							</view>
						</view>
					</li>
					<li>
						<view class="qiun-charts chart"><canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas></view>
						<view class="messageContent">
							<view class="messageContentWrap">
								<text>计划数量:{{ workItem.plannedQty }}</text>
								<text>完成数量:{{ workItem.finishedQty }}</text>
								<text>良品数:{{ workItem.finishedQty }}</text>
								<text>不良数:{{ workItem.failedQty }}</text>
								<text>产品良率:80%</text>
								<!-- //finishedQty/finishedQty+failedQty -->
							</view>
						</view>
					</li>
				</ul>
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
					<text class="value">{{ workItem.unitPrice }}</text>
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
					<text class="value">{{ workItem.workHours }}</text>
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
		<view class="tableTitleWrap"><view class="tableTitle">订单生产记录</view></view>
		<view class="tableWrap">
			<view class="tabContent">
				<ul class="fixedFiled">
					<li>事件名称</li>
					<li v-for="item in OpFinishHistory" v-text="item.eventMessage"></li>
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
							<span>{{ item.eventTime }}</span>
							<span>{{ item.failedQty }}</span>
							<span>{{ item.finishedQty }}</span>
							<span>{{ item.jobQty }}</span>
							<span>{{ item.jobQty }}</span>
							<span>{{ item.mesOperator }}</span>
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
			OpFinishHistory: [],
			tabItem: ['切换达成', '生产达成', '良率统计'],
			tabIndex: 0,
			dataMessage: null,
			setupNum: [],
			mesSetupHours:null,
			plannedSetupHours:null,
			productNum:[],
			plannedHours:null,
			mesHours:null
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
		
	},
	mounted() {
		this.FinishHistory();
		this.OpFinish();
		// this.initChart();
		this.text();
	},
	methods: {
		TabClick(index, e) {
			this.tabIndex = index;
		},
		touchPie(e, id) {
			canvasObj[id].showToolTip(e, {
				format: function(item) {
					return item.name + ':' + item.data;
				}
			});
		},
		getServerData() {
			console.log("设置统计图");
			let Ring = { series: [] };
			//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
			// Ring.series = res.data.data.Ring.series;
		
			if(this.setupNum.length==1){
				Ring.series.push({
					name:'一班',
					data:this.setupNum[0],
					color:'#429AF1',
					show: true,
					legendShape: "circle",
					pointShape: "circle",
					type: "ring"
				})
			}else if(this.setupNum.length==2){
				Ring.series.push({
					name:'一班',
					data:this.setupNum[0],
					color:'#429AF1',
					show: true
				},{
					name:'二班',
					data:this.setupNum[1]
				})
			}
			// Ring.series = [
			// 	{
			// 		name: '一班',
			// 		data: 100
			// 	},
			// 	{
			// 		name: '二班',
			// 		data: 50
			// 	}
			// ];
			console.log(Ring);
			this.showRing('canvasRing', Ring);
		},
		setProductData(){
			let Ring = { series: [] };
			//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
			// Ring.series = res.data.data.Ring.series;
					
			if(this.productNum.length==1){
				Ring.series.push({
					name:'一班',
					data:this.productNum[0],
					color:'#429AF1',
					show: true,
					legendShape: "circle",
					pointShape: "circle",
					type: "ring"
				})
			}else if(this.productNum.length==2){
				Ring.series.push({
					name:'一班',
					data:this.productNum[0],
					color:'#429AF1',
					show: true
				},{
					name:'二班',
					data:this.setupNum[1]
				})
			}
			console.log(Ring);
			this.showRing('ProductCanvasRing', Ring);
		},
		showRing(canvasId, chartData) {
			let _this = this;
			 canvaRing = new uCharts({
			 				$this: _self,
			 				canvasId: canvasId,
			 				type: 'ring',
			 				fontSize: 11,
			 				legend: false,
			 				title: {
			 					name: _this.setupNum[0]+'%',
			 					color: '#7cb5ec',
			 					fontSize: 18 * _self.pixelRatio,
			 					offsetY: 2 * _self.pixelRatio
			 				},
			 
			 				subtitle: {
			 					name: '切换达成率',
			 					color: '#666666',
			 					fontSize: 10 * _self.pixelRatio,
			 					offsetY: 1 * _self.pixelRatio
			 				},
			 				extra: {
			 					pie: {
			 						offsetAngle: -5,
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
			 				dataLabel: false
			 			});
		},
		touchRing(e) {
			canvaRing.showToolTip(e, {
				format: function(item) {
					return item.name + ':' + item.data;
				}
			});
		},
		OpFinish() {
			let _this = this;
			this.$HTTP({
				url: 'OpFinish',
				data: {
					bean: JSON.stringify(this.workItem)
				}
			}).then(finish => {
				console.log(finish);
				_this.dataMessage = finish.data;
				this.mesSetupHours = _this.dataMessage.mesSetupHours*60;
				this.plannedSetupHours = this.dataMessage.plannedSetupHours*60;
				this.plannedHours = this.dataMessage.plannedHours*60;
				this.mesHours = this.dataMessage.mesHours*60;
				_this.setNum();
			});
		},
		setNum() {
			console.log('setNum');
			console.log(this.plannedSetupHours, '计划');
			console.log(this.mesSetupHours, '实际');
			// plannedSetupHours 
			// <!-- //分钟 -->
			// mesSetupTime
			if (this.plannedSetupHours == 0) {
				// this.setupNum = [];
				// this.setupNum.push(-100);
				// console.log(this.setupNum);
				// this.getServerData();
				// return;
			} else {
				if (this.mesSetupHours < this.plannedSetupHours) {
					console.log('计划大于实际')
					this.setupNum = [];
					this.setupNum.push(((this.plannedSetupHours - this.mesSetupHours) / this.plannedSetupHours + 1) * 100);
					console.log(this.setupNum);
					// this.productNum.push(this.plannedHours/this.dataMessage.plannedQty*(this.dataMessage.finishedQty+this.dataMessage.failedQty)/this.plannedHours)
					this.getServerData();
					this.setProductData();
					return;
				} else if (this.mesSetupHours > this.plannedSetupHours) {
					// 实际>计划
					console.log("实际大于计划")
					this.setupNum = [];
					this.setupNum.push(((this.mesSetupHours - this.plannedSetupHours) / this.plannedSetupHours) * 100);
					this.setupNum.push(100 - this.setupNum[0]);
					console.log(this.setupNum);
					//生产率
					// 实际/计划*100
					// this.productNum.push(this.mesHours/this.plannedHours*100);
					this.getServerData();
				}
			}
			console.log(this.setupNum);
			
		},
		FinishHistory() {
			console.log('历史记录');
			let _this = this;
			this.$HTTP({
				url: 'OpFinishHistory',
				data: {
					orderuid: this.workItem.orderUID
				}
			}).then(success => {
				console.log(success);
				_this.OpFinishHistory = success.data;
			});
		},
		 text(){
		                uni.request({
		                    url: 'https://www.easy-mock.com/mock/5cc586b64fc5576cba3d647b/uni-wx-charts/chartsdata2',
		                    data:{
		                    },
		                    success: function(res) {
		                        let Ring={series:[]};
		                        //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
		                        Ring.series=res.data.data.Ring.series;
								console.log(Ring)
		                        // _self.showRing("canvasRing",Ring);
		                    },
		                    fail: () => {
		                        _self.tips="网络错误，小程序端请检查合法域名";
		                    },
		                });
		            },
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
		.messageTab {
			padding: 0;
			border-top: 2upx solid $uni-btn-active-color;
			li {
				list-style: none;
				padding: 10upx 0;
				text-align: center;
				float: left;
				width: 200upx;
				color: $uni-btn-active-color;
				font-size: 28upx;
			}
			.active {
				background-color: $uni-btn-active-color;
				color: $uni-text-color-white;
			}
		}
		.messageTab::after {
			display: block;
			clear: both;
			content: '';
		}
		.message {
			position: relative;
			border-top: 2upx solid $uni-btn-active-color;
			border-bottom: 2upx solid $uni-btn-active-color;
			height: 260upx;
			width: 100%;
			overflow: hidden;
			ul {
				position: absolute;
				left: -200upx;
				top: 0;
				padding: 0;
				width: 300%;
				height: 100%;
				transition: left 0.1s linear;
				-moz-transition: left 0.1s linear; /* Firefox 4 */
				-webkit-transition: left 0.1s linear; /* Safari and Chrome */
				-o-transition: left 0.1s linear;
				li {
					width: 33.3%;
					height: 100%;
					list-style: none;
					display: flex;
					float: left;
					.chart {
						position: relative;
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
							display: inline-block;
							position: absolute;
							left: 50%;
							top: 50%;
							transform: translate(-50%,-50%);
							padding: 0;
							width: 260upx;
							// background-color: ;
							// height: 260upx;
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
	.tableTitleWrap {
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
				li:nth-child(2) {
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
