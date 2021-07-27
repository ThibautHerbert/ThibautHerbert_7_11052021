const db = require('../db');

exports.userInterested = (req, res) => {
    const {idPost} = req.body;
    db.promise().query('INSERT INTO isInterestedToPost SET ?', {idPost: idPost, idUser: req.user})
        .then(() => res.status(200).json({ message: `L'idUser trouve le post "intéressant"`}))
        .catch(error => res.status(400).json({ error }));
}
exports.deleteUserInterested = (req, res) => {
    const {idPost} = req.body;
    const idUser = req.user;
    db.promise().query('DELETE FROM isInterestedToPost WHERE idPost = ? && idUser = ?', [idPost, idUser])
        .then(() => res.status(200).json({ message: `L'idUser ne trouve plus le post "intéressant"`}))
        .catch(error => res.status(400).json({ error }));
}