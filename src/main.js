import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'element-ui/lib/theme-chalk/index.css';
// 引入router实例
import router from './router/index'

import dayjs from 'dayjs'
Vue.prototype.dayjs = dayjs;


Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  beforeCreate(){
    Vue.prototype.$bus = this;
  }
}).$mount('#app')
