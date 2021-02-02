const request = require('postman-request');

const geocode = (address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWhtZWR0cms5NyIsImEiOiJja2p5aDkyZzQwN3ZzMndvZTZ0MW52cXpvIn0.0ngrAjOrdPhODHNMYzydqA&limit=1';
    request({url:url,json:true},(error,{body})=>{
    if(error){
        callback('Unable to connect to mapbox stack api',undefined);

    }else if(body.features.length === 0){
        callback('Unable to find location',undefined);
    }else{
        const longitude = body.features[0].center[0];
        const latitude = body.features[0].center[1];
        const location = body.features[0].place_name;
        callback(undefined,{
            longitude,// equivelant to longitude:longitude
            latitude,
            location

        })
    }
    
})
}

module.exports = geocode;