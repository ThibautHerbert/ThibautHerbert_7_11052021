<template>
  <div id="nav">
    <router-link to="/">Accueil</router-link> |
    <router-link to="/posts">Fil d'actualité</router-link> |
    <router-link to="/signup">S'inscrire</router-link> |
    <router-link to="/login">Se connecter</router-link> |
    <router-link to="/logout" @click="logout">Se déconnecter</router-link> 
    
  </div>
  <router-view/>
</template>

<script>
import Logout from './views/Logout'

export default {
  methods: {
    Logout
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
