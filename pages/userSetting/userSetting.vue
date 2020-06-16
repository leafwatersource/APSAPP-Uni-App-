<template>
	<view class="content">
		<ul>
			<li>
				<text class="name">ID</text>
				<text class="message"><text v-text="empId"></text></text>
			</li>
			<li @tap="canSetting('设置名字',name,'empName')">
				<text class="name">名字</text>
				<text class="message">
					<text class="hasIcon" v-text="name"></text>
					<text class="icon-right fa fa-angle-right"></text>
				</text>
			</li>
			<li @tap="canSetting('设置电话',phone,'phoneNum')">
				<text class="name">电话</text>
				<text class="message">
					<text class="hasIcon" v-text="phone"></text>
					<text class="icon-right fa fa-angle-right"></text>
				</text>
			</li>
			<li @tap="canSetting('设置邮箱',email,'email')">
				<text class="name">邮箱</text>
				<text class="message">
					<text class="hasIcon" v-text="email"></text>
					<text class="icon-right fa fa-angle-right"></text>
				</text>
			</li>
			<li @tap="canSetting('用户描述',desc,'dept')">
				<text class="name">用户描述</text>
				<text class="message">
					<text class="hasIcon" v-text="desc"></text>
					<text class="icon-right fa fa-angle-right"></text>
				</text>
			</li>
			<li>
				<text class="name">系统名称</text>
				<text class="message"><text v-text="userSysName"></text></text>
			</li>
		</ul>
	</view>
</template>

<script>
export default {
	data() {
		return {
			name: '',
			phone: '',
			email: '',
			empId: '',
			userSysName: '',
			desc: ''
		};
	},
	onShow() {
		var userInfo = uni.getStorageSync('userInfo');
		this.name = userInfo.userName;
		this.phone = userInfo.phoneNumber;
		this.email = userInfo.email;
		this.empId = userInfo.empID;
		this.userSysName = userInfo.userSysName;
		this.desc = userInfo.userDesc;
		console.log(userInfo);
	},
	methods: {
		canSetting(type,message,changeType){
			console.log(type,message);
			uni.navigateTo({
			    url: './settingMessage?type='+type+"&message="+message+"&changeType="+changeType,
			    animationType: 'slide-in-bottom',
			    animationDuration: 300
			});
		},
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
