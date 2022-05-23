<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" style="height: 90vh">
        <v-card flat elevation="14">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Contraseña Olvidada</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="login" ref="form">
              <span
                >Ingresa el correo electrónico con el que te registraste. De
                esta forma te enviaremos un correo para recuperar el acceso a tu
                cuenta:</span
              >
              <v-text-field
                class="mt-5"
                v-model="correo"
                name="correo"
                label="Correo electrónico"
                outlined
                :rules="[(v) => !!v || 'El campo es requerido']"
              ></v-text-field>
              <input type="hidden" name="name" v-model="nombre" />
              <input type="hidden" name="link" v-model="link" />
              <v-btn type="submit" color="primary" block>Enviar Correo</v-btn>
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
import emailjs from "@emailjs/browser";
import { db } from "../../../main";
export default {
  name: "ContrasenaOlvidada",
  data: () => ({
    nombre: "",
    link: "",

    correo: "",
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
  }),

  methods: {
    login() {
      //alert("si");
      db.collection("usuarios")
        .where("correo", "==", this.correo)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size === 1) {
            //enviar correo
            querySnapshot.forEach((doc) => {
              console.log(doc.id);
              this.nombre = doc.data().nombre;
              this.link =
                "https://practicas-crypto-caleb-3cm14.web.app/practicas/practica3/restablecerContrasena/" +
                doc.id;
              emailjs
                .send(
                  "service_1qw6g4b",
                  "template_rxy1uix",
                  {
                    name: this.nombre,
                    correo: this.correo,
                    link: this.link,
                  },
                  "MqnVa2-JsleJO_0K3"
                )
                .then(
                  (result) => {
                    console.log("SUCCESS!", result.text);
                    this.text =
                      "Correo enviado. Si no aparece en la bandeja de entrada de tu correo, checa la sección de Spam.";
                    this.colorSnackbar = "success";
                    this.snackbar = true;
                    this.actualizando = false;
                  },
                  (error) => {
                    console.log("FAILED...", error.text);
                  }
                );
            });
          }
        })
        .catch((error) => {
          console.log(
            "Error al obtener documentos de colección usuario para ver si se repite el correo",
            error
          );
          this.resgistrando = false;
        });
    },
  },
};
</script>
