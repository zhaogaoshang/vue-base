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
        },
        {
          path: '/base/single',
          component: () => import('@/views/Single'),
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: '/base/singleFourthNode',
              component: () => import('@/views/SingleFourthNode'),
              meta: {
                requiresAuth: true,
                module: '/base/single'
              }
            },
            {
              path: '/base/singleFifthNode',
              component: () => import('@/views/SingleFifthNode'),
              meta: {
                requiresAuth: true,
                module: '/base/single'
              }
            }
          ]
        },
        {
          path: '/base/suit',
          name: 'Suit',
          component: () => import('@/views/Suit.vue'),
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: '/base/suitSecondNode',
              name: 'SuitSecondNode',
              component: () => import('@/views/SuitSecondNode.vue'),
              meta: {
                requiresAuth: true,
                module: '/base/suit'
              }
            }
          ]

        },
        {
          path: 'base/position/special',
          component: () => import('@/views/PositionSpecial'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'base/cloth/brand',
          component: () => import('@/views/FabricBrandList'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'cloth/list',
          name: 'ClothList',
          component: () => import('@/views/clothlist'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/cloth/brand',
          name: 'ClothBrand',
          component: () => import('@/views/ClothBrand'),
          meta: {
            requiresAuth: true
          }
        },
        // {
        //   path: '/cloth/add/edit',
        //   component: () =>import('@/views/clothaddedit'),
        //   meta: {
        //     regenerate: true
        //   }
        // },
        {
          path: 'base/loss',
          component: () => import('@/views/lossReportingReasons'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'base/largesse',
          component: () => import('@/views/reasonForLargeVolume'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'base/versionManagement',
          component: () => import('@/views/versionManagement'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'base/versionEDit',
          component: () => import('@/views/versionEdit'),
          meta: {
            requiresAuth: true,
            module: 'base/versionManagement'
          }
        },
        {
          path: 'account/list',
          name: 'AccountList',
          component: () => import('@/views/AccountList'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/project/list',
          name: 'Projectlist',
          component: () => import('@/views/ProjectList'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'account/add/edit',
          name: 'AccountAddEdit',
          component: () => import('@/views/AccountAddEdit'),
          meta: {
            requiresAuth: true,
            module: '/account/list'
          }
        },
        {
          path: '/account/PaymentSettings',
          name: 'PaymentSettings',
          component: () => import('@/views/PaymentSettings'),
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
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/views/NotFind'),
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
      let activePath = to.fullPath
      if (to.meta.module) {
        activePath = to.meta.module
      }
      store.commit('aside/switch', activePath)
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
