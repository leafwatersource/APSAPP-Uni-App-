<template>
	<view class="content">
		<view class="title">
			<text class="name" v-text="'工单号码:'" />
			<text class="value" v-text="workItem.workID" /> 
		</view>
		<view class="messageBox">
			<ul class="messageTab">
				<li v-for="(item, index) in tabItem" v-text="item" :class="{ active: index === tabIndex ? true : false }" :key="index" @tap="TabClick(index, $event)" />
			</ul>
			<view class="message">
				<ul :style="{ left: -tabIndex * 100 + '%' }" v-if='dataMessage'>
					<li>
						<view class="qiun-charts chart">
							<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing" />
						</view>
						<view class="messageContent">
							<view class="messageContentWrap">
								<text v-text="'计划切换开始:'+dataMessage.planSetupStartTime" />
								<text v-text="'计划切换结束:'+dataMessage.planSetupEndTime" />
								<text v-text="'计划切换工时:'+(dataMessage.plannedSetupHours/60).toFixed(2)+'分钟'" />
								<text v-text="'实际切换工时:'+(dataMessage.mesSetupHours/60).toFixed(2)+'分钟'" />
								<text v-text="'差异工时:'+(dataMessage.mesSetupHours/60 - dataMessage.plannedSetupHours/60).toFixed(2)+'分钟'" />
								<text v-text="'切换达成率:'+setupNum[0]+'%'" />
							</view>
						</view>
					</li>
					<li>
						<view class="qiun-charts chart"><canvas canvas-id="ProductCanvasRing" id="ProductCanvasRing" class="charts" @touchstart="touchRing" /></view>
						<view class="messageContent">
							<view class="messageContentWrap">
								<text v-text="'计划生产开始:'+dataMessage.planStartTime" />
								<text v-text="'计划生产结束:'+dataMessage.planEndTime" />
								<text v-text="'计划生产工时:'+(dataMessage.plannedHours/3600 ).toFixed(2)+'小时'" />
								<text v-text="'实际生产工时:'+(dataMessage.mesHours/3600).toFixed(2)+'小时'" />
								<text v-text="'差异工时:'+(dataMessage.plannedHours/3600 - dataMessage.mesHours/3600).toFixed(2)+'小时'" />
								<text v-text="'生产达成率:'+parseInt(productNum[0])+'%'" />
							</view>
						</view>
					</li>
					<li>
						<view class="qiun-charts chart"><canvas canvas-id="finishRing" id="finishRing" class="charts" @touchstart="touchRing" /></view>
						<view class="messageContent">
							<view class="messageContentWrap">
								<text v-text="'计划数量:'+dataMessage.plannedQty.toFixed(2)" />
								<text v-text="'完成数量:'+dataMessage.finishedQty.toFixed(2)" />
								<text v-text="'良品数:'+dataMessage.finishedQty.toFixed(2)" />
								<text v-text="'不良数:'+dataMessage.failedQty.toFixed(2)" />
								<text v-text="'产品良率:'+parseInt(finishNum)+'%'" />
							</view>
						</view>
					</li>
				</ul>
			</view>
		</view>
		<view class="main" v-if="workItem">
			<ul>
				<li>
					<text class="name" v-text="'产品:'" />
					<text class="value" v-text="workItem.productID" />
				</li>
				<li>
					<text class="name" v-text="'产品单价:'" />
					<text class="value" v-text="workItem.unitPrice" />
				</li>
				<li>
					<text class="name" v-text="'设备名称:'" />
					<text class="value" v-text="workItem.pmResName" />
				</li>
				<li>
					<text class="name" v-text="'工序:'" />
					<text class="value" v-text="workItem.pmOpName" />
				</li>
				<li>
					<text class="name" v-text="'班次:'" />
					<text class="value" v-text="workItem.dayShift" />
				</li>
				<li>
					<text class="name" v-text="'交货日期:'" />
					<text class="value" v-text="workItem.planendtime" />
				</li>
				<li>
					<text class="name" v-text="'工作时长:'" />
					<text class="value" v-text="workItem.workHours" />
				</li>
				<li>
					<text class="name" v-text="'BOM倍率:'" />
					<text class="value" v-text="workItem.bomComused" /> 
				</li>
				<li>
					<text class="name" v-text="'描述:'" />
					<text class="value" v-text="workItem.itemDesp" />
				</li>
				<li v-if="workItem.itemAttr1">
					<text class="name" v-text="'产品分类:'" />
					<text class="value" v-text="workItem.itemAttr1" />
				</li>
				<li v-if="workItem.itemAttr2">
					<text class="name" v-text="'客户名称:'" />
					<text class="value" v-text="workItem.itemAttr2" /> 
				</li>
				<li v-if="workItem.itemAttr3">
					<text class="name" v-text="'图纸版本号:'" />
					<text class="value" v-text="workItem.itemAttr3" />
				</li>
			</ul>
		</view>
		<view class="tableTitleWrap"><view class="tableTitle" v-text="'订单生产记录'" /></view>
		<view class="tableWrap">
			<view class="tabContent">
				<ul class="fixedFiled">
					<li v-text="'事件名称'" />
					<li v-for="(item,index) in OpFinishHistory" v-text="item.eventMessage" v-if="OpFinishHistory" :key="index" />
				</ul>
				<view class="filedContent">
					<ul class="filed" v-if="OpFinishHistory">
						<li>
							<text v-text="'执行时间'" />
							<text v-text="'不良数'" />
							<text v-text="'完成数'" />
							<text v-text="'订单数'" />
							<text v-text="'计划数'" />
							<text v-text="'操作人'" />
						</li>
						<li v-for="(item,index) in OpFinishHistory" :key="index">
							<text v-text="item.eventTime" />
							<text v-text="item.failedQty " /> 
							<text v-text="item.finishedQty " /> 
							<text v-text="item.jobQty " /> 
							<text v-text="item.jobQty " /> 
							<text v-text="item.mesOperator " /> 
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
			OpFinishHistory: [],//事件
			tabItem: ['切换达成', '生产达成', '良率统计'],//切换按钮
			tabIndex: 0,//切换卡索引
			dataMessage: null,//统计图的数据
			setupNum: [],//生产工单的统计数据
			productNum:[],//生产达成率的统计数据
			finishNum:[],//良率统计数据
			productStatus:true,
			finishStatus:true,
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
					_self.pixelRatio =res.pixelRatio;
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
	},
	methods: {
		TabClick(index, e) {
			//切换卡的点击事件
			this.tabIndex = index;
			if(index==1 && this.productStatus){
				this.setProductNum();
			}else if(index ==2 && this.finishStatus){
				this.setFinishNum();
			}
		},
		getServerData() {
			//设置切换达成率样式
			let Ring = { series: [] };
			if(this.setupNum.length==1){
				Ring.series.push({
					name:'data1',
					data:this.setupNum[0],
					color:'#006dcb',
					show: true
				})
			}else if(this.setupNum.length==2){
				Ring.series.push({
					name:'data1',
					data:this.setupNum[0],
					color:'#006dcb',
					show: true
				},{
					name:'data2',
					data:this.setupNum[1],
					color:'#ddd',
				})
			}
			this.showRing('canvasRing', Ring,this.setupNum[0],'切换达成率');
		},
		setProductData(){
			//设置生产达成率的样式
			console.log(this.productNum)
			let Ring = { series: [] };
			if(this.productNum.length==1){
				Ring.series.push({
					name:'data1',
					data:this.productNum[0],
					color:'#006dcb',
					show: true
				})
			}else if(this.productNum.length==2){
				Ring.series.push({
					name:'data1',
					data:this.productNum[0],
					color:'#006dcb',
					show: true
				},{
					name:'data2',
					data:this.productNum[1],
					show: true,
					color:'#ddd'
				})
			}
			this.productStatus = false;
			this.showRing('ProductCanvasRing', Ring,this.productNum[0],'生产达成率');
		},
		showRing(canvasId, chartData,title,text) {
			//设置环状统计图
			let _this = this;
			 canvaRing = new uCharts({
			 				$this: _self,
			 				canvasId: canvasId,
			 				type: 'ring',
			 				fontSize: 11,
			 				legend: false,
			 				title: {
			 					name: parseInt(title)+'%',
			 					color: '#7cb5ec',
			 					fontSize: 18 * _self.pixelRatio,
			 					offsetY: 2 * _self.pixelRatio
			 				},
			 
			 				subtitle: {
			 					name: text,
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
			//获取统计图的数据
			this.$HTTP({
				url: 'OpFinish',
				data: {
					bean: JSON.stringify(this.workItem)
				}
			}).then(finish => {
				this.dataMessage = finish.data;
				this.plannedSetupHours = (this.dataMessage.plannedSetupHours*60).toFixed(1);
				this.mesHours = (this.dataMessage.mesHours/60).toFixed(2);
				this.setNum();
				
			});
		},
		setProductNum(){
			//计算生产达成率
			this.productNum = [];
			if(this.dataMessage.mesHours<=this.dataMessage.plannedHours){
				if(this.dataMessage.mesHours*100 ==0){
					this.productNum.push(parseInt(this.dataMessage.plannedHours));
				}else{
					this.productNum.push(parseInt(this.dataMessage.plannedHours/this.dataMessage.mesHours*100));
				}
				this.setProductData();
				return;
			}else if(this.dataMessage.mesHours>this.dataMessage.plannedHours){
				var plancycletime  = this.dataMessage.plannedHours / this.dataMessage.plannedQty;
				var mesplanusehours = this.dataMessage.finishedQty * plancycletime;
				var percent =mesplanusehours/ this.dataMessage.mesHours * 100;
				this.productNum.push(parseInt(percent));
				this.productNum.push(100-this.productNum[0]);
				this.setProductData();
				return;
			}
			// //计划>实际  plannedHours/plannedQty * (finishedQty+failedQty)/plannedHours 2个值 -->
		},
		setFinishNum(){
			//计算产品良率
			this.finishNum = [];
			this.finishNum.push((this.dataMessage.finishedQty - this.dataMessage.failedQty)/this.dataMessage.finishedQty *100);
			if(this.finishNum<100){
				this.finishNum.push(100-this.finishNum[0]);
			}
			let Ring = { series: [] };
			if(this.finishNum.length==1){
				Ring.series.push({
					name:'data1',
					data:this.finishNum[0],
					color:'#006dcb',
					show: true
				})
			}else if(this.finishNum.length==2){
				Ring.series.push({
					name:'一班',
					data:this.finishNum[0],
					color:'#006dcb',
					show: true
				},{
					name:'二班',
					data:this.finishNum[1],
					show: true,
					color:'#ddd'
				})
				}
				this.finishStatus = false;
			this.showRing('finishRing', Ring,this.finishNum[0],'良率统计');			
		},
		setNum() {
			//计算切换达成率
			if (this.dataMessage.plannedSetupHours == 0) {
				this.setupNum = [];
				this.setupNum.push(-100);
				this.getServerData();
				return;
			} else {
				if (this.dataMessage.mesSetupHours  <= this.dataMessage.plannedSetupHours ) {
					this.setupNum = [];
					this.setupNum.push((this.dataMessage.plannedSetupHours/this.dataMessage.mesSetupHours)* 100);
					console.log(this.setupNum);
					this.setProductData();
					return;
				} else if (this.dataMessage.mesSetupHours >  this.dataMessage.plannedSetupHours) {
					// 实际>计划
					this.setupNum = [];
					this.setupNum.push(parseInt(((this.dataMessage.plannedSetupHours/this.dataMessage.mesSetupHours)) * 100));
					this.setupNum.push(100 - this.setupNum[0]);
					this.getServerData();
				}
			}			
		},
		FinishHistory() {
			console.log('历史记录');
			this.$HTTP({
				url: 'OpFinishHistory',
				data: {
					orderuid: this.workItem.orderUID
				}
			}).then(success => {
				this.OpFinishHistory = success.data;
				console.log(this.OpFinishHistory)
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
				list-style: none;
				border-bottom: 1upx solid #828282;
				padding: 1upx 0;
				height: 50upx;
				text {
					color: #828282;
					font-size: 27upx;
					line-height: 50upx;
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
					color: #828282;
					border: 1upx solid #c0c0c0;
					border-top: none;
				}
				li:nth-child(2) {
					border-bottom: 1upx solid #c0c0c0;
				}
				li:first-child{
					border-top: 1upx solid #c0c0c0;
				}
			}
			.filedContent {
				width: calc(100% - 200upx);
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
						text {
							display: block;
							float: left;
							height: 100%;
							width: 220upx;
							font-size: 26upx;
							line-height: 50upx;
							border-bottom: 1upx solid #c0c0c0;
							border-right: 1upx solid #c0c0c0;
							color: #828282;
							line-height: 50upx;
						}
					}
					li:first-child {
						text {
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
