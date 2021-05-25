<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Page d'accueil Groupomania</h1>
    <PostList :posts="posts" />
  </div>
</template>

<script>
import { ref } from 'vue'
import PostList from '../components/PostList.vue'
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: { PostList },
  setup() {
    const posts = ref([
      { title: "welcome to the blog", dateContent: "24 05 2021", url: "url1.fr" , body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in imperdiet nisi. Vestibulum eu dui dictum, ornare est non, dignissim dui. Donec at ex nulla. Aenean sem tortor, bibendum ac accumsan vel, elementum vel turpis. Nam auctor egestas pulvinar. Aenean placerat finibus finibus. Praesent dictum velit at purus aliquam, sit amet mattis est molestie. Duis a nulla et mauris luctus feugiat nec cursus odio. Nam elementum vitae est eu porttitor. Nulla vestibulum gravida magna eu ultricies. Nunc posuere tincidunt pellentesque. Sed id condimentum nisl, ultricies viverra orci. Fusce sit amet massa ut nibh feugiat elementum ac id est.", id: 1,},
      { title: "top 5 CSS tips", dateContent: "25 05 2021", url: "url2.fr", body: "lorem ipsumfefeeffef trtr trtrtrt trtr t rttr rtrt", id: 2 },
      { title: "Vue ou React", dateContent: "25 05 2021", url: "url3.fr", body: "lorem ipsum efeff", id: 3 },
      { title: "Bootstrap v5", dateContent: "26 05 2021", url: "url4.fr", body: "lorem ipsum", id: 4 },
    ])

    return { posts }
  }
}
</script>
