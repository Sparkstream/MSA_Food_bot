var request = require('request'); //node module for http post requests

exports.retreiveMessage = function (session){

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/3646942b-49a8-47b7-bba8-5b4d9d2f7f45/url?iterationId=f732fd0a-fdaf-4da7-9080-1cc349862578',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': '9e0d4de528d643afaf08ab53603b06a4'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body){
        console.log(validResponse(body));
        session.send(validResponse(body));
    });
}

function validResponse(body){
    if (body && body.Predictions && body.Predictions[0].Tag){
        return "This is " + body.Predictions[0].Tag
    } else{
        console.log('Oops, please try again!');
    }
}