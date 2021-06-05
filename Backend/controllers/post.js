// Const Post = require('../models/post');
const fs = require('fs');
const db = require('../db');
                                            // 1ere requête findAll
/* version de mongoose find ?
exports.getAllPost = (req, res, next) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};
*/


exports.getAllPosts = (req, res, next) => {
    console.log('before query');
    console.log(req.foo);
    // être plus précis pour formater la date ?
    db.query('SELECT * FROM Posts ORDER BY creationDate DESC', (err, rows) => {   // rajouter un order by pour avoir les plus récents en premier
        if(!err) {
            res.send(rows)
            console.log('in query');
        } else {
            console.log(err)
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
            db.query('SELECT * FROM Posts WHERE id= ?', [req.params.id], (err, rows) => { // ? is a placeholder ; [req] use the bodyparser
            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
}
                                                    // 3ème requête create
exports.createPost = (req, res) => {
        const params = req.body
        //const {idUser, url, body} = req.body
        //const Users = {id, firstName, lastName, department, location, picture, password, email} // 
        // query(sqlString, callback)
        //connection.query('INSERT INTO Posts SET ?', params , (err, rows) => { // ? is a placeholder ;
        db.promise().query('INSERT INTO Posts SET ?', params , )
        //db.promise().query('INSERT INTO Users SET idUser = ?, url = ?, body = ?', [idUser, url, body] )
            .then(() => res.status(200).json({ message: `Le post a été créé`}))
            .catch(error => res.status(400).json({ error }));
            /* 
        db.query('INSERT INTO Posts SET ?', [idUser, url, body] , (err, rows) => {
            // est-ce qu'ici il faut faire un sql JOIN ou un INSERT SELECT pour incrémenter le User.id dans le Posts.idUser ?
            if(!err) {
                res.send(`Le post a été créé`) // names undefined pour le moment car pas dans la requête
                //db.query('INSERT INTO Posts (Id) SELECT userId FROM Users') // est-ce sécurisé ?
            } else {
                console.log(err)
            }
        })*/
}
                                                    // 4ème requête modify
exports.modifyPost = (req, res) => {
        const {id, idUser, url, body, creationDate} = req.body
        //const params = req.body
        // query(sqlString, callback)
        //db.query('UPDATE Posts SET url = ?, content = ?, dateContent = ? WHERE idUser = ?', [url, body, creationDate, id, idUser] , (err, rows) => { // ? is a placeholder ;
        /*db.query('UPDATE Posts SET ? WHERE idUser = ?', [url, body, creationDate, id, idUser] , (err, rows) => { // ? is a placeholder ;
            if(!err) {
                res.send(`Le post a été modifié`)
                // comment appeler des infos de la table users?
            } else {
                console.log(err)
            }
        })*/
        /*
        db.promise().query('UPDATE Posts SET ? WHERE idUser = ?', [url, body, creationDate, idUser] )  
            .then(() => res.status(200).json({ message: `Le post a été modifié`}))
            .catch(error => res.status(400).json({ error }));
        */
        db.promise().query('UPDATE Posts SET url = ?, body = ? WHERE idUser = ?', [url, body, idUser], req.params.id, )  
        .then(() => res.status(200).json({ message: `Le post a été modifié`}))
        .catch(error => res.status(400).json({ error }));
        
       /*
        db.promise().query('UPDATE Posts SET ? WHERE idUser = ?',  params, req.params.id, )  
        .then(() => res.status(200).json({ message: `Le post a été modifié`}))
        .catch(error => res.status(400).json({ error }));
        */
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
        // query(sqlString, callback)
        /*
        const {id, idUser} = req.body
        db.promise().query('DELETE FROM Posts WHERE idUser = ? AND id = ?', [idUser], req.params.id, )
            .then(() => res.status(200).json({ message: `Le post a été supprimé`}))
            .catch(error => res.status(400).json({ error }));
            */
//pour supprimer les images du dossier (images ou picture ?)
    //const filename = post.imageUrl.split('/images/')[1];
    //fs.unlink(`images/${filename}`, () => {
        db.query('DELETE FROM Posts WHERE id= ?', [req.params.id], (err, rows) => { // ? is a placeholder ; [req] use the bodyparser
            

            if(!err) {
                res.send(`Le post de n° ${ [req.params.id] } a été supprimé`)
            } else {
                console.log(err)
            }
        })
    //})
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
    
        // faire une première query pour vérifier si user isAdmin = 1 ?
    //const {isAdmin == 1} = req.body
    if(err) throw err
    const {id, isModerated} = req.body

    db.query('UPDATE Posts SET isModerated = ? WHERE id = ?', [isModerated, id] , (err, rows) => {
        if(!err) {
            if(isModerated==1) {
                res.send(`Le post n° ${ id } a été modéré, il ne sera plus visible`)
            // comment appeler des infos de la table users?
            } else {
                res.send("la modération a été supprimée, le post n° ${ id } sera de nouveau visible")
            }
        } else {
            console.log(err)
        }
    })
}

                                                    // 7ème requête like
exports.likePost 

