import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Admin from '@/components/Admin';
import HelloWorld from '@/components/HelloWorld';
import Printer from '@/components/Printer';
import Scanner from '@/components/Scanner';
import ManageUser from '@/components/ManageUser';
import KnowledgeBase from '@/components/KnowledgeBase';
import YRcord from '@/components/YRcord';
Vue.use(Router);

const router = new Router({
  mode: 'history', // 开启HTML5的history模式，可以让地址栏的url长得跟正常页面跳转的url一样。（不过还需要后端配合，讲Koa的时候会说）
  base: __dirname,
  routes: [
    {
      path: '/',
      redirect: '/login', //输入其它不存在的地址自动跳回首页
    },
    {
      path: '/login',
      name: 'Login', //默认首页打开时登录页
      component: Login,
    },
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
          path: '/equipment/printer',
          component: Printer,
          name: '打印机',
        },
        {
          path: '/equipment/sanner',
          component: Scanner,
          name: '扫描枪',
        },
        {
          path: '/admin/user',
          component: ManageUser,
          name: '用户管理',
        },
        {
          path: '/admin/KnowledgeBase',
          component: KnowledgeBase,
          name: '知识库',
        },
        {
          path: '/admin/YRcord',
          component: YRcord,
          name: '运维台账',
        },
      ],
    },
  ],
});

// 全局路由守卫 拦截所有路由
router.beforeEach((to, from, next) => {
  // 获取token
  const token = window.sessionStorage.getItem('jwtToken');
  if (to.path === '/login') {
    // 直接放行
    next();
  } else {
    if (token) {
      // 直接放行
      next();
    } else {
      // 跳转到登录页
      return next({ path: '/login' });
    }
  }
});

export default router;
