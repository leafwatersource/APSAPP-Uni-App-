<template>
	<view class="content">
		<view class="searchBox"><input type="text" placeholder="请输入设备名称" v-model="searchWord" @input="search" /></view>
		<ul>
			<li v-for="item in resList" :key="item.resourceName" @tap="resClick(item)">
				<view :class="{'circleBox':true,'circle_green':item.resEventType=='U'?true:false,'circle_orange':item.resEventType=='Y'?true:false,'circle_red':item.resEventType=='S'?true:false}" />
				<text class="resName" v-text="item.resourceName" />
				<view class="rightContent">
					<text v-if="item.resEventType=='S'" v-text="item.resEventComment" /> 
					<text class="person" v-else v-text="item.lockedPerson" />
					<text class="icon-right fa fa-angle-right" />
				</view>
			</li>
		</ul>
	</view>
</template>

<script>
import {mapState} from 'vuex'
export default {
	data() {
		return {
			resList: [],
			AllRes: [],
			searchWord: '',
			prevRes:''
		};
	},
	
	computed:{
		...mapState(['userInfo']),
	},
	onLoad(option) {
		this.prevRes = option.resName;
	},
	mounted() {
		this.getResList();
	},
	methods: {
		getResList(){
			uni.showLoading({
				title:'设备加载中'
			})
			this.$HTTP({
				url: 'ResList',
				data: {
					usersysid: this.userInfo['userSysID']
				}
			}).then(resList => {
				this.resList = resList.data;
				this.AllRes = resList.data;
				console.log(this.resList);
				uni.hideLoading();
			});
		},
		resClick(resItem) {
			if((resItem.resEventType=='S'||resItem.resEventType=='U')||(resItem.lockedPerson!=""&&this.userInfo['userName'] != resItem.lockedPerson)){
				uni.showToast({
					title:'不能切换此设备',
					icon:'none'
				});
			}else{
				this.SetResUnused(resItem.resourceName);
				uni.reLaunch({
					url: '../main/main?resName=' + resItem.resourceName
				});
			}
			
		},
		SetResUnused(resName){
			this.$HTTP({
				url:'SetResUnused',
				data:{
					resname:this.prevRes,
					usetype:'U'
				}
			})		
		},
		search() {
			if (this.searchWord != '') {
				this.resList = [];
				for (var i = 0; i < this.AllRes.length; i++) {
					if (this.AllRes[i]['resourceName'].indexOf(this.searchWord) != -1) {
						this.resList.push(this.AllRes[i]);
					}
				}
			} else {
				this.resList = this.AllRes;
			}
		}
	}
};
</script>

<style scoped lang="scss">
@import '@/commom/font-awesome-4.7.0/css/font-awesome.min.css';
.content {
	background-color: #e3e3e3;
	padding: 0;
	.searchBox {
		width: 100%;
		background-color: white;
		margin-bottom: 2upx;
		padding: 10upx;
		box-sizing: border-box;
		input {
			text-align: center;
			border-radius: 40upx;
			padding: 10upx;
			border: 1px solid #c0c0c0;
			font-size: 26upx;
		}
	}
	ul {
		padding: 0;
		li {
			position: relative;
			list-style: none;
			background-color: $uni-text-color-white;
			padding: 20upx 40upx;
			border-bottom: 1px solid #e3e3e3;
			color: #757575;
			::last-child {
				border-bottom: none;
			}
			.circleBox {
				position: absolute;
				left: 15upx;
				top: 50%;
				transform: translateY(-50%);
				width: 30upx;
				height: 30upx;
				border-radius: 50%;
			}
			.circle_green{
				background-color: #00aa00;
			}
			.circle_red{
				background-color: #FF0000;
			}
			.circle_orange{
				background-color: #ff9900;
			}
			.resName{
				margin-left: 15upx;
			}
			.rightContent {
				position: absolute;
				right: 15upx;
				top: 50%;
				transform: translateY(-50%);
				.person {
					margin-right: 10upx;
				}
				.icon-right {
					float: right;
					line-height: 45upx;
				}
			}
		}
	}
}
</style>
