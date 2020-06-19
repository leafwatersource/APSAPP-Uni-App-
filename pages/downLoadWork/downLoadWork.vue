<template>
	<view class="content">
		<uni-card class="searchBox" :is-shadow="true" v-show="searchBox" title="筛选" mode="title" thumbnail="/static/img/search-active.png" extra="精确筛选(可选填)" note="true">
			<view>
				<view class="content-box">
					<ul>
						<li>
							<text>{{i18n.publicText.Workorder_Workid}}</text>
							<input type="text" value="" placeholder="请输入" v-model="searchWorkId" />
						</li>
						<li>
							<text>{{i18n.publicText.Workorder_Operation}}</text>
							<input type="text" value="" placeholder="请输入" v-model="searchOpName" />
						</li>
						<li>
							<text>班次:</text>
							<input type="text" value="" placeholder="请输入" v-model="searchDayShift" />
						</li>
						<li>
							<text>开始时间:</text>
							<input type="text" value="" />
							<text style="float: right;">选择</text>
							<mx-date-picker :show="showPicker" type="rangetime" :value="searchStartTime" :show-tips="true" :show-seconds="false" @confirm="onSelected" @cancel="onSelected" />
						</li>
					</ul>
				</view>
			</view>
			<template slot="footer">
				<view class="footer-box"><button type="primary" @tap="searchData">确定</button></view>
			</template>
		</uni-card>
		<uni-fab ref="fab" :pattern="pattern" :content="content" horizontal="left" vertical="bottom" direction="horizontal" @trigger="trigger" @fabClick="fabClick" />
		<ul class="undone">
			<li class="work" v-for="(item, index) in workList" :key="index" v-if="workList.length != 0" @tap="downLoad(item)">
				<view class="workIDBox">
					<text class="br">|</text>
					<text>{{i18n.publicText.Workorder_Workid}}</text>
					<text class="workId">
						{{item.workID}}
					</text>
				</view>
				<view>
					<text class="name">{{i18n.publicText.Workorder_ResName}}</text>
					<text class="value">{{item.pmResName}}</text>
				</view>
				<view>
					<text class="name">{{i18n.publicText.Workorder_Product}}</text>
					<text class="value">{{item.productID}}</text>
				</view>
				<view>
					<text class="name">{{i18n.publicText.Workorder_Operation}}</text>
					<text class="value">{{item.pmOpName}}</text>
				</view>
				<view>
					<text class="name">{{i18n.publicText.Workorder_PlannedQty}}</text>
					<text class="value">{{item.jobQty}}</text>
				</view>
				<view>
					<text class="name">{{i18n.publicText.Workorder_Planstartendtime}}</text>
					<text class="value">{{item.planStartTime}} - {{item.planendtime}}</text>
				</view>
				<view>
					<text class="name">{{i18n.publicText.Workorder_Description}}</text>
					<text class="value">{{item.itemDesp}}</text>
				</view>
			</li>
		</ul>
	</view>
</template>

