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
              <v-radio-group v-model="modoOperacionString" row>
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
                @change="leerArchivo"
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
                    :disabled="modoOperacionString === 'ECB'"
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
/**
 * Practica 1
 *
 * Este componente contiene la implementación de un cifrador por bloques (AES)
 * utilizando la biblioteca CryptoJS
 *
 * El componente puede cifrar y descifrar imagenes BMP (Windows bitmap) usando AES,
 * en los modos de operacion ECB, CBC, CFB, OFB, y dichas imagenes pueden ser
 * visualizadas por el usuario, tanto al estar cifradas como descifradas
 *
 * Del mismo modo, se le pide al usuario especificar una llave y un vector de
 * inicializacion (c0) de 16 bytes para llevar a cabo el cifrado-descifrado de la imagen
 */
import CryptoJS from "crypto-js";
export default {
  name: "PracticaUno",
  data: () => ({
    //variables del form
    modo: "cifrar",
    valid: true,
    modoOperacionString: "ECB",
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
  }),

  methods: {
    /**
     * Funcion que se encarga de verificar y preparar los datos ingresados por el usuario
     * para cifrar o descifrar una imagen BMP usando AES.
     */
    verificarCampos() {
      if (this.$refs.formAES.validate()) {
        //si los datos del formulario son validos

        //se codifica en utf-8 el string de la llave y c0 para poder usarlos en AES
        this.llave = CryptoJS.enc.Utf8.parse(this.llaveString);
        this.c0 = CryptoJS.enc.Utf8.parse(this.c0String);

        //dividimos el archivo original en dos partes
        let headerBMP = this.contenidoArchivo.slice(0, 124); //parte del header del bmp, la cual se unira al resultado (dependiendo de la imagen el tamaño de su header cambiara)
        let contenidoBMP = this.contenidoArchivo.slice(
          124,
          this.contenidoArchivo.byteLength
        ); //contenido del archivo a cifrar o descifrar
        let modoOperacion;
        switch (this.modoOperacionString) {
          case "ECB":
            modoOperacion = CryptoJS.mode.ECB;
            break;
          case "CBC":
            modoOperacion = CryptoJS.mode.CBC;
            break;
          case "CFB":
            modoOperacion = CryptoJS.mode.CFB;
            break;
          case "OFB":
            modoOperacion = CryptoJS.mode.OFB;
            break;
        }

        /**
         * finalmente, dependiendo del modo que seleccione el usuario, se cifrara o descifrara
         * el contenido del bmp en funcion a la llave, c0 y modo de operacion especificado por
         * el usuario
         */
        if (this.modo === "cifrar") {
          this.cifrarAES(
            headerBMP,
            contenidoBMP,
            this.llave,
            this.c0,
            modoOperacion
          );
        } else {
          this.descifrarAES(
            headerBMP,
            contenidoBMP,
            this.llave,
            this.c0,
            modoOperacion
          );
        }
      }
    },

    /**
     * funcion cifrarAES()
     *
     * funcion que se encarga de cifrar un archivo bmp utilizando AES
     * de tal forma que solo cifra el contenido de la imagen, para que despues
     * pueda ser visualizada.
     *
     * Esta funcion recibe:
     * @param {any} header es la cabecera del archivo BMP
     * @param {any} input es el contenido del archivo BMP a cifrar
     * @param {any} llave es la llave que se utilizara para cifrar (16 bytes)
     * @param {any} c0 es el vector de inicializacion que se usara para cifrar (16 bytes)
     * @param {any} modoOperacion el modo de operacion que usara el cifrador (ECB, CBC, CFB, OFB)
     */
    cifrarAES(header, input, llave, c0, modoOperacion) {
      //convertimos en wordArray el buffer del archivo para que CryptoJS pueda cifrarlo
      let wordArray = CryptoJS.lib.WordArray.create(input);
      //ciframos el contenido, especificando la llave, el vector de inicialización y el modo de operacion
      let cifrado;
      if (modoOperacion !== CryptoJS.mode.ECB) {
        cifrado = CryptoJS.AES.encrypt(wordArray, llave, {
          iv: c0,
          mode: modoOperacion,
        });
      } else {
        cifrado = CryptoJS.AES.encrypt(wordArray, llave, {
          mode: modoOperacion,
        });
      }

      //posteriormente, unimos el header original del archivo con el contenido cifrado en un blob para que pueda ser visualizado
      let contenidoArchivo = new Blob([header, cifrado.toString()]);
      //finalmente, se crea el archivo y se descarga en el dispositivo del usuario
      this.crearArchivo(
        this.nombreArchivo + "_e" + this.modoOperacionString + ".bmp",
        contenidoArchivo
      );
    },

    /**
     * funcion descifrarAES()
     *
     * funcion que se encarga de descifrar un archivo bmp utilizando AES
     * de tal forma que solo descifra el contenido de la imagen, y asi
     * obtener la imagen original
     *
     * Esta funcion recibe:
     * @param {any} header es la cabecera del archivo BMP
     * @param {any} input es el contenido del archivo BMP a descifrar
     * @param {any} llave es la llave que se utilizara para cifrar (16 bytes)
     * @param {any} c0 es el vector de inicializacion que se usara para cifrar (16 bytes)
     * @param {any} modoOperacion el modo de operacion que usara el cifrador (ECB, CBC, CFB, OFB)
     */
    descifrarAES(header, input, llave, c0, modoOperacion) {
      /**
       * se crea un nuevo blob de la parte cifrada de la imagen para poder leer su
       * contenido utilizando un fileReader y de esta forma la biblioteca CryptoJS pueda descifrarlo
       */
      let blob = new Blob([input], { type: "text/plain" });
      let reader = new FileReader();
      reader.onload = () => {
        //desciframos el contenido, especificando la llave, el vector de inicialización y el modo de operacion
        let descifrado;
        if (modoOperacion !== CryptoJS.mode.ECB) {
          descifrado = CryptoJS.AES.decrypt(reader.result, llave, {
            iv: c0,
            mode: modoOperacion,
          });
        } else {
          descifrado = CryptoJS.AES.decrypt(reader.result, llave, {
            mode: modoOperacion,
          });
        }

        //finalmente, convertimos el descifrado en un typedArray para poder escribir los binarios del archivo de salida
        var typedArray = this.convertWordArrayToUint8Array(descifrado);
        //se crea el archivo de salida, juntando la cabecera original de la imagen junto con su contenido descifrado
        let archivoSalida = new Blob([header, typedArray], {
          type: "image/bmp",
        });
        //finalmente, se crea el archivo y se descarga en el dispositivo del usuario
        this.crearArchivo(
          this.nombreArchivo + "_d" + this.modoOperacionString + ".bmp",
          archivoSalida
        );
      };
      reader.readAsText(blob);
    },

    /**
     * funcion leerArchivo()
     *
     * funcion que se encarga de leer y obtener los datos del archivo de entrada
     * cada vez que es proporcionado por el usuario
     * @param {File} archivo es el archivo proporcionado por el usuario desde el
     * <v-file-input/>
     */
    leerArchivo(archivo) {
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
      /**
       * finalmente, el fileReader se encarga de obtener el contenido del
       * archivo en forma de un arrayBuffer el cual es guardado en contenidoArchivo
       * el cual se usara posteriormente
       */
      let reader = new FileReader();
      reader.readAsArrayBuffer(archivo);
      reader.onload = () => {
        this.contenidoArchivo = reader.result;
      };
    },

    /**
     * funcion crearArchivo()
     *
     * Crea un archivo dado un nombre y su contenido en forma de blob,
     * el cual es guardado de forma automatica en la carpeta de Descargas del usuario
     *
     * @param {String} nombreArchivo es el nombre del archivo
     * @param {Blob} contenido es el contenido (binarios) del archivo
     */
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

    /**
     * funcion convertWordArrayToUint8Array()
     *
     * convierte un wordArray(output de descifrado con CryptoJS) a Uint8Array para
     * que este pueda ser escrito dentro de un blob y asi crear el archivo descifrado
     *
     * @param {any} wordArray es el output de CryptoJS a convertir
     * @returns {Uint8Array} es el resultado de la conversion que se usara en un blob
     */
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
