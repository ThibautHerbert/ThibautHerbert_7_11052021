const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cookieParser = require('cookie-parser'); // est-ce utile ?
//paquets de sécurité :
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const app = express();
const port = process.env.PORT || 5000
const dotenv = require('dotenv');
dotenv.config({ path: './.env'})

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
//const commentRoutes = require('./routes/comment');

const limiter = rateLimit({ // spécifie le nombre maximums de requêtes
    max: 100, // 100 par heure
    windowMs: 60 * 60 * 1000, // pour : 60mn 60secondes 1000 millisecondes
    message: 'Vous avez réalisé trop de requêtes depuis votre adresse IP, merci de réessayer plus tard',
  })
app.use('/api', limiter);
  // sécurité HTTP Headers
app.use(helmet());

// parse URL encoded bodies as sent by HTML forms
app.use(express.urlencoded({extended: false}))
// parse JSON Bodies as sent by API clients
app.use(express.json());
app.use(cookieParser());
// My SQL
/*
const pool = mysql.createPool({
    connectionLimit : 10, // max pour créer à la fois
    host            : 'localhost',
    user            : 'adminGroupomania',// utilise dotenv
    password        : 'USERddd', // utilise dotenv
    database        : 'SocialNetworkGroupomania',
});
*/

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})
// pool.connect ne fonctionne pas, seul (create)connection peut s'utiliser avec .connect
connection.connect((err) => {
    if(err){
        throw err + console.log('la connexion à Mysql a échouée');
    } else {
        console.log('connexion à Mysql réussie ');
    }
})

// empêche les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
 });

// contre les attaques XSS (cross site scripting):
app.use(xss());

    // faire un filter pour get les plus récents content et messages ?

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
//app.use('/api/comments', commentRoutes);
/*
app.get('', (req, res, next) => {
    connection.query(`SELECT * FROM 'Animal'`, function(err, results, fields) {
        results = JSON.parse(req.body);
        console.log('results ' +results);
        console.log('fields ' + fields);
    })
})
*/
/*
// pour test de .query :
pool.query(`SELECT * FROM Posts`, function(err, rows) {
        //results = JSON.parse(results);
        console.log('results ' + rows);
// problème rows ressort en     [object Object]    
})
*/
app.get('/', (req, res) => {
    res.send("<h1>Page d'accueil</h1>")
});

app.listen(port, () => console.log(`Listen on port ${port}`))

module.exports = app;