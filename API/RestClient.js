var request = require('request');

exports.getFavouriteFood = function getData(url, session, username, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function handleGetResponse(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, username);
        }
    });
};

exports.deleteFavouriteFood = function deleteData(url,session, username ,favouriteFood, id, callback){
    var options = {
        url: url + "\\" + id,
        method: 'DELETE',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        }
    };

    request(options,function (err, res, body){
        if( !err && res.statusCode === 200){
            console.log(body);
            callback(body,session,username, favouriteFood);
        }else {
            console.log(err);
            console.log(res);
        }
    })

};
//Callback
//values are not returned from an async call. Use callback function to retrieve data from an async call
//JS cannot return data from an async so call back is required

exports.postFavouriteFood = function getData(url, username, favouriteFood){
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        },
        json: {
            "username" : username,
            "favouriteFood" : favouriteFood
        }
      };
      //function(error,response,body) is a callback function
      //request provides the parameters for the callback
      request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
        }
        else{
            console.log(error);
        }
      });
};

//YELP API

exports.getYelpData = function getData(url,bearer,session, callback){

    request.get(url,{'auth': { 'bearer': bearer}} ,function(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body,session);
        }
    });
};

exports.getNutritionData = function getData(url, session, foodName, callback){
    
        request.get(url, function(err,res,body){
            if(err){
                console.log(err);
            }else {
                callback(body, foodName, session);
            }
        });
    };