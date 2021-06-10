<template>
  <div> 
        <div class="card-body write-comment mx-auto" >
            <div class="d-flex align-items-center">
                <img :src="urlImg + $root.logged.picture" class="d-flex justify-content-start m-1 rounded-circle pic-post" alt="photo du créateur du post">
                <label for="FormControlTextarea1">Commentez la publication {{$root.logged.firstName}} et répondez à {{post.user_name}} !</label>
            </div>
            <div class="form-group ">
                <form>
                    <div>  
                        <textarea class="form-control" id="FormControlTextarea1" rows="3" placeholder="Votre message ici..." v-model="body"></textarea>
                    </div>
                </form>
            </div>
            <div class="d-flex ">
                <button class="btn btn-success" @click="handleSendComment(), closeWritingComment()">Publier le commentaire</button>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'


export default {
    name: 'WriteComment',
    props: ['post', 'comment', 'userConnected'], // ou posts ? marche pas
    name: 'WriteComment',
    data() {
       return {
        // données pour un nouveau Commentaire
        urlImg: 'http://localhost:5000/images/',
        body:'',
        idUser: this.$root.logged.id, // id de la personne qui commente
        idPost: this.post.id, // id du post commenté
       }
    },
    methods: {
        closeWritingComment() {
            this.$emit('closeComment')
            // rajouter redirection page post ?
        },
        handleSendComment() {
             // avec ou sans async handleSendComment() {
	        if(this.body) {
				/*
				const formData = new FormData()
				formData.append('idUser', this.idUser);
                formData.append('body', this.body)
				formData.append('idPost', this.idPost);
				console.log(formData)
				*/
				let commentToSend = {"idUser": this.idUser, "body": this.body, "idPost": this.idPost}
                try {
                    axios.post('comments/', commentToSend) // /posts/
                        .then(() => alert('commentaire publié'))
                        //.then(() => location.reload())              // à remplacer le reload par un update de getComments
                        // rafraichir la page ?
                        //.then(() => this.$router.push({ name: 'Posts' })
                        .catch( err => console.log(err))
                } catch (error) {
					console.log(error)
				}
	        } 
        }
    }
}
</script>

<style>

</style>