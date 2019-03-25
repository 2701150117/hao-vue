import Vue from 'vue'
import Router from 'vue-router'
import menu from '../components/menu'

Vue.use(Router);

//配置路由
import home from '../page/home'
import catalog from '../page/catalog'

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
      }, {
        path: '/catalog',
        name: '书刊编目',
        component: catalog,
      }]
    }
  ]
})
