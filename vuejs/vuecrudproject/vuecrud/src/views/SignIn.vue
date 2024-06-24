<template>
    <div class="container">
        <h1>Sign in</h1>
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