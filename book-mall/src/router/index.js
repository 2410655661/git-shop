import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/Home'),
      children: [
        {
          path: '/index',
          name: 'Index',
          component: () => import('@/components/index/Index')
        },
        {
          path: '/userinfo',
          name: 'UserInfo',
          component: () => import('@/components/users/UserInfo'),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/login/BaseLogin')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/components/login/BaseRegister')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(sessionStorage.getItem('userName')) {
      next()
    } else{
      next({
        name: 'Login',
        params: {
          redirect: to.name
        }
      })
    }
  } else {
    next()
  }
})

export default router
