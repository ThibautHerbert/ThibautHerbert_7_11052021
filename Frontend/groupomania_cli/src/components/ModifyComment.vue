<template>
    <div> 
        <div class="card-body write-comment mx-auto" >
            <div class="d-flex align-items-center">
                <img :src="urlImg + $root.logged.picture" class="d-flex justify-content-start m-1 rounded-circle pic-post" alt="photo du créateur du post">
                <label for="FormControlTextarea1">Modifiez votre commentaire {{$root.logged.firstName}}</label>
            </div>
            <div class="form-group ">
                <form>
                    <div>  
                        <textarea class="form-control" id="FormControlTextarea1" rows="3" placeholder="Votre message ici..." v-model="comment.body"></textarea>
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
    props: ['post', 'comment'],
    data() {
       return {
        // données pour un nouveau commentaire
        urlImg: 'http://localhost:5000/images/',
        body:'', // utilité ?
        idUser: this.$root.logged.id,
        id: this.comment.id, // id du comment
        idPost: this.post.id,
        
        picture:'',
       }
    },
    methods: {
        
        handleModifyComment() {
	        if(this.comment.body) {
				let commentToModify = {"body": this.comment.body, "idUser": this.idUser, "id": this.id, "idPost": this.idPost}
                try {
                    axios.put('comments/', commentToModify) 
                        .then(() => console.log('commentaire modifié'))
                        // rafraichir la page ?
                        //.then(() => this.$router.push({ name: 'Posts' })
                        .catch( err => console.log(err))
                } catch (error) {
					console.log(error)
				}
                
	        }
        },
        closeWritingComment() {
            this.$emit('closeComment')
        },
    } 
}
</script>