// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// vue-router
import router from './router'

// vuex
import store from './store'

// axios
import axios from 'axios'
Vue.prototype.$axios = axios

// global.scss
import './assets/styles/global.css'

// element-ui
import element from './element'
Vue.use(element)
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
