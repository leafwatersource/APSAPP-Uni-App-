<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			plus.screen.lockOrientation('portrait-primary');
			
			const res = uni.getSystemInfoSync();
			if(res.language.indexOf("en")!=-1){
				this.$i18n.locale = "en-US";
			}else if(res.language.indexOf("Hant") != -1){
				this.$i18n.locale = "zh-Hant-CN";
			}else if(res.language.indexOf("Hans") != -1){
				this.$i18n.locale = "zh-Hans-CN";
			}
			else{
				this.$i18n.locale = "zh-Hans-CN";
			}
			// var w = plus.webview.open(
			// 	'hybrid/html/animation/animation.html',
			// 	'本地地址',
			// 	{ top: 0, bottom: 0, zindex: 999 },
			// 	'fade-in',
			// 	500
			// );
			// //设置定时器，4s后关闭启动广告页
			// setTimeout(function() {
			// 	plus.webview.close(w);
			// }, 4000);
			plus.runtime.getProperty(plus.runtime.appid, wgtinfo => {
				console.log(wgtinfo);
				console.log(plus.runtime.appid);
			});
						 // var color = plus.android.newObject("android.graphics.Color")  
			 //        var ac = plus.android.runtimeMainActivity();  
			 //        var c2int = plus.android.invoke(color, "parseColor", "#429AF1");  
			 //        console.log("c2int===" + JSON.stringify(c2int))  
			 //        var win = plus.android.invoke(ac, "getWindow");  
			 //        console.log("win===" + JSON.stringify(win))  
			 //        plus.android.invoke(win, "setNavigationBarColor", c2int);  
			
			//检测用户是否是最新的版本软件，传入appid,version,imei
			//数据库必须存入软件的最新版本的版本号,和最新版本的地址
			// uni.request({
			//     url: 'update', //检查更新的服务器地址
			//     data: {
			//         appid: plus.runtime.appid,
			//         version: plus.runtime.version,
			//         imei: plus.device.imei
			//     },
			//     success: (res) => {
			// 		console.log(res)
			//         if (res.statusCode == 200 && res.data.isUpdate) {
			//             let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
			//             // 提醒用户更新
			//             uni.showModal({
			//                 title: '更新提示',
			// 				showCancel:false,
			//                 content: res.data.note ? res.data.note : '是否选择更新',
			//                 success: (showResult) => {
			//                     if (showResult.confirm) {
			//                         plus.runtime.openURL(openUrl);
			//                     }
			//                 }
			//             })
			//         }else if(res.statusCode == 200 &&  !res.data.isUpdate){
			// 			uni.showToast({
			// 				title:"当前已是最新版本",
			// 				icon:"none",
			// 				duration:2000
			// 			})
			// 		}
			//     }
			// })
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
			// setInterval(()=>{
			// 	console.log(111)
			// },1000)
		}
	}
</script>

<style lang="scss">
	/* 头条小程序需要把 iconfont 样式放到组件外 */
	@import "components/m-icon/m-icon.css";
	/*每个页面公共css */
	page {
		min-height: 100%;
		display: flex;
		font-size: 16px;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		/* min-height: 100%; */
		display: flex;
		flex: 1;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #e3e3e3;
		padding: 10px;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 20px;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		font-size: 18px;
		line-height: 40px;
	}

	.input-row .title {
		width: 72px;
		padding-left: 15px;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 8px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 25px;
		padding: 10px;
	}

	button.primary {
		background-color: #0faeff;
	}
</style>
