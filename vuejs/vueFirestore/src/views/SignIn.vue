<template>
    <div class="container">
      <div class="row">
          <h2>Signin</h2>
          <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-md-offset-3"/>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-md-offset-3">
              <input type="email" v-model="formData.email" class="form-control" placeholder="email">
              <br>
              <input type="password" v-model="formData.password" class="form-control" placeholder="password">
              <br>
              <button class="btn btn-success btn-block full-width" @click="signIn">Sign In</button>
          </div>
      </div>
      <br>
      <div class="container">
        <div class="row">
          <div class="btn-group">
            <button type="button" class="btn btn-warning" @click="signInGoogle">Google</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'

export default {
    name: 'SignIn',
    data () {
        return {
            formData: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        signIn() {
            const auth = getAuth()
            signInWithEmailAndPassword(auth, this.formData.email, this.formData.password)
            .then((userCredential) => {
                console.log('Successfully sign in')
                console.log(auth.currentUser)
                this.$router.replace('/movies')
            })
            .catch((error) => {
                alert(error.code+'\n'+error.message)
            })
        }
        
    }
}


</script>