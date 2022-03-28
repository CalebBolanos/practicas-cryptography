<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Práctica 1</h2>
      </v-col>
      <v-col cols="12">
        <v-card class="elevation-0" rounded="lg">
          <v-card-title class="d-flex align-center justify-center py-7">
            <h2 class="text-2xl font-weight-semibold">
              Cifrador por bloques (AES)
            </h2>
          </v-card-title>
          <v-card-text>
            <p class="text--primary mb-1">
              Para usar este programa, debes de especificar los siguientes
              parametros:
            </p>
          </v-card-text>
          <v-form ref="formAES" v-model="valid" lazy-validation @submit.prevent>
            <v-card-text>
              <v-radio-group v-model="modo" row>
                <template v-slot:label>
                  <div>Modo:</div>
                </template>
                <v-radio label="Cifrado" value="cifrar"> </v-radio>
                <v-radio label="Descifrado" value="descifrar"> </v-radio>
              </v-radio-group>
              <v-radio-group v-model="modoOperacion" row>
                <template v-slot:label>
                  <div>Selecciona un modo de operación:</div>
                </template>
                <v-radio label="ECB" value="ECB"> </v-radio>
                <v-radio label="CBC" value="CBC"> </v-radio>
                <v-radio label="CFB" value="CFB"> </v-radio>
                <v-radio label="OFB" value="OFB"> </v-radio>
              </v-radio-group>
              <v-file-input
                label="Archivo de entrada"
                outlined
                accept=".txt"
                @change="leerArchivoCifrar"
                :rules="reglasArchivo"
              ></v-file-input>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="llave"
                    prepend-inner-icon="mdi-key"
                    label="Llave (16 bits)"
                    type="number"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="c0"
                    prepend-inner-icon="mdi-code-array"
                    label="Vector de inicializacion (C0)"
                    type="number"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  block
                  color="primary"
                  @click="verificarCampos()"
                  >{{modo}}</v-btn
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
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PracticaUno",
  data: () => ({
    //variables del form
    modo: "cifrar",
    valid: true,
    modoOperacion: "ECB",
    llave: null,
    c0: null,
    nombreArchivo: "",
    contenidoArchivo: null,


    reglasArchivo: [
      (v) => !!v || "El archivo es requerido",
      (v) => (v && v.size > 0) || "El archivo es requerido",
    ],
    
    plaintext: "",
    mensajeCifrado: "",

    

    

    
  }),

  methods: {
    verificarCampos() {
      if (this.$refs.formAES.validate()) {
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
