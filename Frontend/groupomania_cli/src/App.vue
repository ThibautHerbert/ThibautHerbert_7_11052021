

<script>
import HelloWorld from './components/HelloWorld.vue'
import Home from './components/Home.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Home,
    Signup,
    Login,
    Footer,
  }
}
</script>

<template>
  <div id="app">
    
    <nav>  
      <a href="/about"> Accueil</a>
      <a href="/contact"> Derniers posts</a>
      <a href="/contact"> Mon Compte</a>
      <a href="/contact"> S'inscrire</a>
      <a href="/contact"> Se connecter</a>
    </nav>
    <img alt="Groupomania logo" src="./assets/Logos/icon-left-font-monochrome-black.png">
    <p> Bienvenue sur le Réseau Social d'Entreprise : <Home/></p>
    <Signup/>
    <Login/>
    <Footer/>
  </div>
  
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
