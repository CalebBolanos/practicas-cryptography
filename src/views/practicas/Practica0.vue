<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>
          Práctica 0 - Implementación De Función Criptográfica (Cifrador afín)
        </h2>
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
              <v-radio-group v-model="alfabetoCifrar" row>
                <template v-slot:label>
                  <div>Alfabeto:</div>
                </template>
                <v-radio label="Inglés (26)" value="1"> </v-radio>
                <v-radio label="Español (27)" value="2"> </v-radio>
                <v-radio label="ASCII (256)" value="3"> </v-radio>
              </v-radio-group>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="alfaCifrar"
                    prepend-inner-icon="mdi-close-circle"
                    label="Factor multiplicativo (Alpha)"
                    type="number"
                    outlined
                    :rules="reglasAlfa"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="betaCifrar"
                    prepend-inner-icon="mdi-plus-circle"
                    label="Corrimiento (beta)"
                    type="number"
                    outlined
                    :rules="reglasBeta"
                  ></v-text-field>
                </v-col>
              </v-row>
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
              <v-radio-group v-model="alfabetoDescifrar" row>
                <template v-slot:label>
                  <div>Alfabeto:</div>
                </template>
                <v-radio label="Inglés (26)" value="1"> </v-radio>
                <v-radio label="Español (27)" value="2"> </v-radio>
                <v-radio label="ASCII (256)" value="3"> </v-radio>
              </v-radio-group>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="alfaDescifrar"
                    prepend-inner-icon="mdi-close-circle"
                    label="Factor multiplicativo (Alpha)"
                    type="number"
                    outlined
                    :rules="reglasAlfa"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="betaDescifrar"
                    prepend-inner-icon="mdi-plus-circle"
                    label="Corrimiento (beta)"
                    type="number"
                    outlined
                    :rules="reglasBeta"
                  ></v-text-field>
                </v-col>
              </v-row>

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
  name: "PracticaCero",
  data: () => ({
    ingles: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ],
    espanol: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "Ñ",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ],
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

    reglasAlfa: [
      (v) => !!v || "Este campo es requerido",
      (v) => (v && v > 0 && v < 256) || "Introduce un alfa valido",
    ],
    reglasBeta: [
      (v) => !!v || "Este campo es requerido",
      (v) => (v && v > 0) || "Introduce un beta valido",
    ],

    reglasArchivo: [
      (v) => !!v || "El archivo es requerido",
      (v) => (v && v.size > 0) || "El archivo es requerido",
    ],
  }),

  methods: {
    verificarCifrado() {
      if (this.$refs.formCifrar.validate()) {
        let alfabeto = this.obtenerAlfabeto(this.alfabetoCifrar);

        /**
         * Se calcula el MCD usando el algoritmo de euclides para verificar si el alfa ingresado
         * es coprimo con el alfabeto escogido
         * **/
        if (this.MCDeuclides(this.alfaCifrar, alfabeto.length) === 1) {
          //se obtiene el contenido del archivo a cifrar
          this.plaintext = this.contenidoArchivo;

          //si el alfabeto es ingles o español se quitan los espacios y se convierte a mayusculas
          let texto = this.alfabetoCifrar === "3" ? this.plaintext : this.plaintext.toUpperCase().replace(/\s+/g, "");

          //se cifra el texto utilizando el cifrador afin
          this.mensajeCifrado = this.cifrar(
            parseInt(this.alfaCifrar),
            parseInt(this.betaCifrar),
            texto,
            alfabeto
          );

          //el resultado se guarda en un archivo txt el cual será la salida del cifrador
          this.crearArchivo(this.nombreArchivo + "_C.txt", this.mensajeCifrado);
        } else {
          alert(
            "El factor multiplicativo de alfa no es valido ya que no es coprimo. Intenta con otro valor"
          );
        }
      }
    },

    verificarDescifrado() {
      if (this.$refs.formDescifrar.validate()) {
        let alfabeto = this.obtenerAlfabeto(this.alfabetoDescifrar);

        /**
         * Se calcula el MCD usando el algoritmo de euclides para verificar si el alfa ingresado
         * es coprimo con el alfabeto escogido
         * **/
        if (this.MCDeuclides(this.alfaDescifrar, alfabeto.length) === 1) {
          //posteriormente, calculamos el inverso multiplicativo de alfa utilizando el algoritmo extendido de euclides
          let alfaInversa = this.inversoMultiplicativoModular(
            parseInt(this.alfaDescifrar),
            alfabeto.length
          );
          //se obtiene el contenido del archivo a descifrar
          this.cifrado = this.contenidoArchivo;

          //se descifra el texto utilizando el cifrador afin
          this.mensajeDescifrado = this.descifrar(
            alfaInversa,
            parseInt(this.betaDescifrar),
            this.cifrado,
            alfabeto
          );
          //si el alfabeto es ingles o español el mensaje se convierte a minusculas
          if (this.alfabetoDescifrar != "3") {
            this.mensajeDescifrado = this.mensajeDescifrado.toLowerCase();
          }
          //el resultado se guarda en un archivo txt el cual será la salida de descifrar el texto
          this.crearArchivo(this.nombreArchivo + "_D.txt", this.mensajeDescifrado);
        } else {
          alert(
            "El inverso multiplicativo no existe para el valor de alfa dado. Intenta con otro valor"
          );
        }
      }
    },

    obtenerAlfabeto(seleccion) {
      switch (seleccion) {
        case "1":
          return this.ingles;
        case "2":
          return this.espanol;
        case "3":
          return this.obtenerASCII();
      }
    },

    obtenerASCII() {
      let a = [];
      for (let i = 0; i < 256; ++i) {
        a.push(String.fromCharCode(i));
      }
      return a;
    },

    cifrar(alfa, beta, mensaje, alfabeto) {
      let mensajeCifrado = "";
      for (let i = 0; i < mensaje.length; i++) {
        let posicionLetra = alfabeto.indexOf(mensaje[i]);
        //C=ap+bmodn
        let transformacion = (alfa * posicionLetra + beta) % alfabeto.length;
        mensajeCifrado += alfabeto[transformacion];
      }
      return mensajeCifrado;
    },

    descifrar(alfaInversa, betaInversa, mensajeCifrado, alfabeto) {
      let plaintext = "";
      for (let i = 0; i < mensajeCifrado.length; i++) {
        let posicionLetra = alfabeto.indexOf(mensajeCifrado[i]);
        //P=a^-1(p+(-b))modn
        let transformacion =
          (alfaInversa * (posicionLetra - betaInversa)) % alfabeto.length;
        if (transformacion < 0) {
          transformacion += alfabeto.length;
        }
        plaintext += alfabeto[transformacion];
      }
      return plaintext;
    },

    MCDeuclides(a, b) {
      // casos base
      if (a === 0) {
        return b;
      }
      if (b === 0) {
        return a;
      }

      return this.MCDeuclides(b, a % b);
    },

    inversoMultiplicativoModular(a, m) {
      let m0 = m;
      let y = 0;
      let x = 1;

      if (m == 1) return 0;

      while (a > 1) {
        let q = parseInt(a / m);
        let t = m;

        m = a % m;
        a = t;
        t = y;

        y = x - q * y;
        x = t;
      }

      if (x < 0) x += m0;

      return x;
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
