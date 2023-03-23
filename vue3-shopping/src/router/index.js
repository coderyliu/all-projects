import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

import store from "../store"

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/category',
    component: () => import('../views/category/index.vue')
  },
  {
    path: '/cart',
    component: () => import('../views/cart/index.vue'),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) {
        next({
          path: '/login'
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/profile',
    component: () => import('../views/profile/index.vue'),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) {
        next({
          path: '/login'
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/search',
    component: () => import('../views/home/Search.vue')
  },
  {
    path: '/login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/register',
    component: () => import('../components/Register.vue')
  },
  {
    path: '/detail/:id',
    component: () => import('../views/category/detail.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((from, to, next) => {
  if (!from.fullPath.includes('detail')) {
    store.commit('changeTabBarShow', true)
  }

  next()
})

export default router
