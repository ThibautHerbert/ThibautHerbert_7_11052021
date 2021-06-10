<template>
<div>
  <div class="dropdown d-flex justify-content-end fixed-top">
    <a class="btn btn-connexion dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
      Connexion
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
      
    }
  },
  created() {
    axios.get('/auth/connected')
      .then(response => this.logged = response.data)
      .catch(error => console.log(error))
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
