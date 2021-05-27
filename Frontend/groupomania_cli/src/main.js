import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './axios' // sans préfixe car se trouve dans le même dossier

//import bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
const bootstrap = require('bootstrap')
bootstrap

createApp(App).use(router).mount('#app')
