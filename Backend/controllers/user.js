const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // import de la connection à la base de données

//const User = require('../models/user');

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
        console.log(hashedPassword);
        db.promise().query('INSERT INTO Users SET ?', {firstName:firstName, lastName:lastName, department: department, location:location, picture:picture, password: hashedPassword, email:email} )  // ? is a placeholder ;
            //connection.release() // return the connection to pool
            .then(() => res.status(200).json({ message: `Le compte de ${ firstName } ${ lastName } a été créé`}))
            .catch(error => res.status(400).json({ error })); 
        })
};
// v1 login ok mais erreur password undefined ligne 45
// UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
exports.login = async (req, res, next) => {
    //console.log(req.body);
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
                const id = results[0].id;
                const token = jwt.sign({ id }, process.env.TOKEN, // id est récupéré de const id donc results [0] voir méthode du cours
                    { expiresIn: process.env.TOKEN_EXPIRY });
                //console.log("the token is : " + token);
                res.status(200).json({ id, token});
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
        // l'utilisateur est connecté
        //connection.query('SELECT * FROM Users WHERE email = ?', [email], async (error, results) => {
            //if(err) throw err
            // alors suppression du compte
            db.promise().query('DELETE FROM Users WHERE id= ?', [req.body.id]) // ? is a placeholder ; [req] use the bodyparser
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