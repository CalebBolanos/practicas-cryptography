<template>
  <v-main>
    <v-navigation-drawer v-model="drawer" color="#f7f7f7" temporary app>
      <v-list-item>
        <v-list-item-content style="text-align: center">
          <v-list-item-title class="titulo">Prácticas Crypto</v-list-item-title>
          <v-list-item-subtitle>
            Caleb Bolaños Ramos - 3CM14
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item-group
          v-model="seleccionado"
          mandatory
          active-class="seleccionado"
          color="primary"
        >
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

      <v-toolbar-title>{{ items[seleccionado].text }}</v-toolbar-title>

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
      <section style="background-color: white">
        <v-layout column align-center justify-center>
          <strong style="color: #2c3e50; font-weight: 600; font-size: 3rem">
            Prácticas de Cryptography
          </strong>
          <div class="" style="color: #6a8bad; font-size: 1.6rem">
            Caleb Salomón Bolaños Ramos - 3CM14
          </div>
        </v-layout>
      </section>
      <!-- Provides the application the proper gutter -->
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer color="primary " padless>
      <v-row justify="center" no-gutters align="center">
        <v-col class="py-4 px-5 text-center white--text" cols="4">
          <strong>Prácticas de Cryptography</strong><br />
          <strong>3CM14</strong>
        </v-col>
        <v-col class="py-4 white--text text-center" cols="4">
          <span>Hecho con ❤️ por:</span><br />
          <strong>Caleb Salomón Bolaños Ramos</strong><br />
        </v-col>
        <v-col class="py-4 white--text text-center" cols="4">
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-col>

        <v-col class="secondary py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>ESCOM IPN</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-main>
</template>

<script>
export default {
  name: "PracticasView",
  data: () => ({
    drawer: false,
    group: null,
    seleccionado: 0,
    items: [
      {
        icon: "mdi-home",
        text: "Inicio",
        link: { name: "Inicio" },
      },
    ],
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
  methods: {},
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