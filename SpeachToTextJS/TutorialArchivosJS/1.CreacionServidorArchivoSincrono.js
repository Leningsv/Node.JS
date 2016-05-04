//Imporatacion de Librerias
var http = require("http"),
    //Libreria para leer archivos
    fs = require("fs");

/* Servidor Sincrono
 * */
//C:\Users\Milton\documents\visual studio 2015\Projects\SpeachToTextJs\SpeachToTextJS\TutorialViewsHtml\1.CreacionServidor.html
var html = fs.readFileSync("../SpeachToTextJs/TutorialViewsHtml/1.CreacionServidor.html");
//Creacion del servidor
// req: Solicitud
// res: Respuesta
http.createServer(function (req, res) {
    res.writeHead(200, {
        //"Content-Type":"application/json ; charset = utf - 8"
        "Content-Type": "text/html ; charset = utf - 8"
    });
    res.write(html);
    //Mientras que no se cierre se puede seguir mandando muchas prespuestas
    res.end();
}).listen(1337);
