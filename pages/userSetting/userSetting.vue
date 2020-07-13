<template>
	<view class="content">
		<ul>
			<li>
				<text class="name" v-text="'ID'" />
				<text class="message"><text v-text="empId"/></text>
			</li>
			<li>
				<text class="name" v-text="i18n.userSetting.name" />
				<text class="message"><text v-text="name" /></text>
			</li>
			<li @tap="resPage">
				<text class="name" v-text="'可报工的设备'" /> 
				<text class="message">
					<text class="hasIcon num" v-text="resList.length" />
					<text class="icon-right fa fa-angle-right" />
				</text>
			</li>
			<li @tap="canSetting('设置电话',phone,'phoneNum')">
				<text class="name" v-text="i18n.userSetting.phone" />
				<text class="message">
					<text class="hasIcon" v-text="phone" />
					<text class="icon-right fa fa-angle-right" />
				</text>
			</li>
			<li @tap="canSetting('设置邮箱',email,'email')">
				<text class="name">{{i18n.userSetting.email}}</text>
				<text class="message">
					<text class="hasIcon" v-text="email" />
					<text class="icon-right fa fa-angle-right" />
				</text>
			</li>
			<li>
				<text class="name" v-text="i18n.userSetting.userGroup" />
				<text class="message"><text v-text="desc" /></text>
			</li>
			<li>
				<text class="name" v-text="i18n.userSetting.system" />
				<text class="message"><text v-text="userSysName" /></text>
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
			desc: '',
			resList:[],
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
	computed:{
		i18n () {
			return this.$t('message'); 
		},
	},
	mounted() {
		this.getResList();
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
		getResList(){
			console.log(this.$store.userInfo)
			const _this = this;
			this.$HTTP({
				url: 'ResList',
				data: {
					usersysid: this.$store.state.userInfo['userSysID']
				}
			}).then(resList => {
				console.log(resList);
				_this.resList = resList.data;
				console.log(_this.resList)
				// _this.resList.push(...resList.data);
				// if (_this.isRequest) {
				// 	_this.resName = resList.data[0];
				// 	_this.GetUnstartList(resList.data[0]['resourceName']);
				// }
			});
		},
		resPage(){
			console.log('here')
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
