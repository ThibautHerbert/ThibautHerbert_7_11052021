<template>
  <div class="post container">
    <div class="media ">
      <div class="d-flex">
        <div class="flex-grow-1"><img src="" class="d-flex justify-content-start mr-3" alt="photo du créateur du post"></div>
        <div class="">
        <button @click="modifyPost" class="btn btn-success align-self-end">Modifier le post (uniquement pour celui qui l'a créé)</button>
        <button @click="deletePost" class="btn btn-danger justify-end">Supprimer le post</button>
        </div>
      </div>
      
      
        <div class="media-body">
          <router-link :to="{ name: 'PostDetails', params: { id: post.id }}">
            <h5 class="mt-0">Nom du UserId + Post n°{{ post.id }}</h5>
          </router-link>
          <p>{{ post.body }}</p>
          <p>url : <a href="{{ post.url }}">{{ post.url }}</a></p>
          <p> Publié le : {{ post.creationDate }}</p>
        </div>
      </div>
  </div>
  
</template>

<script>
import { computed } from 'vue'

export default {
  props: ['post'],
 
  methods: {
    modifyPost() {
      console.log('modify Post')
    },
    confirmModifyPost() {
      console.log('modify Post')
    },
    deletePost() {
      console.log('delete Post')
    },
    addPost() {
      console.log('add/show Post')
    },
    confirmAddPost() {
      console.log('add Post in db')
    },
  }
   /*
  setup(props) {
    const snippet = computed(() => { // faire apparaitre un extrait du texte complet
      return props.post.body.substring(0,20) + '...'
    })
    return { snippet }
  }*/
}
</script>

<style>
h3{
  color: blueviolet;
}
.media{
  background: #2d3F5d;
  color: white;
}
.media-body{
  color: white;
}
p{
  color: rgb(170, 60, 60);
}
</style>