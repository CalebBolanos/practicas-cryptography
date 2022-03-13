<template>
  <v-container>
    <v-row>
    <v-col cols="12">
        <h2>Todas las prácticas</h2>
    </v-col>
    <v-col v-for="n in 24" :key="n" cols="4">
      <v-card height="200" elevation="0"></v-card>
    </v-col>
  </v-row>
  </v-container>
  
</template>

<script>
export default {
  name: "InicioView",
  data: () => ({}),
};
</script>
