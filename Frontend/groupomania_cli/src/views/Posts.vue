<template>
  <h2>{{ header }}</h2>
  <h3>{{ subdescription }}</h3>
  <div class="post-list">
      <div v-for="post in posts" :key="post.id">
         <SinglePost :post="post" />
      </div>
  </div>
</template>

<script>
import getPost from '../composables/getPost'

export default {
    props: [ 'id'],
        setup(props) {
            const { post, error, load } = getPost(props.id)
            load()
            return { post, error }
        },
       
    data() {
        return {
            header: "Bienvenue dans le fil d'actu",
            subdescription : "Retrouvez tous les posts des collègues"
        }
    }
}
</script>

<style>

</style>