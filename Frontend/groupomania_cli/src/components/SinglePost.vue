<template>
<div>
  <div v-if="showModifyPost">
    <ModifyPost :post="post" @closePost="toggleModifyPost" />
  </div>
  <div class="post container mt-4" v-if="post.isModerated== 0">
    <div class="media ">
      <div class="d-flex">
        <div><img :src= "url + post.user_picture" class="d-flex justify-content-start m-1 rounded-circle PicProfile" alt="photo du créateur du post"></div>
        <div class="media-body  flex-grow-1 ">
          <router-link :to="{ name: 'PostDetails', params: { id: post.id }}" class="router-link">
            <h5 class="mt-0 mx-2 text-start"> {{post.user_name}} de la Team {{post.user_location}} a publié :</h5>
          </router-link>
        </div>
        <div class="mt-1">
          <button @click="toggleModifyPost" class="btn btn-success align-self-end" v-show="$root.logged.id == post.idUser ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                      </svg>
            </button>
          <button @click="deletePost(), onDeletePost()" class="btn btn-danger justify-end m-1" v-show="$root.logged.id == post.idUser ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
          </button>
          <button @click="moderatePost(), onModerationPost()" class="btn btn-warning justify-end m-1" v-show="$root.logged.isAdmin == 1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="justify-content-start">
        <p class="text-start mx-2">{{ post.body }}</p>
        <div v-if="post.picture === 'NULL'"></div>
        <div class="mx-auto" v-else> 
          <a :href="url + post.picture"><img :src="url + post.picture" alt="image publiée par post.user_name" class="img-posted"></a>
        </div>
        
        <p class="bg-light border" v-if="post.url"> Lien : <a href="{{ post.url }}">{{ post.url }}</a></p>
        <p class="text-end creationDate-post px-1"> Publié le {{ post.formattedDate }}</p>
      </div>
      <div class="">
        <div class="mx-3 text-start d-flex flex-wrap"  >
          <button class=" border rounded-pill m-1 btn-like d-flex justify-content-around align-items-center" @click="interestedPost" :class="{ isInterested: isInterested }">
              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="lightbulb" class="svg-inline--fa fa-lightbulb fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="white" d="M176 80c-52.94 0-96 43.06-96 96 0 8.84 7.16 16 16 16s16-7.16 16-16c0-35.3 28.72-64 64-64 8.84 0 16-7.16 16-16s-7.16-16-16-16zM96.06 459.17c0 3.15.93 6.22 2.68 8.84l24.51 36.84c2.97 4.46 7.97 7.14 13.32 7.14h78.85c5.36 0 10.36-2.68 13.32-7.14l24.51-36.84c1.74-2.62 2.67-5.7 2.68-8.84l.05-43.18H96.02l.04 43.18zM176 0C73.72 0 0 82.97 0 176c0 44.37 16.45 84.85 43.56 115.78 16.64 18.99 42.74 58.8 52.42 92.16v.06h48v-.12c-.01-4.77-.72-9.51-2.15-14.07-5.59-17.81-22.82-64.77-62.17-109.67-20.54-23.43-31.52-53.15-31.61-84.14-.2-73.64 59.67-128 127.95-128 70.58 0 128 57.42 128 128 0 30.97-11.24 60.85-31.65 84.14-39.11 44.61-56.42 91.47-62.1 109.46a47.507 47.507 0 0 0-2.22 14.3v.1h48v-.05c9.68-33.37 35.78-73.18 52.42-92.16C335.55 260.85 352 220.37 352 176 352 78.8 273.2 0 176 0z">
              </path></svg>
              <span v-if="post.isInterested > 0" class="text-white number">{{post.isInterested}}</span>  Intéressant  </button>
          <button class="btn-like border rounded-pill m-1" @click="likePost">
              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="laugh-beam" class="svg-inline--fa fa-laugh-beam fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="white" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm141.4 389.4c-37.8 37.8-88 58.6-141.4 58.6s-103.6-20.8-141.4-58.6S48 309.4 48 256s20.8-103.6 58.6-141.4S194.6 56 248 56s103.6 20.8 141.4 58.6S448 202.6 448 256s-20.8 103.6-58.6 141.4zM328 152c-23.8 0-52.7 29.3-56 71.4-.7 8.6 10.8 11.9 14.9 4.5l9.5-17c7.7-13.7 19.2-21.6 31.5-21.6s23.8 7.9 31.5 21.6l9.5 17c4.1 7.4 15.6 4 14.9-4.5-3.1-42.1-32-71.4-55.8-71.4zm-201 75.9l9.5-17c7.7-13.7 19.2-21.6 31.5-21.6s23.8 7.9 31.5 21.6l9.5 17c4.1 7.4 15.6 4 14.9-4.5-3.3-42.1-32.2-71.4-56-71.4s-52.7 29.3-56 71.4c-.6 8.5 10.9 11.9 15.1 4.5zM362.4 288H133.6c-8.2 0-14.5 7-13.5 15 7.5 59.2 58.9 105 121.1 105h13.6c62.2 0 113.6-45.8 121.1-105 1-8-5.3-15-13.5-15z">
              </path></svg>
              Drôle</button>
          <button class="btn-like border rounded-pill m-1" @click="likePost">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="child" class="svg-inline--fa fa-child fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="white" d="M120 72c0-39.765 32.235-72 72-72s72 32.235 72 72c0 39.764-32.235 72-72 72s-72-32.236-72-72zm254.627 1.373c-12.496-12.497-32.758-12.497-45.254 0L242.745 160H141.254L54.627 73.373c-12.496-12.497-32.758-12.497-45.254 0-12.497 12.497-12.497 32.758 0 45.255L104 213.254V480c0 17.673 14.327 32 32 32h16c17.673 0 32-14.327 32-32V368h16v112c0 17.673 14.327 32 32 32h16c17.673 0 32-14.327 32-32V213.254l94.627-94.627c12.497-12.497 12.497-32.757 0-45.254z">
              </path></svg>
              Bravo</button>
          <button class="btn-like border rounded-pill m-1" @click="likePost">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="people-carry" class="svg-inline--fa fa-people-carry fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="white" d="M128 96c26.5 0 48-21.5 48-48S154.5 0 128 0 80 21.5 80 48s21.5 48 48 48zm384 0c26.5 0 48-21.5 48-48S538.5 0 512 0s-48 21.5-48 48 21.5 48 48 48zm125.7 372.1l-44-110-41.1 46.4-2 18.2 27.7 69.2c5 12.5 17 20.1 29.7 20.1 4 0 8-.7 11.9-2.3 16.4-6.6 24.4-25.2 17.8-41.6zm-34.2-209.8L585 178.1c-4.6-20-18.6-36.8-37.5-44.9-18.5-8-39-6.7-56.1 3.3-22.7 13.4-39.7 34.5-48.1 59.4L432 229.8 416 240v-96c0-8.8-7.2-16-16-16H240c-8.8 0-16 7.2-16 16v96l-16.1-10.2-11.3-33.9c-8.3-25-25.4-46-48.1-59.4-17.2-10-37.6-11.3-56.1-3.3-18.9 8.1-32.9 24.9-37.5 44.9l-18.4 80.2c-4.6 20 .7 41.2 14.4 56.7l67.2 75.9 10.1 92.6C130 499.8 143.8 512 160 512c1.2 0 2.3-.1 3.5-.2 17.6-1.9 30.2-17.7 28.3-35.3l-10.1-92.8c-1.5-13-6.9-25.1-15.6-35l-43.3-49 17.6-70.3 6.8 20.4c4.1 12.5 11.9 23.4 24.5 32.6l51.1 32.5c4.6 2.9 12.1 4.6 17.2 5h160c5.1-.4 12.6-2.1 17.2-5l51.1-32.5c12.6-9.2 20.4-20 24.5-32.6l6.8-20.4 17.6 70.3-43.3 49c-8.7 9.9-14.1 22-15.6 35l-10.1 92.8c-1.9 17.6 10.8 33.4 28.3 35.3 1.2.1 2.3.2 3.5.2 16.1 0 30-12.1 31.8-28.5l10.1-92.6 67.2-75.9c13.6-15.5 19-36.7 14.4-56.7zM46.3 358.1l-44 110c-6.6 16.4 1.4 35 17.8 41.6 16.8 6.6 35.1-1.7 41.6-17.8l27.7-69.2-2-18.2-41.1-46.4z">
              </path></svg>
              Solidaire</button>
          <div class="flex-row justify-content-end">
            <button class="btn btn-outline-primary border rounded align-self-center m-1 comment" @click="toggleComment">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-text" viewBox="0 0 16 16">
                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                </svg>
                <span v-if="showCreateComment"> Ne pas publier de commentaire</span>
                <span v-else> Ecrire un commentaire </span>  
            </button>
          </div>   
        </div>   
      </div>
    </div>
  </div> 
  <div v-else> 
    <div v-show="$root.logged.isAdmin == 1 && post.body"> 
      <div class="media-moderated container">
        <p class="fw-bold fw-light fs-5 mt-2">Le post n°{{ post.id }} dont l'idUser est :{{post.idUser}} a été modéré </p>
        <p class="text-center mx-2">{{ post.body }}</p>
        <p class="bg-light border" v-if="post.url"> lien : <a href="{{ post.url }}">{{ post.url }}</a></p>
        <p class="text-end creationDate-post px-1"> Publié le : {{ post.formattedDate }}</p>
        <button @click="deModeratePost(), onDeModerationPost()" class="btn btn-warning justify-end m-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
          </svg>
          Retirer la modération
        </button>
      </div>
    </div>
  </div>
  <div v-if="showCreateComment">
    <WriteComment :post="post" @closeComment="toggleComment" @newCommentTriggered="newComment" />
  </div>
  <div v-if="comments.length" class="my-2">
                        <!--début de la boucle des commentaires-->
   <div v-for="comment in comments" :key="comment.id">
      <div v-if="comment.idPost == post.id">
        <SingleComment :comment="comment" :post="post" @deleteCommentTriggered="onDeleteComment" @moderationCommentTriggered="onModerationComment" @deModerationCommentTriggered="onDeModerationComment" />
      </div>
    </div>
  </div>

