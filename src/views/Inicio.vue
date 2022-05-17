<template>
  <div>
    <section style="background-color: white">
      <v-layout column align-center justify-center>
        <strong style="color: #2c3e50; font-size: 3rem" class="text-center">
          Prácticas de Cryptography
        </strong>
        <div class="text-center" style="color: #6a8bad; font-size: 1.6rem" >
          Equipo 11 - 3CM14
        </div>
      </v-layout>
    </section>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>Todas las prácticas</h2>
        </v-col>
        <v-col cols="12" lg="6" md="6" sm="6">
          <v-card elevation="0" rounded="lg">
            <v-row class="ma-0 pa-0" justify="center">
              <v-col cols="12">
                <v-card-title class="text-no-wrap pt-1 ps-2">
                  Practica 0
                </v-card-title>
                <v-card-subtitle>Implementación De Función Criptográfica (Cifrador Afín) </v-card-subtitle>
                <v-card-actions>
                  <v-btn color="primary" to="Practica0"> Ver más </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6" md="6" sm="6">
          <v-card elevation="0" rounded="lg">
            <v-row class="ma-0 pa-0" justify="center">
              <v-col cols="12">
                <v-card-title class="text-no-wrap pt-1 ps-2">
                  Practica 1
                </v-card-title>
                <v-card-subtitle>Cifrador por bloques (AES) </v-card-subtitle>
                <v-card-actions>
                  <v-btn color="primary" to="Practica1"> Ver más </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6" md="6" sm="6">
          <v-card elevation="0" rounded="lg">
            <v-row class="ma-0 pa-0" justify="center">
              <v-col cols="12">
                <v-card-title class="text-no-wrap pt-1 ps-2">
                  Practica 2
                </v-card-title>
                <v-card-subtitle>Firma Digital (RSA) </v-card-subtitle>
                <v-card-actions>
                  <v-btn color="primary" to="Practica2"> Ver más </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6" md="6" sm="6">
          <v-card elevation="0" rounded="lg">
            <v-row class="ma-0 pa-0" justify="center">
              <v-col cols="12">
                <v-card-title class="text-no-wrap pt-1 ps-2">
                  Practica 3
                </v-card-title>
                <v-card-subtitle>Control de Acceso </v-card-subtitle>
                <v-card-actions>
                  <v-btn color="primary" to="Practica3"> Ver más </v-btn>
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
