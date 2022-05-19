<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" style="height: 90vh" class="mb-10">
        <v-card flat elevation="14">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Restablecer contraseña ({{nombre}})</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form
              @submit.prevent="actualizarUsuario"
              ref="form"
              v-model="valido"
            >
              <span
                >Llena el siguiente formulario para restablecer tu
                contraseña ({{correo}}):</span
              >
              <v-text-field
                class="mb-0"
                v-model="contrasena"
                label="Nueva contraseña"
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
              <v-btn
                type="submit"
                color="primary"
                block
                :loading="actualizando"
                :disabled="actualizando"
                >Restablecer contraseña</v-btn
              >
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
/**
 * write a component's description
 */
import CryptoJS from "crypto-js";
import { db } from "../../../main";
export default {
  name: "RestablecerContrasena",
  props: {
    idUsuario: String,
  },
  data: () => ({
    correo: "",
    nombre: "",
    //datos del form
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
    actualizando: false,
  }),

  created() {
    if (!this.idUsuario) {
      this.$router.push({ name: "Practica3" });
    } else {
        this.obtenerDatosCliente()
    }
  },

  methods: {
    /**
     * @description
     */
    async actualizarUsuario() {
      if (this.$refs.form.validate()) {
        if (this.contrasena && this.contrasena2) {
          this.actualizando = true;
          let digesto = CryptoJS.SHA1(this.contrasena).toString(
            CryptoJS.enc.Hex
          );

          let documentoUsuario = await db
            .collection("usuarios")
            .doc(this.idUsuario);

          // Set the "capital" field of the city 'DC'
          return documentoUsuario
            .update({
              contrasena: digesto,
            })
            .then(() => {
              console.log("Contraseña actualizada");
              this.text = "Contraseña actualizada";
              this.colorSnackbar = "success";
              this.snackbar = true;
              this.actualizando = false;
              this.$router.push({ name: "Practica3" });
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
              this.actualizando = false;
            });
        } else {
          //campo vacio
          this.actualizando = false;
        }
      } else {
        //form inconcluso
        this.text = "Llena todos los campos del formulario correctamente";
        this.colorSnackbar = "error";
        this.snackbar = true;
        this.actualizando = false;
      }
    },

    async obtenerDatosCliente() {
      try {
        console.log(this.idUsuario)
        const documentoUsuario = await db
          .collection("usuarios")
          .doc(this.idUsuario);
        documentoUsuario.get().then((doc) => {
          if (doc.exists) {
            this.nombre = doc.data().nombre;
            this.correo = doc.data().correo;
          } else {
            //login
            this.$router.push({ name: "Practica3" });
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