</div>
</template>

<script>
import { computed } from 'vue'
import axios from 'axios'
import ModifyPost from './ModifyPost.vue'
import WriteComment from './WriteComment.vue'
import SingleComment from './SingleComment.vue'

export default {
  components: { ModifyPost, SingleComment, WriteComment },
  props: ['post', 'comments'],
  data() {
      return {
        showModifyPost: false,
        showCreateComment: false,
        url : "http://localhost:5000/images/",
        isInterested:false,
        idUserPost:this.post.idUser,
        idUserComment:'',
      }
  },
  methods: {
    toggleModifyPost() {
      this.showModifyPost = !this.showModifyPost
    },
    deletePost() {
      try {
        const id = this.post.id
        console.log('id' + id)
          axios.delete('posts/' + id) // /posts/
              .then(() => console.log('post supprimé'))
              .then(response => response.json())
              //.then(() => this.$router.push({ name: 'Posts' })
              .catch( err => console.log(err))
      } catch (error) {
      console.log(error)
      }         
    },
    onDeletePost() { // méthode emit pour retirer le post supprimé au niveau grand parent (Posts), parent (PostList)
      this.$emit('deletePostTriggered')
    },
    moderatePost() {
      if(this.post.body) {
				const isModerated = 1
				const formData = new FormData()
				formData.append('isModerated', isModerated)
        formData.append('id', this.post.id);
        try {
          axios.post('posts/moderate', {"isModerated": 1, "id": this.post.id})
            .then(() => console.log('post modéré'))
            .catch( err => console.log(err))
        } catch (error) {
        console.log(error)
				}         
	    }
    },
    onModerationPost() { // méthode emit pour mettre la modération du post au niveau grand parent (Posts), parent (PostList)
      this.$emit('moderationPostTriggered')
    },
    deModeratePost() {
      let moderatePost = {"isModerated": 0, "id": this.post.id}
      try {
        axios.post('posts/moderate', moderatePost) // /posts/
          .then(() => console.log("le post a cessé d'être modéré"))
          .catch( err => console.log(err))
      } catch (error) {
      console.log(error)
      }         
    },
    onDeModerationPost() { // méthode emit pour retirer la modération du post au niveau grand parent (Posts), parent (PostList)
      this.$emit('deModerationPostTriggered')
    },
    toggleComment() {
      this.showCreateComment = !this.showCreateComment
    },
    interestedPost() {
      console.log('click intéressant')
      this.isInterested = !this.isInterested
      if( this.isInterested ){ // au clic this.isInterested devient true alors rajoute +1
        try { 
          console.log('+1')
          axios.post('posts/interested', {"isInterested": 1, "id": this.post.id})
            .then(() => console.log('post déclaré intéressant'))
            .catch( err => console.log(err))
          axios.post('interested/user/like', {"idPost":this.post.id}) //idUser récupérer via req.user en backend
            .then(() => console.log('idUser ajouté à la table intéressant avec le numéro du Post'))
            .catch( err => console.log(err))
        } catch (error) {
        console.log(error)
				}  
      } else {  // au clic this.isInterested devient false alors retire 1
          try { 
            console.log('-1')
            // retirer 1 à isInterested :
            axios.post('posts/interested', {"isInterested": 1, "id": this.post.id})
              .then(() => console.log(" le post n'est plus déclaré intéressant "))
              .catch( err => console.log(err))
            // supprimer le rang de la table isInterestedToPost :
            axios.post('interested/user/unlike', {"idPost": this.post.id})
              .then(() => console.log('idUser supprimé de la table intéressant avec le numéro du Post'))
              .catch( err => console.log(err))
          } catch (error) {
          console.log(error)
          }  
      } 
    },
    newComment() { // méthode emit pour actualiser les commentaires au niveau grand parent (PostList), enfant (WriteComment)
      this.$emit('newCommentTriggered')
    },
    onDeleteComment() { // méthode emit pour retirer le commentaire au niveau grand parent (PostList), enfant (SingleComment)
      this.$emit('deleteCommentTriggered')
    },
    onModerationComment() { // méthode emit pour mettre la modération du commentaire au niveau grand parent (PostList), enfant (SingleComment)
          this.$emit('moderationCommentTriggered')
      },
    onDeModerationComment() { // méthode emit pour retirer la modération du post au niveau grand parent (PostList), enfant (SingleComment)
          this.$emit('deModerationCommentTriggered')
      },
  },
}
</script>

