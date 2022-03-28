<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Práctica x - a</h2>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="6">
        <v-card class="elevation-0" rounded="lg">
          <v-card-title class="d-flex align-center justify-center py-7">
            <h2 class="text-2xl font-weight-semibold">Cifrar</h2>
          </v-card-title>
          <v-card-text>
            <p class="text--primary mb-1">
              Para cifrar, debes de especificar los siguientes parametros:
            </p>
          </v-card-text>
          <v-form
            ref="formCifrar"
            v-model="valid"
            lazy-validation
            @submit.prevent
          >
            <v-card-text>
              <v-file-input
                label="Archivo a cifrar"
                outlined
                accept=".txt"
                @change="leerArchivoCifrar"
                :rules="reglasArchivo"
              ></v-file-input>
              <v-textarea
                v-model="plaintext"
                label="Contenido del archivo a cifrar"
                no-resize
                counter
                rows="3"
                outlined
                readonly
              ></v-textarea>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  block
                  color="primary"
                  @click="verificarCifrado()"
                  >Cifrar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
              <span class="d-flex align-center justify-center flex-wrap">
                <!-- <span class="me-2">{{ mensajeCifrado }}</span> -->
              </span>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="6">
        <v-card class="elevation-0" rounded="lg">
          <v-card-title class="d-flex align-center justify-center py-7">
            <h2 class="text-2xl font-weight-semibold">Descifrar</h2>
          </v-card-title>
          <v-card-text>
            <p class="text--primary mb-1">
              Para descifrar, debes de especificar los siguientes parametros:
            </p>
          </v-card-text>
          <v-form
            ref="formDescifrar"
            v-model="valid"
            lazy-validation
            @submit.prevent
          >
            <v-card-text>
              <v-file-input
                label="Archivo a descifrar"
                outlined
                accept=".txt"
                @change="leerArchivoDescifrar"
                :rules="reglasArchivo"
              ></v-file-input>
              <v-textarea
                v-model="cifrado"
                label="Contenido del archivo a descifrar"
                no-resize
                counter
                rows="3"
                readonly
                outlined
              ></v-textarea>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  block
                  color="primary"
                  @click="verificarDescifrado()"
                  >Descifrar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
              <span class="d-flex align-center justify-center flex-wrap">
                <!-- <span class="me-2">{{ mensajeDescifrado }}</span> -->
              </span>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PracticaUno",
  data: () => ({
    alfabetoCifrar: "1",
    alfaCifrar: 3,
    betaCifrar: 2,
    plaintext: "",
    mensajeCifrado: "",

    alfabetoDescifrar: "1",
    alfaDescifrar: 3,
    betaDescifrar: 2,
    cifrado: "",
    mensajeDescifrado: "",

    nombreArchivo: "",
    contenidoArchivo: null,

    valid: true,

    reglasArchivo: [
      (v) => !!v || "El archivo es requerido",
      (v) => (v && v.size > 0) || "El archivo es requerido",
    ],
  }),

  methods: {
    verificarCifrado() {
      if (this.$refs.formCifrar.validate()) {
        console.log("ok");
      }
    },

    verificarDescifrado() {
      if (this.$refs.formDescifrar.validate()) {
        console.log("ok");
      }
    },

    leerArchivoCifrar(archivo) {
      if (!archivo) {
        this.contenidoArchivo = "No File Chosen";
        return;
      }
      this.nombreArchivo = archivo.name.substr(
        0,
        archivo.name.lastIndexOf(".")
      );
      //console.log(this.nombreArchivo)

      let reader = new FileReader();

      reader.readAsText(archivo);
      reader.onload = () => {
        this.contenidoArchivo = reader.result;
        this.plaintext = this.contenidoArchivo;
      };
    },

    leerArchivoDescifrar(archivo) {
      if (!archivo) {
        this.contenidoArchivo = "No File Chosen";
        return;
      }
      this.nombreArchivo = archivo.name.substr(
        0,
        archivo.name.lastIndexOf(".")
      );
      //console.log(this.nombreArchivo)

      let reader = new FileReader();

      reader.readAsText(archivo);
      reader.onload = () => {
        this.contenidoArchivo = reader.result;
        this.cifrado = this.contenidoArchivo;
      };
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
