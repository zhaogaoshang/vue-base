import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)

const route = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/Index'),
      redirect: '/personality/store',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/personality/store',
          component: () => import('@/views/PersonalityStore'),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login'),
      meta: {
        requiresAuth: false
      }
    }
  ]
})

route.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta.requiresAuth) {
    if (store.state.user.userInfo === null) {
      next('/login')
    } else {
      store.commit('aside/switch', to.fullPath)
      next()
    }
    return false
  }
  next()
})

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Router.prototype.replace = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default route
