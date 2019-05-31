import Vue from 'vue'
import Router from 'vue-router'
import menu from '../components/Menu'

Vue.use(Router);

//配置路由
import book from '../page/bookSystem/Book'
import borrowSystem from '../page/borrowSystem/BorrowSystem'
import reader from '../page/borrowSystem/Reader'
import history from '../page/borrowSystem/History'
import system from '../page/system/System'
import loginManage from '../page/system/LoginManage'
import login from '../page/Login'

//配置组件
import Table from '../components/Table'
import Pagination from '../components/Pagination'

Vue.component('hao-table', Table);
Vue.component('hao-pagination', Pagination);

export default new Router({
  routes: [{
    path: '/',
    name: '/',
    component: login
  }, {
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/menu',
    name: 'menu',
    component: menu,
    children: [{
      path: '/book',
      name: 'book',
      component: book,
    }, {
      path: '/borrowSystem',
      name: 'borrowSystem',
      component: borrowSystem,
      children: [{
        path: '/reader',
        name: 'reader',
        component: reader,
      }, {
        path: '/history',
        name: 'history',
        component: history
      }]
    }, {
      path: '/system',
      name: 'system',
      component: system,
      children: [{
        path: '/loginManage',
        name: 'loginManage',
        component: loginManage
      }]
    }]
  }]
})
