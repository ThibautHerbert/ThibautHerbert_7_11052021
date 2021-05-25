<script>
//import { defineComponent } from '@vue/composition-api'

export default {
    name: 'Signup',
    data() {
    	return {
    		firstName: '',
    		lastName: '',
    		department: '',
    		location: '',
    		picture: '',
    		email: '' ,
          	password:'',
			passwordError: false,
          	formCompleted: []
    	}
    },
	methods: {
        closeSignup() {
            this.$emit('close')
        },
        handleSignup() {
           //validate password
            this.passwordError = this.password.length > 7 ? '' : 'Le mot de passe doit avoir au moins 8 caractères'
	        if(!this.passwordError) {
				let signupForm = {"firstName": this.firstName, "lastName": this.lastName, "department": this.department, "location": this.location, "picture": this.picture, "department": this.department,"email": this.email , "password": this.password}
                console.log('signupForm : '+ signupForm)
                let signupToSend = JSON.stringify(signupForm)
                console.log('signupToSend : '+ signupToSend)
                if (signupToSend) {
                    fetch('http://localhost:5000/api/auth/signup', {
                        method : "POST",
                        body: signupToSend,
                        headers: {"Content-type": "application/json; charset=UTF-8"}
                        })
                    .then(response => response.json()) // reçoit la fonction si elle est remplie/fulfilled
                    //.then(() => window.location.href = "home.html") // si la requête POST est fulfilled alors rediriger vers la page de confirmation de commande
                    .catch(err => console.log("promise err " +  err)); // reçoit la fonction si l'envoi est rejeté et indique erreur 
                }
	        }
        }
    }
        
}
</script>

<template>

<section class="row my-5" id="block-form" @click.self="closeSignup" @submit.prevent="handleSignup">
		<div class="col">
				<h2 class="mx-3 text-dark" id="form">Pour vous inscrire, merci de remplir vos informations :</h2>
				<form class="mx-5">
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="firstNameInput" class="errorLabel">Prénom : </label>
							<input type="text" class="form-control error" id="firstNameInput" aria-describedby="firstNameHelp" placeholder="Sophie" required v-model="firstName">
							<small id="firstNameHelp" class="form-text text-muted errorText"> Indiquez votre prénom.</small>
							<div class="errorDiv"><span class="errorFirstName"> erreur ! </span></div>
						</div>
						<div class="form-group col-md-6">
							<label for="lastNameInput">Nom : </label>
							<input type="text" class="form-control" id="lastNameInput" aria-describedby="lastNameHelp" placeholder="Durand" required v-model="lastName">
							<small id="lastNameHelp" class="form-text text-muted"> Indiquez votre nom de famille.</small>
							<div class="errorDiv"><span class="errorLastName"> erreur ! </span></div>
						</div>
					</div>
					<div class="form-group">
						<label for="departmentSelect">Département - Pôle : </label>
						<select name="department" class="varnish" id="departmentSelect" v-model="department">
                            <option value="">Sélectionnez votre pôle d'activité</option>
                            <option value="0">Ressources Humaines</option>
                            <option value="1">Informatique</option>
                            <option value="2">Service Après-Vente</option> 
                            <option value="3">Marketing</option>
                            <option value="4">Logistique</option> 
                            <option value="5">Direction</option>
                            <option value="6">Comptabilité et juridique</option>
							<option value="6">Achat</option>    
                        </select>
                    <small id="departmentHelp" class="form-text text-muted"> Indiquez votre pôle d'activité.</small>
						<div class="errorDiv"><span class="errorAddress"> erreur ! </span></div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-2">
							<label for="locationSelect">Lieu - Où ? - Dans quel bureau ? </label>
                            <select name="location" class="location" id="locationSelect" v-model="location">
                                <option value="">Sélectionnez votre bureau</option>
                                <option value="0">Nantes</option>
                                <option value="1">Paris</option>
                                <option value="2">Bordeaux</option> 
                                <option value="3">Caen</option>  
                            </select>
							<small id="zipCodeHelp" class="form-text text-muted"> Sélectionnez la ville de votre bureau</small>
							<div class="errorDiv"><span class="errorZip"> erreur ! </span></div>
						</div>
						<div class="form-group col-md-5">
							<label for="cityInput"> Image de profil : </label>
							<a href="#" class="btn btn-info" id="picture"> Téléchargez une image</a>
							<small id="cityHelp" class="form-text text-muted"> Téléchargez votre photo ou image de profil.</small>
							<div class="errorDiv"><span class="errorpicture"> erreur ! </span></div>
						</div>
						<div class="form-group col-md-5">
							<label for="passwordInput"> Mot de passe : </label>
							<input type="text" class="form-control" id="passwordInput" aria-describedby="passwordHelp" placeholder="********" required v-model="password"> 
							<small id="passwordHelp" class="form-text text-muted"> Indiquez un mot de passe.</small>
							<div class="errorDiv" v-if="passwordError"><span class="errorCountry"> {{ passwordError }} </span></div>
						</div>
					</div>
					<div class="form-group">
							<label for="emailInput"> Adresse Email : </label>
							<input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="sophiedurand@protonmail.com" required v-model="email">
							<small id="emailHelp" class="form-text text-muted"> Indiquez votre adresse courriel interne.</small>
							<div class="errorDiv"><span class="errorEmail"> erreur ! </span></div>
					</div>
					
					<button  class="btn btn-info" id="confirmSignup">Confirmer mon inscription</button>
				</form>
		</div>
	</section>
	

</template>

<style lang="sass">

</style>