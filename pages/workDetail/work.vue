<template>
	<view class="content">
		<view class="Main">
			<text class="workId" v-text="i18n.publicText.Workorder_Workid+workItem.workID" />
			<view class="NumBox">
				<view>
					<text class="Number" v-text="workItem.jobQty" />
					<text class="NumDesc" v-text="i18n.publicText.Workorder_JobQty" /> 
				</view>
				<view>
					<text class="Number" v-text="workItem.plannedqty" /> 
					<text class="NumDesc" v-text="i18n.publicText.Workorder_PlannedQty" /> 
				</view>
				<view>
					<text class="Number" v-text="workItem.finishedQty" /> 
					<text class="NumDesc" v-text="i18n.publicText.Workorder_FinishedQty" /> 
				</view>
				<view>
					<text class="Number" v-text="workItem.allFinishedQty" /> 
					<text class="NumDesc" v-text="i18n.publicText.Workorder_AllFinishedQty" /> 
				</view>
			</view>
			<view class="workItem">
				<view class="item">
					<text class="name" v-text="i18n.publicText.Workorder_Product" />
					<text class="value" v-text="workItem.productID" />
				</view>
				<view class="item">
					<text class="name" v-text="i18n.publicText.Workorder_ResName" />
					<text class="value" v-text="workItem.pmResName" />
				</view>
				<view class="item">
					<text class="name" v-text="i18n.publicText.Workorder_Operation" />
					<text class="value" v-text="workItem.pmOpName" />
				</view>
				<view class="item">
					<text class="name" v-text="i18n.publicText.Workorder_WorkHours" />
					<text class="value" v-text="workItem.dayShift" />
				</view>
				<view class="item">
					<text class="name" v-text="i18n.publicText.Workorder_Planstartendtime" />
					<text class="value" v-text="workItem.planStartTime+'-'+workItem.planendtime" />
				</view>
				<view class="item">
					<text class="name" v-text="i18n.publicText.Workorder_WorkHours" />
					<text class="value" v-text="workItem.workHours" />
				</view>
				<view class="item">
					<text class="name" v-text="i18n.publicText.Workorder_BomUsed" />
					<text class="value" v-text="workItem.bomComused" />
				</view>
				<view class="item" v-if="workItem.itemDesp">
					<text class="name" v-text="'描述'" />
					<text class="value" v-text="workItem.itemDesp" />
				</view>
				<view class="item" v-if="workItem.itemAttr1">
					<text class="name" v-text="i18n.publicText.Workorder_ItemAttr1" />
					<text class="value" v-text="workItem.itemAttr1" />
				</view>
				<view class="item" v-if="workItem.itemAttr2">
					<text class="name" v-text="i18n.publicText.Workorder_ItemAttr2" />
					<text class="value" v-text="workItem.itemAttr2" />
				</view>
				<view class="item" v-if="workItem.itemAttr3">
					<text class="name" v-text="i18n.publicText.Workorder_ItemAttr3" />
					<text class="value" v-text="workItem.itemAttr3" />
				</view>
				<view class="item" v-if="workItem.itemAttr4">
					<text class="name" v-text="'Attr4'" />
					<text class="value" v-text="workItem.itemAttr4" />
				</view>
			</view>
			<view class="finishBox" v-if="workItem.taskFinishState == 2">
				<view class="name" v-text="i18n.publicText.Workorder_Inputfinishedqty" />
				<view class="uni-input-wrapper inputBox">
					<input class="uni-input" type="number" placeholder="0" v-model="finishValue" @input="FinishClearInput" />
					<icon class="uni-icon closeIcon" v-if="finishShowClearIcon" @click="finishClearIcon" type="clear" size="18" />
				</view>
			</view>
			<view class="failBox" v-if="workItem.taskFinishState == 2">
				<view class="name" v-text="i18n.publicText.Workorder_Inputfailqty" />
				<view class="uni-input-wrapper inputBox">
					<input class="uni-input" type="number" placeholder="0" v-model="failValue" @input="FailClearInput" />
					<icon class="uni-icon closeIcon" v-if="failShowClearIcon" @click="failClearIcon" type="clear" size="18" />
				</view>
			</view>
			<view class="selectTime" v-if="workItem.taskFinishState == 2">
				<text class="timer" v-text="i18n.publicText.Workorder_InputReportTime" />
				<view>
					<text class="datetime" v-text="datetime" />
					<text class="select" @click="onShowDatePicker('datetime')" v-text="i18n.publicText.datetime_select_date" />
				</view>
				<e-picker-plus ref="picker" mode="YMDhms" @confirm="dateConfirm"
				 :start="defaultTime" 
				 :end="new Date().getFullYear()+'-12-31 23:59:59'"
				 :defaultValue="defaultTime" />
			</view>
		</view>
		<view class="footer" v-if="workItem.taskFinishState != 4">
			<button
				type="default"
				@click="btnClick"
				:class="{ btnWork: true, darkBtn: !workItem.canReport }"
				:hover-class="{ hoverBtn: workItem.canReport }"
				v-if="workItem.taskFinishState == 0"
				v-text="i18n.publicText.Button_BeginChange"	/>
			
			
			<button
				type="default"
				@click="btnClick"
				:class="{ btnWork: true, darkBtn: !workItem.canReport }"
				:hover-class="{ hoverBtn: workItem.canReport }"
				v-else-if="workItem.taskFinishState == 1"
				v-text="i18n.publicText.Button_EndChangeAndOutput" />
			
			<button
				type="default"
				@click="btnClick"
				:class="{ btnWork: true, darkBtn: !workItem.canReport }"
				:hover-class="{ hoverBtn: workItem.canReport }"
				v-else-if="workItem.taskFinishState == 2"
				v-text="i18n.publicText.Button_Report" />
			
			
			<button
				type="default"
				@click="btnClick"
				:class="{ btnWork: true, darkBtn: !workItem.canReport }"
				:hover-class="{ hoverBtn: workItem.canReport }"
				v-else-if="workItem.taskFinishState == 3"
				v-text="i18n.publicText.Button_ResumeProduction" />
			
			
			<view class="parseChangeBtn">
				<view class="parseBox" @click="parseBtn">
					<text class="fa fa-pause pause"></text>
					<text class="parseText" v-text="i18n.publicText.Button_OrderPause" />
				</view>
				<view class="parseBox" @tap="changeDayShift">
					<text class="fa fa-moon-o pause"></text>
					<text class="parseText" v-text="i18n.publicText.Button_EndWorking" />
				</view>
				<view class="changeResBox" @tap="changeRes">
					<text class="fa fa-refresh change"></text>
					<text class="changeText" v-text="i18n.publicText.Button_Pushorder" />
				</view>
				<uni-drawer :visible="showLeft" mode="left" @close="closeDrawer()" class="drawerWrap">
					<uni-list class="drawer"><uni-list-item v-for="item in changeResArr" :title="item" note="" @tap="enterChangeRes(item)"></uni-list-item></uni-list>
				</uni-drawer>
			</view>
		</view>
	</view>
