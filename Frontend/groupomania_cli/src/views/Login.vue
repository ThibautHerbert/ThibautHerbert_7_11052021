<template>
    <section class="row my-5" id="block-form" @click.self="closeLogin">
		<div class="col">
            <h2 class="mx-3 text-dark" id="form">Pour vous connecter, merci de remplir vos informations :</h2>
            <form class="mx-5" @submit.prevent="handleLogin">
                <div class="row" >
						<div class="col-sm-6 bg-success ">
							<div class="container ">
								<img src="../assets/Logos/icon-left-font-monochrome-black.png" class="img-fluid" alt="logo Groupomania">
							</div>
						</div>
						<div class="col-sm-6 blockForm">
							<div class="iconTop mx-auto">
								<img src="../assets/Logos/icon.png" class="img-fluid" alt="logo Groupomania">
							</div>
                            <div class="form-row ">
                                <div class="form-group col-md-5 mx-auto">
                                    <label for="emailInput"> Adresse Email : </label>
                                    <input type="email" class="form-control" id="emailInputLogin" aria-describedby="emailHelp" placeholder="sophiedurand@protonmail.com" required v-model="email">
                                    <small id="emailHelp" class="form-text text-muted"> Indiquez votre adresse courriel interne.</small>
                                </div>
                            </div>
                            <div class="form-group col-md-5 mx-auto">
                                <label for="countryInput"> Mot de passe : </label>
                                <input type="text" class="form-control" id="countryInput" aria-describedby="countryHelp" placeholder="********" required v-model="password"> 
                                <small id="countryHelp" class="form-text text-muted"> Indiquez un mot de passe.</small>
                                <div class="errorDiv my-4 d-flex flex-wrap justify-content-center" >
                                    <span class="alert alert-danger" v-if="passwordError"> {{ passwordError }}</span>
                                    <span v-if="wrongPassword" class="alert alert-danger "> {{wrongPassword}} !</span>
                                </div>
                            </div>
                            <button class="btn btn-success my-5" id="confirmLogin"> Me connecter</button>
                            <div class="row">
                                <a href="" class="forgot ">Mot de passe oublié ?</a>
                            </div>
                        </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',
    data() {
    	return {
    		email: '' ,
          	password:'',
            passwordError: false,
          	formCompleted: [],
            wrongPassword: null
    	}
    },     
    methods: {
        closeLogin() {
            this.$emit('close')
        },
        async handleLogin() {
            this.passwordError = this.password.length > 7 ? '' : 'Le mot de passe doit avoir au moins 8 caractères !'
	        console.log('test ')
            
            if(!this.passwordError) { // s'il n'y a pas d'erreur de mdp alors :
                try {
                    const response = await axios.post('auth/login', { // raccourci headers voir axios.js
                        email: this.email,
                        password: this.password
                    });
                    localStorage.setItem("Token", response.data.token)
                    this.$router.push({ name: 'Posts' })
                        .then(() => location.reload())
                        .catch(error => console.log(error))
                
                } catch (err) {  
                    this.wrongPassword = JSON.stringify(err.response.data.message)
                }
            }
        }
    },
} 
</script>

<style>

*{
    font-family: 'Calibri', 'Courier New', Courier, monospace;
    color: black;
}
.bg-logo{
    background: #42b983;
}

</style>