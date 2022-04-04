<template>
  <v-app>
    <router-view></router-view>
    <v-footer color="primary " padless absolute app>
      <v-row justify="center" no-gutters align="center">
        <v-col class="py-4 px-5 text-center white--text" cols="4">
          <strong>Prácticas de Cryptography</strong><br />
          <strong>3CM14</strong><br />
          <strong>Equipo 11</strong>
        </v-col>
        <v-col class="py-4 white--text text-center" cols="4">
          <span>Hecho con ❤️ por:</span><br />
          <strong>Bolaños Ramos Caleb Salomón</strong><br />
          <strong>García Marciano Edgar</strong><br />
          <strong>Gutiérrez Gómez Yohan Leonardo</strong><br />
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
  </v-app>
</template>

<script>

export default {
  name: "App",

  components: {
    
  },

  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
