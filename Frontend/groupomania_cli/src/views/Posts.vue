<template>
  <div class="Post-vue" v-if="posts.length">
    <h2>{{ header }}</h2>
    <h3>{{ subdescription }}</h3>
        <PostList :posts="posts" @newPostTriggered="getPosts" @deletePostTriggered="getPosts" @moderationPostTriggered="getPosts" @deModerationPostTriggered="getPosts"/>
  </div>
  <div v-else>
    <Loader />     
  </div>
</template>

<script>
import PostList from '../components/PostList'
import axios from 'axios'
import Login from './Login.vue'
import Loader from '../components/Loader.vue'

export default {
    props: [ 'id'],
    components: { PostList, Login, Loader},
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

<style>
h2{
  font-family: 'Montserrat', 'Roboto', sans-serif;
}
h3{
  font-family: 'Montserrat', 'Roboto', sans-serif;
  font-weight: bold;
}
</style>