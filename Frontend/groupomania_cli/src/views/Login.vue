<script>
//import { defineComponent } from '@vue/composition-api'

export default {
    name: 'Login',
    data() {
    	return {
    		email: '' ,
          	password:'',
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
            this.passwordError = this.password.length > 7 ? '' : 'Le mot de passe doit avoir au moins 8 caractères'
	        if(!this.passwordError) {
	            console.log('email : ', this.email)
	            console.log('password : ', this.password)
	            // const signupForm = {this.firstName, this.lastName, this.department, this.location, this.picture, this.department, this.email, this.password}
	        }
        }
    }
}
    
</script>

<template>

    <section class="row my-5" id="block-form" @click.self="closeLogin">
		<div class="col">
            <h2 class="mx-3 text-dark" id="form">Pour vous connecter, merci de remplir vos informations :</h2>
            <form class="mx-5">
                <div class="form-row">
                    <div class="form-group col-md-5">
                        <label for="countryInput"> Mot de passe : </label>
                        <input type="text" class="form-control" id="countryInput" aria-describedby="countryHelp" placeholder="********" required> 
                        <small id="countryHelp" class="form-text text-muted"> Indiquez un mot de passe.</small>
                        <div class="errorDiv"><span class="errorCountry"> erreur ! </span></div>
                    </div>
                </div>
                <div class="form-group">
                        <label for="emailInput"> Adresse Email : </label>
                        <input type="email" class="form-control" id="emailInputLogin" aria-describedby="emailHelp" placeholder="sophiedurand@protonmail.com" required>
                        <small id="emailHelp" class="form-text text-muted"> Indiquez votre adresse courriel interne.</small>
                        <div class="errorDiv"><span class="errorEmail"> erreur ! </span></div>
                </div>
                
                <a href="#" class="btn btn-info" id="confirmOrder"> Me connecter</a>
            </form>
        </div>
    </section>


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
</style>