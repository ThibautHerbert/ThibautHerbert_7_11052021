<template>
  <div> 
        <div class="card-body write-post mx-auto" >
            <div class="d-flex align-items-center">
                <img :src="urlImg + $root.logged.picture"  class="d-flex justify-content-start m-1 rounded-circle pic-post" alt="photo du créateur du post">
                <label for="FormControlTextarea1">Modifiez votre publication {{$root.logged.firstName}} !</label>
            </div>
            <div class="form-group ">
                <form>
                    <div>  
                        <textarea class="form-control" id="FormControlTextarea1" rows="3" placeholder="Votre message ici..." v-model="post.body"></textarea>
                        <label for="FormControlTextarea2" class="d-flex">Du contenu en plus ?</label>
                        <textarea class="form-control" id="FormControlTextarea2" rows="1" placeholder="Si vous avez un lien c'est ici..." v-model="post.url"></textarea>
                    </div>
                </form>
            </div>
            <div class="d-flex ">
                <button class="btn btn-success" @click="handleModifyPost(), closeWritingPost()">Publier la modification</button>
            </div>
            
        </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['post'],
    data() {
       return {
        urlImg: 'http://localhost:5000/images/',
        // données pour un nouveau Post
        body:'',
        url:'',
        idUser: this.$root.logged.id,
        picture:'',
       }
    },
    methods: {
        closeWritingPost() {                    // comment l'utiliser ?
            this.$emit('closePost')
        },
        handleModifyPost() { // avec ou sans async handleSignup() {
	        if(this.body) {
				const formData = new FormData()
				formData.append('body', this.post.body) //this.body
				formData.append('url', this.post.url); //this.url
                formData.append('idUser', this.idUser);
                formData.append('id', this.post.id);
				
                try {
                    axios.put('posts/' + this.post.id, formData) // /posts/
                        .then(() => console.log('post modifié'))
                        // rafraichir la page ?
                        //.then(() => this.$router.push({ name: 'Posts' })
                        .catch( err => console.log(err))
                } catch (error) {
					console.log(error)
				}
                
	        }
        } 
    } // fin de methods 
}
</script>

<style>
.write-post,
.write-comment{
    width: 60%;
}
.pic-post{
    height: 70px;
    width: 70px;
    object-fit: cover;  
}
</style>