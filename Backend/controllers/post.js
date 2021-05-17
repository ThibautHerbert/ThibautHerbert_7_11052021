// Const Post = require('../models/post');
const fs = require('fs');
                                            // 1ere requête findAll
/* version de mongoose find ?
exports.getAllPost = (req, res, next) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};
*/
const pool = mysql.createPool({
    connectionLimit : 10, // max pour créer à la fois
    host            : 'localhost',
    user            : 'adminGroupomania',// utilise dotenv
    password        : 'USERddd', // utilise dotenv
    database        : 'SocialNetworkGroupomania',
});


exports.getAllPost = (req, res, next) => {
    pool.getConnection((err, connection) => {
        if(err) {
            throw console.log('ça ne marche pas ici')
        } else {
            console.log(`connected to MySQL`) // vérifier l'intérêt ?
            // query(sqlString, callback)
            connection.query('SELECT * FROM Posts', (err, rows) => {
                connection.release() // return the connection to pool

                if(!err) {
                    res.send(rows)
                } else {
                    console.log(err)
                }
            })
        }
    })
}
//essai getAll en version promise ?
/*
exports.getAllPost = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM Users', (err, posts) => {
            connection.release() // return the connection to pool
                .then(posts => res.status(200).json(posts))
                .catch(error => res.status(400).json({ error }));
        })
    })
}
*/
                                                    // 2ème requête findOne
/* version de mongoose findOne ?
exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};*/
exports.getOnePost = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) {
            throw err 
        } else {
            console.log(`connected to MySQL`)
            connection.query('SELECT * FROM Posts WHERE id= ?', [req.params.id], (err, rows) => { // ? is a placeholder ; [req] use the bodyparser
            connection.release() // return the connection to pool permet de relacher la promesse quand c'est terminé

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    }
})
}
                                                    // 3ème requête create
exports.createPost = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${ connection.threadId }`) // vérifier l'intérêt ?
        
        const params = req.body

        // query(sqlString, callback)
        connection.query('INSERT INTO Posts SET ?', params , (err, rows) => { // ? is a placeholder ;
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`Le post de ${ params.firstName } ${ params.lastName } a été créé`)
            } else {
                console.log(err)
            }
        })
    })
}
                                                    // 4ème requête modify
exports.modifyPost = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        const {id, idUser, url, content, dateContent, isModerated} = req.body

        // query(sqlString, callback)
        connection.query('UPDATE Posts SET url = ?, content = ?, dateContent = ?, WHERE id = ?', [url, content, dateContent, id] , (err, rows) => { // ? is a placeholder ;
            connection.release() // return the connection to pool permet de relacher la promesse quand c'est terminé

            if(!err) {
                res.send(`Le post de ${ params.firstName } ${ params.lastName } a été modifié`)
                // comment appeler des infos de la table users?
            } else {
                console.log(err)
            }
        })
    })
}
/*
exports.modifyPost = (req, res, next) => {
    const postObject = req.file ?
    { 
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Post modifié !"}))
        .catch(error => res.status(400).json({ error }));
};
*/
                                                    // 5ème requête delete
 //version delete : raddy the brand
exports.deletePost = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${ connection.threadId }`) // vérifier l'intérêt ?

        // query(sqlString, callback)
        connection.query('DELETE FROM Posts WHERE id= ?', [req.params.id], (err, rows) => { // ? is a placeholder ; [req] use the bodyparser
            connection.release() // return the connection to pool permet de relacher la promesse quand c'est terminé

            if(!err) {
                res.send(`Le post de ${ [req.params.firstName] } ${ [req.params.lastName] } a été supprimé`)
            } else {
                console.log(err)
            }
        })
    })
};    
/*
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Post supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
    Post.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Post supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};
*/

                                                    // 6ème requête moderate
// model of modify + 
// add 1 to column isModerated instead of default 0
exports.moderatePost = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        const {id, idUser, url, content, dateContent, isModerated} = req.body
// ? faire un switch ?
/*
        switch(req.body.isModerated) {
            case 0: 
                if(req.body.isModerated == 1)
                    connection.query('UPDATE Posts SET isModerated = 0 WHERE id = ?', [isModerated, id] , (err, rows) => { // ? is a placeholder ; [req] use the bodyparser
                        connection.release() // return the connection to pool
                            .then(() => res.status(201).json({ message: "la modération a été supprimée, le post sera de nouveau visible"}))
                            .catch(error => res.status(400).json({ error })); 
            }
            break;
            case 1 :
                if(req.body.isModerated == 0)
                    connection.query('UPDATE Posts SET isModerated = 1 WHERE id = ?', [isModerated, id] , (err, rows) => { // ? is a placeholder ; [req] use the bodyparser
                        connection.release() // return the connection to pool
                            .then(() => res.status(201).json({ message: "Le post a été modéré, il ne sera plus visible"}))
                            .catch(error => res.status(400).json({ error }));
*/
        // query(sqlString, callback)
        connection.query('UPDATE Posts SET isModerated = ? WHERE id = ?', [isModerated, id] , (err, rows) => { // ? is a placeholder ; 
            connection.release() // return the connection to pool, permet de relacher la promesse quand c'est terminé

            if(!err) {
                res.send(`Le post de ${ params.firstName } ${ params.lastName } a été modéré, il ne sera plus visible`)
                // comment appeler des infos de la table users?
            } else {
                console.log(err)
            }
        })
    })
}

                                                    // 7ème requête like
exports.likePost 

