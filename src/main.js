import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import lazyload from 'vue-lazyload'

Vue.use(lazyload,{
  loading:require('cps/header/logo@2x.png')
})
import  './common/stylus/index.styl'
import fastclick from 'fastclick'
// fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
