const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './.env'})

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // récupère le 2ème élément
        const decodedToken = jwt.verify(token, process.env.TOKEN); // token en caché avec dotenv
        const userId = decodedToken.userId; // vérifier cette ligne
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            req.user = userId;
            req.foo = 'req foo du auth'
            next();
        }
    } catch (error) {
        
        res.status(401).json({ error: 'Votre session a expirée, merci de vous reconnecter !'});
        
    }
};