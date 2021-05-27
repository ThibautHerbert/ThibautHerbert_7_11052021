<template>
  <div>
    <h2>{{ header }}</h2>
    <h3>{{ subdescription }}</h3>
    <div v-if="error"> {{ error }}</div>
    <!--<div v-if="posts.length" >-->
        <PostList :posts="posts" />
        <p>test 1</p>
    <!--</div>-->
   <!-- <div v-else> 
          <div class="spinner-border text-danger" role="status">
            <span class="sr-only">En chargement ...</span>
          </div>
        </div>  --> 
    <div v-for="post in posts" :key="post.id">
         <p> {{ post.Creationdate }}</p>
         <p>test 2</p>
    </div>
    <p>test 3</p>
    
  </div>
</template>

<script>
//import getPosts from '../composables/getPosts'
import PostList from '../components/PostList'

import axios from 'axios'

// import { ref } from 'vue' // plus besoin de cet import si utilisé dans le composable

export default {
    props: [ 'id'],
    components: { PostList },
    data() {
        return {
            header: "Bienvenue dans le fil d'actu",
            subdescription : "Retrouvez tous les posts des collègues",
            posts: {
              id:"",
              idUser:"",
              url:"",
              body:"",
              creationDate:"",
              isModerated:""
            }
        }
    },
    /*
    methods: {
      getPosts(){
        fetch('http://localhost:5000/api/auth/signup', {
          method : "GET",
          body: signupToSend,
          headers: {"Content-type": "application/json; charset=UTF-8", "Authorization": token}
          })
      },
      */
     /*
      async handlePosts() {
        const response = await axios.get('')
      }
      
    },*/
     mounted() {
      axios.get('posts/', {headers: {Authorization: 'Bearer ' + localStorage.getItem('Token')}})
      .then(response => this.posts = response.data)
      .then(response => console.log(response)) // ou si on utilise par ex header de data : .then(response => this.header = response.data)
      .catch(error => console.log(error))
    },
    /*
    setup() {
            const { posts, error, load } = getPosts()
            load()
            return { posts, error }   
            },
            */
    }
   
    

</script>

<style>

</style>