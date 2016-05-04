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

var params = {
    content_type: 'audio/wav',
    continuous: true,
    interim_results: true
};

// Create the stream.
var recognizeStream = speech_to_text.createRecognizeStream(params);

// Pipe in some audio.
fs.createReadStream('./Recursos/' + 'Us_English_Broadband_Sample_1.wav').pipe(recognizeStream);






// Pipe out the transcription.
recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

// Get strings instead of buffers from `data` events.
recognizeStream.setEncoding('utf8');


//Escritura directa
//REferencia pagina html
//REferencia pagina html
http.createServer(function (req, res) {
    //Referencia de Archivos
    fs.readFile("./Views/Hola Mundo.html", function (err, html) {
        var htmlCadena = html.toString();
        var variables = htmlCadena.match(/[^\ {\}]+(?=\})/g);
        res.write(html);
        //Esto sigue mandando respuesta indefinidamente para deterner se utiliza end
        //res.end();
    });
    
}).listen(port);


    // Listen for 'data' events for only the final results.
    // Listen for 'results' events to get interim results.
    ['data', 'results', 'error', 'connection-close'].forEach(function (eventName) {
        
        recognizeStream.on(eventName,
            //res.write(eventName + ' event:'));
        console.log.bind(eventName + ' event:')    
        );
    }
    );
    //res.write();
    //res.end()

