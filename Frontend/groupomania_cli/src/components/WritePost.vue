<template>
  <div > 
        <div class="card-body write-post mx-auto" >
            <div class="d-flex align-items-center">
                <img :src="urlImg + $root.logged.picture" class="d-flex justify-content-start m-1 rounded-circle pic-post" alt="photo du créateur du post">
                <label for="FormControlTextarea1">Postez un message {{$root.logged.firstName}} !</label>
            </div>
            <div class="form-group ">
                <form @submit="handleSendPost">
                    <div>  
                        <textarea class="form-control" id="FormControlTextarea1" rows="3" placeholder="Votre message ici..." v-model="body"></textarea>
                        <div class="form-group col-md-7">
							<label for="picture" class="form-label d-flex">Ajoutez une image :</label>
							<input class="form-control" type="file" id="picture" ref="img" @change="imgUpload">
							<small id="pictureHelp" class="form-text text-muted"> Téléchargez votre image.</small>
						</div>
                        <label for="FormControlTextarea2" class="d-flex">Du contenu en plus ?</label>
                        <textarea class="form-control" id="FormControlTextarea2" rows="1" placeholder="Si vous avez un lien c'est ici..." v-model="url"></textarea>
                    </div>
                </form>
            </div>
            <div class="d-flex ">
                <button class="btn btn-success" @click="handleSendPost(), closeWritingPost()" >Publier</button>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'WritePost',
    props: ['userConnected'],
    data() {
       return {
        // données pour un nouveau Post
        urlImg: 'http://localhost:5000/images/',
        body:'',
        url:'',
        idUser: this.$root.logged.id,
        picture:'',
        
       }
    },
    methods: {
        imgUpload(event) {
			this.picture = event.target.files[0];
            console.log(event.target.files[0])
		},
        closeWritingPost() {
            this.$emit('closePost')
        },
        async handleSendPost() { // avec ou sans async handleSignup() {
	        if(this.body) {
				
				const formData = new FormData()
				formData.append('body', this.body)
				formData.append('url', this.url);
                formData.append('idUser', this.idUser);
                formData.append('picture', this.picture); // rajouté le 10 juin
				console.log(formData)
				
                try {
                    axios.post('posts/', formData) // /posts/
                        .then(() => alert('post publié'))
                        //.then(() => location.reload())
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