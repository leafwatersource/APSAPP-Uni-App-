import Vue from 'vue'
import Vuex from 'vuex'
import http from 'commom/http.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {},
		isConnected:true,
	},
	mutations: {
		WriteLog(logmodel,logmessage){
			http({
				url:'WriteLog',
				logmodel:logmodel,
				logmessage:logmessage
			}).then(success=>{
				console.log(success);
			})
		},
		HasLogin(state) {
			//判断用户信息是否存在,不存在代表没有登录
				if (JSON.stringify(state.userInfo) == '{}') {
					uni.redirectTo({
						url: '../login/login'
					});
				}
		},
	}
})

export default store
