<template>
    <div>
        <button class="btn btn-primary my-2" @click="togglePost"> 
            <span v-if="showCreatePost" class="text-white">Ne pas publier de post</span>
            <span v-else class="text-white">Publier un nouveau post</span>  
        </button>
    
        <div v-if="showCreatePost">
            <WritePost @closePost="togglePost"/>
        </div>
    
        <div v-for="post in posts" :key="post.id">
            <SinglePost :post="post" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import SinglePost from './SinglePost.vue'
import WritePost from './WritePost.vue'
//import ModifyPost from './ModifyPost.vue'
import WriteComment from './WriteComment.vue'

export default {
    name: 'PostList',
    props: ['posts'], // si j'enlève le props posts tous les posts disparaissent du navigateur, le style et le html ci dessous
    components: { SinglePost, WritePost, WriteComment }, // si j'enlève le component SinglePost le contenu de la bdd disparait 
    data() {
        return {
            showCreatePost: false,
            Comments : [], 
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
        showComment() {
            console.log('show a comment')
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




<style scoped>
img{
    width: 40px;
    height: 40px;
}

</style>