</template>

<script>
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
import {mapState} from 'vuex'
export default {
	components: {
		uniDrawer
	},
	onLoad(option) {
		if (option.workItem) {
			this.workItem = JSON.parse(decodeURIComponent(option.workItem));
			this.finishValue = parseFloat(this.workItem.canReportQty)<parseFloat(this.workItem.plannedqty)?this.workItem.canReportQty:this.workItem.plannedqty;
			this.canReportQty = this.finishValue;
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
			defaultTime:'',
			showLeft: false, //左边
			changeResArr: [],
			canReportQty:0,//能报工的数量
		};
	},
	mounted() {
		this.defaultTime = this.getNowDateTime();
		this.datetime = this.defaultTime;
	},
	computed: {
		...mapState(['userInfo']),
		i18n() {
			return this.$t('message');
		}
	},
	methods: {
		onShowDatePicker(){
			this.$refs.picker.show();
		},
		dateConfirm(e){
			//获取的日期
			this.datetime = e.result;
		},
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
			const sec = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
			return year + '-' + month + '-' + day + ' ' + hour + ':' + min+':'+sec;
		},
		OrderAjustment(){
			this.$HTTP({
				url:'OrderAjustment',
				data:{
					'bean':JSON.stringify(this.workItem)
				}
			})
		},
		btnClick() {
			//按钮的点击事件
			this.workItem.mesOperator = this.userInfo['userName'];
			this.workItem.mesOpName = this.workItem.pmOpName;
			this.workItem.mesResName = this.workItem.pmResName;
			if (this.workItem.canReport) {
				if (this.workItem.taskFinishState == 0) {
					let _this = this;
					uni.showModal({
						title:'是否调机',
						success(res) {
							if(res.confirm){
								_this.OrderAjustment();
							}
							_this.pullData('BeginChange');
						}
					})
					
				} else if (this.workItem.taskFinishState == 1) {
					this.pullData('EndChange');
				} else if (this.workItem.taskFinishState == 2) {
					
					if (parseInt(this.finishValue) + parseInt(this.failValue) > this.workItem.canReportQty) {
						uni.showToast({
							title: '不能超过报工数量,此工单最大报工数量:'+this.canReportQty,
							icon: 'none'
						});
						return;
					}
					this.workItem.finishedQty = this.finishValue;
					this.workItem.failedQty = parseInt(this.failValue);
					this.workItem.reportTime = this.datetime;
					let mesTime =(new Date(this.datetime) - new Date(this.workItem.mesEndTime))/1000;
					//判断是否是生产延迟
					if(this.workItem.workHours*3600/this.workItem.plannedqty < mesTime / ((parseFloat(this.finishValue)+parseFloat(this.failValue)))){
						uni.showToast({
							title:"生产延迟",
							icon:"none"
						});
					}else{
						this.pullData('Report');
					}
				} else if (this.workItem.taskFinishState == 3) {
					this.pullData('ResumeOrder');
				}
			}
		},
		parseBtn() {
			this.workItem.mesOperator = this.userInfo['userName'];
			this.workItem.mesOpName = this.workItem.pmOpName;
			this.workItem.mesResName = this.workItem.pmResName;
			this.pullData('PauseOrder', true);
		},
		pullData(type, parseState) {
			this.$HTTP({
				url: type,
				data: {
					bean: JSON.stringify(this.workItem)
				}
			}).then(data => {
				if (parseState) {
					this.workItem.taskFinishState = 3;
					uni.navigateBack({
						delta: 1,
						animationType: 'pop-out',
						animationDuration: 200
					});
					return;
				}
				if (this.workItem.taskFinishState == 0) {
					this.workItem.taskFinishState = 1;
				} else if (this.workItem.taskFinishState == 1) {
					this.workItem.taskFinishState = 2;
				} else if (this.workItem.taskFinishState == 3) {
					this.workItem.taskFinishState = 0;
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
			this.workItem.mesOperator = this.userInfo['userName'];
			this.workItem.mesOpName = this.workItem.pmOpName;
			this.workItem.mesResName = this.workItem.pmResName;
			const _this = this;
			uni.showModal({
				title:"确定换班?",
				success(data) {
					if(data.confirm){
						_this.$HTTP({
							url:'EndWorking',
							data:{
								bean:JSON.stringify(_this.workItem)
							}
						}).then(success=>{
							if(success.data){
								uni.showToast({
									title:"换班成功",
									complete() {
										uni.navigateBack({
											animationDuration:2000
										})
									}
								})
							}
						})
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
			padding: 10upx 30upx;
			font-size: 35upx;
			height: 50upx;
			line-height: 50upx;
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
			.item {
				position: relative;
				border-bottom: .5upx solid #E3E3E3;
				color: #999;
				font-size: 30upx;
				padding: 10upx 20upx;
				height: 40upx;
				.value {
					line-height: 40upx;
					position: absolute;
					right: 15upx;
					top: 50%;
					transform: translateY(-50%);
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
			.datetime{
				font-size: 30upx;
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
			.drawerWrap{
				overflow: hidden;
				.drawer{
					overflow-y: scroll;
					height: 100%;
				}
			}
			
		}
	}
}
</style>

