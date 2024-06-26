<template>
  <div class="movielist">
    <h4>{{ msg }}</h4>
    <div class="container">
      <button @click="logout" class="btn btn-default"><span class="glyphicon glyphicon-log-out"></span> Logout</button>
    </div>
    <br>
    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4"/>
    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
      <div class="panel panel-success" >
        <div class="panel-heading">
          <h3 class="panel-title">Add New Movie</h3>
        </div>
        <div class="panel-body">
          <div class="input-group" >
            <input type="text" class="form-control" placeholder="Add New Item" v-model='movie' @keyup.enter='addMovie'>
            <span class="input-group-btn">
              <button class="btn btn-success" type="button" @click="addMovie"><span class="glyphicon glyphicon-plus"/> Add</button>
            </span>
          </div><!-- /input-group -->
        </div>
      </div>
      <div class="panel panel-info" >
        <div class="panel-heading">
          <h3 class="panel-title">List of Movies (Update/Delete)</h3>
        </div>
        <div class="panel-body">
          <ul>
            <li v-for="(movieName,key) in movies" :key='key'>
                <div class="row">
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <p><b>{{movieName.name}}</b></p>
                  </div>
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <input type="text" v-model="editName[key]" class="form-control" @keyup.enter="editMovie(key)" placeholder="Update Movie Name"/>
                  </div>
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <button class="btn btn-sm btn-warning" @click="editMovie(key)"><span class="glyphicon glyphicon-pencil"></span> Update</button>
                    <button class="btn btn-sm btn-danger" @click="deleteMovie(key)"><span class="glyphicon glyphicon-trash"></span> Delete</button> 
                  </div>
                </div>
                <br>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"/>
  </div>
</template>
<script>
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
export default {
  name: 'MovieList',
  data () {
    return {
      movie: null,
      movies: {},
      movieIds: {},
      editName: [],
      size: 0,
      isLoggedIn: false,
      auth: getAuth()
    }
  },
  mounted () {
      const db = getFirestore()
      const docRef = collection(db, "movies")
      onSnapshot(docRef, snapshot => {
        this.movies = snapshot.docs.map(doc=> doc.data())
        this.movieIds = snapshot.docs.map(doc=> doc.id)
        this.size = this.movies.length
        console.log (this.movieIds)
        console.log (this.movies)
      })
  },
  methods: {
    async addMovie () {
      const db = getFirestore()
      const colRef = doc(collection(db,"movies"))
      const dataObj = {name: this.movie}
      const docRef = await setDoc(colRef, dataObj)
    },
    async deleteMovie(key) {
      const db = getFirestore()
      const docRef =doc(db, "movies/"+this.movieIds[key])
      await deleteDoc(docRef)
    },
    async editMovie(key) {
      const db = getFirestore()
      const docRef =doc(db, "movies/"+this.movieIds[key])
      const dataObj = {name: this.editName[key]}
      await updateDoc(docRef, dataObj)
      this.editName = []
    },
    logout () {
            signOut(this.auth)
            .then(()=> {
                this.$router.replace('/signin')
            })
            .catch((error) => {
                alert(error.message)
            })
        }
  }
}



</script>