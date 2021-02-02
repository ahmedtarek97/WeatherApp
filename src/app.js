const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express();
const publicDirectoryPath = path.join(__dirname ,'../public');
const viewsPath = path.join(__dirname,'../templates/views'); // hbs searches for the views folder in the root the folder must be named views
const partialPath = path.join(__dirname,'../templates/partials');

// setup handlebars engine and views location
app.set('view engine','hbs'); // to set up handle bars
app.set('views',viewsPath); // customize the default of hbs so it will look for templates folder instead of views
hbs.registerPartials(partialPath); // contain the path of the partials which are elemnts tat we don't want to change across the website like the header and the footer

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Ahmed Tarek'
    }); //allow us to render one of our views(viws make static html pages dynamic)
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Ahmed Tarek'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Help the user',
        title: 'Help',
        name:'Ahmed Tarek'
    });
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    const address = req.query.address;
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        
        forecast(latitude,longitude,(error,{cuerrentTempreature,feelsLike})=>{
            if(error){
                return res.send({
                    error:error
                })
            }

            res.send({
                location:location,
                forecast:cuerrentTempreature,
                feelsLike:feelsLike
            })

        })
    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        res.send({
            error:'You must provide search term'
        })
    }else{
        res.send({
            products:[]
        });
    }
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Ahmed Tarek',
        error:'Help article not found'
    });
})


app.get('*',(req,res)=>{
     res.render('404',{
        title:'404',
        name:'Ahmed Tarek',
        error:'Page not found'
    });
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});