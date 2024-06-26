import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {getAuth, onAuthStateChanged} from 'firebase/auth'

let app
let auth

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

};

// Initialize Firebase
initializeApp(firebaseConfig);
auth = getAuth()

onAuthStateChanged(auth, (user) => {
    if(!app) {
        app = createApp(App).use(router).mount('#app')
    }
})







