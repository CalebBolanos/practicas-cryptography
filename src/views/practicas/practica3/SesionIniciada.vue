<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" style="height: 90vh">
        <v-list three-line subheader>
          <v-subheader>Sesión Iniciada</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{nombre}}</v-list-item-title>
              <v-list-item-subtitle>{{correo}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <span class="d-flex align-center justify-center flex-wrap mt-5">
          <span>
            <router-link to="../practica3">Cerrar Sesion</router-link>
          </span>
        </span>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SesionIniciada",
  props: {
    nombre: String,
    correo: String
  },
  created(){
      if(!this.nombre && !this.correo){
        this.$router.push({name: 'Practica3'});
      }
  },
  data: () => ({

  }),

  methods: {
    
  },
};
</script>
