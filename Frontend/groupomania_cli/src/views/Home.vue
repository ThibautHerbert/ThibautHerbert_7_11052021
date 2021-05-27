<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Page d'accueil Groupomania</h1>
    <PostList :posts="posts" />
  </div>
</template>

<script>
import { ref } from 'vue'
import PostList from '../components/PostList.vue'
import axios from 'axios'

// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: { PostList },
  methods: {
    
    
    
  },
  // méthode pour récupérer les données de l'utilisateur, pour l'autorisation avec son token
  async created() {
    const response = await axios.get('user', { // pour le moment moi je ne récupère pas le user mais ça serait mieux en effet ?
      /*headers: {
        Authorization: 'bearer ' + localStorage.getItem('Token')
      }*/
    })
  },
  // setup pour tester les bindings
  setup() {
    const posts = ref([
      { creationDate: "24 05 2021", url: "url1.fr" , body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in imperdiet nisi. Vestibulum eu dui dictum, ornare est non, dignissim dui. Donec at ex nulla. Aenean sem tortor, bibendum ac accumsan vel, elementum vel turpis. Nam auctor egestas pulvinar. Aenean placerat finibus finibus. Praesent dictum velit at purus aliquam, sit amet mattis est molestie. Duis a nulla et mauris luctus feugiat nec cursus odio. Nam elementum vitae est eu porttitor. Nulla vestibulum gravida magna eu ultricies. Nunc posuere tincidunt pellentesque. Sed id condimentum nisl, ultricies viverra orci. Fusce sit amet massa ut nibh feugiat elementum ac id est.", id: 1,},
      { creationDate: "25 05 2021", url: "url2.fr", body: "lorem ipsumfefeeffef trtr trtrtrt trtr t rttr rtrt", id: 2 },
      { creationDate: "25 05 2021", url: "url3.fr", body: "lorem ipsum efeff", id: 3 },
      { creationDate: "26 05 2021", url: "url4.fr", body: "lorem ipsum", id: 4 },
    ])

    return { posts }
  }
}
</script>
