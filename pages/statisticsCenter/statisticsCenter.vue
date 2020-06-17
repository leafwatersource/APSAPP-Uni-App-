<template>
	<view class="content">
		功能待开发敬请期待......
	</view>
</template>

<script>
	export default{
		computed:{
			i18n () {
				return this.$t('message'); 
			},
		},
	onShow() {
		this.userInfo = uni.getStorageSync("userInfo");
		uni.setTabBarItem({
			index: 1,
			text: this.i18n.tabBar.statistics
		});
		uni.setTabBarItem({
			index: 2,
			text: this.i18n.tabBar.me
		});
	},
		
	}
</script>

<style>
</style>
