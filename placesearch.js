var PlaceSearch = {

    //Search places near PSU Phuket
    Search : function (query, type, radius) {
        var deferred = new $.Deferred();
        var query = "?query=" + query;
        var type = "&type=" + type;
        var location = "&location=7.894878,98.352054";
        var radius = "&radius=" + radius
        var key = "&key=AIzaSyALmXCt2zEoU38_etO34Ctv2iZcoUZt8Rk";
        var Kathu = "https://www.google.co.th/maps/place/%E0%B8%AD%E0%B8%B3%E0%B9%80%E0%B8%A0%E0%B8%AD+%E0%B8%81%E0%B8%B0%E0%B8%97%E0%B8%B9%E0%B9%89+%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95/@7.9209213,98.2775645,13z/data=!3m1!4b1!4m5!3m4!1s0x30503080914e9809:0x30223bc2c368080!8m2!3d7.9089471!4d98.3197946?hl=th" + query + type + location + radius + key;        
        var city = "https://www.google.co.th/maps/place/%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95/@7.9409055,98.3174755,10.92z/data=!4m5!3m4!1s0x305031e2c462524f:0xe9ca9a85063dba21!8m2!3d7.9519331!4d98.3380884?hl=th"
        fetch(url)
            .then(function (response) {
                response.json().then(function (data) {  
                    console.log(data); 
                    var output = [];
                    data.results.forEach(element => {
                        var photo;
                        if(element.photos){
                            photo = "https://www.google.co.th/maps/@18.3170581,99.3986862,17z?hl=th" + element.photos[0].photo_reference + "&key=AIzaSyALmXCt2zEoU38_etO34Ctv2iZcoUZt8Rk"
                        }
                        else{
                            photo = "https://vignette.wikia.nocookie.net/janethevirgin/images/4/42/Image-not-available_1.jpg/revision/latest?cb=20150721102313"
                        }                                              
                        var place = {
                            id: element.place_id,
                            name: element.name,
                            address: element.formatted_address,
                            rating : element.rating,
                            photo: photo                           
                        }
                        output.push(place);
                    });
                    deferred.resolve(output);
                });
            })        

        return deferred.promise();
    },

    Detail : function (placeid) {
        var deferred = new $.Deferred();
        var placeid = "?placeid=" + placeid;        
        var key = "&key=AIzaSyALmXCt2zEoU38_etO34Ctv2iZcoUZt8Rk";
        var url = "https://maps.googleapis.com/maps/api/place/details/json" + placeid + key;        
        fetch(url)
            .then(function (response) {
                response.json().then(function (data) {
                    console.log(data);
                    var output = [];
                    var photos = [];
                    data.result.photos.forEach(element => {
                        if(element.photo_reference){
                            photo = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + element.photo_reference + "&key=AIzaSyALmXCt2zEoU38_etO34Ctv2iZcoUZt8Rk"
                        }
                        else{
                            photo = "https://vignette.wikia.nocookie.net/janethevirgin/images/4/42/Image-not-available_1.jpg/revision/latest?cb=20150721102313"
                        }     
                        photos.push(photo);
                    });
                    var place = {
                        id: data.result.place_id,
                        name: data.result.name,
                        address: data.result.formatted_address,
                        open_now: data.result.opening_hours.open_now,
                        rating : data.result.rating,
                        phone: data.result.formatted_phone_number,
                        photos: photos                         
                    }
                    deferred.resolve(place);                
                });
            })            
        
        return deferred.promise();
    }

}