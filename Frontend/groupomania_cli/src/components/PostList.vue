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
            
                <SinglePost :post="post" :comments="comments">
                    
                </SinglePost>
            
        
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import SinglePost from './SinglePost.vue'
import WritePost from './WritePost.vue'
import WriteComment from './WriteComment.vue'

export default {
    name: 'PostList',
    props: ['posts'],
    components: { SinglePost, WritePost, WriteComment },
    data() {
        return {
            showCreatePost: false,
            comments : [], 
        }
    },
    methods: {
        togglePost() {
            console.log('create Post ouvre un espace pour écrire un post')
            this.showCreatePost = !this.showCreatePost
        },
        showComment() {
            console.log('show a comment')
        },
        getComments() {
            axios.get('comments/', {"idPost":4})
                .then(response => this.comments = response.data)
                .then(response => console.log(response))
                .catch(error => console.log(error))
        },
    },
    mounted() {
        this.getComments();
        console.log(this.comments.idUser)
    },    
}
</script>

<style scoped>
img{
    width: 40px;
    height: 40px;
}
button span{
    font-family: 'Montserrat', 'Roboto', sans-serif;
}

</style>