<style >

.media{
  border:#2d3F5d solid 5px;
  border-radius: 10px;
}
.media-moderated{
  border:#D1515A solid 5px;
  border-radius: 10px;
}
h5{
  font-family: 'Quicksand-SemiBold', 'Roboto', sans-serif;
  color:#D1515A;
}
.router-link{
  text-decoration: none;
  color:#D1515A;
  padding: 0.5rem 1rem;
}
.btn{
  font-family: 'Montserrat', 'Roboto', sans-serif;
}
.comment span {
  font-family: 'Quicksand-SemiBold', 'Roboto', sans-serif;
  font-size: .8em; 
}
.PicProfile{
    height: 70px;
    width: 70px;
    min-width: 70px;
    object-fit: cover;  
}
.media-body{
  color: white;
}
.img-posted{
  max-width: 80%;
  max-height: 40rem;
  object-fit: cover;
  object-position: 20% 20%; /* vérifier intérêt et efficacité*/
}
.creationDate-post{
  font-size: 0.7em;
}
.svg-inline--fa{
  width: 15px;
  height: 15px;
}
.number{
  margin: 3px;
}
.btn-like{
  background: #2D3F5D;
  color: white;
}
.isInterested,
.btn-like:hover{
  background: #198754;
  color: white;
}
@keyframes interested {
    0%{
        transform: translateY(10px);
        transform: scale(1);
    }
    40%{
        transform: scale(1.5);
    }
    80%{
        transform: translateY(-30px);
        transform: scale(1.3);
    }
    100%{
        transform: translateY(-20px);
        transform: scale(1.5);
    }
}
.btn-like:hover > .svg-inline--fa{
  animation: interested 700ms ease-in forwards;
}

</style>