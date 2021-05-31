<template>
  <div class="post container">
    <div class="media ">
      <div class="d-flex">
        <div class="flex-grow-1"><img src="" class="d-flex justify-content-start mr-3" alt="photo du créateur du post"></div>
        <div class="">
        <button @click="modifyPost" class="btn btn-success align-self-end">
          
          Modifier le post (uniquement pour celui qui l'a créé)</button>
        <button @click="deletePost" class="btn btn-danger justify-end">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
          Supprimer le post</button>
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