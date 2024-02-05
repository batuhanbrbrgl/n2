import { createRouter, createWebHistory } from 'vue-router'
import Users from '../views/Users.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Users',
      component: Users,
    },
    {
      path: '/users/:id/todos',
      name: 'user-todos', // Bu adı değiştirdim
      component: () => import('../views/user/[id]/todos.vue'), // Bu dosyayı oluştur
    },
    {
      path: '/users/:id/posts',
      name: 'user-posts',
      component: () => import('../views/user/[id]/posts.vue'),
    },
    {
      path: '/users/:id/albums/',
      name: 'user-albums',
      component: () => import('../views/user/[id]/albums/index.vue'),
     
    },
    {
      path: '/users/:id/albums/:albumId',
      name: 'user-album-photos',
      component: () => import('../views/user/[id]/albums/[id].vue'),
    }
    
    
  ]
})

export default router
