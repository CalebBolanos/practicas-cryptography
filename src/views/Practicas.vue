<template>
  <v-main>
    <v-navigation-drawer  v-model="drawer" color="#f7f7f7" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="titulo">Prácticas Crypto</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list nav>
          <v-list-item-group v-model="seleccionado" mandatory active-class="seleccionado" color="primary" >
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

    <v-app-bar app elevation="0" class="blur" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px !important;">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{items[seleccionado].text}}</v-toolbar-title>

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
            <v-list-item-title >Cerrar Sesion</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main class="ma-0 pa-0">
      <!-- Provides the application the proper gutter -->
      <v-container fluid style="padding-top: 0;">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-main>
</template>

<script>
export default {
  name: 'PracticasView',
  data: () => ({
    drawer: false,
    group: null,
    seleccionado: 0,
    items: [
      {
        icon: "mdi-home",
        text: "Inicio",
        link: {name: 'Inicio'}
      },
    ],
  }),
  methods: {

  },
};
</script>

<style>
.seleccionado{
    /*background: linear-gradient(to right, #aaffa905, #11ffbc0c);*/
    background: linear-gradient(to right, #aaffa9, #11ffbd);
    font-size: 15px;
    color: white !important;
}
.blur{
  background-color: rgba(255, 255, 255, 0.5) !important;
  backdrop-filter: saturate(180%) blur(20px) !important;
}
.titulo{
  font-size: 1.5em !important;
  font-weight: 600;
  margin: 0.3em 0.5em 0 0.3em;
  color: black;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.titulo:hover{
  color: #11ffbd;
  cursor: default;
}
</style>