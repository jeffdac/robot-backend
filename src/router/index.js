import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/layout'
import Login from '../components/login'
import Home from '../components/home'
import Auth from '../components/auth'
import Card from '../components/card'
import Admin from '../components/admin'
import Recharge from '../components/recharge'
import UserInfo from '../components/setting/userInfo'
import Password from '../components/setting/password'
import Four04 from '../components/four04'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next();
        } else {
          next('/login')
        }
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
          meta: {
            text: '',
          }
        },
        {
          path: 'auth',
          name: 'auth',
          component: Auth,
          meta: {
            text: '授权管理',
          }
        },
        {
          path: 'card',
          name: 'card',
          component: Card,
          meta: {
            text: '卡密管理',
          }
        },
        {
          path: 'admin',
          name: 'admin',
          component: Admin,
          meta: {
            text: '用户 / 管理员',
          }
        },
        {
          path: 'recharge',
          name: 'recharge',
          component: Recharge,
          meta: {
            text: '充值',
          }
        },
        {
          path: 'set/user/info',
          name: 'userInfo',
          component: UserInfo,
          meta: {
            text: '设置 / 基本资料'
          }
        },
        {
          path: 'set/user/password',
          name: 'password',
          component: Password,
          meta: {
            text: '设置 / 修改密码'
          }
        },
      ]
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '*',
      name: '404',
      component: Four04
    }
  ],
  mode: 'history'
})
