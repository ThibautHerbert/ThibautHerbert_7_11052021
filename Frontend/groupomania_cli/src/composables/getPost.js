import { ref } from 'vue'

const getPost = (id) => {
    const post = ref (null)
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch('http://localhost:3000/api/posts/' + id)
        //console.log(data)
        if (!data.ok) {
          throw Error("cette requête n'est pas disponible")
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