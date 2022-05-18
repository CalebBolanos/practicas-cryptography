<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" style="height: 90vh">
        <v-card flat elevation="14">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Control de Acceso</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="login" ref="form" v-model="valido">
              <v-text-field
                v-model="correo"
                label="Correo electrónico"
                outlined
                :rules="rules"
              ></v-text-field>
              <v-text-field
                class="mb-0"
                v-model="contrasena"
                label="Contraseña"
                outlined
                :append-icon="mostrarContrasena ? 'mdi-eye' : 'mdi-eye-off'"
                :type="mostrarContrasena ? 'text' : 'password'"
                :rules="rules"
                @click:append="mostrarContrasena = !mostrarContrasena"
              ></v-text-field>
              <span class="d-flex align-center justify-center flex-wrap mb-5">
                <span>
                  <router-link to="practica3/contrasenaOlvidada"
                    >¿Olvidaste tu contraseña?</router-link
                  >
                </span>
              </span>
              <v-btn type="submit" color="primary" block>Iniciar Sesion</v-btn>
              <span class="d-flex align-center justify-center flex-wrap mt-5">
                <span>
                  ¿Aún no estas registrado?
                  <router-link to="practica3/registro"
                    >Registrate aqui</router-link
                  >
                </span>
              </span>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        color="warning"
        elevation="24"
      >
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false">Cerrar</v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script>
import CryptoJS from "crypto-js";
import { db } from "../../main";
export default {
  name: "PracticaTres",
  data: () => ({
    correo: "",
    contrasena: "",
    valido: true,
    //datos de snackbar
    snackbar: false,
    text: "Usuario o contraseña incorrectas",
    timeout: 4000,
    //estilos contraseña
    mostrarContrasena: false,
    rules: [(v) => !!v || "El campo es requerido"],
  }),

  methods: {
    login() {
      if (this.$refs.form.validate()) {
        if (this.correo && this.contrasena) {
          let digesto = CryptoJS.SHA1(this.contrasena).toString(
            CryptoJS.enc.Hex
          );

          console.log(digesto);

          db.collection("usuarios")
            .where("correo", "==", this.correo)
            .where("contrasena", "==", digesto)
            .get()
            .then((querySnapshot) => {
              if (querySnapshot.size === 1) {
                this.text = "si";
                this.snackbar = true;
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());
                  console.log(doc.data().correo, doc.data().nombre)
                  this.$router.push({name: 'SesionIniciada', params: {nombre: doc.data().nombre, correo: doc.data().correo}}).catch(()=>{});
                });
              } else {
                this.text = "Usuario o contraseña incorrecta";
                this.snackbar = true;
              }
            })
            .catch((error) => {
              console.log(
                "Error al obtener documentos de colección usuario para ver si se repite el correo",
                error
              );
              this.resgistrando = false;
            });
        }
      }
    },
  },
};
</script>
