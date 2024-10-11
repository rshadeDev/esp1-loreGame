import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Homepage.vue'
import LoreView from '../components/Lore.vue'
import JuegoView from '../components/Juego.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/lore',
      name: 'lore',
      component: LoreView
    },
    {
      path: '/game',
      name: 'juego',
      component: JuegoView 
    },
  ]
})

export default router
