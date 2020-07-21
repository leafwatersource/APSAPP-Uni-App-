<template>
	<view class="content">
		<e-picker-plus ref="picker" mode="YMDhms" @confirm="confirm" start="2010-06-10 00:00:00" end="2010-06-15 23:59:59" defaultValue="2010-06-09 13:35:16" />
		<view @tap="show">开启</view>
	</view>
</template>

<script>
export default {
	methods: {
		show() {
			this.$refs.picker.show();
		},
		confirm(e) {
			console.log(e);
		}
	}
};
</script>

<style></style>
