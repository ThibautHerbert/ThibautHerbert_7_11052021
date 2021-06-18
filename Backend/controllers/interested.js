const db = require('../db');

exports.userInterested = (req, res) => {
    console.log(req.user, 'req.user user interested')
    const {idPost} = req.body;
    console.log(idPost, 'idpost')
    db.promise().query('INSERT INTO isInterestedToPost SET ?', {idPost: idPost, idUser: req.user})
        .then(() => res.status(200).json({ message: `L'idUser trouve le post "intéressant"`}))
        .catch(error => res.status(400).json({ error }));
}
exports.deleteUserInterested = (req, res) => {
    console.log(req.user, 'req.user delete user interested')
    const {idPost} = req.body; // avant écrit : {idPost } mais est undefined
    const idUser = req.user;
    db.promise().query('DELETE FROM isInterestedToPost WHERE idPost = ? && idUser = ?', [idPost, idUser]) // avec : {idPost: idPost, idUser: req.user} erreur sql
        .then(() => console.log('deleteUser: ' , idPost, idUser, req.user)) // idPost undefined ? pourquoi ?
        .then(() => res.status(200).json({ message: `L'idUser ne trouve plus le post "intéressant"`}))
        .catch(error => res.status(400).json({ error }));
}