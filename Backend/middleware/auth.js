const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './.env'})

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // récupère le 2ème élément
        const decodedToken = jwt.verify(token, process.env.TOKEN); // token en caché avec dotenv
        const userId = decodedToken.userId; //  userId provient de exports.login controllers/user.js
        if (req.body.idUser && req.body.idUser !== userId) { // vérifie s'il y a bien le idUser dans le body de la requête mais que le userId donc l'id du token décodé n'est pas différent
            //throw 'User ID non valable !';
            res.status(401).json({ error: 'Mauvais identifiant, reconnectez-vous avec le bon identifiant !'});
        } else {
            req.user = userId;
            next();
        }
    } catch (error) {
        
        res.status(401).json({ error: 'Votre session a expirée, merci de vous reconnecter !'});
        
    }
};