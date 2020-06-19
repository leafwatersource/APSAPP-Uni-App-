import Vue from 'vue'
import App from './App'
import http from 'commom/http.js'
import VueI18n from 'vue-i18n'
import store from './store'

Vue.use(VueI18n)
Vue.config.productionTip = false

const i18n = new VueI18n({
	// 默认语言
	locale: 'zh-Hans-CN',
	// 引入语言文件
	messages: {
		'zh-Hans-CN': require('./static/locales/zh-CN.js').lang,
		'en-US': require('./static/locales/en-US.js').lang,
		'zh-Hant-CN':require('./static/locales/zh-Hant-CN.js').lang
	}
})
Vue.prototype._i18n = i18n
Vue.prototype.$store = store
Vue.prototype.$HTTP = http
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
