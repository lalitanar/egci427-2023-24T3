import {createRouter, createWebHistory} from 'vue-router'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

import MovieList from '../views/MovieList.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'


const router = createRouter ({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/signin'
        },
        {
            path: '/:catchAll(.*)',
            redirect: '/signin'
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
            path: '/movies',
            name: 'MovieList',
            component: MovieList,
            meta: {
                requiresAuth: true
            }
        },
    ]
})

const getCurrentUser = () =>{
    return new Promise((resolve, reject)=> {
      const removeListener = onAuthStateChanged(
        getAuth(),
        (user)=>{
          removeListener()
          resolve(user)
        },
        reject
      )
    })
  }
  
  router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    if (requiresAuth) {
      if(await getCurrentUser()){
        console.log("You are authorized to access this area.");
        next()
      } else {
        console.log("You are not authorized to access this area.")
        next('signin')
      }
    } else {
      next()
    }
  })
  
  export default router