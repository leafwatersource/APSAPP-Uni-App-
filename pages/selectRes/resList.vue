<template>
	<view class="content">
		<ul>
			<li v-for="item in resList" :key="item.resourceName" @tap="resClick(item)">
			<text>{{item.resourceName}}</text>
			<text class="icon-right fa fa-angle-right"></text>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			console.log(JSON.parse(options.resList));
			this.resList = JSON.parse(options.resList);
			console.log(this.resList)
		},
		data(){
			return {
				resList:[],
			}
		},
		methods:{
			resClick(resName){
				const resData = JSON.stringify(resName);
				uni.reLaunch({
					url:"../main/main?resName="+resData
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '@/commom/font-awesome-4.7.0/css/font-awesome.min.css';
	.content{
		background-color: #E3E3E3;
		padding: 0;
		ul{
			padding:0;
			li{
				list-style: none;
				background-color: $uni-text-color-white;
				padding: 20upx 40upx;
				border-bottom: 1px solid #E3E3E3;
				color: #757575;
				::last-child{
					border-bottom: none;
				}
				.icon-right{
					float: right;
				}
			}
		}
	}
</style>
