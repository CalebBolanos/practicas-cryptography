<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="8" md="8" sm="8">
        <h2>Práctica 2 - Firma Digital</h2>
      </v-col>
      <!-- UI de genereacion de llaves -->
      <v-col cols="12" lg="4" md="4" sm="4">
        <v-dialog v-model="dialogLlaves" persistent max-width="900px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              block
              v-bind="attrs"
              v-on="on"
              @click="generarLlaves()"
            >
              Generar Llaves
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Generar llaves</span>
            </v-card-title>
            <v-card-text>
              Puedes descargar las llaves generadas dando clic a sus respectivos
              botones
            </v-card-text>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-textarea
                      v-model="llavePemPublicaGenerada"
                      label="Llave pública"
                      no-resize
                      counter
                      rows="5"
                      outlined
                      readonly
                    ></v-textarea>
                    <v-btn
                      color="primary"
                      dark
                      block
                      @click="
                        crearArchivoTxt('publica.txt', llavePemPublicaGenerada)
                      "
                    >
                      Descargar pública
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-textarea
                      v-model="llavePemPrivadaGenerada"
                      label="Llave privada"
                      no-resize
                      counter
                      rows="5"
                      outlined
                      readonly
                    ></v-textarea>
                    <v-btn
                      color="primary"
                      dark
                      block
                      @click="
                        crearArchivoTxt('privada.txt', llavePemPrivadaGenerada)
                      "
                    >
                      Descargar privada
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="accent" text @click="generarLlaves()">
                Volver a generar llaves
              </v-btn>
              <v-btn color="primary" text @click="dialogLlaves = false">
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <!--/ UI de genereacion de llaves -->
      <!--Firma -->
      <v-col cols="12">
        <v-card class="elevation-0" rounded="lg">
          <v-card-title class="d-flex align-center justify-center py-7">
            <h2 class="text-2xl font-weight-semibold">Firma</h2>
          </v-card-title>
          <v-card-text>
            <p class="text--primary mb-1">
              Puedes firmar un archivo de entrada dados los siguientes
              parámetros:
            </p>
          </v-card-text>
          <v-form
            ref="formFirma"
            v-model="valid"
            lazy-validation
            @submit.prevent
          >
            <v-card-text>
              <v-file-input
                label="Archivo de entrada"
                outlined
                accept=".txt"
                @change="leerArchivoOriginal"
                :rules="reglasArchivo"
              ></v-file-input>

              <v-file-input
                label="Llave privada del emisor"
                outlined
                prepend-icon="mdi-key"
                accept=".txt"
                @change="leerLlavePrivada"
                :rules="reglasArchivo"
              ></v-file-input>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  block
                  color="primary"
                  @click="verificarCamposFirma()"
                  >Firmar Archivo</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
              <v-snackbar
                v-model="snackbar"
                :color="colorSnackbar"
                text
                elevation="24"
                :timeout="timeout"
              >
                {{ infoSnackbar }}

                <template v-slot:action="{ attrs }">
                  <v-btn
                    :color="colorSnackbar"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                  >
                    Cerrar
                  </v-btn>
                </template>
              </v-snackbar>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
      <!--/Firma -->
      <!--Verificación -->
      <v-col cols="12">
        <v-card class="elevation-0" rounded="lg">
          <v-card-title class="d-flex align-center justify-center py-7">
            <h2 class="text-2xl font-weight-semibold">Verificación</h2>
          </v-card-title>
          <v-card-text>
            <p class="text--primary mb-1">
              Ingresa los siguientes parámetros para verificar la firma digital
              y la integridad del mensaje de un archivo previamente firmado:
            </p>
          </v-card-text>
          <v-form
            ref="formVerificacion"
            v-model="validVerificacion"
            lazy-validation
            @submit.prevent
          >
            <v-card-text>
              <v-file-input
                label="Archivo a verificar"
                outlined
                accept=".txt"
                @change="leerArchivoFirmado"
                :rules="reglasArchivo"
              ></v-file-input>

              <v-file-input
                label="Llave pública del emisor"
                outlined
                prepend-icon="mdi-key"
                accept=".txt"
                @change="leerLlavePublica"
                :rules="reglasArchivo"
              ></v-file-input>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  block
                  color="primary"
                  @click="validarCamposVerificacion()"
                  >Verificar Archivo</v-btn
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
      <!--/Verificación -->
    </v-row>
  </v-container>
</template>

<script>
/**
 * Practica 2
 *
 * Este componente contiene la implementación de una firma digital utilizando RSA
 *
 * El componente puede firmar y verificar archivos de texto que contengan un mensaje,
 * ademas de generar llaves privadas y publicas que se pueden utilizar en el programa
 *
 */
import rsa from "js-crypto-rsa";
import keyutil from "js-crypto-key-utils";
import { encode, decode } from "base64-arraybuffer";

