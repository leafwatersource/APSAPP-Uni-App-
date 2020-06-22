import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userName: "",
		userGuid: "",
		userInfo: null,
		isConnected:true,
	},
	mutations: {
		
	}
})

export default store
