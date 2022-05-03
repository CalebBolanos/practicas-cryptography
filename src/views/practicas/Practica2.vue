<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Práctica 2 - Firma Digital</h2>
      </v-col>
      <v-col cols="12" >
        <v-card class="elevation-0" rounded="lg">
          <v-card-title class="d-flex align-center justify-center py-7">
            <h2 class="text-2xl font-weight-semibold">Generar Lllaves</h2>
          </v-card-title>
          <v-card-text>
            <p class="text--primary mb-1">
              Para cifrar, debes de especificar los siguientes parametros:
            </p>
          </v-card-text>
            <v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  block
                  color="primary"
                  @click="generarLlaves()"
                  >Generar Llaves</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
              <span class="d-flex align-center justify-center flex-wrap">
                <!-- <span class="me-2">{{ mensajeCifrado }}</span> -->
              </span>
            </v-card-text>
        </v-card>
      </v-col>
    
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PracticaDos",
  data: () => ({
    
  }),

  methods: {
    generarLlaves() {
        console.log("ok");
    },

    crearArchivo(nombreArchivo, texto) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(texto)
      );
      element.setAttribute("download", nombreArchivo);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
  },
};
</script>
