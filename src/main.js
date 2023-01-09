import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Axios from 'axios';
import ElementUI from 'element-ui'; //引入element-ui
import 'element-ui/lib/theme-chalk/index.css';
//导入全局样式表
import './assets/css/global.css';
// Axios.defaults.baseURL = 'https://127.0.0.1:8081/api/private/v1/'; //定义根路径
// // 为axios添加拦截器
// Axios.interceptors.request.use((config) => {
//   console.log(config);
//   // 为请求头添加一个Authorization属性
//   config.headers.Authorization = window.sessionStorage.getItem('token');
//   return config; //最后必须返回config
// });

Vue.use(ElementUI); // Vue全局使用
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app');
