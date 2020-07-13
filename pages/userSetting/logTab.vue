<template>
	<view class="content">
		<ul class="Tab">
			<li class="active">今天</li>
			<li>近七天</li>
			<li>近十五天</li>
			<li>近一个月</li>
		</ul>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	methods: {
		
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
			margin: 20upx 0;
			padding: 10upx;
			border: 1upx solid $uni-btn-color;
			border-radius: 10upx;
		}
		.active{
			color: $uni-text-color-white;
			background-color: $uni-btn-active-color;
		}
	}
}
</style>
