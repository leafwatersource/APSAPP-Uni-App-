<template>
	<view class="content">
		<uni-list>
			<uni-list-item v-for="item in resList" :key="item" :title="item.resourceName" />
		</uni-list>
	</view>
</template>

<script>
	export default{
		onLoad(options) {
			console.log(options)
			this.resList = JSON.parse(options.resList);
			console.log(this.resList)
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
