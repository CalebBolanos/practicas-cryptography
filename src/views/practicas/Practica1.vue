<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Práctica 1 - Cifrador afin</h2>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="6">
        <v-card class="elevation-0" rounded="lg">
          <v-card-title class="d-flex align-center justify-center py-7">
            <h2 class="text-2xl font-weight-semibold">Cifrar</h2>
          </v-card-title>
          <v-card-text>
            <p class="text--primary mb-1">
              Para cifrar debes de especificar los siguientes parametros:
            </p>
          </v-card-text>
          <v-card-text>
            <v-radio-group v-model="alfabetoCifrar" row>
              <template v-slot:label>
                <div>Alfabeto:</div>
              </template>
              <v-radio label="Inglés (26)" value="1"> </v-radio>
              <v-radio label="Español (27)" value="2"> </v-radio>
            </v-radio-group>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="alphaCifrar"
                  prepend-inner-icon="mdi-close-circle"
                  label="Factor multiplicativo (Alpha)"
                  type="number"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="betaCifrar"
                  prepend-inner-icon="mdi-plus-circle"
                  label="Corrimiento (beta)"
                  type="number"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="plaintext"
              prepend-inner-icon="mdi-text-box-outline"
              label="Mensaje"
              type="text"
              outlined
            ></v-text-field>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" block color="primary" @click="verificar()"
                >Cifrar</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
            <span class="d-flex align-center justify-center flex-wrap">
              <span class="me-2">{{ mensajeCifrado }}</span>
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="6">
        <v-card class="elevation-0" rounded="lg">
          <v-card-title class="d-flex align-center justify-center py-7">
            <h2 class="text-2xl font-weight-semibold">Descifrar</h2>
          </v-card-title>
          <v-card-text>
            <p class="text--primary mb-1">
              Para descifrar debes de especificar los siguientes parametros:
            </p>
          </v-card-text>
          <v-card-text>
            <v-radio-group v-model="alfabetoDescifrar" row>
              <template v-slot:label>
                <div>Alfabeto:</div>
              </template>
              <v-radio label="Inglés (26)" value="1"> </v-radio>
              <v-radio label="Español (27)" value="2"> </v-radio>
            </v-radio-group>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="alphaDescifrar"
                  prepend-inner-icon="mdi-close-circle"
                  label="Factor multiplicativo (Alpha)"
                  type="number"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="betaDescifrar"
                  prepend-inner-icon="mdi-plus-circle"
                  label="Corrimiento (beta)"
                  type="number"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="cifrado"
              prepend-inner-icon="mdi-text-box-outline"
              label="Mensaje"
              type="text"
              outlined
            ></v-text-field>

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
              <span class="me-2">{{ mensajeDescifrado }}</span>
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PracticaUno",
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
    alphaCifrar: 3,
    betaCifrar: 2,
    plaintext: "cryptography class",
    mensajeCifrado: "",

    alfabetoDescifrar: "1",
    alphaDescifrar: 3,
    betaDescifrar: 2,
    cifrado: "cryptography class",
    mensajeDescifrado: "",
  }),

  methods: {
    verificar() {
      let alfabeto = this.obtenerAlfabeto(this.alfabetoCifrar);
      if (this.MCDeuclides(this.alphaCifrar, alfabeto.length) === 1) {
        //pasamos el mensaje a minusculas y quitamos los espacios
        let texto = this.plaintext.toUpperCase().replace(/\s+/g, "");

        this.mensajeCifrado = this.cifrar(
          parseInt(this.alphaCifrar),
          parseInt(this.betaCifrar),
          texto,
          alfabeto
        );
      }
    },

    verificarDescifrado() {
      let alfabeto = this.obtenerAlfabeto(this.alfabetoDescifrar);
      if (this.MCDeuclides(this.alphaDescifrar, alfabeto.length) === 1) {
        //pasamos el mensaje a minusculas y quitamos los espacios
        let alfaInversa = this.inversoMultiplicativoModular(parseInt(this.alphaDescifrar), alfabeto.length)
        console.log(alfaInversa)
        this.mensajeDescifrado = this.descifrar(alfaInversa, parseInt(this.betaDescifrar), this.cifrado, alfabeto)
      }
    },

    obtenerAlfabeto(seleccion) {
      return seleccion === "1" ? this.ingles : this.espanol;
    },

    cifrar(alfa, beta, mensaje, alfabeto) {
      let mensajeCifrado = "";
      for (let i = 0; i < mensaje.length; i++) {
        let posicionLetra = alfabeto.indexOf(mensaje[i]);
        let transformacion = (alfa * posicionLetra + beta) % alfabeto.length;
        mensajeCifrado += alfabeto[transformacion];
      }
      return mensajeCifrado;
    },

    descifrar(alfaInversa, betaInversa, mensajeCifrado, alfabeto) {
      let plaintext = "";
      for (let i = 0; i < mensajeCifrado.length; i++) {
        let posicionLetra = alfabeto.indexOf(mensajeCifrado[i]);
        let transformacion = (alfaInversa * (posicionLetra - betaInversa)) % alfabeto.length;
        if(transformacion < 0){
          transformacion += alfabeto.length
        }
        plaintext += alfabeto[transformacion];
      }
      return plaintext.toLowerCase();
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
        // q is quotient
        let q = parseInt(a / m);
        let t = m;

        // m is remainder now,
        // process same as
        // Euclid's algo
        m = a % m;
        a = t;
        t = y;

        // Update y and x
        y = x - q * y;
        x = t;
      }

      // Make x positive
      if (x < 0) x += m0;

      return x;
    },
  },
};
</script>
