import Vue from 'vue'
import Router from 'vue-router'
import menu from '../components/Menu'

Vue.use(Router);

//配置路由
import book from '../page/bookSystem/Book'
import borrowSystem from '../page/borrowSystem/BorrowSystem'
import reader from '../page/borrowSystem/Reader'

//配置组件
import Table from '../components/Table'
import Pagination from '../components/Pagination'

Vue.component('hao-table', Table);
Vue.component('hao-pagination', Pagination);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu',
      component: menu,
      children: [{
        path: '/book',
        name: 'book',
        component: book,
      }, {
        path: 'borrowSystem',
        name: 'borrowSystem',
        component: borrowSystem,
        children: [{
          path: '/reader',
          name: 'reader',
          component: reader,
        }]
      }]
    }
  ]
})
