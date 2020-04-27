import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/welcome.vue'
import User from '../components/User/Users.vue'
import Rights from '../components/Power/Rights.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect:"/welcome",
    children:[
      {path:'/welcome',component:Welcome},
      {path:'/user',component:User},
      {path:'/rights',component:Rights}
  ]
  }
]

const router = new VueRouter({
  routes
})
// 挂载路由守卫
router.beforeEach((to, from,next)=>{
  if(to.path === '/login')return next();
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr)return next('/login')
  next()
})
 
export default router
