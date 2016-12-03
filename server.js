//SERVER
//get access to express/orm/db/middleware
var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

//set up for express- an instance, method, path & handler -> instance.method(path, handler);
var proj = express();

//connect orm to db
var port = 27017;
mongoose.connect('mongodb://localhost:'+ port);
//admin port-28017, default port-27017
mongoose.connection.on('error', function(error) {
  console.log('CONNECTION ERROR----> ', error);
});
mongoose.connection.on('open', function() {
    console.log('CONNECTED');
});


//MODEL
//everything comes from schema w/mongoose
var colors = mongoose.Schema({
  id: Number,
  shade: String,
  name: String,
  example: String
});
var Rainbow = mongoose.model('Rainbow', colors);


//API ROUTES
/*var routes = express.Router();
proj.route('/api/colors');//route for GET & POST methods, +id for PUT & DELETE*/

//GET - retrieve all colors, (reads file but makes no changes), status code 200 for success('api/colors')
proj.get('/api/colors', function(request, response){
  Rainbow.find(function(err, colors){
    if(err){
      console.log('ERROR (get all)', err);
    }
    response.status(200).send('Success!');
    console.log('ALL COLORS ----> ', colors);
  });
});
//POST - adds a new color, returns status 201 (api/colors)
proj.post('/api/colors', function(request, response){
  var colors = new Rainbow();
  colors.id = request.id;
  colors.shade = request.shade;
  colors.name = request.name;
  colors.example = request.example;
  colors.save(function(err){
    if(err){
      console.log('ERROR (post)', err);
    }
    response.status(201).send('Success!');
    console.log('NEW COLOR ADDED ----> ', request.name)
  })
});
//GET - retrieve 1 color by id (api/colors/:id)
proj.get('/api/colors/:id', function(request, response){
  Rainbow.findOne(request.colors.id, function(err, colors){
    if(err){
      console.log('ERROR (get 1)', err);
    }
    response.status(200).send('Success!');
    console.log('COLOR RETRIEVED ----> ', colors);
  });
});
//PUT - update color by id, return status code 200 (api/colors/:id)
proj.put('/api/colors/:id', function(request, response){
  Rainbow.findAndModify(request.colors.id, function(err, colors){
    if(err){
      console.log('ERROR', err);
    }
    response.status(200).send('Success!');
    console.log('BEFORE ---->', colorEntry);
    console.log('AFTER ---->', result);
  });
});
//DELETE - delete 1 color by id, return status 200 & response body (api/colors/:id)
proj.delete('/api/colors/:id', function(request, response){
  Rainbow.findOneAndRemove(request.colors.id, function(err, colors, result){
    if(err){
      console.log(err);
    }
    response.status(200).send('Success!');
    console.log('COLOR DELETED ---->', colorEntry);
    console.log('REMAINING COLORS ---->', result);
  });
});

proj.listen(port, function() {
  console.log("HELLO! I'M LISTENING ON PORT: " + port);
});

//routes need to be re-factored to eliminate repetition

/*
Resources:
https://nodejs.org/api/synopsis.html

http://expressjs.com/en/starter/basic-routing.html

https://www.npmjs.com/package/body-parser

http://mongoosejs.com/docs/middleware.html

https://github.com/RestCheatSheet/api-cheat-sheet#api-design-cheat-sheet

https://expressjs.com/en/guide/routing.html

*/