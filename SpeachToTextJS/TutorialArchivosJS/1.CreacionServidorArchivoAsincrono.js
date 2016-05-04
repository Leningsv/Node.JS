//Imporatacion de Librerias
var http = require("http"),
    //Libreria para leer archivos
    fs = require("fs");


/* Archivo Asincrono
 * */
    //Creacion del servidor
http.createServer(function (req, res) {
    //html: la pagina que estoy pasando al servidor
    fs.readFile("../SpeachToTextJs/TutorialViewsHtml/1.CreacionServidor.html", function (err, html) {
        // req: Solicitud
        // res: Respuesta
        res.write(html);
        res.end();
    });
}).listen(1337);


