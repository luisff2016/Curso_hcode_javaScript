const express = require('express'); 
//const http = require('http');
const consign = require('consign');
//let routesIndex = require('./routes/index.js'); let routesUsers = require('./routes/users.js');
const bodyParser = require('body-parser');
//fazer a validacao
const expressValidator = require("express-validator");

let app = express();

//configurando o post
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator( )); //atualizar: npm install express-validator@5.1.2 --save


consign().include('routes').include('utils').into(app);
//app.use(routesIndex); app.use('/users',routesUsers);

app.listen(3000, '127.0.0.1', () => {

    console.log('servidor rodando. legal!');

});

//console.log('URL:', req.url);
//console.log('METHOD:', req.method);
//res.end('ok!');