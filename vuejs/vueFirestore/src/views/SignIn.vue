<template>
    <div class="container">
        <h1>Sign In</h1>
        <br><br>
        <div class="row">
            <div class="col-lg-3"/>
            <div class="col-lg-6">
                <input type="email" v-model="formData.email" class="form-control" placeholder="email"/> 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="password" v-model="formData.password" class="form-control" placeholder="password"/>
                <br> 
                <button class="btn btn-success btn-block full-width" @click="signIn">Sign In</button>
            </div>
            <div class="col-lg-3"/>
        </div>
    </div>
</template>

<script>
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

export default {
    name: 'SignIn',
    data() {
        return {
            formData: {
            email: '',
            password: ''
        },
        errorMessage: '',
        successMessage: '',
        xhrRequest: false
        }
    },
    methods: {
        signIn() {
            this.errorMessage = ""
            const auth = getAuth()
            signInWithEmailAndPassword(auth,this.formData.email, this.formData.password)
              .then (user => {
                this.$router.replace('/users')
                this.xhrRequest = false
              })
              .catch((error)=> {
                  alert(error.message)
                  this.errorMessage = error.message
                  this.xhrRequest = false
              })
        }
    }
}
</script>
