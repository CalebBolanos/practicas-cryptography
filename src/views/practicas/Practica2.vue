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
                      @click="crearArchivo('publica.txt', llavePemPublicaGenerada)"
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
                      @click="crearArchivo('privada.txt', llavePemPrivadaGenerada)"
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
      <v-col cols="12">
        <v-card class="elevation-0" rounded="lg">
          <v-card-title class="d-flex align-center justify-center py-7">
            <h2 class="text-2xl font-weight-semibold">Firma</h2>
          </v-card-title>
          <v-card-text>
            <p class="text--primary mb-1">
              descripción:
            </p>
          </v-card-text>
          <v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
            <span class="d-flex align-center justify-center flex-wrap">
              <!-- <span class="me-2">{{ mensajeCifrado }}</span> -->
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="elevation-0" rounded="lg">
          <v-card-title class="d-flex align-center justify-center py-7">
            <h2 class="text-2xl font-weight-semibold">Verificación</h2>
          </v-card-title>
          <v-card-text>
            <p class="text--primary mb-1">
              descripción:
            </p>
          </v-card-text>
          <v-card-text>
            <v-card-actions>
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
import rsa from "js-crypto-rsa";
import keyutil from "js-crypto-key-utils";

export default {
  name: "PracticaDos",
  data: () => ({
    dialogLlaves: false,
    llavePemPublicaGenerada: "",
    llavePemPrivadaGenerada: "",
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
  },
};
</script>
