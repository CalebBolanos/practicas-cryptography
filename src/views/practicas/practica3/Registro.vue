<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" style="height: 90vh" class="mb-10">
        <v-card flat elevation="14">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Registro</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form
              @submit.prevent="registrarUsuario"
              ref="form"
              v-model="valido"
            >
              <span
                >Llena el siguiente formulario para crear una nueva
                cuenta:</span
              >
              <v-text-field
                class="mt-5"
                v-model="nombre"
                label="Nombre"
                outlined
                :rules="[(v) => !!v || 'El campo es requerido']"
              ></v-text-field>
              <v-text-field
                v-model="correo"
                label="Correo electrónico"
                outlined
                :rules="[(v) => !!v || 'El campo es requerido']"
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
              <v-text-field
                class="mb-0"
                v-model="contrasena2"
                label="Vuelve a escribir tu contraseña"
                outlined
                :append-icon="mostrarContrasena2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="mostrarContrasena2 ? 'text' : 'password'"
                :rules="[
                  contrasena === contrasena2 || 'La contraseñas no coinciden',
                ]"
                @click:append="mostrarContrasena2 = !mostrarContrasena2"
              ></v-text-field>
              <span class="d-flex align-center justify-center flex-wrap mb-5">
                <span>
                  <router-link to="contrasenaOlvidada"
                    >¿Olvidaste tu contraseña?</router-link
                  >
                </span>
              </span>
              <v-btn type="submit" color="primary" block :loading="resgistrando" :disabled="resgistrando">Registrarse</v-btn>
              <span class="d-flex align-center justify-center flex-wrap mt-5">
                <span>
                  ¿Ya tienes una cuenta?
                  <router-link to="../practica3"
                    >Inicia Sesión aquí</router-link
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
        :color="colorSnackbar"
        text
        elevation="24"
      >
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn
            text
            v-bind="attrs"
            :color="colorSnackbar"
            @click="snackbar = false"
            >Cerrar</v-btn
          >
        </template>
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script>
import CryptoJS from "crypto-js";
import { db } from "../../../main";
export default {
  name: "RegistroUsuario",
  data: () => ({
    //datos del form
    correo: "",
    nombre: "",
    contrasena: "",
    contrasena2: "",
    //datos de snackbar
    snackbar: false,
    text: "",
    colorSnackbar: "",
    timeout: 4000,

    //estilos contraseña
    mostrarContrasena: false,
    mostrarContrasena2: false,
    rules: [
      (v) => !!v || "El campo es requerido",
      (v) => (v && v.length == 8) || "La contraseña debe de tener 8 caracteres",
    ],
    valido: true,

    //estatus registro
    resgistrando: false

  }),

  methods: {
    async registrarUsuario() {
      if (this.$refs.form.validate()) {
        try {
          if (this.nombre && this.correo && this.contrasena) {
            this.resgistrando = true
            let digesto = CryptoJS.SHA1(this.contrasena).toString(
              CryptoJS.enc.Hex
            );

            db.collection("usuarios")
              .where("correo", "==", this.correo)
              .get()
              .then((querySnapshot) => {
                if (querySnapshot.size === 0) {
                  //verificamos que el correo no se haya usado
                  db.collection("usuarios")
                    .add({
                      nombre: this.nombre,
                      correo: this.correo,
                      contrasena: digesto,
                    })
                    .then(() => {
                      this.text = "Cuenta registrada correctamente";
                      this.colorSnackbar = "success";
                      this.snackbar = true;
                      this.resgistrando = false;
                    });
                } else {
                  this.text =
                    "El correo electrónico que ingresaste ya esta en uso. Ingresa otro correo";
                  this.colorSnackbar = "warning";
                  this.snackbar = true;
                  this.resgistrando = false;
                }
              })
              .catch((error) => {
                console.log(
                  "Error al obtener documentos de colección usuario para ver si se repite el correo",
                  error
                );
                this.resgistrando = false;
              });
          } else {
            //campo vacio
            this.resgistrando = false;
          }
        } catch (error) {
          console.log("Error al registrar usuario", error);
          this.resgistrando = false;
        }
      } else {
        //form inconcluso
        this.text = "Llena todos los campos del formulario correctamente";
        this.colorSnackbar = "error";
        this.snackbar = true;
        this.resgistrando = false;
      }
    },
  },
};
</script>