<script>
import uniFab from '@/components/uni-fab/uni-fab';
import uniCard from '@/components/uni-card/uni-card.vue';
import MxDatePicker from '@/components/mx-datepicker/mx-datepicker';
export default {
	components: {
		uniFab,
		uniCard,
		MxDatePicker
	},
	data() {
		return {
			resName: '',
			dayshift:'',
			workList: [],
			workListArr: [],
			searchBox: false,
			pattern: {
				color: '#7A7E83',
				backgroundColor: '#fff',
				selectedColor: '#006dcb',
				buttonColor: '#006dcb'
			},
			content: [
				{
					iconPath: '/static/img/search.png',
					selectedIconPath: '/static/img/search-active.png',
					text: '精确筛选',
					active: true
				},
				{
					iconPath: '/static/img/close.png',
					selectedIconPath: '/static/img/close-active.png',
					text: '取消筛选',
					active: false
				}
			],
			showPicker:false,
			searchWorkId: '',
			searchOpName: '',
			searchDayShift: '',
			searchStartTime: ''
		};
	},
	computed:{
		i18n () {
			return this.$t('message'); 
		},
	}, 
	onLoad(option) {
		console.log(option);
		this.resName = JSON.parse(option.resName);
		this.dayshift = option.dayshift;
		console.log(this.resName)
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.publicText.Msg_DownOrder_Title 
		});
	},
	mounted() {
		this.getWorkPlan();
	},
	methods: {
		getWorkPlan() {
			const _this = this;
			this.$HTTP({
				url: 'DownOrder',
				data: {
					resName: this.resName.resourceName,
					dayshift:this.dayshift.toString()
				}
			}).then(workList => {
				console.log(workList)
				if (workList.statusCode == 200) {
					_this.workList.push(...workList.data);
					_this.workListArr.push(...workList.data);
					console.log(_this.workList);
				}
			},fail=>{
				console.log(fail.data)
			});
		},
		downLoad(workItem) {
			console.log(workItem)
			const _this = this;
			const orderUID = workItem.orderUID;
			console.log(this.resName.resourceName);
			uni.showModal({
				content: this.i18n.publicText.Msg_DownOrder_Message+workItem.workID,
				confirmText:this.i18n.publicText.datetime_confirm,
				cancelText:this.i18n.publicText.datetime_cancel,
				success(res) {
						if(res.confirm){
							_this.$HTTP({
								url: 'BeginDown',
								data: {
									resName: _this.resName.resourceName,
									orderUID: orderUID,
									dayshift:_this.dayshift.toString()
								}
							}).then(status => {
								console.log(status)
								if (status.data) {
									uni.showToast({
										title: '工单拉取成功',
										success() {
											uni.navigateBack({
												delta: 1,
												animationType: 'pop-out',
												animationDuration: 200
											});
										}
									});
								}
							},fail=>{
								console.log(fail)
							});
						}
				}
			})
			
			
		},
		trigger(e) {
			if (e.index == 0) {
				this.searchBox = this.searchBox === true ? false : true;
				this.content[e.index].active = !e.item.active;
			} else if (e.index == 1) {
				this.content[e.index].active = !e.item.active;
				setTimeout(() => {
					this.content[e.index].active = !e.item.active;
					this.clearSearch();
				}, 100);
			}
		},
		fabClick() {
			this.searchBox = this.searchBox === true ? false : false;
			this.content.forEach(item => {
				item.active = item.active === true ? false : false;
			});
		},
		searchData() {
			var searchArr = [];
			var searchContent = [];
			var searchKey = [];
			if (this.searchWorkId != '') {
				searchContent.push(this.searchWorkId);
				searchKey.push('workID');
			}
			if (this.searchOpName != '') {
				searchContent.push(this.searchOpName);
				searchKey.push('pmOpName');
			}
			if (this.searchDayShift != '') {
				searchContent.push(this.searchDayShift);
				searchKey.push('dayShift');
			}
			searchArr = this.filterData(this.workListArr, searchContent, searchKey);
			this.workList = [];
			this.workList.push(...searchArr);
			searchArr = [];
		},
		filterData(data, searchWord, dataKey) {
			console.log(dataKey);
			console.log(searchWord);
			var newArr = [];
			data.forEach(item => {
				for (var i = 0; i < dataKey.length; i++) {
					if (item[dataKey[i]].toString().indexOf(searchWord[i]) == -1) {
						return;
					}
				}
				newArr.push(item);
			});
			console.log(newArr);
			return newArr;
		},
		clearSearch() {
			this.searchDayShift = '';
			this.searchWorkId = '';
			this.searchOpName = '';
			this.workList = this.workListArr;
		},
		onSelected(e){
				//选择
				this.showPicker = false;
				if (e) {
					this[this.type] = e.value;
				}
		}
	}
};
</script>

<style scoped lang="scss">
@import '@/commom/font-awesome-4.7.0/css/font-awesome.min.css';
.content {
	padding: 0;
	.searchBox {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
		background-color: $uni-text-color-white;
		z-index: 102;
		margin: 0;
		padding: 0;
		.content-box {
			ul {
				padding: 0;
				width: 100%;
				li {
					display: flex;
					margin: 30upx 0;
					border: none;
					width: 100%;
					input {
						flex-grow: 1;
						border-bottom: 1upx solid #cccccc;
						padding: 0 10upx;
					}
				}
			}
		}
	}
	ul{
		width: 100%;
		padding: 0;
		li{
			list-style: none;
			background-color: $uni-text-color-white;
			border-bottom: 3upx solid #999;
			padding: 0 20upx;
			.workIDBox{
				border-bottom: 1upx solid $uni-btn-color;
				color: $uni-btn-active-color;
				padding: 20upx 0;
				font-weight: 600;
				height: 100%;
				box-sizing: content-box;
				display: flex;
				.br{
					font-weight: bolder;
					margin-right: 20upx;
				}
				.workId{
					flex-grow: 1;
					text-align: right;
				}
			}
			view{
				color: #999999;
				border-bottom: 1upx solid #999999;
				display: flex;
				.name{
					font-size: 30upx;
				}
				.value{
					font-size: 30upx;
					text-align: right;
					flex-grow:1;
				}
			}
			view:last-child{
				border: none;
				padding-bottom: 20upx;
			}
		}
		li:last-child{
			border-bottom: none;
		}
	}
}
</style>
