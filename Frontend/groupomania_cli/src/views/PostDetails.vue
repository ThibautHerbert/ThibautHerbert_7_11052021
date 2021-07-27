<template>
  <div>Détail du post
        
        <div v-if="post" class="post" >
            <p>Publié le  post.creationDate  par </p>
            <h3>post.idUser</h3>
            <p> post.body </p>
            <p> post.url </p>
            <div>Commentaires :</div>
            <p></p>
        </div>
        
        <div v-else class="error">{{ error }}</div>
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
            }],
            error: "Pas de post à cette adresse"
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

<style scoped>
.error{
  padding: 5%;
  background: crimson;
  border-radius: 40px;
  font-family: 'Raleway','Montserrat', sans-serif;
  box-shadow:  5px 5px 5px #2c3e50;
  z-index: 99;
}
</style>