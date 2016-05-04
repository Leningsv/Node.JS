//Importando los paketes nesesarios, Las librerias
var http = require("http");
var watson = require('watson-developer-cloud');
//Libreria nesesaria para el uso de File
var fs = require('fs');
//Definicion del puerto para la aplicacion web
var port = process.env.port || 1337;

// Introducciendo las credenciales para utilizar el servicio de watson
var speech_to_text = watson.speech_to_text({
    username: '063aeee9-89c3-4705-a366-7fcc0df532f5',
    password: 'TmnTTAKukHLk',
    version: 'v1',
    url: 'https://stream.watsonplatform.net/speech-to-text/api'
});
//paso de parametros para la obtencion de texto
var params = {
    audio: fs.createReadStream('./Recursos/Es_ES_spk24_16khz.wav'),
    content_type: 'audio/wav',
    model: 'es-ES_BroadbandModel',
    timestamps: false,
    word_alternatives: 0.9
};


http.createServer(function (req, res) {
    speech_to_text.recognize(params, function (err, transcript) {
        if (err)
            console.log(err);
        else {
            
            //html: la pagina que estoy pasando al servidor
            fs.readFile("../SpeachToTextJs/SpeachToTextHTML/index.html", function (err, html) {
                //-----------Trabajar con variables------------//
                //Busqueda de Variables
                var html_string = html.toString();
                //Para el uso de exprecines Regulares
                var variables = html_string.match(/[^\{\}]+(?=\})/g);
                //Variables a ser Remplasadas
                //Variable a ser pasada       
                var nombre = "Paso de Variable desde el codigo";
                var nombre1 = JSON.stringify(transcript, null, 2);
                //Para trabajar con un objeto JSON en node es muy facil
                //Su uso es muy paresido a los objetos normales
                var nombre2 = transcript.results[0].alternatives[0].transcript;
                //For que recorre el liestado de variables y remplasa en casi de encontrar
                // una conincidencia
                for (var i = variables.length - 1; i >= 0; i--) {
                    var value = eval(variables[i]);
                    html_string = html_string.replace("{" + variables[i] + "}", value);
                };
                res.writeHead(200, {
                    //"Content-Type": "application/json ; charset = utf - 8"
                    "Content-Type": "text/html ; charset = utf - 8"
                });
                // req: Solicitud
                // res: Respuesta
                //Html Procesado a ser pasado
                res.write(html_string);
                res.end();
                //---------------------------------------------//
            });
            
        }
    });
}).listen(port);


