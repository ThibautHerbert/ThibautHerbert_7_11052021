<template>
  <div>
    <h2>{{ header }}</h2>
    <h3>{{ subdescription }}</h3>
    <div v-if="error"> {{ error }}</div>
    <div v-if="posts.length" >
        <PostList :posts="posts" />
        <p>test 1</p>
    </div>
    <div v-else>En chargement ...</div>   
    <div v-for="post in posts" :key="post.id">
         <p> {{ post.dateContent }}</p>
         <p>test 2</p>
    </div>
    <p>test 3</p>
  </div>
</template>

<script>
import getPosts from '../composables/getPosts'
import PostList from '../components/PostList'
// import { ref } from 'vue' // plus besoin de cet import si utilisé dans le composable

export default {
    props: [ 'id'],
    components: { PostList },
    data() {
        return {
            header: "Bienvenue dans le fil d'actu",
            subdescription : "Retrouvez tous les posts des collègues"
        }
    },
    setup() {
            const { posts, error, load } = getPosts()
            load()
            return { posts, error }   
            },
            
    }
    

</script>

<style>

</style>