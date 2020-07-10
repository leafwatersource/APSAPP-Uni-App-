<template>
	<view class="content">
		<view class="top">
			<view class="status_bar" :style="{ height: barHeight + 'px' }"></view>
			<view class="resBox">
				<view class="resName">{{ resName['resourceName'] }}</view>
				<view class="iconBox">
					<text class="fa fa-bell-o"></text>
					<text class="fa fa-plus-circle" @tap="showResCount"></text>
				</view>
				<view class="resCountWrap" @tap="resCountWrapClick" v-show="resCount" :style="{ top: barHeight + 'px' }">
					<view class="resCount" :class="{ resCount: true, Active: resCount }">
						<ul>
							<li @tap="scan">
								<text class="fa fa-qrcode" @tap="selectRes"></text>
								<text>{{ i18n.publicText.Scancode }}</text>
							</li>
							<li @tap="selectRes">
								<text class="fa fa-random"></text>
								<text>{{ i18n.publicText.ChangeRes_Title_ResName }}</text>
							</li>
							<li @tap="downLoadWork">
								<text class="fa fa-download"></text>
								<text>{{ i18n.publicText.Msg_DownOrder_Title }}</text>
							</li>
						</ul>
					</view>
				</view>
			</view>
			<view class="tabBox">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#006dcb" class="Tab"></uni-segmented-control>
			</view>
			<view class="searchBox"><input type="text" :placeholder="i18n.publicText.Search_hint" placeholder-class="hoder-cls" v-model="searchWord" @input="search" /></view>
		</view>
		<view class="workBox" :style="{ paddingTop: barHeight + 'px' }">
			<view class="TabContent">
				<ul class="undone" v-show="current === 0">
					<li class="work" v-for="(item, index) in undoneWorkOrder" :key="index" @tap="work(item)" v-if="undoneOrder.length != 0">
						<view class="work-icon">
							<text class="iconfont-red fa fa-stop-circle" v-if="item.taskFinishState == 0"></text>
							<text class="iconfont-blue fa fa-bandcamp" v-if="item.taskFinishState == 1"></text>
							<text class="iconfont-green fa fa-play-circle" v-if="item.taskFinishState == 2"></text>
							<text class="iconfont-orange fa fa-pause-circle" v-if="item.taskFinishState == 3"></text>
						</view>
						<view class="itemBox">
							<view class="WorkBox">
								<text class="workId" style="float: left">{{ item.workID }}</text>
								<view class="process-bar" style="float: right;">
									<text>{{ item.finishedQty }}/{{ item.plannedqty }}</text>
									<view class="process-content">
										<view class="process-content-num" :style="{ width: (item.finishedQty / item.plannedqty) * 100 + '%' }"></view>
									</view>
								</view>
							</view>
							<text class="productName">{{ i18n.publicText.Workorder_Product }}{{ item.productID }}</text>
							<text class="opname">{{ i18n.publicText.Workorder_Operation }}{{ item.pmOpName }}</text>
							<text>{{ i18n.publicText.Workorder_Planstartendtime }}{{ item.planStartTime }} - {{ item.planendtime }}</text>
							<text>{{ i18n.publicText.Workorder_Description }}{{ item.itemDesp }}</text>
						</view>
						<view class="icon-right"><text class="icon-right fa fa-angle-right"></text></view>
					</li>
				</ul>
				<ul class="done" v-show="current === 1">
					<li class="work" v-for="(item, index) in doneWorkOrder" :key="index" @tap="finishOrder(item)" v-if="doneWorkOrder.length != 0">
						<view class="work-icon"><text class="iconfont-orange fa fa-check-circle"></text></view>
						<view class="itemBox">
							<view class="WorkBox">
								<text class="workId" style="float: left">{{ item.workID }}</text>
								<view class="process-bar" style="float: right;">
									<text>{{ item.finishedQty }}/{{ item.plannedqty }}</text>
									<view class="process-content">
										<view class="process-content-num" :style="{ width: (item.finishedQty / item.plannedqty) * 100 + '%' }"></view>
									</view>
								</view>
							</view>
							<text class="productName">{{ i18n.publicText.Workorder_Product }}{{ item.productID }}</text>
							<text class="opname">{{ i18n.publicText.Workorder_Operation }}{{ item.pmOpName }}</text>
							<text>{{ i18n.publicText.Workorder_Planstartendtime }}{{ item.planStartTime }} - {{ item.planendtime }}</text>
							<text>{{ i18n.publicText.Workorder_Description }}{{ item.itemDesp }}</text>
						</view>
						<view class="icon-right"><text class="icon-right fa fa-angle-right"></text></view>
					</li>
				</ul>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
