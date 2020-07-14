<template>
	<view>
		<uni-nav-bar :title="type" class="header" color="#ffffff" background-color="#006dcb" @clickLeft="back" @clickRight="finish" status-bar="true" fixed="true">
			<view slot="left" class="left" v-text="'取消'" />
			<view slot="right" class="right">
				<text v-text="'完成'" />
			</view>
		</uni-nav-bar>
		<view class="content"><input type="text" v-model="message" /></view>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import {mapState} from 'vuex';
export default {
	components: {
		uniNavBar
	},
	onLoad(options) {
		this.type = options.type;
		this.message = options.message;
		this.changeType = options.changeType;
	},
	data() {
		return {
			message: '',
			barHeight: 25,
			type: '',
			changeType: '',
			empName: '',
			dept: '',
			phoneNum: '',
			email: '',
		};
	},
	computed:{
		...mapState(['userInfo'])
	},
	mounted() {
		this.getSystemStatusBarHeight();
		this.empName = this.userInfo.userName;
		this.phoneNum = this.userInfo.phoneNumber;
		this.email = this.userInfo.email;
		this.dept = this.userInfo.userDesc;
		console.log(this.userInfo);
	},
	methods: {
		getSystemStatusBarHeight() {
			var height = plus.navigator.getStatusbarHeight();
			this.barHeight = height;
		},
		back() {
			uni.navigateBack({});
		},
		finish() {
			const _this = this;
			const userinfo = {
				PhoneNumber: this.phoneNum,
				Email: this.email,
				UserSysID:this.userInfo['userSysID'],
				EmpID:this.userInfo['empID'],
			};
			userinfo[this.changeType] = this.message;
			console.log("完成");
			this.$HTTP({
				url: 'ChangeUserInfo',
				data: {
					userinfo: JSON.stringify(userinfo)
				}
			}).then(res => {
				console.log(res);
				if (res.data) {
					if (_this.changeType == 'empName') {
						_this.userInfo['userName'] = _this.message;
					} else if (_this.changeType == 'dept') {
						_this.userInfo['userDesc'] = _this.message;
					} else if (_this.changeType == 'phoneNum') {
						_this.userInfo['phoneNumber'] = _this.message;
					} else if (_this.changeType == 'email') {
						_this.userInfo['email'] = _this.message;
					}
					const usermessage = _this.userInfo;
					console.log(usermessage);
					console.log(_this.userInfo);
					uni.setStorage({
						key:"userInfo",
						data:usermessage
					})
					var temp = uni.getStorageInfoSync('userInfo')
					console.log(temp);
					uni.showToast({
						title: '修改成功',
						icon: 'none'
					});
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
view {
	width: 100%;
	.top {
		background-color: $uni-btn-active-color;
	}
	.header {
		box-sizing: border-box;
		width: 100%;
		background-color: $uni-btn-active-color;
		.left {
			padding-left: 20upx;
		}
		.right {
			text-align: right;
		}
	}
	.content {
		box-sizing: border-box;
		input {
			padding: 20upx;
			background-color: #ddd;
		}
	}
}
</style>
