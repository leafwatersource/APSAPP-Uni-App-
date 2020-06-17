<template>
	<view class="content">
		<view class="Main">
			<text class="workId">{{i18n.workDetail.workID}}{{ workItem.workID }}</text>
			<view class="NumBox">
				<view>
					<text class="Number">{{ workItem.jobQty }}</text>
					<text class="NumDesc">{{i18n.workDetail.total}}</text>
				</view>
				<view>
					<text class="Number">{{ workItem.plannedqty }}</text>
					<text class="NumDesc">{{i18n.workDetail.PlannedQuantity}}</text>
				</view>
				<view>
					<text class="Number">{{ workItem.finishedQty }}</text>
					<text class="NumDesc">{{i18n.workDetail.EquipmentCompleted}}</text>
				</view>
				<view>
					<text class="Number">{{ workItem.allFinishedQty }}</text>
					<text class="NumDesc">{{i18n.workDetail.CumulativeCompletions}}</text>
				</view>
			</view>
			<view class="workItem">
				<text class="name">
					{{i18n.workDetail.productName}}
					<text class="value">{{ workItem.productID }}</text>
				</text>
				<text class="name">
					{{i18n.workDetail.resName}}
					<text class="value">{{ workItem.pmResName }}</text>
				</text>
				<text class="name">
					{{i18n.workDetail.Process}}
					<text class="value">{{ workItem.pmOpName }}</text>
				</text>
				<text class="name">
					{{i18n.workDetail.WorkShift}}
					<text class="value">{{ workItem.dayShift }}</text>
				</text>
				<text class="name">
					{{i18n.workDetail.PlanningTime}}
					<text class="value">{{ workItem.planStartTime }} - {{ workItem.planendtime }}</text>
				</text>
				<text class="name">
					{{i18n.workDetail.WorkTime}}
					<text class="value">{{ workItem.workHours }}</text>
				</text>
				<text class="name">
					{{i18n.workDetail.BOMRatio}}
					<text class="value">{{ workItem.bomComused }}</text>
				</text>
				<text class="name">
					{{i18n.workDetail.ProductDescription}}
					<text class="value">{{ workItem.itemAttr1 }}</text>
				</text>
				<text class="name">
					{{i18n.workDetail.ProductCategories}}
					<text class="value">{{ workItem.itemAttr3 }}</text>
				</text>
			</view>

			<view class="finishBox" v-if="workItem.taskFinishState == 2">
				<text>{{i18n.workDetail.Finish}}</text>
				<view class="uni-input-wrapper inputBox">
					<input class="uni-input" type="number" placeholder="0" v-model="finishValue" @input="FinishClearInput" />
					<icon class="uni-icon closeIcon" v-if="finishShowClearIcon" @click="finishClearIcon" type="clear" size="18" />
				</view>
			</view>
			<view class="failBox" v-if="workItem.taskFinishState == 2">
				<text>{{i18n.workDetail.Fail}}</text>
				<view class="uni-input-wrapper inputBox">
					<input class="uni-input" type="number" placeholder="0" v-model="failValue" @input="FailClearInput" />
					<icon class="uni-icon closeIcon" v-if="failShowClearIcon" @click="failClearIcon" type="clear" size="18" />
				</view>
			</view>
			<view class="selectTime" v-if="workItem.taskFinishState == 2">
				<text class="timer">{{i18n.workDetail.ReportTime}}</text>
				<view>
					<text class="datetime">{{ datetime }}</text>
					<text class="select" @click="onShowDatePicker('datetime')">{{i18n.workDetail.select}}</text>
				</view>
			</view>
			<mx-date-picker :show="showPicker" :type="type" :value="datetime" :show-tips="true" :show-seconds="false" @confirm="onSelected" @cancel="onSelected" />
		</view>
		<view class="footer" v-if="workItem.taskFinishState != 4">
			<button
				type="default"
				@click="btnClick"
				:class="{ btnWork: true, darkBtn: !workItem.canReport }"
				:hover-class="{ hoverBtn: workItem.canReport }"
				v-if="workItem.taskFinishState == 0"
			>
			{{i18n.workDetail.change}}	
			</button>
			<button
				type="default"
				@click="btnClick"
				:class="{ btnWork: true, darkBtn: !workItem.canReport }"
				:hover-class="{ hoverBtn: workItem.canReport }"
				v-else-if="workItem.taskFinishState == 1"
			>
			{{i18n.workDetail.Product}}	
			</button>
			<button
				type="default"
				@click="btnClick"
				:class="{ btnWork: true, darkBtn: !workItem.canReport }"
				:hover-class="{ hoverBtn: workItem.canReport }"
				v-else-if="workItem.taskFinishState == 2"
			>
				{{i18n.workDetail.Report}}
			</button>
			<button
				type="default"
				@click="btnClick"
				:class="{ btnWork: true, darkBtn: !workItem.canReport }"
				:hover-class="{ hoverBtn: workItem.canReport }"
				v-else-if="workItem.taskFinishState == 3"
			>
					{{i18n.workDetail.resumeProduction}}
			</button>
			<view class="parseChangeBtn">
				<view class="parseBox" @click="parseBtn">
					<text class="fa fa-pause pause"></text>
					<text class="parseText">{{i18n.workDetail.pause}}</text>
				</view>
				<view class="parseBox">
					<text class="fa fa-moon-o pause"></text>
					<text class="parseText">{{i18n.workDetail.relieve}}</text>
				</view>
				<view class="changeResBox" @tap="changeRes">
					<text class="fa fa-refresh change"></text>
					<text class="changeText">{{i18n.workDetail.SwitchDevice}}</text>
				</view>
				<uni-drawer :visible="showLeft" mode="left" @close="closeDrawer()">
					<uni-list><uni-list-item v-for="item in changeResArr" :title="item" note="" @tap="enterChangeRes(item)"></uni-list-item></uni-list>
				</uni-drawer>
			</view>
		</view>
	</view>
