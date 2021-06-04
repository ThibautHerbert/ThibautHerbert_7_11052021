<template>
  <div> 
        <div class="card-body write-comment mx-auto" >
            <div class="d-flex align-items-center">
                <img src="{{ picture }}" class="d-flex justify-content-start m-1 rounded-circle pic-post" alt="photo du créateur du post">
                <label for="FormControlTextarea1">Commentez ! opt :répondez à prénom dont id: {{post.idUser}}</label>
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


export default {
    props: ['post'], // ou posts ? marche pas
    name: 'WriteComment',
    data() {
       return {
        // données pour un nouveau Commentaire
        body:'',
        idUser:'', // id de la personne qui commente
        idPost:'', // id du post commenté
        
        user: [{}],
        userConnected: [{}],
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
				
				const formData = new FormData()
				formData.append('body', this.body)
				formData.append('idPost', this.idPost);
                formData.append('idUser', this.idUser);
				console.log(formData)
				/*
				let signupForm = {"firstName": this.firstName, "lastName": this.lastName, "department": this.department, "location": this.location, "picture": this.picture, "email": this.email , "password": this.password}
                console.log('signupForm : '+ signupForm)
                //let signupToSend = JSON.stringify(signupForm)
				*/
                try {
                    axios.post('http://localhost:5000/api/comments/', formData) // /posts/
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