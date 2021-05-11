const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
//const port = process.env.PORT || 5000

require('dotenv').config()

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

// routes : 
    // Get All routes from employees table
app.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${ connection.threadId }`) // vérifier l'intérêt ?

        // query(sqlString, callback)
        connection.query('SELECT * FROM employees', (err, rows) => {
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
        connection.query('SELECT * FROM employees WHERE idEmployee= ?', [req.params.idEmployee], (err, rows) => { // ? is a placeholder ; [req] use the bodyparser
            connection.release() // return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
});
    // delete an account/employee by Id
app.delete('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${ connection.threadId }`) // vérifier l'intérêt ?

        // query(sqlString, callback)
        connection.query('DELETE FROM employees WHERE idEmployee= ?', [req.params.idEmployee], (err, rows) => { // ? is a placeholder ; [req] use the bodyparser
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
    
            // query(sqlString, callback)
            connection.query('CREATE FROM employees WHERE idEmployee= ?', [req.params.idEmployee], (err, rows) => { // ? is a placeholder ; [req] use the bodyparser
                connection.release() // return the connection to pool
    
                if(!err) {
                    res.send(`Le compte de ${ [req.params.firstName] } ${ [req.params.lastName] } a été créé`)
                } else {
                    console.log(err)
                }
            })
        })
    });  
    // create a message FROM messages table
        // doit récupèrer idMessage + idEmployee + comment + dateMessage
    // delete a message FROM messages table
    // create a content FROM content table
        // doit récupèrer idContent + idEmployee + url + dateContent
    // delete a content FROM content table

    // faire un filter pour get les plus récents content et messages ?

//app.listen(port, () => console.log(`Listen on port ${port}`))

module.exports = app;