export default {
	components: { uniSegmentedControl },
	data() {
		return {
			barHeight: 25,
			resList: [],
			resName: '',
			undoneWorkOrder: [],
			doneWorkOrder: [],
			undoneOrder: [],
			doneOrder: [],
			isRequest: true,
			items: [],
			current: 0,
			searchWord: '',
			resCount: false,
		};
	},
	onLoad(option) {
		if (Object.keys(option).length != 0) {
			const resName = JSON.parse(option.resName);
			this.resName = resName;
		}
	},
	onShow() {
		uni.setTabBarItem({
			index: 0,
			text: this.i18n.tabBar.Nav_Report
		});
		uni.setTabBarItem({
			index: 1,
			text: this.i18n.tabBar.Nav_Dash
		});
		uni.setTabBarItem({
			index: 2,
			text: this.i18n.tabBar.Nav_User
		});
		if (this.resName != '') {
			this.isRequest = true;
			this.GetUnstartList(this.resName['resourceName']);
			this.GetFinishOrder(this.resName['resourceName']);
			this.isRequest = false;
			this.searchWord = '';
		}
	},
	computed: {
		...mapState(['forcedLogin', 'hasLogin', 'userName', 'api', 'userInfo']),
		i18n() {
			return this.$t('message');
		}
	},
	mounted() {
		this.getSystemStatusBarHeight();
		this.items.push(this.i18n.publicText.Tab_unstart);
		this.items.push(this.i18n.publicText.Tab_finished);
		this.HasLogin();
		this.getResList();
	},
	methods: {
		scan() {
			uni.scanCode({
				success: function(res) {
					console.log(res);
					console.log(JSON.stringify(res));
				},
				fail() {
					console.log('失败');
				},
				complete() {
					console.log('完成');
				}
			});
		},
		resCountWrapClick() {
			this.resCount = false;
		},
		search() {
			console.log('search');
			if (this.searchWord == '') {
				return;
			}
			if (this.current == 0) {
				console.log('搜索未完成工单');
				this.undoneWorkOrder = [];
				this.undoneOrder.forEach(item => {
					if (item.workID.indexOf(this.searchWord) != -1 || item.productID.indexOf(this.searchWord) != -1) {
						this.undoneWorkOrder.push(item);
					}
				});
			} else {
				console.log('搜索完成工单');
				this.doneWorkOrder = [];
				this.doneOrder.forEach(item => {
					if (item.workID.indexOf(this.searchWord) != -1 || item.productID.indexOf(this.searchWord) != -1) {
						this.doneWorkOrder.push(item);
					}
				});
			}
		},
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
			}
			console.log(this.current);
			if (this.current == 1) {
				this.GetFinishOrder();
			} else if (this.current == 0) {
				if (!this.isRequest) {
					this.search();
				}
			}
		},
		GetFinishOrder() {
			const _this = this;
			this.doneOrder = [];
			this.doneWorkOrder = [];
			this.$HTTP({
				url: 'GetFinishedList',
				data: {
					resName: this.resName['resourceName'],
					dayShift: this.resName['dayshift']
				}
			}).then(finishData => {
				_this.doneOrder = [];
				_this.doneWorkOrder = [];
				_this.doneOrder.push(...finishData.data);
				_this.doneWorkOrder.push(...finishData.data);
				_this.search();
			});
		},
		getSystemStatusBarHeight() {
			var height = plus.navigator.getStatusbarHeight();
			this.barHeight = height;
		},
		showResCount() {
			this.resCount = this.resCount == true ? false : true;
		},
		selectRes() {
			uni.navigateTo({
				url: '../selectRes/resList?resList=' + JSON.stringify(this.resList)
			});
		},
		finishOrder(workItem){
			console.log(workItem)
			uni.navigateTo({
				url:'../workDetail/finishWork?workItem='+JSON.stringify(workItem)
			})
		},
		work(workItem) {
			uni.navigateTo({
				url: '../workDetail/work?workItem=' + JSON.stringify(workItem)
			});
		},
		HasLogin() {
			if (this.userInfo == null) {
				uni.redirectTo({
					url: '../login/login'
				});
			}
		},
		getResList() {
			const _this = this;
			this.$HTTP({
				url: 'ResList',
				data: {
					usersysid: this.userInfo['userSysID']
				}
			}).then(resList => {
				console.log(resList);
				_this.resList.push(...resList.data);
				if (_this.isRequest) {
					_this.resName = resList.data[0];
					_this.GetUnstartList(resList.data[0]['resourceName']);
				}
			});
		},
		GetUnstartList(resName) {
			console.log('获取工单');
			console.log(resName);
			if (this.isRequest) {
				const _this = this;
				this.undoneOrder = [];
				this.undoneWorkOrder = [];
				console.log(this.undoneOrder);
				console.log(this.undoneWorkOrder);
				this.$HTTP({
					url: 'GetUnstartList',
					data: {
						resName: resName,
						dayShift: this.resName['dayshift']
					}
				}).then(UnstartList => {
					console.log(UnstartList);
					uni.hideLoading();
					if (UnstartList.data.length > 0) {
						UnstartList.data.forEach(item => {
							if (item.taskFinishState == 2) {
								
								_this.undoneWorkOrder.unshift(item);
								_this.undoneOrder.unshift(item);
							} else {
								_this.undoneWorkOrder.push(item);
								_this.undoneOrder.push(item);
							}
						});
						console.log('未完成工单要进行筛选');
						_this.search();
					}
				});
			}
		},
		downLoadWork() {
			console.log('选取要拉取的工单');
			console.log(this.resName);
			uni.navigateTo({
				url: '../downLoadWork/downLoadWork?resName=' + JSON.stringify(this.resName) + '&dayshift=' + this.resName['dayshift']
			});
		}
	}
};
</script>

