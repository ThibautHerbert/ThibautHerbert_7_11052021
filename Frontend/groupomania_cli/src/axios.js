import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api/'; // préfixe automatique pour chaque url
//axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded'; // marche pas
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('Token'); // pour éviter de répéter la demande de token