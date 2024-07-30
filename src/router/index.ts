import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import UsersCardList from '@/views/UsersCardList.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'UsersCardList',
    component: UsersCardList
  },
  {
    path: '/user/:id',
    name: 'UserImagesPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UsersImageList.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
