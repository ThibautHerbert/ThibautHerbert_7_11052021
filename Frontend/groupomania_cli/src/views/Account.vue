<template>
    <div> 
        <div> 
            <h1>Mon compte</h1>
            <p>{{userId}}</p>
            <button class="btn btn-primary" @click="ModifyAccount">Modifier mon compte</button>
            <button class="btn btn-danger" @click="DeleteAccount">Supprimer mon compte</button>
            <button class="btn btn-info" @click="ModifyPassword">Changer mon mot de passe</button>
            <!--modifier le compte -->
            <div> 
                <div class="iconTop mx-auto"> 
                            <img src="../assets/Logos/icon.png" class="img-fluid" alt="logo Groupomania">
                </div>
                <div class="col-sm-6 blockForm mx-auto" v-if="showModifyAccount">
                    <h3>Modifier le compte</h3>
                    <div class="form-group col-md-7 mx-auto">
                        <label for="firstNameInput" class="errorLabel">Mon Prénom : {{ user.firstName}}</label>
                        <input type="text" class="form-control error" id="firstNameInput" aria-describedby="firstNameHelp" placeholder="{{ user.firstName}} Modifiez votre prénom." required v-model="userModified.firstName">
                        <small id="firstNameHelp" class="form-text text-muted errorText"> Modifiez votre prénom.</small>
                    </div>
                    <div class="form-group col-md-7 mx-auto">
                        <label for="lastNameInput">Nom : {{ user.lastName}}</label>
                        <input type="text" class="form-control" id="lastNameInput" aria-describedby="lastNameHelp" placeholder="Durand" required v-model="userModified.lastName">
                        <small id="lastNameHelp" class="form-text text-muted"> Modifiez votre nom de famille.</small>
                    </div>
                
                
                    <div class="form-group col-md-7 mx-auto">
                        <label for="departmentSelect">Département - Pôle : {{ user.department}}</label>
                        <select name="department" class="form-select" aria-label="Choix du département" required id="departmentSelect" v-model="userModified.department">
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
                        <small id="departmentHelp" class="form-text text-muted"> Modifiez votre pôle d'activité.</small>
                    </div>
                
                    <div class="form-group col-md-7 mx-auto">
                        <label for="locationSelect">Lieu - Où ? - Dans quel bureau ? {{ user.location}}</label>
                        <select name="location" class="form-select" id="locationSelect" required v-model="userModified.location">
                            <option value="">Sélectionnez votre bureau</option>
                            <option value="Nantes">Nantes</option>
                            <option value="Paris">Paris</option>
                            <option value="Bordeaux">Bordeaux</option> 
                            <option value="Caen">Caen</option>  
                        </select>
                        <small id="zipCodeHelp" class="form-text text-muted"> Modifiez la ville de votre bureau</small>
                    </div>
                    <div class="form-group col-md-7 mx-auto">
                        <label for="picture" class="form-label">Téléchargez une image de profil :</label>
                        <input class="form-control" type="file" id="picture" ref="img" @change="imgUpload">
                        <small id="pictureHelp" class="form-text text-muted"> Téléchargez une autre photo ou image de profil.</small>
                    </div>
                    <p class="text-warning my-4 ">N'oubliez pas de retaper votre email et votre mot de passe pour confirmer les modifications.</p>
                    <div class="my-4">
                        <div class="form-group col-md-7 mx-auto ">
                            <label for="emailInput"> Adresse Email : {{ user.email}}</label>
                            <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="sophiedurand@protonmail.com" required v-model="email">
                            <small id="emailHelp" class="form-text text-muted"> Modifiez votre adresse courriel interne.</small>
                        </div>
                        <div class="form-group col-md-7 mx-auto">
                            <label for="passwordInput"> Mot de passe : </label>
                            <input type="text" class="form-control" id="passwordInput" aria-describedby="passwordHelp" placeholder="********" required v-model="password"> 
                            <small id="passwordHelp" class="form-text text-muted"> Modifiez votre mot de passe.</small>
                            <div class="errorDiv" v-if="passwordError"><span class="errorCountry"> {{ passwordError }} </span></div>	
                        </div>
                    </div>
                    <button class="btn btn-danger" @click="ConfirmModifyAccount">Confirmer les modifications du compte</button>
                </div>
            </div>
            <!--modifier le mdp -->
            <div class="col-sm-6 blockForm mx-auto" v-if="showModifyPassword">
                <h3>Changer de mot de passe</h3>
                <!--
                <div class="form-row my-3">
                    <div class="form-group col-md-5 mx-auto">
                        <label for="emailInput"> Confirmez votre adresse mail : </label>
                        <input type="email" class="form-control" id="emailInputLogin" aria-describedby="emailHelp" placeholder="sophiedurand@protonmail.com" required v-model="email">
                        <small id="emailHelp" class="form-text text-muted"> Indiquez votre adresse courriel interne.</small>
                    </div>
                </div>
                -->
                <div class="form-group col-md-5 mx-auto">
                    <label for="countryInput"> Nouveau mot de passe : </label>
                    <input type="text" class="form-control" id="countryInput" aria-describedby="countryHelp" placeholder="********" required v-model="newPassword"> 
                    <small id="countryHelp" class="form-text text-muted"> Indiquez un nouveau mot de passe.</small>
                    <p> test mdp {{newPassword}}</p>
                    <div class="errorDiv" v-if="passwordError"><span class="errorCountry"> {{ passwordError }} </span></div>
                </div>
                <button class="btn btn-success my-5" id="confirmNewPassword" @click="confirmModifyPassword"> Confirmer le nouveau mot de passe</button>
            </div>
        </div>
    </div> 
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            showModifyAccount: false,
            showModifyPassword: false,
            userModified : {
                picture: this.picture,
				firstName: this.firstName,
				lastName: this.lastName,
				department: this.department,
				location: this.location,
            },
            userId: JSON.parse(localStorage.getItem('IdUser')),
            newPassword : this.newPassword
        }
    },
    created() {
    this.user = JSON.parse(localStorage.getItem('User'))
    //console.log('user est : ' + user)
    //this.userId = 
    //console.log('userId est : ' + userId)
    },
    methods: {
        ModifyAccount() {
            console.log('Modifier mon compte')
            this.showModifyAccount = !this.showModifyAccount
        },
        ModifyPassword() {
            console.log('clic sur Modifier mon mot de passe')
            this.showModifyPassword = !this.showModifyPassword
        },
        confirmModifyPassword() { //async
            // ATTENTION variables plus utiles passwordForm passwordToSend sauf pour le if
            let passwordForm = {"id": this.userId , "password": this.newPassword}
                console.log('newpassword : '+ passwordForm)
                debugger
                let passwordToSend = JSON.stringify(passwordForm)
                console.log('passwordToSend : '+ passwordToSend)
                if (passwordToSend) {
                    /*
                    const response = await axios.put('auth/account', { // juste login le début de l'url et sans / voir axios.js
                        /*email: this.email,
                        password: this.password,
                        id: this.userId*/
                        /*passwordToSend,
                        headers: {Authorization: 'Bearer ' + localStorage.getItem('Token')}
                    })
                    response 
                    this.$router.push({ name: 'Login' }) // retaper ses informations pour se connecter
                    alert('Veuillez vous reconnecter avec le nouveau mot de passe')
                    console.log(response) // voir utilité d'utiliser un const response ici vu que c'est seulement un put
                    */
                    axios.put('auth/account', { // juste login le début de l'url et sans / voir axios.js
                        //passwordToSend,
                        password: this.newPassword,
                        id: this.userId,
                    })
                        .then(response => console.log('réponse de la modifypassword' + response)) // utilité ??
                        .then(() => this.$router.push({ name: 'Login' })) // retaper ses informations pour se connecter
                        .then(() => alert('Veuillez vous reconnecter avec le nouveau mot de passe'))
                        .catch(error => console.log(error))
                }
        },
        DeleteAccount(){
            console.log('Supprimer mon compte')
            const id = this.user.id // changer si besoin
            console.log( "y'a quoi dans" + id)
            debugger
            if(id == id) { //mettre admin aussi
                axios.delete('http://localhost:5000/api/auth/', {id})
                    .then(() => localStorage.removeItem('Token'))
                    .then(() => localStorage.removeItem('IdUser'))
                    .then(() => localStorage.removeItem('User'))
                    .then(response => console.log('réponse de la delete' + response)) // ou si on utilise par ex header de data : .then(response => this.header = response.data)
                    .then(() => alert('Votre compte a bien été supprimé'))
                    .then(() => this.$router.push({ name: 'Signup' })
                    .catch(error => console.log(error))
            )}
        },
        async ConfirmModifyAccount() {
            //mettre une vérification de l'email et mot de passe avant validation
            console.log('confirmer Modifier mon compte')
            const id = this.user.id // changer si besoin // ou = req.params.id si id dans url
            const userModified = this.userModified
            console.log( "y'a quoi dans id " + id)
            console.log( "y'a quoi dans user modifié " + JSON.stringify(userModified))
            debugger
            const formData = new FormData()
                formData.append('id', id) // ou id tout court
				//formData.append('picture', this.userModified.picture)
				formData.append('firstName', this.userModified.firstName);
				formData.append('lastName', this.userModified.lastName);
				formData.append('department', this.userModified.department);
				formData.append('location', this.userModified.location);
				//formData.append('email', this.email);
				//formData.append('password', this.password);

                try {
					await axios.put('http://localhost:5000/api/auth/', formData)
				} catch (error) {
					console.log(error)
				}
        }
    },
}
</script>

<style>

</style>