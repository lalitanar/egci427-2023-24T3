<template>
    <div class="container">
      <form>
        <div class="well">
          <h4>Update User</h4>
          <div class="form-group" >
            <label class="pull-left">First Name: </label>
            <input type="text" class="form-control" placeholder="First Name" v-model = "User.firstName">
          </div>
          <div class="form-group" >
            <label class="pull-left">Last Name: </label>
            <input type="text" class="form-control" placeholder="Last Name" v-model = "User.lastName">
          </div>
          <div class="form-group" >
            <label class="pull-left">Email: </label>
            <input type="text" class="form-control" placeholder="Email" v-model = "User.email">
          </div>
        </div>
        <br>
        <button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="updateUser">Submit</button>
        <router-link to="/users">
        <button class="btn btn-large btn-block btn-success full-width">Go to User List Page</button>  
        </router-link>  
      </form>
     
    </div>
  
  </template>
<script>
import axios from "axios"
export default {
    name: 'UpdateUser',
    data() {
        return {
            User: {
                firstName: '',
                lastName: '',
                email: ''
            }
        }
    },
    methods: {
        updateUser() {
            axios.post('http://127.0.0.1:3427/users/'+this.$route.params.userId, this.User)
              .then ((response) => {
                console.log(response)
              })
              .catch((error) => {
                    console.log(error)
              })
        }
    },
    mounted(){
        axios.get('http://127.0.0.1:3427/users/'+this.$route.params.userId)
        .then ((response) => {
                this.User = response.data
                console.log(response.data)
              })
              .catch((error) => {
                    console.log(error)
              })
    }
}
</script>