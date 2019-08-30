let NeDB = require('nedb');
let db = new NeDB({
    filename: 'user.db',
    autoload: true
});
//let express = require('express'); let routes = express.Router();

module.exports = (app) => {

    let route = app.route('/users');

    route.get((req, res) => { //metodo get com find, recupera todos usuarios

        db.find({}).sort({ name:1 }).exec((err, users) => {

            if (err) {
                app.utils.error.send(err,req,res);

            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    users
                });

            }
        })

    });

    route.post((req, res) => { //metodo post para incluir usuario

        if (!app.utils.validator.user(app,req,res)){
            return false;
        }


        db.insert(req.body, (err, user) => {

            if (err) {
                app.utils.error.send(err,req,res);

                
            } else {
                res.status(200).json(user);
            }
        })
        // caso use o post, sem NeDB
        //res.json(req.body);
    });

    let routeId = app.route('/users/:id');

    routeId.get((req, res) => { //metodo get con findOne, recupera um usuario

        db.findOne({_id:req.params.id}).exec((err, user) => {

            if (err) {

                app.utils.error.send(err,req,res);

            } else {

                res.status(200).json(user);

            }
        })

    });

    routeId.put((req, res) => { //metodo put com update, alterar um usuario

        if (!app.utils.validator.user(app,req,res)){
            return false;
        }

        db.update({_id: req.params.id}, req.body, err => {

            if (err) {

                app.utils.error.send(err,req,res);

            } else {

                res.statusCode = 200;
                res.json(Object.assign(req.params,req.body));

            }
        });

    });

    routeId.delete((req, res) => { //metodo para excluir um usuario

        db.remove({_id: req.params.id}, {}, err => {

            if (err) {

                app.utils.error.send(err,req,res);

            } else {

                res.statusCode = 200;
                res.json(req.params);

            }
        });

    });


}


//module.exports = routes;