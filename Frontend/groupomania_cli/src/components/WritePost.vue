<template>
  <div> 
        <div class="card-body write-post mx-auto" >
            <div class="d-flex align-items-center">
                <img src="{{ picture }}" class="d-flex justify-content-start m-1 rounded-circle pic-post" alt="photo du créateur du post">
                <label for="FormControlTextarea1">Postez un message !</label>
            </div>
            <div class="form-group ">
                <form>
                    <div>  
                        <textarea class="form-control" id="FormControlTextarea1" rows="3" placeholder="Votre message ici..." v-model="body"></textarea>
                        <label for="FormControlTextarea2" class="d-flex">Du contenu en plus ?</label>
                        <textarea class="form-control" id="FormControlTextarea2" rows="1" placeholder="Si vous avez un lien c'est ici..." v-model="url"></textarea>
                    </div>
                </form>
            </div>
            <div class="d-flex ">
                <button class="btn btn-success" @click="handleSendPost">Publier</button>
            </div>
            
        </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
       return {
        // données pour un nouveau Post
        body:'',
        url:'',
        idUser:'',
        picture:'',
       }
    },
    created() {
        axios.get('/auth/connected')
        .then(response => this.idUser = response.data[0].id)
        .then(response => this.picture = response.data[0].picture)
        .then(response => console.log(response)) // ou si on utilise par ex header de data : .then(response => this.header = response.data)
        .then(response => console.log('picture' + response.data.picture))
        .catch(error => console.log(error))
    },
    methods: {
        closeWritingPost() {
            this.$emit('closePost')
        },
        async handleSendPost() { // avec ou sans async handleSignup() {
	        if(this.body) {
				
				const formData = new FormData()
				formData.append('body', this.body)
				formData.append('url', this.url);
                formData.append('idUser', this.idUser);
				console.log(formData)
				/*
				let signupForm = {"firstName": this.firstName, "lastName": this.lastName, "department": this.department, "location": this.location, "picture": this.picture, "email": this.email , "password": this.password}
                console.log('signupForm : '+ signupForm)
                //let signupToSend = JSON.stringify(signupForm)
				*/
                try {
                    axios.post('http://localhost:5000/api/posts/', formData) // /posts/
                        .then(() => console.log('post publié'))
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