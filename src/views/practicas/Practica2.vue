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
              Puedes descargar las llaves generadas dando clic al botón de
              guardar
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
                        crearArchivo('publica.txt', llavePemPublicaGenerada)
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
                        crearArchivo('privada.txt', llavePemPrivadaGenerada)
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
            <p class="text--primary mb-1">descripción:</p>
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
                  @click="verificarCampos()"
                  >Firmar</v-btn
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
      <!--/Firma -->
      <!--Verificación -->
      <v-col cols="12">
        <v-card class="elevation-0" rounded="lg">
          <v-card-title class="d-flex align-center justify-center py-7">
            <h2 class="text-2xl font-weight-semibold">Verificación</h2>
          </v-card-title>
          <v-card-text>
            <p class="text--primary mb-1">descripción:</p>
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
                  >Verificar</v-btn
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
import rsa from "js-crypto-rsa";
import keyutil from "js-crypto-key-utils";
import { encode, decode } from "base64-arraybuffer";

export default {
  name: "PracticaDos",
  data: () => ({
    dialogLlaves: false,
    llavePemPublicaGenerada: "",
    llavePemPrivadaGenerada: "",

    valid: true,
    llavePemPrivada: null,
    llavePrivada: null,
    archivoOriginal: null,

    validVerificacion: true,
    llavePemPublica: null,
    llavePublica: null,
    archivoFirmado: null,
    firmaArchivo: null,

    reglasArchivo: [
      (v) => !!v || "El archivo es requerido",
      (v) => (v && v.size > 0) || "El archivo es requerido",
    ],
  }),

  methods: {
    generarLlaves() {
      rsa.generateKey(1024).then(async (key) => {
        //primero se generan las llaves en formato JWK
        const publicKey = key.publicKey;
        const privateKey = key.privateKey;

        //console.log(publicKey, privateKey);

        let keyPublicObjFromJwk = new keyutil.Key("jwk", publicKey);
        let keyPrivateObjFromJwk = new keyutil.Key("jwk", privateKey);

        //Posteriormente las pasamos de JWK a PEM para poder guardarlas en un archivo de texto
        let pemPublic = await keyPublicObjFromJwk.export("pem");
        let pemPrivate = await keyPrivateObjFromJwk.export("pem");

        //console.log(pemPublic);
        //console.log(pemPrivate);

        this.llavePemPublicaGenerada = pemPublic;
        this.llavePemPrivadaGenerada = pemPrivate;

        //this.crearArchivo("publica.key", pemPublic);
        //this.crearArchivo("privada.key", pemPrivate);
      });
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

    verificarCampos() {
      if (this.$refs.formFirma.validate()) {
        console.log("lleno");
        this.firmarArchivo();
      }
    },

    /**
     * funcion leerArchivo()
     *
     * funcion que se encarga de leer y obtener los datos del archivo de entrada
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

      /**
       * finalmente, el fileReader se encarga de obtener el contenido del
       * archivo en forma de un arrayBuffer el cual es guardado en contenidoArchivo
       * el cual se usara posteriormente
       */
      let reader = new FileReader();
      reader.readAsArrayBuffer(archivo);
      reader.onload = () => {
        this.archivoOriginal = reader.result;
      };
    },

    leerLlavePrivada(archivo) {
      //validacion de archivo de entrada
      if (!archivo) {
        this.llavePemPrivada = "No File Chosen";
        return;
      }

      /**
       * finalmente, el fileReader se encarga de obtener el contenido del
       * archivo en forma de un arrayBuffer el cual es guardado en contenidoArchivo
       * el cual se usara posteriormente
       */
      let reader = new FileReader();
      reader.readAsText(archivo);
      reader.onload = () => {
        this.llavePemPrivada = reader.result;
        console.log(reader.result);
        this.convertirPEMaJWK(reader.result).then(
          (jwk) => (this.llavePrivada = jwk)
        );
      };
    },

    firmarArchivo() {
      rsa
        .sign(this.archivoOriginal, this.llavePrivada, "SHA-256", {
          // optional
          name: "RSA-PSS", // default. 'RSASSA-PKCS1-v1_5' is also available.
          saltLength: 64,
        })
        .then((firma) => {
          console.log("firmado");
          console.log(firma);
          let firmaBase64 = encode(firma);
          let contenidoArchivo = new Blob(
            [this.archivoOriginal, "\n-#-#-#FIRMA-#-#-#\n", firmaBase64],
            {
              type: "text/plain",
            }
          );
          console.log(contenidoArchivo);
          this.generarArchivo("firma.txt", contenidoArchivo);
        });
    },

    /**
     * funcion leerArchivo()
     *
     * funcion que se encarga de leer y obtener los datos del archivo de entrada
     * cada vez que es proporcionado por el usuario
     * @param {File} archivo es el archivo proporcionado por el usuario desde el
     * <v-file-input/>
     */
    leerArchivoFirmado(archivo) {
      //validacion de archivo de entrada
      if (!archivo) {
        this.archivoFirmado = "No File Chosen";
        return;
      }

      /**
       * finalmente, el fileReader se encarga de obtener el contenido del
       * archivo en forma de un arrayBuffer el cual es guardado en contenidoArchivo
       * el cual se usara posteriormente
       */
      let reader = new FileReader();
      reader.readAsText(archivo);
      reader.onload = () => {
        let input = reader.result;
        let partes = input.split("\n-#-#-#FIRMA-#-#-#\n");
        this.archivoFirmado = new TextEncoder("utf-8").encode(partes[0]);
        this.firmaArchivo = decode(partes[1]);
        console.log(this.firmaArchivo);
      };
    },

    leerLlavePublica(archivo) {
      //validacion de archivo de entrada
      if (!archivo) {
        this.llavePemPublica = "No File Chosen";
        return;
      }

      /**
       * finalmente, el fileReader se encarga de obtener el contenido del
       * archivo en forma de un arrayBuffer el cual es guardado en contenidoArchivo
       * el cual se usara posteriormente
       */
      let reader = new FileReader();
      reader.readAsText(archivo);
      reader.onload = () => {
        this.llavePemPublica = reader.result;
        console.log(reader.result);
        this.convertirPEMaJWK(reader.result).then(
          (jwk) => (this.llavePublica = jwk)
        );
      };
    },

    validarCamposVerificacion() {
      if (this.$refs.formVerificacion.validate()) {
        console.log("lleno");
        this.verificarArchivo();
      }
    },

    verificarArchivo() {
      rsa
        .verify(
          this.archivoFirmado,
          this.firmaArchivo,
          this.llavePublica,
          "SHA-256",
          {
            // optional
            name: "RSA-PSS", // default. 'RSASSA-PKCS1-v1_5' is also available.
            saltLength: 64, // default is the same as hash length
          }
        )
        .then((valid) => {
          console.log(valid);
        });
    },

    async convertirPEMaJWK(stringPem) {
      const keyObjFromPem = new keyutil.Key("pem", stringPem);
      return await keyObjFromPem.export("jwk"); // export public key from private key.
    },
  },
};
</script>
