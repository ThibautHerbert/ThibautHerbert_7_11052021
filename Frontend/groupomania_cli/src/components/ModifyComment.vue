<template>
    <div> 
        <div class="card-body write-comment mx-auto" >
            <div class="d-flex align-items-center">
                <img :src="urlImg + $root.logged.picture" class="d-flex justify-content-start m-1 rounded-circle pic-post" alt="photo du créateur du post">
                <label for="FormControlTextarea1">Modifiez votre publication {{$root.logged.firstName}}</label>
            </div>
            <div class="form-group ">
                <form>
                    <div>  
                        <textarea class="form-control" id="FormControlTextarea1" rows="3" placeholder="Votre message ici..." v-model="body"></textarea>
                    </div>
                </form>
            </div>
            <div class="d-flex ">
                <button class="btn btn-success" @click="handleModifyComment(), closeWritingComment()">Publier la modification</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    props: ['post', 'comment', 'userConnected'],
    data() {
       return {
        // données pour un nouveau Post
        urlImg: 'http://localhost:5000/images/',
        body:'',
        idUser: this.$root.logged.id,
        id: this.comment.id, // id du comment
        idPost: this.post.id,
        
        picture:'',
       }
    },
    methods: {
        closeWritingComment() {
            this.$emit('closeComment')
        },
        async handleModifyComment() { // avec ou sans async handleSignup() {
	        if(this.body) {
				
				let commentToModify = {"body": this.body, "idUser": this.idUser, "id": this.id, "idPost": this.idPost}
                try {
                    axios.put('comments/', commentToModify) // /posts/
                        .then(() => console.log('commentaire modifié'))
                        .then(response => response.json())
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