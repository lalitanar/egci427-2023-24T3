import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Users from '../views/Users.vue'
import AddUser from '../views/AddUser.vue'
import UpdateUser from '../views/UpdateUser.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'

import {getAuth} from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/users'
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/signin'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/adduser',
      name: 'AddUser',
      component: AddUser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/userupdate/:userId',
      name: 'UpdateUser',
      component: UpdateUser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})


router.beforeEach((to, from, next)=>{
  const currentUser = getAuth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if(requiresAuth && !currentUser){
      console.log('You are not authorized to access this area')
      next('signin')
  } else if (!requiresAuth && currentUser){
      console.log('You are authorized to access this area')
      next('users')
  } else {
      next()
  }
})

export default router
