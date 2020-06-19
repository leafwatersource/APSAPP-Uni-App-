<template>
	<view class="content">
		<view class="Main">
			<text class="workId">{{ i18n.publicText.Workorder_Workid }}{{ workItem.workID }}</text>
			<view class="NumBox">
				<view>
					<text class="Number">{{ workItem.jobQty }}</text>
					<text class="NumDesc">{{ i18n.publicText.Workorder_JobQty }}</text>
				</view>
				<view>
					<text class="Number">{{ workItem.plannedqty }}</text>
					<text class="NumDesc">{{ i18n.publicText.Workorder_PlannedQty }}</text>
				</view>
				<view>
					<text class="Number">{{ workItem.finishedQty }}</text>
					<text class="NumDesc">{{ i18n.publicText.Workorder_FinishedQty }}</text>
				</view>
				<view>
					<text class="Number">{{ workItem.allFinishedQty }}</text>
					<text class="NumDesc">{{ i18n.publicText.Workorder_AllFinishedQty }}</text>
				</view>
			</view>
			<view class="workItem">
				<view class="item">
					<text class="name">{{ i18n.publicText.Workorder_Product }}</text>
					<text class="value">{{ workItem.productID }}</text>
				</view>
				<view class="item">
					<text class="name">{{ i18n.publicText.Workorder_ResName }}</text>
					<text class="value">{{ workItem.pmResName }}</text>
				</view>
				<view class="item">
					<text class="name">{{ i18n.publicText.Workorder_Operation }}</text>
					<text class="value">{{ workItem.pmOpName }}</text>
				</view>
				<view class="item">
					<text class="name">{{ i18n.publicText.Workorder_WorkHours }}</text>
					<text class="value">{{ workItem.dayShift }}</text>
				</view>
				<view class="item">
					<text class="name">{{ i18n.publicText.Workorder_Planstartendtime }}</text>
					<text class="value">{{ workItem.planStartTime }} - {{ workItem.planendtime }}</text>
				</view>
				<view class="item">
					<text class="name">{{ i18n.publicText.Workorder_WorkHours }}</text>
					<text class="value">{{ workItem.workHours }}</text>
				</view>
				<view class="item">
					<text class="name">{{ i18n.publicText.Workorder_BomUsed }}</text>
					<text class="value">{{ workItem.bomComused }}</text>
				</view>
				<view class="item">
					<text class="name">{{ i18n.publicText.Workorder_ItemAttr1 }}</text>
					<text class="value">{{ workItem.itemAttr1 }}</text>
				</view>
				<view class="item">
					<text class="name">{{ i18n.publicText.Workorder_ItemAttr2 }}</text>
					<text class="value">{{ workItem.itemAttr2 }}</text>
				</view>
				<view class="item">
					<text class="name">{{ i18n.publicText.Workorder_ItemAttr3 }}</text>
					<text class="value">{{ workItem.itemAttr3 }}</text>
				</view>
			</view>

			<view class="finishBox" v-if="workItem.taskFinishState == 2">
				<view class="name">{{ i18n.publicText.Workorder_Inputfinishedqty }}</view>
				<view class="uni-input-wrapper inputBox">
					<input class="uni-input" type="number" placeholder="0" v-model="finishValue" @input="FinishClearInput" />
					<icon class="uni-icon closeIcon" v-if="finishShowClearIcon" @click="finishClearIcon" type="clear" size="18" />
				</view>
			</view>
			<view class="failBox" v-if="workItem.taskFinishState == 2">
				<view class="name">{{ i18n.publicText.Workorder_Inputfailqty }}</view>
				<view class="uni-input-wrapper inputBox">
					<input class="uni-input" type="number" placeholder="0" v-model="failValue" @input="FailClearInput" />
					<icon class="uni-icon closeIcon" v-if="failShowClearIcon" @click="failClearIcon" type="clear" size="18" />
				</view>
			</view>
			<view class="selectTime" v-if="workItem.taskFinishState == 2">
				<text class="timer">{{ i18n.publicText.Workorder_InputReportTime }}</text>
				<view>
					<text class="datetime">{{ datetime }}</text>
					<text class="select" @click="onShowDatePicker('datetime')">{{ i18n.publicText.datetime_select_date }}</text>
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
				{{ i18n.publicText.Button_BeginChange }}
			</button>
			<button
				type="default"
				@click="btnClick"
				:class="{ btnWork: true, darkBtn: !workItem.canReport }"
				:hover-class="{ hoverBtn: workItem.canReport }"
				v-else-if="workItem.taskFinishState == 1"
			>
				{{ i18n.publicText.Button_EndChangeAndOutput }}
			</button>
			<button
				type="default"
				@click="btnClick"
				:class="{ btnWork: true, darkBtn: !workItem.canReport }"
				:hover-class="{ hoverBtn: workItem.canReport }"
				v-else-if="workItem.taskFinishState == 2"
			>
				{{ i18n.publicText.Button_Report }}
			</button>
			<button
				type="default"
				@click="btnClick"
				:class="{ btnWork: true, darkBtn: !workItem.canReport }"
				:hover-class="{ hoverBtn: workItem.canReport }"
				v-else-if="workItem.taskFinishState == 3"
			>
				{{i18n.publicText.Button_ResumeProduction}}
			</button>
			<view class="parseChangeBtn">
				<view class="parseBox" @click="parseBtn">
					<text class="fa fa-pause pause"></text>
					<text class="parseText">{{ i18n.publicText.Button_OrderPause }}</text>
				</view>
				<view class="parseBox" @tap="changeDayShift">
					<text class="fa fa-moon-o pause"></text>
					<text class="parseText">{{ i18n.publicText.Button_EndWorking }}</text>
				</view>
				<view class="changeResBox" @tap="changeRes">
					<text class="fa fa-refresh change"></text>
					<text class="changeText">{{ i18n.publicText.Button_Pushorder }}</text>
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
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.publicText.Workorder_Title_OrderDetail
		});
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
		console.log(this.workItem);
		this.datetime = this.getNowDateTime();
	},
	computed: {
		i18n() {
			return this.$t('message');
		}
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
			const userInfo = uni.getStorageSync('userInfo');
			this.workItem.mesOperator = userInfo['userName'];
			this.workItem.mesOpName = this.workItem.pmOpName;
			this.workItem.mesResName = this.workItem.pmResName;
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
		},
		changeDayShift(){
			const _this = this;
			uni.showModal({
				content:"此版本没有功能?",
				confirmText: this.i18n.publicText.datetime_confirm,
				cancelText:this.i18n.publicText.datetime_cancel,
				confirmColor:'green',
				success(res){
					if(res.confirm){
						console.log("开始调用api接口");
						uni.navigateBack()
					}					
				}
			})
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
			.item {
				display: flex;
				border-bottom: 1upx solid #cccccc;
				color: #999;
				font-size: 30upx;
				padding: 10upx 20upx;
				.value {
					flex-grow: 1;
					text-align: right;
				}
			}
			.name:last-child {
				border: none;
			}
		}

		.finishBox,
		.failBox {
			display: flex;
			margin: 1upx 0;
			background-color: $uni-bg-color;
			padding: 16upx 20upx;
			font-size: 18px;
			color: #555555;

			.name {
				display: inline-block;
				white-space:nowrap;
			}
			.inputBox {
				position: relative;
				input{
					padding:  0 10upx;
				}
				.closeIcon {
					position: absolute;
					right: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}

			
		}

		.selectTime {
			margin: 1upx 0;
			margin-bottom: 260upx;
			background-color: $uni-bg-color;
			padding: 16upx 28upx;
			color: #555555;
			font-size: 18px;

			view {
				float: right;
				width: 68%;
			}

			.select {
				float: right;
				color: #0faeff;
				font-size: 28upx;
			}
			.timer {
				float: left;
				width: 30%;
			}
		}
	}

	.footer {
		border-top: 1px solid #e3e3e3;
		position: fixed;
		bottom: 0;
		width: 100%;
		min-height: 120upx;
		background-color: $uni-text-color-white;
		padding: 10upx 0;
		display: flex;
		align-items: center;
		.btnWork {
			min-width: 40%;
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
			flex-grow: 1;
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
