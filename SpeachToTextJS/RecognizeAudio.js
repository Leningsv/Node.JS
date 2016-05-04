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
    model:'es-ES_BroadbandModel',
    timestamps: false,
    word_alternatives: 0.9
};


http.createServer(function (req, res) {
    speech_to_text.recognize(params, function (err, transcript) {
        if (err)
            console.log(err);
        else {
            res.writeHead(200, { "Content-Type": "application/json ; charset=utf-8" });
            res.write(JSON.stringify(transcript, null, 2));
            res.end();
        }
    });
}).listen(port);
