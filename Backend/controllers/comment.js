
    // routes Comments
    // create a message FROM messages table
        // doit récupèrer idMessage + idEmployee + comment + dateMessage
    // delete a message FROM messages table
    // create a content FROM content table
        // doit récupèrer idContent + idEmployee + url + dateContent
    // delete a content FROM content table

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


exports.getAllComments = (req, res, next) => {
    const {idPost} = req.body
    // être plus précis pour formater la date ?
    db.query('SELECT C.*, U.id user_id, U.firstname user_name, U.picture user_picture, U.location user_location FROM Comments C LEFT JOIN Users U ON U.id = C.idUser ORDER BY creationDate ASC', [idPost], (err, rows) => {   // rajouter un order by pour avoir les plus récents en premier
        if(!err) {
            res.send(rows)
        } else {
            console.log(err)
        }
    })
}

                                                    // 2ème requête findOne

exports.getOneComment = (req, res) => {
    const {id} = req.body
    db.query('SELECT * FROM Comments WHERE id = ?, && idPost == Posts.id ORDER BY creationDate ASC', [id], (err, rows) => { // ? is a placeholder ; [req] use the bodyparser
        if(!err) {
            res.send(rows)
        } else {
            console.log(err)
        }
    })
}
                                                    // 3ème requête create
                                                   
exports.createComment = (req, res) => {
        const { body, idUser, idPost} = req.body
        db.promise().query('INSERT INTO Comments SET body= ?, idUser = ?, idPost = ?', [body, idUser, idPost] )
            .then(() => res.status(200).json({ message: `Le commentaire a été créé`}))
            .catch(error => res.status(400).json({ error }));
}
//ça marche sur postman mais pas sur le front erreur sql 
/*
exports.createComment = (req, res) => {
    const params = req.body
    db.promise().query('INSERT INTO Comments SET ?', params )
        .then(() => res.status(200).json({ message: `Le commentaire a été créé`}))
        .catch(error => res.status(400).json({ error }));
}
*/
                                                    // 4ème requête modify
exports.modifyComment = (req, res) => {
    const { body, idUser, id, idPost,} = req.body //attention virgule ?
    db.promise().query('UPDATE Comments SET body = ? WHERE idUser = ? && id = ? && idPost = ?', [body,  idUser, id, idPost] )  
        .then(() => res.status(200).json({ message: `Le commentaire a été modifié`}))
        .catch(error => res.status(400).json({ error }));
}
                                                    // 5ème requête delete
exports.deleteComment = (req, res) => {
        // query(sqlString, callback)
    const {idUser, id, idPost} = req.body
    /*
    db.promise().query('DELETE FROM Posts WHERE idUser = ? AND id = ?', [idUser], req.params.id, )
        .then(() => res.status(200).json({ message: `Le post a été supprimé`}))
        .catch(error => res.status(400).json({ error }));
        */
    db.query('DELETE FROM Comments WHERE idUser = ? && id = ? && idPost = ?', [idUser, id, idPost], (err, rows) => { // ? is a placeholder ; [req] use the bodyparser
        if(!err) {
            res.send(`Le commentaire dont l'id utilisateur est ${ idUser } a été supprimé`)
        } else {
            console.log(err)
        }
    })
};
                                                    // 6ème requête moderate
// model of modify + 
// add 1 to column isModerated instead of default 0
exports.moderateComment = (req, res) => {
    
        // faire une première query pour vérifier si user isAdmin = 1 ?
       /*
        const { isAdmin, isModerated, idUser, id, idPost} = req.body
        db.promise().query('SELECT * FROM Users WHERE isAdmin= ?')
            .then(() => {})
        */
        //const {isAdmin == 1} = req.body
        //if(err) throw err
        const { isModerated, idUser, id, idPost} = req.body

        db.query('UPDATE Comments SET isModerated = ? WHERE idUser = ? && id = ? && idPost = ?', [isModerated, idUser, id, idPost] , (err, rows) => {
            if(!err) {
                if(isModerated==1) {
                    res.send(`Le commentaire n° ${ id } a été modéré, il ne sera plus visible`)
                // comment appeler des infos de la table users?
                } else {
                    res.send("la modération a été supprimée, le commentaire n° ${ id } sera de nouveau visible")
                }
            } else {
                console.log(err)
            }
        })
}

