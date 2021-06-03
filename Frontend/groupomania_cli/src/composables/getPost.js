import { ref } from 'vue'

const getPost = (id) => {
    const post = ref (null)
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch('http://localhost:5000/api/posts/' + id) // sans le /api
        console.log('une id ?'+ id)
        if (!data.ok) {
          throw Error("ce post n'existe pas")
        }
        post.value = await data.json()
      }
      catch (err) {
        error.value = err.message
        console.log(error.value)
      }
    }
    return { post, error, load }
}

export default getPost