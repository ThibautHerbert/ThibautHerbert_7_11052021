<template>
  <div> 
        <div class="card-body write-comment mx-auto" >
            <div class="d-flex align-items-center">
                <img src="{{userConnected[0].picture}}" class="d-flex justify-content-start m-1 rounded-circle pic-post" alt="photo du créateur du post">
                <label for="FormControlTextarea1">Commentez la publication {{userConnected[0].firstName}} ! opt :répondez à prénom dont id: {{post.idUser}}</label>
            </div>
            <div class="form-group ">
                <form>
                    <div>  
                        <textarea class="form-control" id="FormControlTextarea1" rows="3" placeholder="Votre message ici..." v-model="body"></textarea>
                    </div>
                </form>
            </div>
            <div class="d-flex ">
                <button class="btn btn-success" @click="handleSendComment">Publier le commentaire</button>
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
        body:'',
        idUser: this.userConnected[0].id, // id de la personne qui commente
        idPost: this.post.id, // id du post commenté
       }
    },
    methods: {
        closeWriteComment() {
            this.$emit('close')
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
                    axios.post('http://localhost:5000/api/comments/', commentToSend) // /posts/
                        .then(() => console.log('commentaire publié'))
                        .then(response => response.json())
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