<style scoped lang="scss">
@import '@/commom/font-awesome-4.7.0/css/font-awesome.min.css';
.content {
	position: relative;
	padding: 0;
	margin: 0;
	.top {
		position: fixed;
		top: 0;
		z-index: 10;
		width: 100%;
		background-color: $uni-btn-active-color;
		.resBox {
			position: relative;
			width: 100%;
			height: 80upx;
			.resName {
				display: inline-block;
				padding: 0 20upx;
				line-height: 80upx;
				color: $uni-text-color-white;
				font-size: 30upx;
			}
			.iconBox {
				line-height: 80upx;
				float: right;
				font-size: 30upx;
				text {
					margin-right: 30upx;
					font-size: 40upx;
					color: $uni-text-color-white;
					font-weight: bolder;
				}
			}
			.resCountWrap {
				position: fixed;
				width: 100%;
				height: 100%;
				z-index: 100;
				left: 0;
				.resCount {
					position: absolute;
					right: 20upx;
					top: 80upx;
					z-index: 101;
					background-color: #4c4c4c;
					border-radius: 20upx;
					height: 0;
					overflow: hidden;
					transition: all 0.1s linear;
					ul {
						padding: 0;
						li {
							list-style: none;
							padding: 30upx;
							border-bottom: 1upx solid #999;
							text {
								font-size: 26upx;
								margin-right: 20upx;
								color: $uni-text-color-white;
								display: inline-block;
							}
						}

						li:last-child {
							border: none;
						}
					}
				}
				.resCount.Active {
					height: auto;
				}
			}
		}
		.tabBox {
			position: relative;
			width: 100%;
			height: 80upx;
			background-color: $uni-text-color-white;
			.Tab {
				margin: 2upx 0;
				// margin-top: 2upx;
			}
		}
		.searchBox {
			width: 100%;
			background-color: #ddd;
			padding: 10upx 0;
			height: 60upx;
			position: relative;
			input {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				width: 92%;
				height: 50upx;
				background-color: $uni-text-color-white;
				border-radius: 40upx;
				padding: 10upx 20upx;
				font-size: 25upx;
				text-align: center;
			}
			.hoder-cls {
				text-align: center;
				font-size: 25upx;
			}
		}
	}
	.workBox {
		background-color: $uni-text-color-white;
		margin-top: 240upx;
		width: 100%;
		overflow-x: hidden;
		.TabContent {
			width: 200%;
			position: relative;
			ul {
				width: 50%;
				padding: 0;
				li {
					position: relative;
					list-style: none;
					border-bottom: 2px solid #ddd;
					.work-icon {
						position: absolute;
						left: 0;
						top: 50%;
						width: 100upx;
						transform: translateY(-50%);
						text {
							color: $uni-btn-active-color;
							font-size: 50upx;
							text-align: center;
							display: block;
						}
					}
					.itemBox {
						padding: 20upx 0;
						width: calc(100% - 200upx);
						margin-left: 100upx;
						float: left;
						word-wrap: break-word;
						word-break: break-all;
						overflow: hidden;
						.WorkBox {
							.workId {
								color: $uni-btn-active-color;
								font-size: 30upx;
								font-weight: 700;
								display: inline-block;
							}
							.process-bar {
								text {
									color: $uni-btn-active-color;
									font-size: 24upx;
									font-weight: 700;
								}
								.process-content {
									width: 100%;
									height: 6upx;
									background-color: #cccccc;
									margin-right: 6upx;
									border-radius: 6upx;
									.process-content-num {
										height: 6upx;
										// width: 30%;
										background-color: $uni-btn-active-color;
										border-radius: 6upx;
									}
								}
							}
						}
						.WorkBox::after {
							display: block;
							content: '';
							clear: both;
						}
						text {
							display: block;
							color: #555555;
							font-size: 25upx;
						}
						.productName {
							font-weight: 700;
						}
						.opname {
							font-weight: 700;
						}
					}
					.icon-right {
						width: 100upx;
						text-align: center;
						position: absolute;
						text-align: right;
						padding: 0 20upx;
						right: 0;
						top: 50%;
						transform: translateY(-50%);
						color: $uni-btn-active-color;
						font-size: 40upx;
					}
				}
				li:after {
					display: block;
					content: '';
					clear: both;
				}
				li:last-child {
					border: none;
				}
			}
			.done {
				left: 50%;
			}
		}
	}
}
</style>
