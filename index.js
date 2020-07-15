
var express = require("express");
var bodyParser = require("body-parser");
var env = require('node-env-file');
env(__dirname + '/.env');
var products = require('./controllers/api/products');
var app = express();

var port = process.env.PORT || '4000';

var allowMethods = function(req, res, next){
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    return next();
}

var allowCrossTokenHeader = function(req, res, next){
    res.header("Access-Control-Allow-Methods", "token");
    return next();
}

var auth = function(req, res, next)
{
    /** En estado de pruebas, se genera token Dummy **/
    let dummyToken = "e817c8c863f6e39f1f77370305655551e4b5654d";
    if(req.headers.token === dummyToken)
    {
        return next();
    }
    else
    {
        res.send({"code": "401", "message": "Unauthorized", "str": "UNAUTHORIZED"});
    }
}


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(allowMethods);
app.use(allowCrossTokenHeader);

app.get("/api/getAllProducts", auth,  function(req, res, next){
     products.getAllProducts(req, res);
});

app.get("/api/searchProduct", auth,  function(req, res, next){
    products.searchProduct(req, res);
});



app.listen(port, function(){
    console.log("Servidor escuchando en el puerto ", port);
})