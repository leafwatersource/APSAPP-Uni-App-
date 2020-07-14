<template>
	<view class="content">
		<ul class="Tab">
			<li :class="{'active':index==tabActive?true:false }" v-for="(item,index) in tabs" :key="index" v-text="item" @tap="tabClick(index)" />
		</ul>
		<ul class="logView">
			<li> 
				<view class="circle" />
				<view class="range"></view>
				<view class="logMessage">
					<text class="logTime">2020/07/14 24:00:00</text>
					<text class="message">事件类型:用户登录</text>
					<text class="message">事件详情:登录成功</text>
					<text class="message">用户名:叶水源</text>
					<text class="message">用户IP:192.168.1.1</text>
					<text class="message">操作系统:IOS 13</text>
				</view>
			</li>
		</ul>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabs:['今天','近三天','进七天','近一个月'],
			tabActive:0
		};
	},
	methods: {
		tabClick(index){
			//切换卡的点击事件
			this.tabActive = index;
		},
		getLog(){
			//获取用户的操作日志
		}
	}
};
</script>

<style scoped lang="scss">
.content {
	padding: 0;
	.Tab{
		width: 100%;
		display: flex;
		background-color: $uni-text-color-white;
		 justify-content:space-around;
		 padding: 0;
		li{
			list-style: none;
			display: block;
			margin: 20upx;
			padding: 10upx 0;
			text-align: center;
			width: 25%;
			border: 1upx solid $uni-btn-color;
			border-radius: 16upx;
			transition: all .2s linear; 
			background-color: #f2f2f2;
		}
		.active{
			color: $uni-text-color-white;
			background-color: $uni-btn-active-color;
		}
	}
	.logView{
		padding: 0;
		margin: 20upx 0;
		li{
			position: relative;
			list-style: none;
			display: flex;
			padding: 15upx 50upx;
			box-sizing: border-box;
			background-color: $uni-text-color-white;
			.circle{
				width: 30upx;
				height: 30upx ;
				border-radius: 50%;
				background-color: $uni-btn-active-color;
			}
			.range{
				position: absolute;
				width: 10upx;
				height: calc(100% - 60upx);
				background-color: #f2f2f2;
				left: 60upx;
				top: 45upx;
			}
			.logMessage{
				padding: 0 15upx;
				text{
					display: block;
				}
				.logTime{
					color: $uni-btn-active-color;
					font-size: 30upx;
					font-weight: bold;
				}
				.message{
					font-size: 26upx;
				}
			}
		}
	}
}
</style>
