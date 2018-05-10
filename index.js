$(function () {

    PlaceSearch.Search("", " ", "500").then(function(data){
        console.log(data);
    });

    PlaceSearch.Detail(" ").then(function(data){
        console.log(data);
    });
    
});