<template>
<div>
  <div class="dropdown d-flex justify-content-end fixed-top">
    <a class=" btn-connexion dropdown-toggle rounded" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
      <img src="./assets/Logos/icon-100px.png" alt="Logo Groupomania" class="logo-connexion"> 
      <span> Connexion</span> 
    </a>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <li>
        <router-link :to="{ name: 'Signup'}" v-if="!logged" class="dropdown-item">S'inscrire</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Login'}" v-if="!logged" class="dropdown-item">Se connecter</router-link> 
      </li>
      <li>
        <router-link :to="{ name: 'Logout'}" @click="logout" v-if="logged" class="dropdown-item">Se déconnecter</router-link>
      </li>
    </ul>
  </div>
    <div id="nav" v-if="logged">
      <router-link :to="{ name: 'Home'}">Accueil</router-link> |
      <router-link :to="{ name: 'Posts'}">Fil d'actualité</router-link> |
      <router-link :to="{ name: 'Account', params: { id: logged.id }}">Mon compte</router-link>
      <!--<router-link :to="{ name: 'Account', params: { id: userConnected1[0].id }}">Mon compte N°{{userConnected1[0].id}}</router-link>-->
    </div>
    <div id="db-connected" class="" v-if="db != `<h1>Page d'accueil Backend</h1> Base de données connectée`"></div>
    
    <router-view/>
    <!--
    <Posts />
    -->
    <Footer />
  </div>
</template>

<script>
import axios from 'axios'
import Footer from './components/Footer.vue'
import Logout from './views/Logout'
import Posts from './views/Posts.vue'
import Signup from './views/Signup.vue'

export default {
  components: { Footer, Posts, Signup },
  data() {
    return {
      logged: null,
      db:'',

      
    }
  },
  
  created() {
    axios.get('/auth/connected')
      .then(response => this.logged = response.data)
      .catch(error => console.log(error))

    axios.get('')//, (res, err) => {
      //console.log('test réussie')
      //this.db = 'Il semblerait que la base de données ne soit pas connectée, réessayez plus tard'
      //if (res) { console.log ("cool") } else { console.log("pas cool" )} // aucun console.log n'apparait
      
    //})
         
          
          .then(response => this.db = response.data)
          //.catch(error => console.log('Il semblerait que la base de données ne soit pas connectée, réessayez plus tard'))
          .catch(error => document.getElementById("db-connected").innerHTML = "Problème lié au serveur, veuillez réessayer plus tard")
          
  },
  methods: {
    logout() {
            //mettre un if loggedIn :
            console.log('logout cliqué')
            localStorage.removeItem('Token');
            this.$router.push({ name: "Login" })
            //renvoyer vers page de connexion
            //.then(() => this.$router.push({ name: 'Login' })
              .then(() => location.reload())
        },
    /*getDBConnexion() {
        axios.get('http://localhost:5000/api')
          .then(response => console.log(response.data))
          .catch(error => this.db = response.data)
    },*/
    /*mounted() {
      getDBConnexion(){
          axios.get('http://localhost:5000/api')
            .then(response => console.log(response.data))
            .catch(error => this.db = response.data)
      }
    }*/
  }
  
}
</script>

<style lang="scss">
@font-face{
    font-family: 'Roboto';
    src: url('assets/Fonts/Roboto/Roboto-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
@font-face{
    font-family: 'Montserrat';
    src: url('assets/Fonts/Montserrat/Montserrat-Light.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
@font-face{
    font-family: 'Quicksand';
    src: url('assets/Fonts/Quicksand/static/Quicksand-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
@font-face{
    font-family: 'Quicksand-SemiBold';
    src: url('assets/Fonts/Quicksand/static/Quicksand-SemiBold.ttf') format('truetype');
}
@font-face{
    font-family: 'Raleway';
    src: url('assets/Fonts/Raleway/static/Raleway-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
#db-connected{
  position: fixed;
  justify-content: center;
  align-items: center;
  margin: 20%;
  padding: 5%;
  display: flex;
  background: crimson;
  border-radius: 40px;
  font-family: 'Raleway','Montserrat', sans-serif;
  box-shadow:  5px 5px 5px #2c3e50;
  z-index: 99;
}
p{
  font-family: 'Raleway', sans-serif;
}
label{
  font-family: 'Montserrat', sans-serif;
}
@media screen and (min-width: 320px) and (max-width: 380px) {
  label{
    font-size: 0.9em;
  }
  .btn-connexion span{
    display:none;
  }
}
.logo-connexion{
  max-width: 30px;
  max-height: 30px;
  border-radius: 50px;
}

.btn-connexion{
  background: #2c3e50;
  
  padding: 5px;
  text-decoration: none;
}
.btn-connexion span{
  color: white;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 15px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    font-family: 'Montserrat', sans-serif;
    text-decoration: none;

    &.router-link-exact-active {
      color: #D1515A;
    }
  }
}

</style>
