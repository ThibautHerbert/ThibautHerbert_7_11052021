<script>
//import { defineComponent } from '@vue/composition-api'
import SinglePost from './SinglePost.vue'

export default {
    props: ['posts'],
    components: { SinglePost },
    setup(props) {
        console.log(props.posts)
    }
        
}
</script>

<template>
    <div>
        <div v-for="post in posts" :key="post.id">
            <SinglePost :post="post" />
            <p>fin du post</p>
            <br>
        </div>
    </div>
</template>


<style lang="sass">

</style>