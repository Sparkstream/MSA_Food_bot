//Stores intermediate functons to do with rest calls

//Goes through the RestClient to check for errors before using a callback to 
//return the data and continue FavouriteFoods' functionality
var rest = require('../API/Restclient');

exports.displayFavouriteFood = function getFavouriteFood(session, username){
    //url is for easy table
    var url = 'https://foodbotmsa0.azurewebsites.net/tables/FoodBot';
    rest.getFavouriteFood(url, session, username, handleFavouriteFoodResponse)
};

exports.sendFavouriteFood = function postFavouriteFood(session, username, favouriteFood){
    var url = 'https://foodbotmsa0.azurewebsites.net/tables/FoodBot';
    rest.postFavouriteFood(url, username, favouriteFood);
};
function handleFavouriteFoodResponse(message, session, username) {
    
    var favouriteFoodResponse = JSON.parse(message);
    var allFoods = [];
    for (var index in favouriteFoodResponse) {
        //Extracts the relevant parameters
        //username is stored in usernameReceived
        //favouriteFood is stored in favouriteFood
        var usernameReceived = favouriteFoodResponse[index].username;
        var favouriteFood = favouriteFoodResponse[index].favouriteFood;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
            if(favouriteFoodResponse.length - 1) {
                allFoods.push(favouriteFood);
            }
            else {
                allFoods.push(favouriteFood + ', ');
            }
        }        
    }
    
    // Print all favourite foods for the user that is currently logged in
    session.send("%s, your favourite foods are: %s", username, allFoods);                
    
}

exports.deleteFavouriteFood = function deleteFavouriteFood(session,username,favouriteFood){
    var url  = 'https://foodbotmsa0.azurewebsites.net/tables/FoodBot';


    rest.getFavouriteFood(url,session, username,function(message,session,username){
     var   allFoods = JSON.parse(message);

        for(var i in allFoods) {

            if (allFoods[i].favouriteFood === favouriteFood && allFoods[i].username === username) {

                console.log(allFoods[i]);

                rest.deleteFavouriteFood(url,session,username,favouriteFood, allFoods[i].id ,handleDeletedFoodResponse)

            }
        }


    });


};

function handleDeletedFoodResponse(body,session,username,favouriteFood){
   
    console.log('Done');

}