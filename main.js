import Vue from 'vue'
import App from './App'
import http from 'commom/http.js'
import store from './store'
Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$HTTP = http
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
