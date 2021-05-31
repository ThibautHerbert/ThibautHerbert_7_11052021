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
                        <img src="" alt="icône j'aime le post">
                        <button class="btn btn-success" @click="likePost">J'aime</button>
                    </div>
                    <div class="mx-3">
                        <img src="" alt="icône commenter le post">
                        <button class="btn btn-info" @click="writeComment">Ecrire un commentaire</button>
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