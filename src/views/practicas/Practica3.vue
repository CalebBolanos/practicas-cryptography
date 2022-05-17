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
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="usuario"
                label="Usuario"
                outlined
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                class="mb-0"
                v-model="contrasena"
                label="Contraseña"
                outlined
                :append-icon="mostrarContrasena ? 'mdi-eye' : 'mdi-eye-off'"
                :type="mostrarContrasena ? 'text' : 'password'"
                :rules="[rules.required]"
                @click:append="mostrarContrasena = !mostrarContrasena"
              ></v-text-field>
              <span class="d-flex align-center justify-center flex-wrap mb-5">
                <span>
                  <a href="crearCuenta.jsp">¿Olvidaste tu contraseña?</a>
                </span>
              </span>  
              <v-btn type="submit" color="primary" block>Iniciar Sesion</v-btn>
              <span class="d-flex align-center justify-center flex-wrap mt-5">
                <span>
                  ¿Aún no estas registrado?
                  <a href="crearCuenta.jsp">Crea una cuenta aqui</a>
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
  name: "PracticaTres",
  data: () => ({
    usuario: "",
    contrasena: "",
    //datos de snackbar
    snackbar: false,
    text: "Usuario o contraseña incorrectas",
    timeout: 4000,
    //estilos contraseña
    mostrarContrasena: false,
    rules: {
      required: (value) => !!value || "Requerido.",
    },
  }),

  methods: {
    login() {
      alert("si");
    },
  },
};
</script>
