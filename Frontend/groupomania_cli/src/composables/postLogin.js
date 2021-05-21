import { ref } from 'vue'

const postLogin = () => {
    const post = ref ([ ])
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch('http://localhost:3000/api/auth/login')
        //console.log(data)
        if (!data.ok) {
          throw Error('aucune donnée disponible')
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

export default postLogin

// méthode POST du P5
fetch('http://localhost:3000/api/auth/login', {
  method : "POST",
  body: dataToSend,
  headers: {"Content-type": "application/json; charset=UTF-8"}
})
// écriture de promesses/promises en fonctions fléchées:
  .then(response => response.json()) // reçoit la fonction si elle est remplie/fulfilled
  //.json() returns a callback
  .then(json => localStorage.setItem("responseServer", JSON.stringify(json)))
  .then(() => window.location.href = "home.html") // si la requête POST est fulfilled alors rediriger vers la page de confirmation de commande
  .catch(err => console.log("promise err " +  err)); // reçoit la fonction si l'envoi est rejeté et indique erreur 