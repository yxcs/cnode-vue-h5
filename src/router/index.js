import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Cart from '@/pages/Cart'
import Classify from '@/pages/Classify'
import Home from '@/pages/Home'
import CDetails from '@/pages/CDetails'
import CUser from '@/pages/CUser'
import CMessage from '@/pages/CMessage'
import CAbout from '@/pages/CAbout'
import MainLayout from '@/pages/MainLayout'
import Recommend from '@/pages/Recommend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainLayout',
      component: MainLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
        },
        {
          path: '/cdetails/:id',
          name: 'cdetails',
          component: CDetails,
        },
        {
          path: '/cuser/:id',
          name: 'cuser',
          component: CUser,
        },
        {
          path: '/cmessage',
          name: 'cmessage',
          component: CMessage,
        },
        {
          path: '/cabout',
          name: 'cabout',
          component: CAbout,
        },
        {
          path: '/cart',
          name: 'cart',
          component: Cart,
        }, {
          path: '/classify',
          name: 'classify',
          component: Classify,
        }, {
          path: '/recommend',
          name: 'recommend',
          component: Recommend,
        }
      ]
    }
  ]
})
