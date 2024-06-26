import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {initializeApp} from 'firebase/app'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

let app
let auth

const firebaseConfig = {
    apiKey: "AIzaSyDzjDDKVDqTT_0Ql613NN-O5YQGjuD2h-g",
    authDomain: "egci427lab.firebaseapp.com",
    databaseURL: "https://egci427lab.firebaseio.com",
    projectId: "egci427lab",
    storageBucket: "egci427lab.appspot.com",
    messagingSenderId: "734903128173",
    appId: "1:734903128173:web:9f17007bb679c91d8d6f64"
  };
  
  // Initialize Firebase
initializeApp(firebaseConfig);
auth = getAuth()

onAuthStateChanged(auth, (user) => {
  if(!app) {
      app = createApp(App).use(router).mount('#app')
  }
})
