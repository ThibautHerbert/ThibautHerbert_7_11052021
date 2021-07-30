import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api/'; // préfixe automatique pour chaque url
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('Token');