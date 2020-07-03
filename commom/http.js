// created by wangyong for uni-app request 2019.11.22
const process = 'development';
// const process = 'product';
var baseURL = 'http://api2.szrate.com:8088/api/'; //这里写接口名称就好啦
if (process === 'development') {
	console.log('开发环境/测试环境')
	// baseURL = 'https://datacenterapi.szrate.com/api/'; //这里写接口名称就好啦
	 // baseURL = 'http://api2.szrate.com:8088/api/'; //这里写接口名称就好啦
	 // baseURL = 'http://api1.szrate.com:8088/api/'; //这里写接口名称就好啦
	 // baseURL = 'http://192.168.50.112/api/'; //这里写接口名称就好啦
	 baseURL ="http://192.168.50.106/api/";
	 // baseURL ="http://192.168.1.53/api/";

	// baseURL = 'http://192.168.50.112/api/'; //这里写接口名称就好啦
} else {
	console.log('生产环境/正式环境')
	baseURL = 'http://phone.szrate.com/api/'; //这里写接口名称就好啦
}
const http = (options) => {
	return new Promise((resolve, reject) => {
		uni.getNetworkType({
			success: function(res) {
				if (res.networkType == "none") {
					uni.showToast({
						title: "无网络",
						icon: "none"
					});
					reject("none");
				}
			}
		});
		// 监听网络状态变化
		uni.onNetworkStatusChange(function(res) {
			console.log(res.isConnected); //当前是否有网络连接
			console.log(res.networkType); //网络类型
			if (!res.isConnected) {
				uni.showToast({
					title: "无网络",
					icon: "none"
				});
				reject("none");
			}
		});
		try {
			// 从本地获取token 
			const UserGuid = uni.getStorageSync('UserGuid');
			const UserEmpID = uni.getStorageSync('UserEmpID');
			uni.request({
				url: (options.baseURL || baseURL) + options.url,
				method: options.method || 'POST', // 默认为POST请求
				data: options.data, //请求超时在manifest.json配置
				header: {
					'token': JSON.stringify({
						UserGuid: UserGuid,
						UserEmpID: UserEmpID
					}),
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					uni.hideLoading();
					if(res.statusCode == 500){
						uni.showToast({
							title:"服务器异常",
							icon:"none"
						});
						return;
					}else if(res.statusCode == 200){
						if(res.data.LoginState == "0"){
							uni.showToast({
								title:"账号在别出登录了",
								icon:"none"
							});
							uni.reLaunch({
								url:"/pages/login/login"
							})
							return;
						}
						if(res.data==-1){
							uni.showToast({
								title:"账号在别处登录了",
								icon:"none"
							});
							uni.reLaunch({
								url:"/pages/login/login"
							})
						}
						resolve(res)
					}else if(res.statusCode == 404){
						uni.showToast({
							title:"服务器地址错误",
							icon:"none"
						});
						reject(res)
					}
				},
				fail: (err) => {
					console.log(err);
					if(err.errMsg.indexOf("timeout")!=-1){
						uni.showToast({
							title:"请求超时",
							icon:"none",
							duration:2000
						});
						return
					}else{
						uni.showToast({
							title:"请检查网络连接",
							icon:"none",
							duration: 2000
						})
					}					
					// uni.showToast({
					// 	title: '请求失败请检查网络连接',
					// 	icon: 'none'
					// });
					// reject(err.data);
					/*错误码处理
					let code = err.data.code; 
					switch (code) {
					    case 1000:
					        break;
					    default:
					        break;
					} */
				},
				complete: () => {
					//请求完成
				}
			});
		} catch (e) {
			console.log("异常")
			uni.hideLoading();
			uni.showToast({
				title: '服务端异常',
				icon: 'none'
			})
		}

	})
}

export default http
