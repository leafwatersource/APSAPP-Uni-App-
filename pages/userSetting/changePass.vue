<template>
	<view class="content">
		<ul>
			<li class="disable">
				<text>ID号</text>
				<input type="text" disabled v-model="empID" />
			</li>
			<li>
				<text>旧密码</text>
				<input type="text" placeholder-class="holder" placeholder="请填写旧密码" v-model="pass" />
			</li>
			<li>
				<text>新密码</text>
				<input type="text" placeholder-class="holder" placeholder="请输入新密码" v-model="newPass" />
			</li>
			<li>
				<text>确认密码</text>
				<input type="text" placeholder-class="holder" placeholder="请再次输入新密码" v-model="enterPass" />
			</li>
		</ul>
		<button class="finish" @tap="finish">完成</button>
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
	mounted() {
		const userInfo = uni.getStorageSync('userInfo');
		this.empID = userInfo.empID;
	},
	methods: {
		finish() {
			const _this = this;
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
				width: 20%;
				float: left;
			}
			input {
				width: 70%;
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
		background-color: $uni-btn-color;
		color: $uni-text-color-white;
		width: 90%;
		margin: 40upx auto;
		border-radius: 40upx;
	}
	.hoverBtn {
		background-color: $uni-btn-active-color;
	}
}
</style>
