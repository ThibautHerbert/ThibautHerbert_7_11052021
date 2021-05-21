const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
    })
    // pool.connect ne fonctionne pas, seul (create)connection peut s'utiliser avec .connect
db.connect((err) => {
    if(err){
        throw err + console.log('la connexion à Mysql a échouée');
    } else {
        console.log('connexion à Mysql réussie ');
    }
})

module.exports = db;
