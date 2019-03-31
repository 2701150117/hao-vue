import Vue from 'vue'
import Router from 'vue-router'
import menu from '../components/menu'

Vue.use(Router);

//配置路由
import home from '../page/home'
import catalog from '../page/catalog'
import bookInput from '../page/bookInput'
import bookundercarriage from '../page/bookundercarriage'
import bookquery from '../page/bookquery'
import bookborrow from '../page/bookborrow'
import bookreturn from '../page/bookreturn'
import bookloss from '../page/bookloss'
import readerregister from '../page/readerregister'
import readerinformation from '../page/readerinformation'
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
      }, {
        path: '/bookInput',
        name: '书刊录入',
        component: bookInput,
      }, {
        path: '/bookundercarriage',
        name: '书刊下架',
        component: bookundercarriage,
      }, {
        path: '/bookquery',
        name: '书刊查询',
        component: bookquery,
      }, {
        path: '/bookborrow',
        name: '书刊借阅',
        component: bookborrow,
      },{
        path: '/bookreturn',
        name: '书刊归还',
        component: bookreturn,
      },{
        path: '/bookloss',
        name: '书刊挂失',
        component: bookloss,
      },{
        path: '/readerregister',
        name: '读者注册',
        component: readerregister,
      },{
        path: '/readerinformation',
        name: '读者信息',
        component: readerinformation,
      }
      ]
    }
  ]
})
