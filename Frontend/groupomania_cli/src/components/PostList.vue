<script>
//import { defineComponent } from '@vue/composition-api'
import SinglePost from './SinglePost.vue'

export default {
    props: ['posts'],
    components: { SinglePost },
    methods: {
        writeComment() {
            console.log('write a comment')
        },
        likePost(){
            console.log('like a post')
        }
    },
    setup(props) {
        console.log(props.posts)
    }
        
}
</script>

<template>
    <div>
        <div v-for="post in posts" :key="post.id">
            <SinglePost :post="post" />
            <div class="card">
                <div class="d-flex justify-content-start mx-3 ">
                    <div class="mx-3">
                        <img src="" alt="icône expression sur le post">
                        <button class="btn btn-success" @click="likePost">Intéressant</button>
                        <button class="btn btn-success" @click="likePost">Drôle</button>
                        <button class="btn btn-success" @click="likePost">Bravo</button>
                        <button class="btn btn-success" @click="likePost">Solidaire</button>
                    </div>
                    <div class="mx-3">
                        <button class="btn btn-info" @click="writeComment">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                            </svg>
                        Ecrire un commentaire</button>
                    </div>
                </div>
                <div>
                    <p></p>
                    <p>Exemple de commentaire</p>
                </div>    
                    
            </div>
            <p>fin du post</p>
            <br>
        </div>
    </div>
</template>


<style lang="sass">

</style>