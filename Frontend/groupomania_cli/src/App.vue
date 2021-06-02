<template>
<div>
  <div class="dropdown d-flex justify-content-end fixed-top">
    <a class="btn btn-connexion dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
      Connexion
    </a>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <li>
        <router-link :to="{ name: 'Signup'}" v-if="userlogged" class="dropdown-item">S'inscrire</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Login'}" v-if="userlogged" class="dropdown-item">Se connecter</router-link> 
      </li>
      <li>
        <router-link :to="{ name: 'Logout'}" @click="logout" v-if="userlogged" class="dropdown-item">Se déconnecter</router-link>
      </li>
    </ul>
  </div>
    <div id="nav">
      <router-link :to="{ name: 'Home'}">Accueil</router-link> |
      <router-link :to="{ name: 'Posts'}">Fil d'actualité</router-link> |
      <router-link :to="{ name: 'Account', params: { id: userConnected1[0].id }}">Mon compte N°{{userConnected1[0].id}}</router-link>
      <p>test Coucou n° {{userConnected1[0].id}} {{userConnected1[0].firstName}}</p>
    
    </div>
    
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios'
import Footer from './components/Footer'
import Logout from './views/Logout'

export default {
  components: { Footer },
  data() {
    return {
      userlogged: false,
      userConnected : {
        firstName: '',
    		lastName: '',
    		department: '',
    		location: '',
    		picture: '',
    		email: '' ,
        id: ''
      },
      userConnected1 : [{
        firstName: '',
    		lastName: '',
    		department: '',
    		location: '',
    		picture: '',
    		email: '' ,
        id: ''
      }],
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('User'))
    this.userConnected = JSON.parse(localStorage.getItem('User'))
    console.log('1 loggé ou pas ?')
    if ( this.userConnected ) {
      this.userlogged = !this.userlogged
      console.log('loggé ou pas ?')
      
    }
    console.log('userlogged: ' + this.userlogged)

    axios.get('/auth')
      .then(response => this.userConnected1 = response.data)
      .then(response => console.log(response)) // ou si on utilise par ex header de data : .then(response => this.header = response.data)
      .catch(error => console.log(error))
  },
  methods: {
    logout() {
            //mettre un if loggedIn :
            console.log('logout cliqué')
            localStorage.removeItem('Token');
            localStorage.removeItem('User');
            localStorage.removeItem('IdUser');
            this.userlogged = ! this.userlogged
            this.$router.push({ name: "Login" })
            //renvoyer vers page de connexion
            //.then(() => this.$router.push({ name: 'Login' })
        },
    
  
  }
  
}
</script>

<style lang="scss">
.btn-connexion{
  background: #2c3e50;
  color: #42b983;
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

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
