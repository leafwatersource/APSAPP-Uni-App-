<template>
	<view class="content">
		<ul>
			<li class="disable">
				<text v-text="'ID'" />
				<input type="text" disabled v-model="empID" />
			</li>
			<li>
				<text v-text="i18n.changePass.oldPass" />
				<input type="text" placeholder-class="holder" :placeholder="i18n.changePass.oldPassHolder" v-model="pass" />
			</li>
			<li>
				<text v-text="i18n.changePass.newPass" />
				<input type="text" placeholder-class="holder" :placeholder="i18n.changePass.newPassHolder" v-model="newPass" />
			</li>
			<li>
				<text v-text="i18n.changePass.enterPass" />
				<input type="text" placeholder-class="holder" :placeholder="i18n.changePass.enterPassHolder" v-model="enterPass" />
			</li>
		</ul>
		<button class="finish" @tap="finish" v-text="i18n.changePass.finish" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			empID: '',
			pass: '',
			newPass: '',
			enterPass: ''
		};
	},
	computed:{
		i18n () {
			return this.$t('message'); 
		},
	},
	mounted() {
		const userInfo = uni.getStorageSync('userInfo');
		this.empID = userInfo.empID;
	},
	methods: {
		finish() {
			console.log(this.empID);
			const _this = this;
			if(this.pass == ""){
				uni.showToast({
					title:"请输入旧密码"
				});
				return
			}
			if(this.newPass == ""){
				uni.showToast({
					title:"请输入新密码"
				});
				return
			}
			if(this.enterPass == ""){
				uni.showToast({
					title:"请输入确认密码"
				});
				return
			}
			if(this.pass == this.newPass){
				uni.showToast({
					title:"新密码不能和旧密码一样",
					icon:"none"
				});
				return
			}
			if (this.newPass != this.enterPass) {
				uni.showToast({
					title: '两次填写的密码不一致'
				});
				return;
			}
			
			this.$HTTP({
				url: 'ChangePass',
				data: {
					empid:this.empID,
					oldPass: this.pass,
					newPass: this.enterPass
				}
			}).then(status => {
				if (status.data) {
					uni.setStorage({
						key: 'pass',
						data: _this.enterPass
					});
					uni.showToast({
						title: '密码修改成功',
						complete() {
							setTimeout(()=>{
								uni.navigateBack({
								    delta: 1,
								    animationType: 'pop-out',
								    animationDuration: 200
								});
							},300)
						}
					});
				}else{
					uni.showToast({
						title:"密码错误",
						icon:"none"
					})
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.content {
	padding: 0;
	ul {
		padding: 0;
		width: 100%;
		box-sizing: border-box;
		li {
			background-color: $uni-text-color-white;
			margin: 2upx 0;
			padding: 20upx;
			list-style: none;
			text {
				width: 50%;
				float: left;
			}
			input {
				width: 50%;
				float: right;
			}
			.holder {
				color: #cccccc;
			}
		}
		.disable {
			input {
				color: #999999;
			}
		}
		li:after {
			display: block;
			content: '';
			clear: both;
		}
	}
	button {
		background-color: $uni-btn-active-color;
		color: $uni-text-color-white;
		width: 90%;
		margin: 40upx auto;
		border-radius: 40upx;
	}
	.hoverBtn {
		background-color: $uni-gb-color-blue;
	}
}
</style>
