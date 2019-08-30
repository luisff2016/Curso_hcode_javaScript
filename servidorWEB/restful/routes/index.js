//let express = require('express'); let routes = express.Router();

module.exports = (app)=>{

    app.get('/', (req, res) => {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>RESTful</h1><h2>Projeto da Hcode na Udemy</h2>');
    
    });
    
}


//module.exports = routes;