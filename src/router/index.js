import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const requireRouter = require.context('.', false, /\.js/)

let routes = []
requireRouter.keys().forEach(fileName => {
  if (fileName === './index.js') return
  const requireConfig = requireRouter(fileName)
  const routerArr = requireConfig.default || requireConfig
  routes = [ ...routes, ...routerArr ]
})

const router = new Router({
  routes: [
    ...routes,
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.query.title || to.meta.title
  next()
})

export default router