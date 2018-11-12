var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/activity', { useNewUrlParser: true });

var aSchema = mongoose.Schema({ //Defines the Schema for this database
    name: String,
    idea: String
});

var Activity = mongoose.model('Activity', aSchema);

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

router.post('/activity', function(req, res, next) {
    console.log("in post route");
    console.log(req.body);
    var newPost = Activity(req.body);
    newPost.save(function(err, result) {
        if (err) {
            console.log("error line 33 index.js");
            res.sendStatus(500);
        }
        else {
            res.sendStatus(200);
        }
    })
})

router.get("/activity", function(req, res, next) {
    console.log("In get");
    Activity.find(function(err, list) {
        if (err) {
            console.log("err at line 39");
        }
        else {
            console.log(list);
            res.json(list);
        }
    });
})


/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('index.html', { root: 'public' });
});

module.exports = router;
