import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Device from '@/components/Device'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: ':deviceId',
          name: 'device',
          component: Device
        }
      ]
    }
  ]
})
