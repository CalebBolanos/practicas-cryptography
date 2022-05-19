import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import './registerServiceWorker'

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

Vue.config.productionTip = false



const firebaseConfig = {
  apiKey: "AIzaSyAGXGa_rJaAh8UaYvAxLS7ciEknjhIX-hk",
  authDomain: "caleb-bolanos-crypto.firebaseapp.com",
  projectId: "caleb-bolanos-crypto",
  storageBucket: "caleb-bolanos-crypto.appspot.com",
  messagingSenderId: "165730776958",
  appId: "1:165730776958:web:2c67e36c86ea50e11ea52f",
  measurementId: "G-5NS1SWMZ93"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')