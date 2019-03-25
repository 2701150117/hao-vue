import Vue from 'vue'
import Router from 'vue-router'
import menu from '../components/menu'

Vue.use(Router);

//配置路由
import home from '../page/home'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu',
      component: menu,
      children: [{
        path: '/home',
        name: '新书盘点',
        component: home,
      }]
    }
  ]
})
