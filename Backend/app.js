const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
//paquets de sécurité :
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const app = express()
const port = process.env.PORT || 5000

require('dotenv').config()

//const userRoutes = require('./routes/user');
//const postRoutes = require('./routes/post');
//const commentRoutes = require('./routes/comment');

const limiter = rateLimit({ // spécifie le nombre maximums de requêtes
    max: 100, // 100 par heure
    windowMs: 60 * 60 * 1000, // pour : 60mn 60secondes 1000 millisecondes
    message: 'Vous avez réalisé trop de requêtes depuis votre adresse IP, merci de réessayer plus tard',
  })
app.use('/api', limiter);
  // sécurité HTTP Headers
app.use(helmet());

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// My SQL
const pool = mysql.createPool({
    connectionLimit : 10, // max pour créer à la fois
    host            : 'localhost',
    user            : 'USER',// utilise dotenv
    password        : 'PASSWORD', // utilise dotenv
    database        : 'SocialNetworkGroupomania',

});
// empêche les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
 });

// contre les attaques XSS (cross site scripting):
app.use(xss());

// all routes :
    // routes Users
        // Get All routes from employees table
app.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${ connection.threadId }`) // vérifier l'intérêt ?

        // query(sqlString, callback)
        connection.query('SELECT * FROM Users', (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
});
        // get an account/employee by Id
app.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${ connection.threadId }`) // vérifier l'intérêt ?

        // query(sqlString, callback)
        connection.query('SELECT * FROM Users WHERE id= ?', [req.params.idEmployee], (err, rows) => { // ? is a placeholder ; [req] use the bodyparser
            connection.release() // return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
});
/*
        // delete an account/employee by Id
app.delete('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${ connection.threadId }`) // vérifier l'intérêt ?

        // query(sqlString, callback)
        connection.query('DELETE FROM employees WHERE id= ?', [req.params.idEmployee], (err, rows) => { // ? is a placeholder ; [req] use the bodyparser
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`Le compte de ${ [req.params.firstName] } ${ [req.params.lastName] } a été supprimé`)
            } else {
                console.log(err)
            }
        })
    })
});
        // create an account/employee
        // à vérifier pour le post !! 
    app.post('/:id', (req, res) => {
        pool.getConnection((err, connection) => {
            if(err) throw err
            console.log(`connected as id ${ connection.threadId }`) // vérifier l'intérêt ?
            
            const params = req.body

            // query(sqlString, callback)
            connection.query('INSERT INTO Users SET ?', params , (err, rows) => { // ? is a placeholder ; [req] use the bodyparser
                connection.release() // return the connection to pool
    
                if(!err) {
                    res.send(`Le compte de ${ params.firstName } ${ params.lastName } a été créé`)
                } else {
                    console.log(err)
                }
            })
        })
    });
    // routes Posts

    // routes Comments
    // create a message FROM messages table
        // doit récupèrer idMessage + idEmployee + comment + dateMessage
    // delete a message FROM messages table
    // create a content FROM content table
        // doit récupèrer idContent + idEmployee + url + dateContent
    // delete a content FROM content table

    // faire un filter pour get les plus récents content et messages ?
*/
//app.use('/api/auth', userRoutes);
//app.use('/api/posts', postRoutes);
//app.use('/api/comments', commentRoutes);

app.listen(port, () => console.log(`Listen on port ${port}`))

module.exports = app;