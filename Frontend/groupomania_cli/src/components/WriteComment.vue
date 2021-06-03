<template>
  <div> 
        <div class="card-body write-comment mx-auto" >
            <div class="d-flex align-items-center">
                <img src="{{ picture }}" class="d-flex justify-content-start m-1 rounded-circle pic-post" alt="photo du créateur du post">
                <label for="FormControlTextarea1">Commentez !</label>
            </div>
            <div class="form-group ">
                <form>
                    <div>  
                        <textarea class="form-control" id="FormControlTextarea1" rows="3" placeholder="Votre message ici..." v-model="body"></textarea>
                    </div>
                </form>
            </div>
            <div class="d-flex ">
                <button class="btn btn-success" @click="handleSendComment">Publier le commentaire</button>
            </div>
            <div class="d-flex ">
                <button class="btn btn-success" @click="handleModifyComment">Publier la modification</button>
            </div>
            
        </div>
  </div>
</template>

<script>


export default {
    name: 'WriteComment',
    data() {
       return {
        // données pour un nouveau Commentaire
        body:'',
        idUser:'', // id de la personne qui commente
        idPost:'', // id du post commenté
       }
    },
    methods: {
        closeWriteComment() {
            this.$emit('close')
            // rajouter redirection page post ?
        },
        handleSendComment() {

        }
    }
}
</script>

<style>

</style>