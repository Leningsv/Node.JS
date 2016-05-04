var http = require('http'),
    fs = require("fs");
var port = process.env.port || 1337;

//Escritura directa
//REferencia pagina html
/*
http.createServer(function (req, res) {
    holaMundo="Hola como estas"
    res.write(holaMundo);
    res.end();    
}).listen(port);*/


 //REferencia pagina html
http.createServer(function (req, res) {
    //Referencia de Archivos
    fs.readFile("./Views/Hola Mundo.html", function (err, html) {
        res.write(html);
        //Esto sigue mandando respuesta indefinidamente para deterner se utiliza end
        //res.end();
    });
    
}).listen(port);