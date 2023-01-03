import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Admin from '@/components/Admin';
import HelloWorld from '@/components/HelloWorld';
import Certificate from '@/components/printer/Certificate';
import COC from '@/components/printer/COC';
import Envm4 from '@/components/printer/Envm4';
import Envm6 from '@/components/printer/Envm6';
import picture from '@/components/printer/picture';
Vue.use(Router);

export default new Router({
  mode: 'history', // 开启HTML5的history模式，可以让地址栏的url长得跟正常页面跳转的url一样。（不过还需要后端配合，讲Koa的时候会说）
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Login', //默认首页打开时登录页
      component: Login,
    },
    // {
    //   path: '*',
    //   redirect: '/', //输入其它不存在的地址自动跳回首页
    // },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: '/admin/home',
          component: HelloWorld,
          name: '后台主页',
        },
        {
          path: '/equipment/printer/Certificate',
          component: Certificate,
          name: '合格证打印机',
        },
        {
          path: '/equipment/printer/COC',
          component: COC,
          name: 'COC打印机',
        },
        {
          path: '/equipment/printer/Envm4',
          component: Envm4,
          name: '重型环保打印机',
        },
        {
          path: '/equipment/printer/Envm6',
          component: Envm6,
          name: '轻型环保打印机',
        },
        {
          path: '/equipment/printer/picture',
          component: picture,
          name: '照片打印机',
        },
      ],
    },
  ],
});
