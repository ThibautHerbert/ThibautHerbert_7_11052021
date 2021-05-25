import { ref } from 'vue'
/*
const postLogin = () => {
    const loginForm = ref ([ ])
    const error = ref(null)

    const send = async () => {
      try {
        let data = await fetch('http://localhost:3000/api/auth/login')
        //console.log(data)
        if (!data.ok) {
          throw Error('aucune donnée disponible')
        }
        loginForm.value = await data.json()
      }
      catch (err) {
        error.value = err.message
        console.log(error.value)
      }
    }
    return { loginForm, error, send }
}
*/
export default postLogin
// ou
// méthode POST du P5

fetch('http://localhost:3000/api/auth/login', {
  method : "POST",
  body: loginToSend,
  headers: {"Content-type": "application/json; charset=UTF-8"}
})
// écriture de promesses/promises en fonctions fléchées:
  .then(response => response.json()) // reçoit la fonction si elle est remplie/fulfilled
  //.json() returns a callback
  //.then(json => localStorage.setItem("loginForm", JSON.stringify(json)))
  .then(() => window.location.href = "home.html") // si la requête POST est fulfilled alors rediriger vers la page de confirmation de commande
  .catch(err => console.log("promise err " +  err)); // reçoit la fonction si l'envoi est rejeté et indique erreur 
  