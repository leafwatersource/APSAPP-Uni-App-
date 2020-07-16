<template>
	<view class="content">
		<ul>
			<li>
				<text class="name" v-text="'ID'" />
				<text class="message"><text v-text="userInfo.empID"/></text>
			</li>
			<li>
				<text class="name" v-text="i18n.userSetting.name" />
				<text class="message" v-text="name" />
			</li>
			<li @tap="resPage">
				<text class="name" v-text="'可报工的设备'" /> 
				<text class="message">
					<text class="hasIcon num" v-text="resList.length" />
					<text class="icon-right fa fa-angle-right" />
				</text>
			</li>
			<li @tap="canSetting('设置电话',userInfo.phoneNumber,'phoneNum')">
				<text class="name" v-text="i18n.userSetting.phone" />
				<text class="message">
					<text class="hasIcon" v-text="userInfo.phoneNumber" />
					<text class="icon-right fa fa-angle-right" />
				</text>
			</li>
			<li @tap="canSetting('设置邮箱',userInfo.email,'email')">
				<text class="name" v-text="i18n.userSetting.email" />
				<text class="message">
					<text class="hasIcon" v-text="userInfo.email" />
					<text class="icon-right fa fa-angle-right" />
				</text>
			</li>
			<li>
				<text class="name" v-text="i18n.userSetting.userGroup" />
				<text class="message"><text v-text="userInfo.userDesc" /></text>
			</li>
			<li>
				<text class="name" v-text="i18n.userSetting.system" />
				<text class="message"><text v-text="userInfo.userSysName" /></text>
			</li>
		</ul>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
export default {
	data() {
		return {
			name: '',
			phone: '',
			email: '',
			empId: '',
			userSysName: '',
			desc: '',
			resList:[],
		};
	},
	onShow() {
		// var userInfo = uni.getStorageSync('userInfo');
		// this.name = userInfo.userName;
		// this.phone = userInfo.phoneNumber;
		// this.email = userInfo.email;
		// this.empId = userInfo.empID;
		// this.userSysName = userInfo.userSysName;
		// this.desc = userInfo.userDesc;
		// console.log(userInfo);
	},

	computed:{
			...mapState(['userInfo']),
		i18n () {
			return this.$t('message'); 
		},
	},
	mounted() {
		this.getResList();
	},
	methods: {
		canSetting(type, message, changeType) {
			console.log(type, message);
			uni.navigateTo({
				url: './settingMessage?type=' + type + '&message=' + message + '&changeType=' + changeType,
				animationType: 'slide-in-bottom',
				animationDuration: 300
			});
		},
		getResList(){
			//获取设备能报工的设备
			this.$HTTP({
				url: 'ResList',
				data: {
					usersysid: this.userInfo['userSysID']
				}
			}).then(resList => {
				console.log(resList);
				this.resList = resList.data;
				console.log(this.resList)
			});
		},
		resPage(){
			//跳转查看设备列表页面
			uni.navigateTo({
				url:'./resList?resList='+JSON.stringify(this.resList)
			})
		}
	}
};
</script>

<style scoped lang="scss">
@import '@/commom/font-awesome-4.7.0/css/font-awesome.min.css';
.content {
	padding: 0;
	ul {
		padding: 0;
		width: 100%;
		li {
			width: 100%;
			padding: 20upx;
			background-color: $uni-text-color-white;
			list-style: none;
			margin: 10upx 0;
			box-sizing: border-box;
			text {
				float: left;
			}
			
			.message {
				float: right;
				position: relative;
				padding-right: 20upx;
				color: #999999;
				text {
					text-align: right;
				}
				.num{
					display: block;
					width: 48upx;
					height: 48upx;
					line-height: 48upx;
					text-align: center;
					color: $uni-text-color-white;
					border-radius: 50%;
					background-color: $uni-btn-active-color;
				}
				.hasIcon {
					margin-right: 20upx;
				}
				.icon-right {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					font-size: 40upx;
				}
			}
		}
		li:after {
			content: '';
			display: block;
			clear: both;
		}
	}
}
</style>
