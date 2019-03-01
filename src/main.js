// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import city from 'dwb-city'
import TabBar from 'dwb-vue-tab'
import Button from 'owl-ui/lib/button/button.js'
import 'owl-ui/lib/button/button.css'
// import 'owl-ui/lib/styles/owl-ui.css'
const requireComponent = require.context('./components/Common', false, /[a-zA-Z]*\.vue/)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  )
  Vue.component(componentName, componentConfig.default || componentConfig)
})

Vue.use(city)
Vue.use(TabBar)
Vue.use(Button)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
