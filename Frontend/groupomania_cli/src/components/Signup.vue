
<script>
//import { defineComponent } from '@vue/composition-api'

export default {
    name: 'Signup'
        
}
</script>

<template>

<section class="row my-5" id="block-form">
		<div class="col">
				<h2 class="mx-3 text-dark" id="form">Pour vous inscrire, merci de remplir vos informations :</h2>
				<form class="mx-5">
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="firstNameInput" class="errorLabel">Prénom : </label>
							<input type="text" class="form-control error" id="firstNameInput" aria-describedby="firstNameHelp" placeholder="Sophie" required>
							<small id="firstNameHelp" class="form-text text-muted errorText"> Indiquez votre prénom.</small>
							<div class="errorDiv"><span class="errorFirstName"> erreur ! </span></div>
						</div>
						<div class="form-group col-md-6">
							<label for="lastNameInput">Nom : </label>
							<input type="text" class="form-control" id="lastNameInput" aria-describedby="lastNameHelp" placeholder="Durand" required>
							<small id="lastNameHelp" class="form-text text-muted"> Indiquez votre nom de famille.</small>
							<div class="errorDiv"><span class="errorLastName"> erreur ! </span></div>
						</div>
					</div>
					<div class="form-group">
						<label for="departmentSelect">Département - Pôle : </label>
						<select name="department" class="varnish" id="departmentSelect">
                            <option value="">Sélectionnez votre pôle d'activité</option>
                            <option value="0">Ressources Humaines</option>
                            <option value="1">Informatique</option>
                            <option value="2">Service Après-Vente</option> 
                            <option value="3">Marketing</option>
                            <option value="4">Production</option> 
                            <option value="5">Direction</option>
                            <option value="6">Comptabilité et juridique</option>  
                        </select>
                    <small id="addressHelp" class="form-text text-muted"> Indiquez votre pôle d'activité.</small>
						<div class="errorDiv"><span class="errorAddress"> erreur ! </span></div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-2">
							<label for="locationSelect">Lieu - Où ? - Dans quel bureau ? </label>
                            <select name="location" class="location" id="locationSelect">
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
							<small id="cityHelp" class="form-text text-muted"> Téléchargez votre phpto ou image de profil.</small>
							<div class="errorDiv"><span class="errorpicture"> erreur ! </span></div>
						</div>
						<div class="form-group col-md-5">
							<label for="passwordInput"> Mot de passe : </label>
							<input type="text" class="form-control" id="passwordInput" aria-describedby="passwordHelp" placeholder="********" required> 
							<small id="passwordHelp" class="form-text text-muted"> Indiquez un mot de passe.</small>
							<div class="errorDiv"><span class="errorpassword"> erreur ! </span></div>
						</div>
					</div>
					<div class="form-group">
							<label for="emailInput"> Adresse Email : </label>
							<input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="sophiedurand@protonmail.com" required>
							<small id="emailHelp" class="form-text text-muted"> Indiquez votre adresse courriel interne.</small>
							<div class="errorDiv"><span class="errorEmail"> erreur ! </span></div>
					</div>
					
					<a href="#" class="btn btn-info" id="confirmOrder">Confirmer mon inscription</a>
				</form>
		</div>
	</section>
	

</template>

<style lang="sass">

</style>