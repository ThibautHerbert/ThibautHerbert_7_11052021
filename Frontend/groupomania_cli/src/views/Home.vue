<template>
  <div class="home">
    <div class="row">
      <div class="col-sm-3 mx-auto">
        <img alt="Groupomania logo" src="../assets/Logos/icon.svg">
      </div>
    </div>
    <h1>Page d'accueil Groupomania</h1>
    <div class="d-flex justify-content-center">
      <img src="{{ user.picture }}" alt="image de profil" class="rounded-circle" width="50">
      <h3 class="mx-3">Bonjour {{ user.firstName}}</h3>
      <p>Team {{ user.location}}</p>
    </div>
    <div>
      <h4>Voici les derniers posts :</h4>
    </div>
    <PostList :posts="posts" />
  </div>
</template>

<script>
import { ref } from 'vue'
import PostList from '../components/PostList.vue'
import axios from 'axios'

// @ is an alias to /src

export default {
  name: 'Home',
  /*data() {
    return {
      user : {
        firstName: '',
    		lastName: '',
    		department: '',
    		location: '',
    		picture: '',
    		email: '' ,
        id: ''
      }
    }
  },*/
  components: { PostList },
  methods: {
    
    
    
  },
  // méthode pour récupérer les données de l'utilisateur, pour l'autorisation avec son token
  /*
  async created() {
    const response = await axios.get('user', { // pour le moment moi je ne récupère pas le user mais ça serait mieux en effet ?
      /*headers: {
        Authorization: 'bearer ' + localStorage.getItem('Token')
      }
    })
  },
  */
  created() {
    this.user = JSON.parse(localStorage.getItem('User'))
    //console.log('user est : ' + user)
  },
  /*
  mounted() {
      console.log('localstorage user : ' + localStorage.getItem('User'))
      const UserId = localStorage.getItem('User')
      this.user = UserId
      console.log('userId est : ' + userId)
      console.log('user est : ' + user)
  },
  */
  // setup pour tester les bindings
  setup() {/*
    const posts = ref([
      { creationDate: "24 05 2021", url: "url1.fr" , body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in imperdiet nisi. Vestibulum eu dui dictum, ornare est non, dignissim dui. Donec at ex nulla. Aenean sem tortor, bibendum ac accumsan vel, elementum vel turpis. Nam auctor egestas pulvinar. Aenean placerat finibus finibus. Praesent dictum velit at purus aliquam, sit amet mattis est molestie. Duis a nulla et mauris luctus feugiat nec cursus odio. Nam elementum vitae est eu porttitor. Nulla vestibulum gravida magna eu ultricies. Nunc posuere tincidunt pellentesque. Sed id condimentum nisl, ultricies viverra orci. Fusce sit amet massa ut nibh feugiat elementum ac id est.", id: 1,},
      { creationDate: "25 05 2021", url: "url2.fr", body: "lorem ipsumfefeeffef trtr trtrtrt trtr t rttr rtrt", id: 2 },
      { creationDate: "25 05 2021", url: "url3.fr", body: "lorem ipsum efeff", id: 3 },
      { creationDate: "26 05 2021", url: "url4.fr", body: "lorem ipsum", id: 4 },
    ])
    */
   /*
    const user = ref ([ ])
    const error = ref(null)

    const userStorage = async () => {
      try {
        let data = await localStorage.getItem('User')
        console.log('data is : ' + data)
        if (!data.ok) {
          throw Error('aucune donnée disponible')
        }
        user.value = await data.json()
      }
      catch (err) {
        error.value = err.message
        console.log(error.value)
      }
    }
    */
    /*
    const user = ref([
      {
        firstName: 'prénom',
    		lastName: '',
    		department: '',
    		location: '',
    		picture: '',
    		email: '' ,
        password:'',
        id: ''
      }
    ])

    return {  user }*/
  }
}
</script>
<style scoped>

</style>
