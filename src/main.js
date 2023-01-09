import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Axios from 'axios';
import ElementUI from 'element-ui'; //引入element-ui
import 'element-ui/lib/theme-chalk/index.css';
//导入全局样式表
import './assets/css/global.css';
Vue.use(ElementUI); // Vue全局使用
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app');
