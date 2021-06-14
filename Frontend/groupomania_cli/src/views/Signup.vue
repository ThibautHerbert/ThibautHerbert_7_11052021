<template>
	<section class="row my-4" id="block-form" @click.self="closeSignup" @submit.prevent="handleSignup">
		<div class="col">
			<h2 class="text-dark" id="form">Pour vous inscrire, merci de remplir vos informations :</h2>
			<form class="container" enctype="multipart/form-data">	
				<div class="row" >
					<div class="col-sm-6 blockLogo">
						<div class="container ">
							<img src="../assets/Logos/icon-left-font-monochrome-white.png" class="img-fluid" alt="logo Groupomania">
						</div>
					</div>
					<div class="col-sm-6 blockForm">
						<div class="iconTop mx-auto">
							<img src="../assets/Logos/icon.png" class="img-fluid" alt="logo Groupomania">
						</div>
						<div class="form-group col-md-7 mx-auto">
							<label for="firstNameInput" class="errorLabel">Prénom : </label>
							<input type="text" class="form-control error" id="firstNameInput" aria-describedby="firstNameHelp" placeholder="Sophie" required v-model="firstName">
							<small id="firstNameHelp" class="form-text text-muted errorText"> Indiquez votre prénom.</small>
						</div>
						<div class="form-group col-md-7 mx-auto">
							<label for="lastNameInput">Nom : </label>
							<input type="text" class="form-control" id="lastNameInput" aria-describedby="lastNameHelp" placeholder="Durand" required v-model="lastName">
							<small id="lastNameHelp" class="form-text text-muted"> Indiquez votre nom de famille.</small>
						</div>
						<div class="form-group col-md-7 mx-auto">
							<label for="departmentSelect">Département - Pôle : </label>
							<select name="department" class="form-select" aria-label="Choix du département" required id="departmentSelect" v-model="department">
								<option value="">Sélectionnez votre pôle d'activité</option>
								<option value="Ressources Humaines">Ressources Humaines</option>
								<option value="Informatique">Informatique</option>
								<option value="Service Après-Vente">Service Après-Vente</option> 
								<option value="Marketing">Marketing</option>
								<option value="Logistique">Logistique</option> 
								<option value="Direction">Direction</option>
								<option value="Comptabilité et juridique">Comptabilité et juridique</option>
								<option value="Achat">Achat</option>    
							</select>
							<small id="departmentHelp" class="form-text text-muted"> Indiquez votre pôle d'activité.</small>
						</div>
						<div class="form-group col-md-7 mx-auto">
							<label for="locationSelect">Lieu - Où ? - Dans quel bureau ? </label>
							<select name="location" class="form-select" id="locationSelect" required v-model="location">
								<option value="">Sélectionnez votre bureau</option>
								<option value="Nantes">Nantes</option>
								<option value="Paris">Paris</option>
								<option value="Bordeaux">Bordeaux</option> 
								<option value="Caen">Caen</option>  
							</select>
							<small id="zipCodeHelp" class="form-text text-muted"> Sélectionnez la ville de votre bureau</small>
						</div>
						<div class="form-group col-md-7 mx-auto">
							<label for="picture" class="form-label">Téléchargez une image de profil :</label>
							<input class="form-control" type="file" id="picture" ref="img" @change="imgUpload">
							<small id="pictureHelp" class="form-text text-muted"> Téléchargez votre photo ou image de profil.</small>
						</div>
						<div class="my-2">
							<div class="form-group col-md-7 mx-auto ">
								<label for="emailInput"> Adresse Email : </label>
								<input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="sophiedurand@protonmail.com" required v-model="email">
								<small id="emailHelp" class="form-text text-muted"> Indiquez votre adresse courriel interne.</small>
								<div class="errorDiv my-2 d-flex flex-wrap justify-content-center" >
                                    <span v-if="wrongEmail" class="alert alert-danger"> {{wrongEmail}} !</span>
                                </div>
							</div>
							<div class="form-group col-md-7 mx-auto">
								<label for="passwordInput"> Mot de passe : </label>
								<input type="text" class="form-control" id="passwordInput" aria-describedby="passwordHelp" placeholder="********" required v-model="password"> 
								<small id="passwordHelp" class="form-text text-muted"> Indiquez un mot de passe.</small>
								<div class="errorDiv my-4 d-flex" v-if="passwordError"><span class="alert alert-danger"> {{ passwordError }} </span></div>	
							</div>
						</div>
						<button  class="btn btn-success my-5" id="confirmSignup">Confirmer mon inscription</button>
					</div>
				</div>
			</form>
		</div>	
	</section>
</template>
<script>
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env'})

import axios from 'axios'

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
			wrongEmail: null,
    	}
    },
	methods: {
        closeSignup() {
            this.$emit('close')
        },
		imgUpload(event) {
			this.picture = event.target.files[0];
			//this.picture = this.$refs.img.files[0]
			let picName = this.picture.name
			console.log(picName)
			console.log(event.target.files[0])
		},
        async handleSignup() {
           //validate password
            this.passwordError = this.password.length > 7 ? '' : 'Le mot de passe doit avoir au moins 8 caractères !'
	        if(!this.passwordError) {
				const formData = new FormData()
				formData.append('picture', this.picture)
				formData.append('firstName', this.firstName);
				formData.append('lastName', this.lastName);
				formData.append('department', this.department);
				formData.append('location', this.location);
				formData.append('email', this.email);
				formData.append('password', this.password);
				console.log(formData)
				/* //fonctionne sauf this.$router
				axios.post('auth/signup', formData)
					.then(() => console.log('inscription réussie'))
					.then(response => response.json())
					//.then(() => this.$router.push({ name: 'Login' })
					.then(() => alert('Veuillez vous connecter'))
					.catch( err => console.log(err))  
				*/
				try {
					const response = await axios.post('auth/signup', formData)
					this.$router.push({ name: 'Login' })
					alert('Veuillez vous connecter')
					console.log(response)
				} catch (err) {
					this.wrongEmail = JSON.stringify(err.response.data.message)
				}
				
	        }
        }
    }    
}
</script>

<style>
.iconTop{
	max-width: 100px;	
}
.blockForm{
	border:#162846 solid 5px;
}
.blockLogo{
	background: #2D3F5D;
}
</style>