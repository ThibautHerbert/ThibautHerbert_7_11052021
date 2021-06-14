<template>
    <div> 
        <div v-if="user">
            <h2>Bienvenue sur ton compte : {{user.firstName}}</h2>
            <div class="d-flex flex-wrap justify-content-center align-items-center">
                <div class="col-md-4 presentation"><img src="../assets/images/pexels-monstera-6373931-1000px.jpg" alt="carte de présentation"></div>
                <div class="col-md-4 accountDetails my-2 pb-2 my-account">
                    <h1>Mon compte</h1>
                    <div class="d-flex justify-content-around ">
                        <ul class="list-group text-start">
                            <li class="list-group-item d-flex">Prénom : {{user.firstName}}</li>
                            <li class="list-group-item d-flex">Nom  : {{user.lastName}} </li>
                            <li class="list-group-item d-flex ">Département  : {{user.department}}</li>
                            <li class="list-group-item d-flex">Lieu de travail  : {{user.location}}</li>
                            <li class="list-group-item d-flex">Mail  : {{user.email}}</li>
                        </ul>
                        <div>
                            <label class=" p-1 d-flex">Image de profil  :</label>
                            <img :src="url + user.picture" alt="photo de profil" id="PicProfile" class="rounded-circle">
                        </div>
                    </div>
                </div>
            </div>
           
            <div class="my-3 d-flex justify-content-center">
                <button class="btn btn-modify mx-1" @click="modifyAccount">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                    Modifier mon compte</button>
                <button class="btn btn-delete mx-1" @dblclick="deleteAccount">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash " viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                    Supprimer mon compte</button>
                <button class="btn btn-secondary btn-password mx-1" @click="modifyPassword">
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
                        <label for="firstNameInput" class="errorLabel">Mon Prénom : </label>
                        <input type="text" class="form-control error" id="firstNameInput" aria-describedby="firstNameHelp" placeholder="{{ user.firstName}} Modifiez votre prénom." required v-model="user.firstName">
                        <small id="firstNameHelp" class="form-text text-muted errorText"> Modifiez votre prénom.</small>
                    </div>
                    <div class="form-group col-md-7 mx-auto">
                        <label for="lastNameInput">Nom : </label>
                        <input type="text" class="form-control" id="lastNameInput" aria-describedby="lastNameHelp" placeholder="Durand" required v-model="user.lastName">
                        <small id="lastNameHelp" class="form-text text-muted"> Modifiez votre nom de famille.</small>
                    </div>
                    <div class="form-group col-md-7 mx-auto">
                        <label for="departmentSelect"> Dans quel département ? {{ user.department}}</label>
                        <select name="department" class="form-select" aria-label="Choix du département" required id="departmentSelect" v-model="user.department">
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
                        <label for="locationSelect">Dans quel bureau es-tu ? </label>
                        <select name="location" class="form-select" id="locationSelect" required v-model="user.location">
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
                    <button class="btn btn-danger" @click="confirmModifyAccount">Confirmer les modifications du compte</button>
                </div>
            </div>
            <!--modifier le mdp -->
            <div class="col-sm-6 blockForm mx-auto pt-2" v-if="showModifyPassword">
                <h3>Changer mon mot de passe</h3>
                <div class="form-group col-md-5 mx-auto">
                    <label for="countryInput"> Ancien mot de passe : </label>
                    <input type="text" class="form-control" id="countryInput" aria-describedby="countryHelp" placeholder="..." required v-model="oldPassword"> 
                    <small id="countryHelp" class="form-text text-muted"> Indiquez votre ancien mot de passe.</small>
                    <div class="errorDiv" v-if="passwordError"><span> {{ passwordError }} </span></div>
                </div>
                <div class="form-group col-md-5 mx-auto">
                    <label for="countryInput"> Nouveau mot de passe : </label>
                    <input type="text" class="form-control" id="countryInput" aria-describedby="countryHelp" placeholder="...de plus de 7 caractères" required v-model="newPassword"> 
                    <small id="countryHelp" class="form-text text-muted"> Indiquez un nouveau mot de passe.</small>
                    <div class="errorDiv" v-if="passwordError"><span> {{ passwordError }} </span></div>
                </div>
                <button class="btn btn-success my-5" id="confirmNewPassword" @click="confirmModifyPassword"> Confirmer le nouveau mot de passe</button>
            </div>
        </div>
        <div v-else>
            <Login />
        </div>
    </div> 
</template>

<script>
import axios from 'axios'
import Login from './Login.vue'

export default {
    components: {Login},
    data() {
        return {
            showModifyAccount: false,
            showModifyPassword: false,
            url: 'http://localhost:5000/images/',
            user : {},
            oldPassword: this.oldPassword,
            newPassword : this.newPassword
        }
    },
    mounted() {
        this.user.picture = this.$root.logged.picture
        this.user.firstName = this.$root.logged.firstName
        this.user.lastName = this.$root.logged.lastName
        this.user.department = this.$root.logged.department
        this.user.location = this.$root.logged.location
        this.user.email = this.$root.logged.email

       
    },
    methods: {
        modifyAccount() {
            console.log('Modifier mon compte')
            this.showModifyAccount = !this.showModifyAccount
        },
        modifyPassword() {
            console.log('clic sur Modifier mon mot de passe')
            this.showModifyPassword = !this.showModifyPassword
        },
        confirmModifyPassword() {
            if (this.newPassword) {
                axios.put('auth/account', {
                    password: this.newPassword
                    })
                        .then(() => this.$router.push({ name: 'Login' })) // retaper ses informations pour se connecter
                        .then(() => alert('Veuillez vous reconnecter avec le nouveau mot de passe'))
                        .then(() => this.modifyPassword())
                        .catch(error => console.log(error))
                }
        },
        deleteAccount(){
            console.log('Supprimer mon compte')
            //const idDelete = this.$root.logged.id // changer si besoin
            //if(idDelete) { //mettre admin aussi
            try {
                axios.delete('auth/')
                .then(() => localStorage.removeItem('Token'))
                
                .then(() => location.reload())
                .then(() => this.$router.push({ name: 'Signup' }))
                .then(() => alert('Votre compte a bien été supprimé'))
                .catch(error => console.log(error))
            } catch (error) {
				console.log(error)
			}
        },
        confirmModifyAccount() {
            console.log('confirmer Modifier mon compte')
            const formData = new FormData()
				//formData.append('picture', refs.img) // comment utiliser les refs ?
				formData.append('firstName', this.user.firstName);
				formData.append('lastName', this.user.lastName);
                formData.append('location', this.user.location);
				formData.append('department', this.user.department);

                try {
					 axios.post('auth/profile', {"firstName":this.user.firstName, "lastName":this.user.lastName, "location": this.user.location, "department": this.user.department})
                     .then(() => alert('profil modifié'))
                     .then(() => this.modifyAccount())
                     //.then(() => location.reload())
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
    max-width: 350px;
}
.presentation img{
    max-width: 100%;
    height: 200px;
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