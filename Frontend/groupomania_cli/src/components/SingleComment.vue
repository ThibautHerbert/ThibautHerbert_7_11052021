<template>
    <div class="mx-auto">
        <div  v-if="comment.isModerated== 0">
            <div v-if="showModifyComment">
                <ModifyComment :post="post" :comment="comment" @closeComment="toggleModifyComment"/>
            </div>
            <div class="card mx-auto" style="width: 80%;" v-show="comment.idPost == post.id">
                <div class="card-body bg-light ">
                    <div class="d-flex">
                        <img :src="url + comment.user_picture" class="d-flex justify-content-start m-1 rounded-circle PicProfileComment" alt="photo du commentateur du post" >
                        <h5 class="card-title mx-3 d-flex flex-grow-1 ">{{comment.user_name}} de la Team {{ comment.user_location}} a commenté :</h5>
                        <div class="mt-1">
                        <button @click="toggleModifyComment" class="btn btn-success btn-sm align-self-end" v-show="$root.logged.id == comment.idUser ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="white" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                        </button>
                        <button @click="deleteComment(), onDeleteComment()" class=" btn btn-danger btn-sm justify-end m-1" v-show="$root.logged.id == comment.idUser ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="white" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                        </button>
                        <button @click="moderateComment(), onModerationComment()" class="btn btn-warning btn-sm justify-end m-1" v-show="$root.logged.isAdmin == 1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                            </svg>
                        </button>
                        </div>
                    </div>
                    <p class="card-text text-start">{{comment.body}}</p>
                    <p class="text-end creationDate-post px-1"> Publié le {{ comment.formattedDate }}</p>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-show="$root.logged.isAdmin == 1">
                <div class="body-post media-moderated mx-auto " style="width: 80%;">
                    <div class="d-flex mx-1" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-exclamation-octagon" viewBox="0 0 16 16">
                            <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>
                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                        </svg>
                        <p class="fw-bold fw-light fs-5 mt-2 mx-1">Le commentaire n°{{ comment.id }} dont l'idUser est :{{comment.idUser}} a été modéré </p>
                    </div>
                    <p class="text-center mx-2">{{ comment.body }}</p>
                    <p class="text-end creationDate-post px-1"> Publié le : {{ comment.formattedDate }}</p>
                    <button @click="deModerateComment(), onDeModerationComment()" class="btn btn-warning justify-end m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                        </svg>
                        Retirer la modération
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import ModifyComment from './ModifyComment.vue'

export default {
    components: { ModifyComment, },
    props: ['post', 'comment'],
    data() {
        return {
            showModifyComment: false,
            url: 'http://localhost:5000/images/'
        }
    },
    methods: {
        toggleComment() {
            this.showCreateComment = !this.showCreateComment
        },
        toggleModifyComment(){
            this.showModifyComment = !this.showModifyComment
        },
        deleteComment(){
            let deleteComment = {"idUser": this.comment.idUser, "id": this.comment.id, "idPost": this.comment.idPost}
            try {
                const id = this.comment.id
                axios.delete('comments/'+ id) 
                    .then(() => console.log('commentaire supprimé'))
                    .catch( err => console.log(err))
            } catch (error) {
            console.log(error)
            }        
        },
        onDeleteComment() { // méthode emit pour actualiser les commentaires et retirer le commentaire supprimé au niveau grand parent (PostList), parent (SinglePost)
            this.$emit('deleteCommentTriggered')
        },
        moderateComment(){
            let moderateComment = {"isModerated": 1, "id": this.comment.id, idPost: this.comment.idPost}
            try {
                axios.put('comments/moderate', moderateComment) 
                    .then(() => console.log('commentaire modéré'))
                    .catch( err => console.log(err))
            } catch (error) {
                console.log(error)
            }         
        },
        onModerationComment() { // méthode emit pour mettre la modération du commentaire au niveau grand parent (PostList), parent (SinglePost)
            this.$emit('moderationCommentTriggered')
        },
        deModerateComment() {
            let deModerateComment = {"isModerated": 0, "id": this.comment.id, idPost: this.comment.idPost}
            try {
                axios.put('comments/moderate', deModerateComment)
                    .then(() => console.log("le commentaire a cessé d'être modéré"))
                    .catch( err => console.log(err))
            } catch (error) {
                console.log(error)
            }       
        },
        onDeModerationComment() { // méthode emit pour retirer la modération du post au niveau grand parent (Posts), parent (PostList)
            this.$emit('deModerationCommentTriggered')
        },
    }
}
</script>

<style scoped>

.PicProfileComment{
    height: 70px;
    width: 70px;
    min-width: 70px;
    object-fit: cover;
}
</style>>
