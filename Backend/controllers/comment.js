const fs = require('fs');
const db = require('../db');
                                            // 1ere requête findAll
exports.getAllComments = (req, res, next) => {
    const {idPost} = req.body
    db.query('SET lc_time_names = "fr_FR"');
    db.query('SELECT C.*, C.creationDate, DATE_FORMAT(C.creationDate, "%W %e %M %Y") AS formattedDate, U.id user_id, U.firstname user_name, U.picture user_picture, U.location user_location FROM Comments C LEFT JOIN Users U ON U.id = C.idUser ORDER BY creationDate ASC', [idPost], (err, rows) => {
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
    db.query('SELECT * FROM Comments WHERE id = ?, && idPost == Posts.id ORDER BY creationDate ASC', [id], (err, rows) => { // ? is a placeholder
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
                                                    // 4ème requête modify
exports.modifyComment = (req, res) => {
    const { body, idUser, id, idPost} = req.body
    db.promise().query('UPDATE Comments SET body = ? WHERE idUser = ? && id = ? && idPost = ?', [body,  idUser, id, idPost] )  
        .then(() => res.status(200).json({ message: `Le commentaire a été modifié`}))
        .catch(error => res.status(400).json({ error }));
}
                                                    // 5ème requête delete
exports.deleteComment = (req, res) => {
    //db.query('DELETE FROM Comments WHERE idUser = ? && id = ? && idPost = ?', [idUser, id, idPost], (err, rows) => { // ? is a placeholder ; [req] use the bodyparser
    db.query('DELETE FROM Comments WHERE idUser = ? && id= ?', [ req.user, req.params.id ], (err, rows) => {
        if(!err) {
            res.send(`Le commentaire dont l'id utilisateur est ${ req.user } a été supprimé`)
        } else {
            console.log(err)
        }
    })
};
                                                    // 6ème requête moderate
// model of modify + 
// add 1 to column isModerated instead of default 0
exports.moderateComment = (req, res) => {
    const { isModerated, id, idPost} = req.body
    db.query('UPDATE Comments SET isModerated = ? WHERE id = ? && idPost = ?', [isModerated, id, idPost] , (err, rows) => {
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

