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
            <v-form @submit.prevent="login">
              <span>Ingresa el correo electrónico con el que te registraste. De esta forma te enviaremos un correo para recuperar el acceso a tu cuenta:</span>
              <v-text-field
                class="mt-5"
                v-model="correo"
                label="Correo electrónico"
                outlined
                :rules="[(v) => !!v || 'El campo es requerido']"
              ></v-text-field> 
              <v-btn type="submit" color="primary" block>Enviar Correo</v-btn>
              <span class="d-flex align-center justify-center flex-wrap mt-5">
                <span>
                  ¿Ya tienes una cuenta?
                  <router-link to="../practica3">Inicia Sesión aquí</router-link>
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
export default {
  name: "ContrasenaOlvidada",
  data: () => ({
    correo: "",
    contrasena: "",
    contrasena2: "",
    //datos de snackbar
    snackbar: false,
    text: "Usuario o contraseña incorrectas",
    timeout: 4000,
    //estilos contraseña
    mostrarContrasena: false,
    mostrarContrasena2: false,
    rules: [
      (v) => !!v || "El campo es requerido",
      (v) => (v &&  v.length == 8) || "La contraseña debe de tener 8 caracteres"
    ],
  }),

  methods: {
    login() {
      alert("si");
    },
  },
};
</script>