</template>

<script>
import MxDatePicker from '@/components/mx-datepicker/mx-datepicker';
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
export default {
	components: {
		MxDatePicker,
		uniDrawer
	},
	onLoad(option) {
		console.log(option);
		if (option.workItem) {
			this.workItem = JSON.parse(decodeURIComponent(option.workItem));
			this.finishValue = this.workItem.canReportQty;
			console.log(this.workItem);
		} else if (option.res) {
			console.log(option);
		}
	},
	data() {
		return {
			workItem: null,
			finishShowClearIcon: false,
			failShowClearIcon: false,
			finishValue: '',
			failValue: 0,
			datetime: '',
			type: 'rangetime',
			showPicker: false,
			showLeft: false, //左边
			changeResArr: []
		};
	},
	mounted() {
		// plus.nativeUI.setUiStyle("dark");
		// console.log(plus.navigator.getUiStyle())
		// uni.onUIStyleChange(function (res) {
		//     console.log(res);
		// });
		console.log(this.workItem);
		this.datetime = this.getNowDateTime();
	},
	computed:{
		i18n () {
			return this.$t('message'); 
		},
	},
	methods: {
		closeDrawer() {
			this.showLeft = false;
		},
		finishClearIcon() {
			this.finishValue = '';
			this.finishShowClearIcon = false;
		},
		failClearIcon() {
			this.failValue = '';
			this.failShowClearIcon = false;
		},
		FinishClearInput(event) {
			this.finishValue = event.detail.value;
			if (event.detail.value.length > 0) {
				this.finishShowClearIcon = true;
			} else {
				this.finishShowClearIcon = false;
			}
		},
		FailClearInput(event) {
			this.failValue = event.detail.value;
			if (event.detail.value.length > 0) {
				this.failShowClearIcon = true;
			} else {
				this.failShowClearIcon = false;
			}
		},
		onShowDatePicker(type) {
			//显示
			this.type = type;
			this.showPicker = true;
		},
		onSelected(e) {
			//选择
			this.showPicker = false;
			if (e) {
				this[this.type] = e.value;
			}
		},
		changeRes() {
			if (this.workItem.taskFinishState == 2) {
				uni.showToast({
					title: '该工单在生产不能切换设备',
					icon: 'none'
				});
				return;
			}
			this.showLeft = true;
			const UserGuid = uni.getStorageSync('UserGuid');
			const UserEmpID = uni.getStorageSync('UserEmpID');
			const _this = this;
			this.$HTTP({
				url: 'GetCanChangeResList',
				data: {
					bean: JSON.stringify(this.workItem)
				}
			}).then(resList => {
				_this.changeResArr = [];
				_this.changeResArr.push(...resList.data);
			});
		},
		getNowDateTime() {
			var date = new Date();
			const year = date.getFullYear();
			const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
			const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
			const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
			const min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
			return year + '/' + month + '/' + day + ' ' + hour + ':' + min;
		},
		btnClick() {
			const userInfo = uni.getStorageSync('userInfo');
			this.workItem.mesOperator = userInfo['userName'];
			this.workItem.mesOpName = this.workItem.pmOpName;
			this.workItem.mesResName = this.workItem.pmResName;
			if (this.workItem.canReport) {
				if (this.workItem.taskFinishState == 0) {
					this.pullData('BeginChange');
				} else if (this.workItem.taskFinishState == 1) {
					this.pullData('EndChange');
				} else if (this.workItem.taskFinishState == 2) {
					console.log(this.finishValue, this.failValue);
					console.log(this.datetime);
					console.log(this.workItem.canReportQty);
					if (parseInt(this.finishValue) + parseInt(this.failValue) > this.workItem.canReportQty) {
						uni.showToast({
							title: '完成数加不良数不能超过工单总数',
							icon: 'none'
						});
						return;
					}
					this.workItem.finishedQty = this.finishValue;
					this.workItem.failedQty = parseInt(this.failValue);
					this.workItem.reportTime = this.datetime;
					this.pullData('Report');
				} else if (this.workItem.taskFinishState == 3) {
					this.pullData('ResumeOrder');
				}
			}
		},
		parseBtn() {
			this.pullData('PauseOrder', true);
		},
		pullData(type, parseState) {
			const _this = this;
			this.$HTTP({
				url: type,
				data: {
					bean: JSON.stringify(this.workItem)
				}
			}).then(data => {
				console.log(data);
				if (parseState) {
					_this.workItem.taskFinishState = 3;
					uni.navigateBack({
						delta: 1,
						animationType: 'pop-out',
						animationDuration: 200
					});
					return;
				}
				if (_this.workItem.taskFinishState == 0) {
					_this.workItem.taskFinishState = 1;
				} else if (_this.workItem.taskFinishState == 1) {
					_this.workItem.taskFinishState = 2;
				} else if (_this.workItem.taskFinishState == 3) {
					_this.workItem.taskFinishState = 0;
				}
				uni.navigateBack({
					delta: 1,
					animationType: 'pop-out',
					animationDuration: 200
				});
			});
		},
		enterChangeRes(resName) {
			this.workItem.changeResName = resName;
			const _this = this;
			this.$HTTP({
				url: 'ChangeResource',
				data: {
					bean: JSON.stringify(this.workItem)
				}
			}).then(status => {
				if (status.data) {
					uni.navigateBack({
						delta: 1,
						animationType: 'pop-out',
						animationDuration: 200
					});
				}
			});
		}
	}
};
</script>
<style scoped lang="scss">
@import '@/commom/font-awesome-4.7.0/css/font-awesome.min.css';

