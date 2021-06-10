<template>
  <div class="Post-vue" v-if="posts.length">
    <h2>{{ header }}</h2>
    <h3>{{ subdescription }}</h3>
        <PostList :posts="posts" />
  </div>
  <div v-else>
    <Login />
   <!-- <div v-else> 
          <div class="spinner-border text-danger" role="status">
            <span class="sr-only">En chargement ...</span>
          </div>
        </div>  --> 
  </div>
</template>

<script>
import PostList from '../components/PostList'
import axios from 'axios'
import Login from './Login.vue'

export default {
    props: [ 'id'],
    components: { PostList, Login },
    data() {
        return {
            header: "Bienvenue dans le fil d'actu",
            subdescription : "Retrouvez tous les posts des collègues",
            posts: [],
        }
    },
    methods: {
      getPosts() {
        axios.get('posts', {headers: {Authorization: 'Bearer ' + localStorage.getItem('Token')}})
      .then(response => this.posts = response.data)
      .catch(error => console.log(error))
      }
      
    },
    mounted() {
      this.getPosts()
    },
      
}
   
    

</script>

<style scoped>

</style>