const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // import de la connection à la base de données

exports.signup = (req, res, next) => {
    console.log(req.body);

    const {firstName, lastName, department, location, picture, password, email} = req.body;
    // const firstName = req.body.name;
    // vérifie qu'il n'y a pas déjà cet email:
    db.query('SELECT email FROM Users WHERE email = ?', [email], async (error, results) => {
        if(error) {console.log(error)}
        if( results.length > 0 ) { // vérifie si email déjà présent
            return res.render({ message: 'Cet email est déjà pris' }) // marche pas, si adresse mail existe alors le serveur bloque
        } 
    
        let hashedPassword = await bcrypt.hash(password, 10);
        //console.log('req.file ? ' + req.file)
        
        //console.log(hashedPassword);
        db.promise().query('INSERT INTO Users SET ?', {firstName:firstName, lastName:lastName, department: department, location: location, picture: req.file.filename, password: hashedPassword, email:email} )
            .then(() => res.status(200).json({ message: `Le compte de ${ firstName } ${ lastName } a été créé`}))
            .catch(error => res.status(400).json({ error })); 
        })
};

exports.login = async (req, res, next) => {
    console.log(req.body);
    try { // essai du code
        const {password, email} = req.body;
        if( !email || !password ) { // ne précise pas lequel input est faux pour plus de sécurité de connexion 
            return res.status(400).json({ message: 'Inscrivez un mot de passe et un email correct'}); // s'arrête après le return; message ou error ?
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
    }
};

//v2 login marche pas  "error": {}
/*
exports.login = (req, res, next) => {
    //console.log(req.body);
    const {password, email} = req.body;
    connection.promise().query('SELECT * FROM Users WHERE email = ?', [email], )
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé'});
            }
            connection.promise().query('SELECT * FROM Users WHERE password = ?', [password], )
                .then( () => {
                    bcrypt.compare(password, user.password) // comment récupérer le hashed password de la bdd ?
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ error: 'Mot de passe incorrect'});
                        }
                        res.status(200).json({
                            userId: user._id,
                            token: jwt.sign(
                                { userId: user._id }, // données que l'on veut encoder le payload
                                process.env.TOKEN, // clé secrête pour l'encodage // changer random token en caché avec dotenv
                                { expiresIn: process.env.TOKEN_EXPIRY } // argument de configuration durée limitée
                            )
                        });
                    })
                .catch(error => res.status(500).json({ error }));
                })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error}));
}
*/

//deleteUser
    //version avec pool attention, doit refaire avec connection pour que cela marche !
exports.deleteUser = (req, res) => {
    
    db.promise().query('DELETE FROM Users WHERE id= ?', [req.user]) // ? is a placeholder ; [req] use the bodyparser
                //connection.release() // return the connection to pool
                /*
                if(!err) {
                    res.send(`Le compte de ${ [req.body.firstName] } ${ [req.body.lastName] } a été supprimé`)
                } else {
                    console.log(err)
                }
                */
             // fin  query delete
                .then(() => res.status(200).json({ message: `Le compte a été supprimé`}))
                .catch(error => res.status(400).json({ error })); 
        //}) // fin 1er query
};
// autre écriture de route DELETE ? version P6
/*
exports.deleteUser = (req, res, next) => {
    connection.query('SELECT * FROM Users WHERE email = ?', [email])
        .then(user => {
            const filename = user.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                connection.query('DELETE FROM Users WHERE id= ?', [req.body.id])
                    .then(() => res.status(200).json({ message: 'Compte supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
    connection.query('DELETE FROM Users WHERE id= ?', [req.body.id])
        .then(() => res.status(200).json({ message: 'Compte supprimé'}))
        .catch(error => res.status(400).json({ error }));
};
*/

exports.modifyUser = (req, res, next) => {
    const {firstName, lastName, location, department} = req.body; // rajouter picture
    db.promise().query('UPDATE Users SET firstName = ?, lastName = ?, location = ?, department = ? WHERE id = ?', [firstName, lastName, location, department, req.user]) // {firstName:firstName, lastName:lastName, id: id} )  // ? is a placeholder ;
        .then(() => res.status(200).json({ message: `Le compte de ${ firstName } ${ lastName } a été modifié`}))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyPassword = async (req, res, next) => {
    const {password} = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);
    db.promise().query('UPDATE Users SET password = ? WHERE id = ?', [hashedPassword, req.user]) // WHERE Id is = ? AND email = ?
        .then(() => res.status(200).json({ message: `Le mot de passe a été modifié avec succès, veuillez désormais vous reconnecter avec ce nouveau mot de passe`}))
        .catch(error => res.status(400).json({ error }));
};
// getUser
// Récupère l'utilisateur qui est connecté
exports.getUserConnected = async (req, res, next) => {
    console.log(req.body);
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN); // token en caché avec dotenv
    const userId = decodedToken.userId;
    
    //const id = req.body;   /// attention j'ai rajouté le const id et c'est lui qui est récupéré dans le query et non le userId
    // if idUser du post
    //if idUser du comment
    //db.query('SELECT * FROM Users WHERE id = ?', [id], async (err, rows) => {
    db.query('SELECT * FROM Users WHERE id = ?', [userId], async (err, rows) => {
        //console.log(results);
        if(!err) {
            res.send(rows[0])
            console.log('getUserConnected a fonctionné' + rows);
        } else {
            console.log(err)
        }
    })
}
// à supprimer :
exports.getOneUser = async (req, res, next) => {
    const {id} = req.body;
    db.query('SELECT * FROM Users WHERE id = ?', [id], async (err, rows) => {
        if(err) {
            console.log(err)
            res.status(500).json({ status: 500, message: "Une erreur est survenue : " + err.message });
        } else {
            if (rows.length) {
                console.log( "Utilisateur trouvé.");
                
                res.status(200).json({ status: 200, message: "Utilisateur trouvé." });
                res.send(rows)
            } else {
                console.log( "Utilisateur non trouvé.");
                res.status(404).send({ status: 404, message: "Utilisateur non trouvé." });
            } 
        }
    })
}
