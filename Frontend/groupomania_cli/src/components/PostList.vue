<template>
    <div>
        <button class="btn btn-primary my-2" @click="togglePost"> 
            <span v-if="showCreatePost" class="text-white">Ne pas publier de post</span>
            <span v-else class="text-white">Publier un nouveau post</span>  
        </button>
        <div v-if="showCreatePost">
            <WritePost @closePost="togglePost" @newPostTriggered="newPost" />
        </div>
        <div v-for="post in posts" :key="post.id">
            <SinglePost :post="post" :comments="comments"  @newCommentTriggered="getComments" @deletePostTriggered="onDeletePost" @deleteCommentTriggered="getComments" @moderationPostTriggered="onModerationPost"  @deModerationPostTriggered="onDeModerationPost" @moderationCommentTriggered="getComments" @deModerationCommentTriggered="getComments">  
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
        getComments() {
            axios.get('comments/')
                .then(response => this.comments = response.data)
                .then(response => console.log(response))
                .catch(error => console.log(error))
        },
        newPost() { // méthode emit pour actualiser les posts au niveau grand parent (Posts), enfant (WritePost)
            this.$emit('newPostTriggered')
        },
        onDeletePost() { // méthode emit pour retirer le post supprimé au niveau grand parent (Posts), enfant (SinglePost)
            this.$emit('deletePostTriggered')
        },
        onModerationPost() { // méthode emit pour mettre la modération du post au niveau grand parent (Posts), enfant (SinglePost)
            this.$emit('moderationPostTriggered')
        },
        onDeModerationPost() { // méthode emit pour retirer la modération du post au niveau grand parent (Posts), enfant (SinglePost)
            this.$emit('deModerationPostTriggered')
        },
    },
    mounted() {
        this.getComments();
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