<script>
import axios from 'axios'
//import { defineComponent } from '@vue/composition-api'
import SinglePost from './SinglePost.vue'
import WritePost from './WritePost.vue'
//import ModifyPost from './ModifyPost.vue'
import WriteComment from './WriteComment.vue'

export default {
    props: ['posts'], // si j'enlève le props posts tous les posts disparaissent du navigateur, le style et le html ci dessous
    components: { SinglePost, WritePost, WriteComment }, // si j'enlève le component SinglePost le contenu de la bdd disparait 
    data() {
        return {
            showCreatePost: false,
            Comment : [{ // données sur les commentaires
                id: '',
                idUser: '',
                idPost:'',
                body: '',
                creationDate: '',
                isModerated: '' ,
            }], 
            userComment : [{ //données sur les utilisateurs qui ont commentés
                firstName: '',
                lastName: '',
                department: '',
                location: '',
                picture: '',
                email: '' ,
                id: ''
            }],

        }
    },
    methods: {
        togglePost() {
            console.log('create Post ouvre un espace pour écrire un post')
            this.showCreatePost = !this.showCreatePost
        },
        /*confirmCreatePost() {
            console.log('add Post in db')
        },*/
        /*closeWritingPost() {
            this.$emit('closePost')
        },*/
        writeAComment() {
            console.log('write a comment')
        },
        /*likePost(){
            console.log('like a post')
        }*/
    },
    setup(props) {
        console.log(props.posts)
    }
        
}
</script>

<template>
    <div>
        <button class="btn btn-primary my-2" @click="togglePost"> 
            <span v-if="showCreatePost" class="text-white">Ne pas publier de post</span>
            <span v-else class="text-white">Publier un nouveau post</span>  
        </button>
    
        <div v-if="showCreatePost">
            <WritePost />
        </div>
    
        <div v-for="post in posts" :key="post.id">
            <SinglePost :post="post" />
            <div class="">
                <div class="d-flex justify-content-end mx-3 ">
                    <div class="mx-3">
                        <button class="btn btn-outline-secondary border rounded m-1" @click="writeAComment">
                            
                        Afficher les commentaires</button>
                    </div>
                </div>
                <div>
                    <div class="card mx-auto" style="width: 80%;">
                        <div class="card-body bg-light ">
                            <div class="d-flex">
                                <img src="../assets/images/pexels-cottonbro-5473950-300px.jpg" class="d-flex justify-content-start m-1 rounded-circle PicProfile" alt="photo du commentateur du post">
                                <h5 class="card-title mx-3">Nom du commentateur</h5>
                            </div>
                            <p class="card-text">Bravo pour cet effort ! Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <div class="text-end">
                                <button class="btn btn-outline-secondary ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-chat-text" viewBox="0 0 16 16">
                                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                                    <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                    Répondre</button>
                            </div>
                            
                        </div>
                    </div>
                </div>    
                    
            </div>
            <br>
        </div>
    </div>
</template>


<style scoped>
img{
    width: 40px;
    height: 40px;
}

</style>