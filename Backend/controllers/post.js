const fs = require('fs');
const db = require('../db');
                                            // 1ere requête findAll
exports.getAllPosts = (req, res, next) => {
    db.query('SET lc_time_names = "fr_FR"'); // formatage de la date en français
    db.query('SELECT P.*, P.creationDate, DATE_FORMAT(P.creationDate, "%W %e %M %Y") AS formattedDate, U.id user_id, U.firstname user_name, U.picture user_picture, U.location user_location FROM Posts P RIGHT JOIN Users U ON U.id = P.idUser ORDER BY P.creationDate DESC', (err, rows) => {
        if(!err) {
            res.send(rows)
            console.log('in query');
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
    db.promise().query('INSERT INTO Posts SET ?', {body: body, url: url, idUser: idUser, picture: req.file.filename})
        .then(() => res.status(200).json({ message: `Le post a été créé`}))
        .catch(error => res.status(400).json({ error }));
}
                                                    // 4ème requête modify
exports.modifyPost = (req, res) => {
    const {id, idUser, url, body} = req.body
    db.promise().query('UPDATE Posts SET url = ?, body = ? WHERE idUser = ? && id = ?', [url, body, idUser, id], req.params.id, )  
        .then(() => res.status(200).json({ message: `Le post a été modifié`}))
        .catch(error => res.status(400).json({ error }));
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
exports.deletePost = (req, res) => {
    db.query('SELECT picture FROM Posts WHERE id= ?', [req.params.id], (err, rows) => {
        if(!err) {
            console.log(rows[0].picture)
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
// add 1 to column isModerated instead of default 0
exports.moderatePost = (req, res) => {
        // faire une première query pour vérifier si user isAdmin = 1 ?
    //const {isAdmin == 1} = req.body
    const {isModerated, id} = req.body
    db.query('UPDATE Posts SET isModerated = ? WHERE id = ?', [isModerated, id] , (err, rows) => {
        if(!err) {
            console.log('modéré ? ' + isModerated)
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
//exports.likePost 

