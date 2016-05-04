//Imporatacion de Librerias
var http = require("http"),
    //Libreria para leer archivos
    fs = require("fs");

/* Archivo Asincrono
 * */
    //Creacion del servidor
http.createServer(function (req, res) {
    //html: la pagina que estoy pasando al servidor
    fs.readFile("../SpeachToTextJs/TutorialViewsHtml/2.UsoDeVariables.html", function (err, html) {
        //-----------Trabajar con variables------------//
        //Busqueda de Variables
        var html_string = html.toString();
        //Para el uso de exprecines Regulares
        var variables = html_string.match(/[^\{\}]+(?=\})/g);
        //Variables a ser Remplasadas
        //Variable a ser pasada       
        var nombre = "Paso de Variable desde el codigo";
        var nombre1 = "Paso de Variable1 desde el codigo";
        var nombre2 = "Paso de Variable2 desde el codigo";
        //For que recorre el liestado de variables y remplasa en casi de encontrar
        // una conincidencia
        for(var i= variables.length - 1; i >= 0; i--){
            var value = eval(variables[i]);
            html_string = html_string.replace("{"+variables[i]+"}",value);
        };        
        res.writeHead(200, {
            //"Content-Type":"application/json ; charset = utf - 8"
            "Content-Type": "text/html ; charset = utf - 8"
        });
        // req: Solicitud
        // res: Respuesta
        //Html Procesado a ser pasado
        res.write(html_string)
        res.end();
        //---------------------------------------------//
    });
}).listen(1337);


