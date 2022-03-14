<template>
  <div>
    <section style="background-color: white">
      <v-layout column align-center justify-center>
        <strong style="color: #2c3e50; font-size: 3rem">
          Prácticas de Cryptography
        </strong>
        <div class="" style="color: #6a8bad; font-size: 1.6rem">
          Caleb Salomón Bolaños Ramos - 3CM14
        </div>
      </v-layout>
    </section>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>Todas las prácticas</h2>
        </v-col>
        <v-col v-for="n in 24" :key="n" cols="12" lg="6" md="6" sm="6">
          <v-card elevation="0">
            <v-row class="ma-0 pa-0" justify="center">
              <v-col cols="12">
                <v-card-title class="text-no-wrap pt-1 ps-2">
                  Practica x
                </v-card-title>
                <v-card-subtitle> Descripción </v-card-subtitle>
                <v-card-actions>
                  <v-btn color="primary" @click="reserve"> Ver más </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "InicioView",
  data: () => ({}),
};
</script>
