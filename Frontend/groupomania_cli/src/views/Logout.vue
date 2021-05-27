<template>
  
</template>

<script>
export default {
// supprimer le token pour se déconnecter
    methods: {
        logout() {
            //mettre un if loggedIn :
            localStorage.removeItem('Token');
            //renvoyer vers page de connexion
            //.then(() => this.$router.push({ name: 'Login' })
        }
    }
}
</script>

<style lang=scss>

</style>