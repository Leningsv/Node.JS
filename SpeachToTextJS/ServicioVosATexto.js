//Importando los paketes nesesarios, Las librerias
var http = require("http");
var watson = require('watson-developer-cloud');
var fs = require('fs');

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
fs.createReadStream('./Recursos' + 'Us_English_Broadband_Sample_1.wav').pipe(recognizeStream);

// Pipe out the transcription.
recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

// Get strings instead of buffers from `data` events.
recognizeStream.setEncoding('utf8');

// Listen for 'data' events for only the final results.
// Listen for 'results' events to get interim results.
['data', 'results', 'error', 'connection-close'].forEach(function (eventName) {
    recognizeStream.on(eventName,
      console.log.bind(console, eventName + ' event: '));
}
);