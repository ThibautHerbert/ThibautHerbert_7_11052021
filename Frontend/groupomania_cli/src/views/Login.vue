<script>
//import { defineComponent } from '@vue/composition-api'
//import postLogin from '../composables/postLogin'

export default {
    name: 'Login',
    data() {
    	return {
    		email: '' ,
          	password:'',
            passwordError: false,
          	formCompleted: []
    	}
    },     
    methods: {
        closeLogin() {
            this.$emit('close')
            // rajouter redirection page accueil
        },
        handleLogin() {
           //validate password
           console.log('form submitted')
            this.passwordError = this.password.length > 7 ? '' : 'Le mot de passe doit avoir au moins 8 caractères !'
	        if(!this.passwordError) { // s'il n'y a pas d'erreur de mdp alors :
	            console.log('email : ', this.email)
	            console.log('password : ', this.password)
	            let loginForm = {"email": this.email , "password": this.password}
                console.log('loginForm : '+ loginForm)
                let loginToSend = JSON.stringify(loginForm)
                console.log('loginToSend : '+ loginToSend)
                if (loginToSend) {
                    fetch('http://localhost:5000/api/auth/login', {
                        method : "POST",
                        body: loginToSend,
                        headers: {"Content-type": "application/json; charset=UTF-8"}
                        })
                    .then(response => response.json()) // reçoit la fonction si elle est remplie/fulfilled
                    //.then(() => window.location.href = "home.html") // si la requête POST est fulfilled alors rediriger vers la page de confirmation de commande
                    .catch(err => console.log("promise err " +  err)); // reçoit la fonction si l'envoi est rejeté et indique erreur 
                }
	        }
        }
    },
    setup() {
        /*const { post, error, send } = postLogin()
        send()
        return { post, error } */
    }
}
    
</script>

<template>

    <section class="row my-5" id="block-form" @click.self="closeLogin">
		<div class="col">
            <h2 class="mx-3 text-dark" id="form">Pour vous connecter, merci de remplir vos informations :</h2>
            <form class="mx-5" @submit.prevent="handleLogin">
                <div class="form-row">
                    <div class="form-group col-md-5">
                        <label for="countryInput"> Mot de passe : </label>
                        <input type="text" class="form-control" id="countryInput" aria-describedby="countryHelp" placeholder="********" required v-model="password"> 
                        <small id="countryHelp" class="form-text text-muted"> Indiquez un mot de passe.</small>
                        <div class="errorDiv" v-if="passwordError"><span class="errorCountry"> {{ passwordError }} </span></div>
                    </div>
                </div>
                <div class="form-group">
                        <label for="emailInput"> Adresse Email : </label>
                        <input type="email" class="form-control" id="emailInputLogin" aria-describedby="emailHelp" placeholder="sophiedurand@protonmail.com" required v-model="email">
                        <small id="emailHelp" class="form-text text-muted"> Indiquez votre adresse courriel interne.</small>
                </div>
                
                <button class="btn btn-info" id="confirmLogin"> Me connecter</button>
            </form>
        </div>
    </section>
    <p> email : {{ email }}</p>
    <p> mot de passe : {{ password }}</p>
</template>

<style>

.btn{
    border: solid rgb(114, 114, 168) 1px;
    background : darkblue;
    padding: 5px;
    border-radius: 10px;
}
a {
    list-style-type: none;
    color: white;
    font-family: 'Trebuchet MS', sans-serif;

}
.errorDiv{
    color: #ff0062;
    margin: 10px 0;
    font-size: 0.8em;
    font-weight: bold;
}
</style>