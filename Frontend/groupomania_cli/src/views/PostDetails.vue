<template>
  <div>détail d'un seul post
        <div v-if="error">{{ error }}</div>
        <div v-if="post" class="post" >
            <p>Publié le  post[0].creationDate  par </p>
            <h3>post[0].idUser</h3>
            <p> post[0].body </p>
            <p> post[0].url </p>
        </div>
        <div>Commentaires :</div>
        <p>à insérer : commentaire</p>
  </div>
  
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            post: [{
                id:'',
                idUser:'',
                url:'',
                body:'',
                creationDate:'',
                isModerated:''
            }]
        }
    },
    props: ['id', 'post'],
    /*
    created() {
        axios.get('http://localhost:5000/api/posts/' + props.id)
        //.then(response => this.idUser = response.data[0].id)
          .then(response => this.post = response.data)
          .then(response => console.log(response.data))
          .catch(error => console.log(error))
    },*/
    /*setup(props) {
        const { post, error, load } = getPost(props.id)
        load()
        return { post, error } 
    }*/
}
</script>

<style>

</style>