const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // import de la connexion à la base de données
const fs = require('fs');
                                            // 1ere requête signup
exports.signup = (req, res, next) => {
    console.log(req.body);

    const {firstName, lastName, department, location, picture, password, email} = req.body;
    // vérifie qu'il n'y a pas déjà cet email:
    db.query('SELECT email FROM Users WHERE email = ?', [email], async (error, results) => {
        if(error) {console.log(error)}
        if( results.length > 0 ) { // vérifie si email déjà présent
            return res.status(400).json({ message: 'Cet email est déjà pris'});
        } 
        let hashedPassword = await bcrypt.hash(password, 10);
        //console.log('req.file ? ' + req.file)
        db.promise().query('INSERT INTO Users SET ?', {firstName:firstName, lastName:lastName, department: department, location: location, picture: req.file.filename, password: hashedPassword, email:email} )
            .then(() => res.status(200).json({ message: `Le compte de ${ firstName } ${ lastName } a été créé`}))
            .catch(error => res.status(400).json({ error })); 
        })
};
                                            // 2eme requête login
exports.login = async (req, res, next) => {
    console.log(req.body);
    try { // essai du code
        const {password, email} = req.body;
        if( !email || !password ) { // ne précise pas lequel input est faux pour plus de sécurité de connexion 
            return res.status(400).json({ message: 'Inscrivez un mot de passe et un email correct'});
        }
        db.query('SELECT * FROM Users WHERE email = ?', [email], async (error, results) => {
            //console.log(results);
            if( !results || !(await bcrypt.compare(password, results[0].password)) ) { // results[0].password : mdp hashed de la bdd
                return res.status(401).json({ message: 'Mot de passe ou email incorrect'}); //garder le return ?
            } else {
                //console.log(results[0].password);
                const userId = results[0].id; // modification de id en userId pour envoyer au auth.js ; .id c'est la colonne id de la table Users
                const token = jwt.sign({ userId }, process.env.TOKEN, // userId est récupéré de const userId donc results [0] ; ajout le userId dans le token
                    { expiresIn: process.env.TOKEN_EXPIRY });
                const user = results[0];
                //console.log("the token is : " + token);
                res.status(200).json({ userId, token, user}); // renvoyer le user complet aussi ?
                //console.log('Vous êtes connecté'); // n'apparait pas ! pq ?
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Inscrivez un mot de passe et un email correct !'});
    }
};
                                            // 3eme requête password ?
exports.password = async (req, res, next) => {
    const {password, email} = req.body;
    db.query('SELECT * FROM Users WHERE email = ?', [email], async (error, results) => {
        if( !results || !(await bcrypt.compare(password, results[0].password)) ) { // results[0].password : mdp hashed de la bdd
            return res.status(401).json({ message: 'Mot de passe ou email incorrect'});
        } else {
            res.status(200).json({ message: `L'ancien mot de passe est valide`})
        }
    })
}

                                            // requête deleteUser
exports.deleteUser = (req, res) => {
    db.query('SELECT picture FROM Users WHERE id= ?', [req.user], (err, rows) => {
        if(!err) {
            console.log(rows[0].picture)
            fs.unlink(`images/${rows[0].picture}`, () => {
                db.promise().query('DELETE FROM Users WHERE id= ?', [req.user])
                    .then(() => res.status(200).json({ message: `Le compte a été supprimé`}))
                    .catch(error => res.status(400).json({ error }));
            })
        } else {
        console.log(err)
        }
    })
};
                                            //  requête modify user
exports.modifyUser = (req, res, next) => {
    const {firstName, lastName, location, department} = req.body; // rajouter picture
    db.promise().query('UPDATE Users SET firstName = ?, lastName = ?, location = ?, department = ? WHERE id = ?', [firstName, lastName, location, department, req.user]) // {firstName:firstName, lastName:lastName, id: id} )  // ? is a placeholder ;
        .then(() => res.status(200).json({ message: `Le compte de ${ firstName } ${ lastName } a été modifié`}))
        .catch(error => res.status(400).json({ error }));
};
                                            // requête modify password
exports.modifyPassword = async (req, res, next) => {
    const {password} = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);
    db.promise().query('UPDATE Users SET password = ? WHERE id = ?', [hashedPassword, req.user]) // WHERE Id is = ? AND email = ?
        .then(() => res.status(200).json({ message: `Le mot de passe a été modifié avec succès, veuillez désormais vous reconnecter avec ce nouveau mot de passe`}))
        .catch(error => res.status(400).json({ error }));
};
                                            // requête getUser
// Récupère l'utilisateur qui est connecté
exports.getUserConnected = async (req, res, next) => {
    console.log(req.body);
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN); // token en caché avec dotenv
    const userId = decodedToken.userId;

    db.query('SELECT * FROM Users WHERE id = ?', [userId], async (err, rows) => {
        if(!err) {
            res.send(rows[0])
            console.log('getUserConnected a fonctionné' + rows);
        } else {
            console.log(err)
        }
    })
}