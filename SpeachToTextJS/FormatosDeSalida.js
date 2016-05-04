/*En este ejemplo utilizare un texto que contiene un archivo json, A paritr de este se desplegara en el 
 * navegador en el formato que le corresponde
 * */

//Importando los paketes nesesarios, Las librerias
var http = require("http");
var watson = require('watson-developer-cloud');
var fs = require('fs');
var port = process.env.port || 1337;

// Introducciendo las credenciales para utilizar el servicio de watson
var speech_to_text = watson.speech_to_text({
    username: '063aeee9-89c3-4705-a366-7fcc0df532f5',
    password: 'TmnTTAKukHLk',
    version: 'v1',
    url: 'https://stream.watsonplatform.net/speech-to-text/api'
});

//Escritura directa
//REferencia pagina html
http.createServer(function (req, res) {
    speech_to_text.getModels({}, function (err, models) {
        if (err)
            console.log('error:', err);
        else {
            //Para trabajar con Texto tipo Json es nesesario estableser
            res.writeHead(200, {"Content-Type":"application/json"})
            res.write(JSON.stringify(models, null, 2))
            res.end();   
        }
    });
 }).listen(port);