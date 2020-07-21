<template>
	<view class="content">
		<uni-list>
			<uni-list-item v-for="(item,index) in resList" :key="index" :title="item.resourceName" />
		</uni-list>
	</view>
</template>

<script>
	export default{
		onLoad(options) {
			this.resList = JSON.parse(options.resList);
		},
		data(){
			return {
				resList:[]
			}
		}
	}
</script>

<style>
</style>
