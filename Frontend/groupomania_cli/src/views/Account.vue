<template>
    <div> 
        <div>
            <h2>Bienvenue sur ton compte : {{userConnected[0].firstName}}</h2>
            <div class="row justify-content-center">
                <div class="col-md-4 "><img src="../assets/images/pexels-monstera-6373931-1000px.jpg" alt="carte de présentation"></div>
                <div class="col-md-4 accountDetails pb-2">
                    <h1>Mon compte</h1>
                    <div class="d-flex justify-content-around ">
                        <ul class="list-group text-start">
                            <li class="list-group-item d-flex">Prénom : {{userConnected[0].firstName}}</li>
                            <li class="list-group-item d-flex">Nom  : {{userConnected[0].lastName}} </li>
                            <li class="list-group-item d-flex ">Département  : {{userConnected[0].department}}</li>
                            <li class="list-group-item d-flex">Lieu de travail  : {{userConnected[0].location}}</li>
                            <li class="list-group-item d-flex">Mail  : {{userConnected[0].email}}</li>
                            
                        </ul>
                        <div>
                            <label class=" p-1 d-flex">Image de profil  :</label>
                            <img src="../assets/images/pexels-cottonbro-5474028.jpg " alt="photo de profil" id="PicProfile" class="rounded-circle">
                        </div>
                        
                    </div>
                </div>
            </div>
           
            <div class="my-3 d-flex justify-content-center">
                <button class="btn btn-modify mx-1" @click="ModifyAccount">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                    Modifier mon compte</button>
                <button class="btn btn-delete mx-1" @dblclick="DeleteAccount">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash " viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                    Supprimer mon compte</button>
                <button class="btn btn-secondary btn-password mx-1" @click="ModifyPassword">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-unlock" viewBox="0 0 16 16">
                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"/>
                    </svg>
                    Changer mon mot de passe</button>
            </div>
            
            <!--modifier le compte -->
            <div> 
                <div class="iconTop mx-auto"> 
                            <img src="../assets/Logos/icon.png" class="img-fluid" alt="logo Groupomania">
                </div>
                <div class="col-sm-6 blockForm mx-auto py-2" v-if="showModifyAccount">
                    <h3>Modifier mes informations</h3>
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
            <div class="col-sm-6 blockForm mx-auto pt-2" v-if="showModifyPassword">
                <h3>Changer mon mot de passe</h3>
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
            userConnected : [{
                firstName: '',
                lastName: '',
                department: '',
                location: '',
                picture: '',
                email: '' ,
                id: ''
            }],
            userModified : {
                picture: this.picture,
				firstName: this.firstName,
				lastName: this.lastName,
				department: this.department,
				location: this.location,
                //mail: this.mail,
                //password: this.password
            },
            //userId: JSON.parse(localStorage.getItem('IdUser')),
            newPassword : this.newPassword
        }
    },
    created() {
    this.user = JSON.parse(localStorage.getItem('User'))
    //console.log('user est : ' + user)
    //this.userId = 
    //console.log('userId est : ' + userId)
    axios.get('/auth') // récupère l'utilisateur connecté
      .then(response => this.userConnected = response.data)
      .then(response => console.log(response)) // ou si on utilise par ex header de data : .then(response => this.header = response.data)
      .catch(error => console.log(error))
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
            const id = this.userConnected[0].id // changer si besoin
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
            //mettre une vérification de l'email et mot de passe avant validation ?
            console.log('confirmer Modifier mon compte')
            const id = this.userConnected[0].id // changer si besoin // ou = req.params.id si id dans url
            const userModified = this.userModified
            console.log( "y'a quoi dans id " + id)
            console.log( "y'a quoi dans user modifié " + JSON.stringify(userModified))
            
            
            const formData = new FormData()
                formData.append('id', this.userConnected[0].id) // ou id tout court
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

<style scoped>
.accountDetails{
    border:#162846 solid 5px;
}
img{
    max-width: 100%;
}
#PicProfile{
    height: 150px;
    width: 150px;
    object-fit: cover;  
}
.btn-delete{
    background: #D1515A;
    font-weight: bold;
}
.btn-modify{
    background: #162846;
    font-weight: bold;
    color: white;
}
.btn-password{
    font-weight: bold;
}

.list-group{
    max-width: 50%;
    
}
</style>