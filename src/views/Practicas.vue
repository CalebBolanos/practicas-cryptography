<template>
  <v-main>
    <v-navigation-drawer v-model="drawer" color="#f7f7f7" temporary app>
      <v-list-item>
        <v-list-item-content style="text-align: center">
          <v-list-item-title class="titulo">Prácticas Crypto</v-list-item-title>
          <v-list-item-subtitle>
            Equipo 11 - 3CM14
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item-group v-model="seleccionado" mandatory  color="primary">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app  class="blur" elevate-on-scroll>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ titulo }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar size="36">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>Cerrar Sesion</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main class="grey lighten-3 ma-0 pa-0">
      
      <!-- Provides the application the proper gutter -->
      <router-view></router-view>
    </v-main>
  </v-main>
</template>

<script>
export default {
  name: "PracticasView",
  data: () => ({
    drawer: false,
    group: null,
    items: [
      {
        icon: "mdi-home",
        text: "Inicio",
        link: { name: "Inicio" },
      },
      {
        icon: "mdi-application-brackets-outline",
        text: "Práctica 0",
        link: { name: "Practica0" },
      },
      {
        icon: "mdi-application-brackets-outline",
        text: "Práctica 1",
        link: { name: "Practica1" },
      },
      
    ],
    seleccionado: 0,
    titulo: '',
  }),
  methods: {},
  watch:{
    '$route' (to){
      this.titulo = to.meta.title
      this.seleccionado = this.items.findIndex(objeto =>{
        return objeto.text == to.meta.title
      })
    }
  },
};
</script>

<style>
.seleccionado {
  /*background: linear-gradient(to right, #aaffa905, #11ffbc0c);*/
  background: linear-gradient(to right, #3fbfff, #3366ff);
  font-size: 15px;
  color: white !important;
}
.blur {
  background-color: rgba(255, 255, 255, 0.5) !important;
  backdrop-filter: saturate(180%) blur(20px) !important;
}
.titulo {
  font-size: 1.5em !important;
  font-weight: 600;
  margin: 0.3em 0.5em 0 0.3em;
  color: black;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.titulo:hover {
  color: #3366ff;
  cursor: default;
}
</style>