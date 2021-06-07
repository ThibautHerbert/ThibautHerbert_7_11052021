<template>
  <div class="home">
    <div class="d-flex justify-content-center">
      <img :src="url + $root.logged.picture" alt="image de profil" class="rounded-circle pic-profile" width="50" height="50">
      <h3 class="mx-3">Bonjour {{ $root.logged.firstName}}</h3>
      <p>Team {{ $root.logged.location }}</p>
    </div>
    <div class="">
      <div class="d-flex justify-content-center align-items-center flex-wrap">
        <h1>Bienvenue sur le réseau Groupomania</h1>
        <img alt="Groupomania logo" src="../assets/Logos/icon-100px.png" >
      </div>
      <div class="">
        <img alt="Groupomania logo" src="../assets/images/pexels-andrea-piacquadio-927022-1000px.jpg" class="home-image">
      </div>
    </div>
    <div>
      <h4>Découvrir vite les derniers posts !</h4>
    </div>
    
  </div>
</template>

<script>
//import PostList from '../components/PostList.vue'

export default {
  //name: 'Home',
  data() {
    return {
      url:'http://localhost:5000/images/',
    }
  },
  //components: { PostList },
}
</script>
<style scoped>
.pic-profile{
    object-fit: cover;  
}
@media screen and (min-width: 320px) and (max-width: 380px) {
  .home-image {
    
    max-width: 300px;
  }
  h1 {
    margin-top: 10px;
  }
  
}
</style>
