const fs = require('fs');
const db = require('../db');
                                            // 1ere requête findAll
exports.getAllPosts = (req, res, next) => {
    db.query('SET lc_time_names = "fr_FR"'); // formatage de la date en français
    db.query('SELECT P.*, P.creationDate, DATE_FORMAT(P.creationDate, "%W %e %M %Y") AS formattedDate, U.id user_id, U.firstname user_name, U.picture user_picture, U.location user_location FROM Posts P RIGHT JOIN Users U ON U.id = P.idUser ORDER BY P.creationDate DESC', (err, rows) => {
        if(!err) {
            res.send(rows)
        } else {
            console.log(err)
        }
    })
}
                                                    // 2ème requête findOne
exports.getOnePost = (req, res) => {
    db.query('SELECT * FROM Posts WHERE id= ?', [req.params.id], (err, rows) => { // ? est un placeholder pour empêcher les injections SQL 
        if(!err) {
            res.send(rows)
        } else {
            console.log(err)
        }
    })
}
                                                    // 3ème requête create
exports.createPost = (req, res) => {
    const {body, url, idUser, picture} = req.body;
    try {
        if (picture == '') { // création d'une publication sans photo
            db.promise().query('INSERT INTO Posts SET ?', {body: body, url: url, idUser: idUser})
            .then(() => res.status(200).json({ message: `Le post a été créé`}))
            .catch(error => res.status(400).json({ error }));
        } else  { // création d'une publication avec photo postée
            db.promise().query('INSERT INTO Posts SET ?', {body: body, url: url, idUser: idUser, picture: req.file.filename})
            .then(() => res.status(200).json({ message: `Le post a été créé`}))
            .catch(error => res.status(400).json({ error }));
        }
    } catch (error) {
        console.log(error)
    }
}
                                                    // 4ème requête modify
exports.modifyPost = (req, res) => {
    const {id, idUser, url, body} = req.body
    db.promise().query('UPDATE Posts SET url = ?, body = ? WHERE idUser = ? && id = ?', [url, body, idUser, id], req.params.id, )  
        .then(() => res.status(200).json({ message: `Le post a été modifié`}))
        .catch(error => res.status(400).json({ error }));
}
                                                    // 5ème requête delete
exports.deletePost = (req, res) => {
    db.query('SELECT picture FROM Posts WHERE id= ?', [req.params.id], (err, rows) => {
        if(!err) {
            fs.unlink(`images/${rows[0].picture}`, () => {
                db.promise().query('DELETE FROM Posts WHERE id= ?', [req.params.id])
                    .then(() => res.status(200).json({ message: `Le post a été supprimé`}))
                    .catch(error => res.status(400).json({ error }));
            })
        } else {
        console.log(err)
        }
    })
}; 
                                                    // 6ème requête moderate
// ajoute 1 à la colonne isModerated pour remplacer le 0 par défaut, ou l'inverse si 1 est déjà présent
exports.moderatePost = (req, res) => {
    const {isModerated, id} = req.body
    db.query('UPDATE Posts SET isModerated = ? WHERE id = ?', [isModerated, id] , (err, rows) => {
        if(!err) {
            if(isModerated==1) {
                res.send(`Le post n° ${ id } idUser: ${req.user} a été modéré à ${isModerated} , il ne sera plus visible`)
            } else {
                res.send(`la modération a été supprimée, le post n° ${ id } sera de nouveau visible`)
            }
        } else {
            console.log(err)
        }
    })
}

                                                    // 7ème requête like
exports.interestedToPost = (req, res) => {
    const {isInterested, idPost, id} = req.body;
    db.query('SELECT I.*, U.firstName, U.lastName FROM isInterestedToPost I RIGHT JOIN Users U ON U.id = I.idUser WHERE I.idUser = ? && I.idPost = ?', [req.user, id] , (err, rows) => {
        try {    // l'utilisateur a déjà cliqué sur intéressant pour le post :
            if(rows[0].idUser == req.user && id == rows[0].idPost) {
                db.promise().query('UPDATE Posts SET isInterested = isInterested - ? WHERE id = ?', [isInterested, id]) 
                    .then(() => res.status(200).json({ message: `Le post n'est plus noté intéressant par ${rows[0].firstName} idUser: ${req.user}`}))
                    .catch(error => res.status(400).json({ error }));
                return // rajouté pour empêcher l'erreur de multiple réponses
            } else { 
                return res.status(400).json({ message: "Il n'y a pas d'utilisateur à ce numéro !"});
            }
        } catch (error) {
            console.log(error)
        }
        try{
            // l'utilisateur n'a pas cliqué sur intéressant pour le post :
            if (req.user) {
                db.promise().query('UPDATE Posts SET isInterested = isInterested + ? WHERE id = ?', [isInterested, id])
                    .then(() => res.status(200).json({ message: `Le post a été noté intéressant par ${rows[0].firstName} idUser: ${req.user}`}))
                    .catch(error => res.status(400).json({ error }));
            } else { 
                return res.status(400).json({ message: "Cet utilisateur a déjà noté le post comme intéressant!"});
            }
        } catch (error) {
            console.log(error)
        }
    })
        
}