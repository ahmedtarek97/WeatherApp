const request = require('postman-request');

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=b0bfb5542e5b32262b2cf4e59af9a04a&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude);

    request({url,json:true},(error,{body})=>{ // url is short version of url:url
        if(error){
            callback('Unable to connect to weather stack api',undefined);
    
        }else if(body.error){
            callback('Unable to find location',undefined);
        }else{
           
            callback(undefined,{
                cuerrentTempreature:body.current.temperature,
                feelsLike:body.current.feelslike
    
            })
        }
        
    })
};

module.exports = forecast;