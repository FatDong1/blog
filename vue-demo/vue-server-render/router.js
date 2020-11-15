import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/index', component: () => import('./view/index.vue')  },
      { path: '/foo', component: () => import('./view/Foo.vue') },
      { path: '/bar', component: () => import('./view/Bar.vue') },
    ]
  })
}
