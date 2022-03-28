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
                accept=".bmp"
                @change="leerArchivoCifrar"
                :rules="reglasArchivo"
              ></v-file-input>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="llaveString"
                    prepend-inner-icon="mdi-key"
                    label="Llave (16 bytes)"
                    type="text"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="c0String"
                    prepend-inner-icon="mdi-code-array"
                    label="Vector de inicializacion (C0)"
                    type="text"
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
                  >{{ modo }}</v-btn
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
import CryptoJS from "crypto-js";
export default {
  name: "PracticaUno",
  data: () => ({
    //variables del form
    modo: "cifrar",
    valid: true,
    modoOperacion: "ECB",
    llaveString: "1234123412ABCDEF",
    c0String: "ABCDEF1234123412",
    nombreArchivo: "",
    contenidoArchivo: null,

    //variables para cifrado-descifrado
    llave: null,
    c0: null,

    reglasArchivo: [
      (v) => !!v || "El archivo es requerido",
      (v) => (v && v.size > 0) || "El archivo es requerido",
    ],

    plaintext: null,
    mensajeCifrado: "",
  }),

  methods: {
    verificarCampos() {
      if (this.$refs.formAES.validate()) {
        console.log("ok");

        this.llave = CryptoJS.enc.Utf8.parse(this.llaveString);
        this.c0 = CryptoJS.enc.Utf8.parse(this.c0String);

        //dependiendo de la imagen el tamaño de su header cambiara
        let headerBMP = this.contenidoArchivo.slice(0, 124);
        let contenidoBMP = this.contenidoArchivo.slice(
          125,
          this.contenidoArchivo.byteLength
        );

        if (this.modo === "cifrar") {
          this.cifrarAES(
            headerBMP,
            contenidoBMP,
            this.llave,
            this.c0,
            this.modoOperacion
          );
        } else {
          this.descifrarAES(
            headerBMP,
            contenidoBMP,
            this.llave,
            this.c0,
            this.modoOperacion
          );
        }
      }
    },

    cifrarAES(header, input, llave, c0, modoOperacion) {
      console.log(modoOperacion);

      let wordArray = CryptoJS.lib.WordArray.create(input);
      let cifrado = CryptoJS.AES.encrypt(wordArray, llave, {
        iv: c0,
        mode: CryptoJS.mode.CBC,
      });

      let contenidoArchivo = new Blob([header, cifrado.toString()]);

      this.crearArchivo(this.nombreArchivo + "_eMODO.bmp", contenidoArchivo);
    },

    descifrarAES(header, input, llave, c0, modoOperacion) {
      console.log(input, modoOperacion);

      //let wordArray = CryptoJS.lib.WordArray.create();
      //console.log(wordArray);

      let blob = new Blob([input], { type: "text/plain" });
      let reader = new FileReader();
      reader.onload = () => {
        let descifrado = CryptoJS.AES.decrypt(
          reader.result,
          llave,
          {
            iv: c0,
            mode: CryptoJS.mode.CBC,
          }
        );
        console.log(descifrado);
        var typedArray = this.convertWordArrayToUint8Array(descifrado);
        let archivoSalida = new Blob([header, typedArray]);

        this.crearArchivo(this.nombreArchivo + "_dMODO.bmp", archivoSalida);
      };
      reader.readAsText(blob);

      /** 
      let reader = new FileReader();
      reader.onload = () => {
        
      };
      reader.readAsText(this.plaintext);
      */
    },

    leerArchivoCifrar(archivo) {
      //validacion de archivo de entrada
      if (!archivo) {
        this.contenidoArchivo = "No File Chosen";
        return;
      }
      //obtenemos el nombre del archivo
      this.nombreArchivo = archivo.name.substr(
        0,
        archivo.name.lastIndexOf(".")
      );

      let reader = new FileReader();
      if (this.modo === "cifrar") {
        reader.readAsArrayBuffer(archivo);
      } else {
        reader.readAsArrayBuffer(archivo);
      }
      reader.onload = () => {
        this.contenidoArchivo = reader.result;
        console.log(reader.result);
        this.plaintext = archivo;
      };
    },

    crearArchivo(nombreArchivo, contenido) {
      let element = document.createElement("a");

      let url = window.URL.createObjectURL(contenido);
      element.href = url;
      element.setAttribute("download", nombreArchivo);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(element);
    },

    convertWordArrayToUint8Array(wordArray) {
      let arrayOfWords = Object.prototype.hasOwnProperty.call(
        wordArray,
        "words"
      )
        ? wordArray.words
        : [];
      let length = Object.prototype.hasOwnProperty.call(wordArray, "sigBytes")
        ? wordArray.sigBytes
        : arrayOfWords.length * 4;
      let uInt8Array = new Uint8Array(length),
        index = 0,
        word,
        i;
      for (i = 0; i < length; i++) {
        word = arrayOfWords[i];
        uInt8Array[index++] = word >> 24;
        uInt8Array[index++] = (word >> 16) & 0xff;
        uInt8Array[index++] = (word >> 8) & 0xff;
        uInt8Array[index++] = word & 0xff;
      }
      return uInt8Array;
    },
  },
};
</script>
