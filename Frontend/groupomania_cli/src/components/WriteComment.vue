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
                <button class="btn btn-success" @click="handleSendComment(), closeWritingComment(), newComment()">Publier le commentaire</button>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'WriteComment',
    props: ['post', 'comment', 'userConnected'],
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
        },
        handleSendComment() {
	        if(this.body) {
				let commentToSend = {"idUser": this.idUser, "body": this.body, "idPost": this.idPost}
                try {
                    axios.post('comments/', commentToSend)
                        .then(() => alert('commentaire publié'))
                        .catch( err => console.log(err))
                } catch (error) {
					console.log(error)
				}
	        }
        },
        newComment() { // méthode emit pour actualiser les commentaires au niveau grand parent (PostList), parent (SinglePost)
            this.$emit('newCommentTriggered')
        }
    }
}
</script>

<style>

</style>