.content {
	padding: 0 !important;
	background-color: $uni-text-color-white;

	.Main {
		.workId {
			display: block;
			color: $uni-btn-active-color;
			font-weight: 500;
			padding: 6upx 30upx;
			font-size: 35upx;
		}

		.NumBox {
			width: 96%;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			height: 140upx;
			border-top: 1px solid #ccc;
			border-bottom: 1px solid #ccc;
			box-sizing: border-box;
			margin: 0 auto;

			view {
				box-sizing: border-box;
				position: relative;
				height: 80%;
				margin: auto 0;
				width: calc(100% / 4 - 4upx);
				text-align: center;
				border-right: 1px solid #ccc;

				.Number {
					color: $uni-btn-active-color;
					display: block;
					width: 100%;
					font-size: 35upx;
					font-weight: bolder;
				}

				.NumDesc {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					color: #999;
				}
			}

			view:last-child {
				border-right: none;
			}
		}

		.workItem {
			border-bottom: 1px solid #ccc;
			padding: 20upx 0;
			text {
				color: #999;
				padding: 10upx 30upx;
				font-size: 30upx;
			}
			.name {
				box-sizing: border-box;
				display: block;
				border-bottom: 1upx solid #CCCCCC;
				width: 100%;
			}
			.name:last-child{
				border: none;
			}
			.value {
				padding: 0;
				display: inline-block;
				float: right;
			}
		}

		.finishBox,
		.failBox {
			position: relative;
			margin: 1upx 0;
			background-color: $uni-bg-color;
			padding: 16upx 28upx;
			font-size: 18px;
			color: #555555;

			text {
				width: 30%;
			}

			.inputBox {
				position: absolute;
				width: 70%;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
			}

			.closeIcon {
				position: absolute;
				top: 50%;
				right: 28upx;
				transform: translateY(-50%);
			}
		}

		.selectTime {
			margin: 1upx 0;
			margin-bottom: 200upx;
			background-color: $uni-bg-color;
			padding: 16upx 28upx;
			color: #555555;
			font-size: 18px;

			view {
				float: right;
				width: 60%;
			}

			.select {
				float: right;
				color: #0faeff;
			}
			.timer {
				float: left;
				width: 40%;
			}
		}
	}

	.footer {
		border-top: 1px solid #e3e3e3;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		background-color: $uni-text-color-white;
		padding: 10upx 0;

		.btnWork {
			width: 40%;
			float: left;
			background-color: $uni-btn-active-color;
			color: $uni-text-color-white;
			border-radius: 60upx;
			line-height: 120upx;
			height: 100%;
			margin: auto 0;
			margin-right: 20upx;
			margin-left: 10upx;
			font-size: 30upx;
		}
		.darkBtn {
			background-color: #cccccc;
		}
		.hoverBtn {
			background-color: $uni-gb-color-blue;
		}

		.parseChangeBtn {
			display: flex;
			justify-content: space-around;
			height: 100%;

			view {
				text-align: center;

				.pause,
				.change {
					color: $uni-btn-active-color;
					display: block;
					font-size: 40upx;
					margin-bottom: 2upx;
					line-height: 60upx;
				}
				.parseText,
				.changeText {
					color: $uni-btn-active-color;
				}
			}
		}
	}
}
</style>
