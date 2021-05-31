<template>
  <div id="nav">
    <router-link :to="{ name: 'Home'}">Accueil</router-link> |
    <router-link :to="{ name: 'Posts'}">Fil d'actualité</router-link> |
    <router-link :to="{ name: 'Account', params: { id: user.id }}">Mon compte N°{{user.id}}</router-link>
    
    <div class="d-flex justify-content-end">
      <router-link :to="{ name: 'Signup'}" v-if="!userlogged">S'inscrire | </router-link>
      <router-link :to="{ name: 'Login'}" v-if="!userlogged">Se connecter | </router-link> 
      <router-link :to="{ name: 'Logout'}" @click="logout" v-if="userlogged">Se déconnecter</router-link> 
    </div>
    
    <p>test Coucou n°{{user.id}} (app.vue)</p>
    
  </div>
  <router-view/>
</template>

<script>
import Logout from './views/Logout'

export default {
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
      }
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
    console.log(this.userlogged)
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