export default {
  name: "PracticaDos",
  data: () => ({
    //variables para generar llaves
    dialogLlaves: false,
    llavePemPublicaGenerada: "",
    llavePemPrivadaGenerada: "",

    //variables usadas para generar la firma digital
    valid: true,
    llavePemPrivada: null,
    llavePrivada: null,
    archivoOriginal: null,
    nombreArchivo: "",

    //variables para llevar a cabo la verificacion
    validVerificacion: true,
    llavePemPublica: null,
    llavePublica: null,
    archivoFirmado: null,
    firmaArchivo: null,

    //variable para snackbar
    snackbar: false,
    infoSnackbar: "",
    colorSnackbar: "",
    timeout: 5000,

    //validaciones de form
    reglasArchivo: [
      (v) => !!v || "El archivo es requerido",
      (v) => (v && v.size > 0) || "El archivo es requerido",
    ],
  }),

  methods: {
    /**
     * funcion generarLlaves()
     * Funcion que genera llaves RSA de 1024 bits (publica y privada) para que
     * puedan ser descargadas posteriormente en un archivo txt
     */
    generarLlaves() {
      rsa.generateKey(1024).then(async (key) => {
        //primero se generan las llaves en formato JWK
        const publicKey = key.publicKey;
        const privateKey = key.privateKey;

        let keyPublicObjFromJwk = new keyutil.Key("jwk", publicKey);
        let keyPrivateObjFromJwk = new keyutil.Key("jwk", privateKey);

        //posteriormente las pasamos de JWK a PEM para poder guardarlas en un archivo de texto
        let pemPublic = await keyPublicObjFromJwk.export("pem");
        let pemPrivate = await keyPrivateObjFromJwk.export("pem");

        this.llavePemPublicaGenerada = pemPublic;
        this.llavePemPrivadaGenerada = pemPrivate;
      });
    },

    /**
     * funcion crearArchivoTxt()
     * Crea un archivo dado un nombre y su contenido en forma de texto,
     * el cual es guardado de forma automatica en la carpeta de descargas del usuario
     * @param {String} nombreArchivo es el nombre del archivo
     * @param {String} texto es el contenido del archivo
     */
    crearArchivoTxt(nombreArchivo, texto) {
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

    /**
     * funcion generarArchivo()
     *
     * Crea un archivo dado un nombre y su contenido en forma de blob,
     * el cual es guardado de forma automatica en la carpeta de Descargas del usuario
     *
     * @param {String} nombreArchivo es el nombre del archivo
     * @param {Blob} contenido es el contenido (binarios) del archivo
     */
    generarArchivo(nombreArchivo, contenido) {
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
     * funcion verificarCamposFirma()
     *
     * Verifica que todos los campos del form de la dirma digital esten llenos para
     * despues empezar a hacer la firma digital
     */
    verificarCamposFirma() {
      if (this.$refs.formFirma.validate()) {
        this.firmarArchivo();
      }
    },

    /**
     * funcion leerArchivoOriginal()
     *
     * funcion que se encarga de leer y obtener los datos del archivo a firmar
     * cada vez que es proporcionado por el usuario
     * @param {File} archivo es el archivo proporcionado por el usuario desde el
     * <v-file-input/>
     */
    leerArchivoOriginal(archivo) {
      //validacion de archivo de entrada
      if (!archivo) {
        this.archivoOriginal = "No File Chosen";
        return;
      }
      this.nombreArchivo = archivo.name.substr(
        0,
        archivo.name.lastIndexOf(".")
      );

      /**
       * finalmente, el fileReader se encarga de obtener el contenido del
       * archivo en forma de un arrayBuffer el cual es guardado en archivoOriginal
       */
      let reader = new FileReader();
      reader.readAsArrayBuffer(archivo);
      reader.onload = () => {
        this.archivoOriginal = reader.result;
      };
    },

    /**
     * funcion leerLlavePrivada()
     *
     * funcion que se encarga de leer una llave privada en formato PEM proporcionada
     * por el usuario,la cual se convierte a formato JWK para que la libreria js-crypto-rsa
     * pueda usarla
     *
     * @param {File} archivo es el archivo que contiene la llave privada, la cual es
     * proporcionada por el usuario desde el <v-file-input/>
     */
    leerLlavePrivada(archivo) {
      //validacion de archivo de entrada
      if (!archivo) {
        this.llavePemPrivada = "No File Chosen";
        return;
      }

      let reader = new FileReader();
      reader.readAsText(archivo);
      reader.onload = () => {
        //una vez leido el contenido de la llave la guardamos en formato PEM y JWK
        this.llavePemPrivada = reader.result;
        this.convertirPEMaJWK(reader.result).then(
          (jwk) => (this.llavePrivada = jwk)
        );
      };
    },

    /**
     * funcion firmarArchivo()
     * 
     * Crea la firma digital del archivo de entrada con RSA, utilizando la llave privada proporcionada por el usuario.
     * Una vez creada la firma esta se concatena con el contenido del archivo de entrada para crear el nuevo 
     * archivo firmado el cual sera descargado por el usuario
     * 
     */
    firmarArchivo() {
      //firmamos el archivo usando SHA-2
      rsa.sign(this.archivoOriginal, this.llavePrivada, "SHA-256", {
          name: "RSA-PSS",
          saltLength: 64,
        })
        .then((firma) => {
          //una vez generada la firma, se pasa a base64 para concatenarla al nuevo archivo
          let firmaBase64 = encode(firma);
          //posteriormente se crea el archivo firmado, el cual contiene el mensaje original, un delimitador y la firma digital
          let contenidoArchivo = new Blob(
            [this.archivoOriginal, "\n-#-#-#FIRMA-#-#-#\n", firmaBase64],
            {
              type: "text/plain",
            }
          );
          this.generarArchivo(this.nombreArchivo + "_s.txt", contenidoArchivo);
        });
    },

    /**
     * funcion leerArchivoFirmado()
     *
     * funcion que se encarga de leer y obtener los datos (mensaje y firma) del archivo firmado
     * por separado
     * 
     * @param {File} archivo es el archivo proporcionado por el usuario desde el
     * <v-file-input/>
     */
    leerArchivoFirmado(archivo) {
      //validacion de archivo de entrada
      if (!archivo) {
        this.archivoFirmado = "No File Chosen";
        return;
      }

      let reader = new FileReader();
      reader.readAsText(archivo);
      reader.onload = () => {
        let input = reader.result;
        //separamos el archivo con el delimitador y de esa forma obtenemos el mensaje y la firma del archivo por separado
        let partes = input.split("\n-#-#-#FIRMA-#-#-#\n");
        this.archivoFirmado = new TextEncoder("utf-8").encode(partes[0]);
        this.firmaArchivo = decode(partes[1]);
      };
    },

    /**
     * funcion leerLlavePublica()
     *
     * funcion que se encarga de leer la llave publica en formato PEM proporcionada
     * por el usuario,la cual se convierte a formato JWK para que la libreria js-crypto-rsa
     * pueda usarla
     *
     * @param {File} archivo es el archivo que contiene la llave publica, la cual es
     * proporcionada por el usuario desde el <v-file-input/>
     */
    leerLlavePublica(archivo) {
      //validacion de archivo de entrada
      if (!archivo) {
        this.llavePemPublica = "No File Chosen";
        return;
      }

      let reader = new FileReader();
      reader.readAsText(archivo);
      reader.onload = () => {
        //una vez leido el contenido de la llave la guardamos en formato PEM y JWK
        this.llavePemPublica = reader.result;
        this.convertirPEMaJWK(reader.result).then(
          (jwk) => (this.llavePublica = jwk)
        );
      };
    },

    /**
     * funcion validarCamposVerificacion()
     *
     * Asegura que todos los campos del form de la verificacion esten llenos para
     * despues empezar a hacer la verificacion del archivo firmado
     */
    validarCamposVerificacion() {
      if (this.$refs.formVerificacion.validate()) {
        this.verificarArchivo();
      }
    },

    /**
     * funcion verificarArchivo()
     * 
     * Funcion que se encarga de comprobar la firma digital de un archivo dado con RSA.
     * 
     * Para llevar a cabo la verificacion, se utiliza el mensaje original, la firma del archivo y 
     * la llave publica del emisor.
     * 
     * Dependiendo del resultado, se le notificara al usuario si la firma es valida y si el archivo 
     * ha sido modificado despues de ser firmado
     * 
     */
    verificarArchivo() {
      //validamos usando SHA-2
      rsa.verify(this.archivoFirmado, this.firmaArchivo, this.llavePublica, "SHA-256", {
            name: "RSA-PSS", 
            saltLength: 64,
          }
        )
        .then((valid) => {
          /**
           * Dependiendo del resultado, se le notificara al usuario si la firma es valida y si el archivo 
           * ha sido modificado despues de ser firmado
           */
          this.snackbar = true;
          this.infoSnackbar = valid
            ? "La firma proporcionada en el archivo es valida"
            : "La firma no es valida. El archivo ha sido modificado despues de ser firmado";
          this.colorSnackbar = valid ? "green accent-4" : "error";
        });
    },

    /**
     * funcion convertirPEMaJWK()
     * 
     * funcion asincrona que convierte una llave con formato PEM a JKW
     * 
     * @param {String} stringPem es la llave en formato PEM
     * @returns {Promise} es una promesa que tendra como resultado la llave en formato JWK
     */
    async convertirPEMaJWK(stringPem) {
      const keyObjFromPem = new keyutil.Key("pem", stringPem);
      return await keyObjFromPem.export("jwk");
    },
  },
};
</script>
