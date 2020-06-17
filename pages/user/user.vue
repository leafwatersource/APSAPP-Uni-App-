<template>
	<view class="content">
		<view class="status_bar" :style="{'height':barHeight+'px'}"></view>
		<view class="UserContent" :style="{'top':barHeight+'px'}">
			<view class="userMessage">
				<view class="usermanage">
					<view class="photo"></view>
					<view class="user">
						<text class="name">{{userInfo.userName}}</text>
						<text class="userID">ID:{{userInfo.empID}}</text>
						<text class="userPhone">{{i18n.user.cellphoneNumber}}{{userInfo.phoneNumber}}</text>
					</view>
				</view>
			</view>
			<view class="menu">
				<ul class="menuList">
					<li @tap="userSetting">
						<text class="icon fa fa-address-card"></text>
						<text>{{i18n.user.userSettings}}</text>
						<text class="icon-right fa fa-angle-right"></text>
					</li>
					<li>
						<text class="icon fa fa-cog"></text>
						<text>{{i18n.user.systemSettings}}</text>
						<text class="icon-right fa fa-angle-right"></text>
					</li>
					<li>
						<text class="icon fa fa-pencil-square"></text>
						<text>{{i18n.user.operationRecord}}</text>
						<text class="icon-right fa fa-angle-right"></text>
					</li>
					<li @tap="changePass">
						<text class="icon fa fa-key "></text>
						<text>{{i18n.user.changePassword}}</text>
						<text class="icon-right fa fa-angle-right"></text>
					</li>
				</ul>
				<button @click="cancelLogin" hover-class="hoverBtn">{{i18n.user.signOut}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				barHeight: 25,
				userInfo:""
			}
		},
		computed:{
			i18n () {
				return this.$t('message'); 
			},
		},
		onShow() {
			this.userInfo = uni.getStorageSync("userInfo");
		},
		mounted() {
			this.getSystemStatusBarHeight();
		},
		methods: {
			changePass(){
				uni.navigateTo({
					url:"../userSetting/changePass"
				})
			},
			userSetting(){
				uni.navigateTo({
					url:"../userSetting/userSetting"
				})
			},
			getSystemStatusBarHeight() {
				var height = plus.navigator.getStatusbarHeight();
				this.barHeight = height;
			},
			cancelLogin(){
				const _this = this;
				uni.showModal({
					title:this.i18n.user.cancelTitle,
					cancelText:this.i18n.user.cancelText,
					confirmText:this.i18n.user.confirmText,
					success(data){
						if(data.confirm){
							console.log(_this.userInfo.empID)
							_this.$HTTP({
								url:'UserSignOut',
								data:{
									empid:_this.userInfo.empID
								}
							}).then(res=>{
								console.log(res)
								if(res.data){
									uni.reLaunch({
										url:"../login/login"
									})
								}
							});
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "@/commom/font-awesome-4.7.0/css/font-awesome.min.css";
	.content {
		background-color: #e3e3e3;
		padding: 0 !important;
		box-sizing: border-box;

		.status_bar {
			width: 100%;
			position: fixed;
			top: 0;
			background-color:  $uni-btn-active-color;
			z-index: 100;
		}

		.UserContent {
			position: absolute;
			width: 100%;
			box-sizing: border-box;
			.userMessage {
				background-color: $uni-btn-active-color;
				height: 350upx;
				.usermanage {
					position: absolute;
					top: 60%;
					left: 20upx;
					transform: translateY(-50%);
					.photo {
						width: 180upx;
						height: 170upx;
						background-image: url(../../static/img/timg.png);
						background-repeat: no-repeat;
						background-position: center;
						background-size: cover;
						border-radius: 20upx;
						margin: 0 50upx;
						float: left;
					}
					.user {
						float: right;
						::after {
							content: "";
							display: block;
							clear: both;
						}

						text {
							color: $uni-text-color-white;
							display: block;
							padding: 0 !important;
						}

						.name {
							font-size: 60upx;
							::after {
								content: "";
								display: block;
								clear: both;
							}
						}
					}
				}
			}

			.menu {
				position: absolute;
				top: 350upx;
				width: 100%;
				.menuList{
					margin-top: 2upx;
					padding:0;
					li{
						position: relative;
						list-style: none;
						padding: 40upx;
						background-color: $uni-text-color-white;
						border-bottom: 1px solid #CCCCCC;
						.icon{
							color: $uni-btn-active-color;
							margin-right: 40upx;
							font-size: 40upx;
						}
						.icon-right{
							position: absolute;
							right: 40upx;
							top: 50%;
							transform: translateY(-50%);
							float: right;
							color: #999;
						}
					}
					
				}
				button{
					background-color: $uni-btn-active-color;
					color: $uni-text-color-white;
					width: 90%;
					margin: 20upx auto;
					border-radius: 40upx;
				}
				.hoverBtn{
					background-color: $uni-gb-color-blue;
				}
			}

		}
	}
</style>
