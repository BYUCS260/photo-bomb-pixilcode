import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

const data = {
  user: null
}

new Vue({
  data,
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
