import { ref } from 'vue'

const getPosts = () => {
    const posts = ref ([ ])
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch('http://localhost:3000/posts') // mettre le /api pour le vrai backend
        //console.log(data)
        if (!data.ok) {
          throw Error('aucune donnée disponible')
        }
        posts.value = await data.json()
      }
      catch (err) {
        error.value = err.message
        console.log(error.value)
      }
    }
    return { posts, error, load } // retourne les valeurs, l'erreur et la fonction fetch
}

export default getPosts