import Vue from 'vue'
import VueRouter from 'vue-router'
import Practicas from '@/views/Practicas.vue'
import Inicio from '@/views/Inicio.vue'
import Practica0 from '@/views/practicas/Practica0.vue'
import Practica1 from '@/views/practicas/Practica1.vue'
import Practica2 from '@/views/practicas/Practica2.vue'
import Practica3 from '@/views/practicas/Practica3.vue'
import Registro from '@/views/practicas/practica3/Registro.vue'
import ContrasenaOlvidada from '@/views/practicas/practica3/ContrasenaOlvidada.vue'
import SesionIniciada from '@/views/practicas/practica3/SesionIniciada.vue'

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
        path: 'practica0',
        name: 'Practica0',
        component: Practica0,
        meta: {
          title: 'Práctica 0'
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
      {
        path: 'practica2',
        name: 'Practica2',
        component: Practica2,
        meta: {
          title: 'Práctica 2'
        }
      },
      {
        path: 'practica3',
        name: 'Practica3',
        component: Practica3,
        meta: {
          title: 'Práctica 3'
        }
      },
    ],
  },
  {
    path: '/practicas/practica3',
    component: Practicas,
    children:[
      {
        path: 'registro',
        name: 'Registro',
        component: Registro,
        meta: {
          title: 'Registro'
        }
      },
      {
        path: 'contrasenaOlvidada',
        name: 'ContrasenaOlvidada',
        component: ContrasenaOlvidada,
        meta: {
          title: 'Contraseña Olvidada'
        }
      },
      {
        path: 'sesionIniciada',
        name: 'SesionIniciada',
        component: SesionIniciada,
        props: true,
        meta: {
          title: 'Sesion Iniciada'
        }
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
