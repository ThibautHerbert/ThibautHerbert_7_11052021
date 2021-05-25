<template>
  <div>détail d'un seul post
        <div v-if="error">{{ error }}</div>
        <div v-if="post" class="post" >
            <p>Publié le {{ post.dateContent }} par </p>
            <h3>{{ post.title}}</h3>
            <p>{{ post.body }}</p>
            <p>{{ post.url }}</p>
        </div>
        <div>Commentaires :</div>
        <p>à insérer : commentaire</p>
  </div>
  
</template>

<script>
import getPost from '../composables/getPost'

export default {
    props: ['id'],
    setup(props) {
        const { post, error, load } = getPost(props.id)
        load()
        return { post, error } 
    }
}
</script>

<style>

</style>