<template>
  <div class="Post-vue">
    <h2>{{ header }}</h2>
    <h3>{{ subdescription }}</h3>
    <div v-if="posts.length" >
        <PostList :posts="posts" />
    </div>
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

export default {
    props: [ 'id'],
    components: { PostList },
    data() {
        return {
            header: "Bienvenue dans le fil d'actu",
            subdescription : "Retrouvez tous les posts des collègues",
            posts: [],
        }
    },
     mounted() {
      axios.get('posts', {headers: {Authorization: 'Bearer ' + localStorage.getItem('Token')}})
      .then(response => this.posts = response.data)
      .catch(error => console.log(error))
    },
      
}
   
    

</script>

<style scoped>

</style>