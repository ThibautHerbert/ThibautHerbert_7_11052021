const express = require('express');
const mysql = require('mysql2');
const path = require('path');
//const db = require('./db');

const cookieParser = require('cookie-parser'); // est-ce utile ?
//paquets de sécurité :
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const app = express();

const dotenv = require('dotenv');
dotenv.config({ path: './.env'})

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const interestedRoutes = require('./routes/interested');


const limiter = rateLimit({ // spécifie le nombre maximums de requêtes
    max: 500, // 100 par heure
    windowMs: 60 * 60 * 1000, // pour : 60mn 60secondes 1000 millisecondes
    message: 'Vous avez réalisé trop de requêtes depuis votre adresse IP, merci de réessayer plus tard',
  })
app.use('/api', limiter);
  // sécurité HTTP Headers
app.use(helmet());

// parse JSON Bodies as sent by API clients
app.use(express.json());
// parse URL encoded bodies as sent by HTML forms
app.use(express.urlencoded({extended: false}))


app.use(cookieParser());

// empêche les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
 });

// contre les attaques XSS (cross site scripting):
app.use(xss());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/interested', interestedRoutes);

app.get('/api', (req, res) => {
  try {
    res.send("<h1>Page d'accueil Backend</h1> Base de données connectée")
    res.status(200).json({ message: `Base de données connectée`})
  } catch (error) {
    return res.status(400).json({ message: 'Il semblerait que la base de données ne soit pas connectée, réessayez plus tard'});
  }
    
    //return res.status(400).json({ message: 'Il semblerait que la base de données ne soit pas connectée, réessayez plus tard'});
});

module.exports = app;