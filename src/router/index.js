import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import User from '@/components/user/User'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login},
    {path: '/home',
      component: Home,
      children: [
        {path: '/user', component: User}
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  if (to.path === '/login') {
    return next()
  }
  const token = localStorage.getItem('token')
  // console.log(token)
  if (!token) {
    return next('/login')
  }
  next()
})

export default router
