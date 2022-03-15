import Vue from 'vue'
import VueRouter from 'vue-router'
import Practicas from '@/views/Practicas.vue'
import Inicio from '@/views/Inicio.vue'
import Practica1 from '@/views/practicas/Practica1.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/practicas'
  },
  {
    path: '/practicas',
    component: Practicas,
    children:[
      {
        path: '',
        redirect: 'inicio'
      },
      {
        path: 'inicio',
        name: 'Inicio',
        component: Inicio,
        meta: {
          title: 'Inicio'
        }
      },
      {
        path: 'practica1',
        name: 'Practica1',
        component: Practica1,
        meta: {
          title: 'Práctica 1'
        }
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
