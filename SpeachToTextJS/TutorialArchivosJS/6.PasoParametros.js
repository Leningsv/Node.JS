//Imporatacion de Librerias
var http = require("http"),
    //Libreria para leer archivos
    fs = require("fs");
/* Archivo Asincrono
 * */
    //Creacion del servidor
http.createServer(function (req, res) {
    console.log("Url:"+req.url.toString());

    
    //html: la pagina que estoy pasando al servidor
    fs.readFile("../SpeachToTextJs/TutorialViewsHtml/6.PasoParametros.html", function (err, html) {
        //-----------Trabajar con variables------------//
        //Busqueda de Variables
        var html_string = html.toString();
        var arregloParametros = [],parametros= {};
        //Para el uso de exprecines Regulares
        var variables = html_string.match(/[^\{\}]+(?=\})/g);
        //Variables a ser Remplasadas
        //Variable a ser pasada       
        var nombre = "";
        if (req.url.indexOf("?") > 0) {
            // /?nombre=Lenin
            var urlData = req.url.split("?");
            var arregloParametros = urlData[1].split("&");           
            // [nombre=Lenin,data=algo]
        }
        for (var i = arregloParametros.length - 1; i >= 0; i--) {
            var parametro = arregloParametros[i];
            // nombre=Lenin
            var paramData = parametro.split("=")
            // [nombre,lenin]
            parametros[paramData[0]] = paramData[1];
            // {nombre:lenin}
        }
        //For que recorre el liestado de variables y remplasa en casi de encontrar
        // una conincidencia
        for (var i = variables.length - 1; i >= 0; i--) {
            var value = variables[i];
            html_string = html_string.replace("{" + variables[i] + "}", parametros[value]);
        };
        res.writeHead(200, {
            //"Content-Type":"application/json ; charset = utf - 8"
            "Content-Type": "text/html ; charset = utf - 8"
        });
        // req: Solicitud
        // res: Respuesta
        //Html Procesado a ser pasado
        res.write(html_string);
        res.end();
        //---------------------------------------------//
    });
}).listen(1337);


