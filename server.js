'use strict';
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var mongurl = 'mongodb://krishnakanththammana:!QAZ2wsx@ds135433.mlab.com:35433/hca';
var fs = require('file-system');
var path = require("path");
var express = require('express');
var cors = require('cors');
var walk = require('walk');
var app = express();
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    console.log("inside app get");
    res.sendFile(__dirname + "/");
})
app.get('/getAllUsers', function(req, res) {
    //res.send("https://knowmax.ultimatix.net/sites/insurance-isu/StrategyInnovation/InnovationHome/DocsToOtherTeams/ipas/iAgentHybrid.ipa");
    var array123 = [];
    MongoClient.connect(mongurl, function(err, db) {
        var callback = function(a) {
            console.log('its completed' + res);
            res.send(a);
        }
        console.log("inside mongoclient");
        assert.equal(null, err);
        var cursor = db.collection('users').find();
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                //console.dir(doc);
                array123.push(doc)
            } else {
                callback(array123);
            }
        });
    })
})
app.get('/testingg', function(req, res) {
    //res.send("https://knowmax.ultimatix.net/sites/insurance-isu/StrategyInnovation/InnovationHome/DocsToOtherTeams/ipas/iAgentHybrid.ipa");
    var array123 = [];
    MongoClient.connect(mongurl, function(err, db) {
        var callback = function(a) {
            console.log('its completed' + res);
            res.send(a);
        }
        console.log("inside mongoclient");
        assert.equal(null, err);
        var cursor = db.collection('users').find();
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                //console.dir(doc);
                array123.push(doc)
            } else {
                callback(array123);
            }
        });
    })
})
app.get('/addRecord', function(req, res, next) {
    console.log(req.query)
    console.log(req.query.username)
    console.log(req.query.record)
    var name = req.query.username;
    var record = req.query.record;
    MongoClient.connect(mongurl, function(err, db) {
        console.log(db);
        var callback = function() {
            console.log('its completed');
            res.send("Inserted");
        }
        db.collection('users').insertOne({
            "name": name,
            "record": record
        }, function(err, result) {
            assert.equal(err, null);
            callback();
        });
    })
});
app.get('/GetUserDetails', function(req, res) {
  var array123 = [];
  var username = req.query.username;
  MongoClient.connect(mongurl, function(err, db) {
      var callback = function(a) {
          console.log('its completed' + res);
          res.send(a);
      }
      console.log("inside mongoclient");
      assert.equal(null, err);
      console.log(db);
      var cursor = db.collection('users').find({"name": username });
      cursor.each(function(err, doc) {
          assert.equal(err, null);
          if (doc != null) {
              //console.dir(doc);
              array123.push(doc)
          } else {
              callback(array123);
          }
      });
  })
});
app.get('/updateUser', function(req, res, next) {
    var record = req.query.record;
    var name = req.query.name;
    MongoClient.connect(mongurl, function(err, db) {
      var callback = function() {
        console.log('its completed' + res);
        res.send("user details updated");
      }
      db.collection('users').updateOne(
        {
          "name": name
        },{
          $set:{
            "record": record
          }
        },function(err, results) {
            console.log(results);
            callback();
        }
      );
    })
});
var timer = "2400";

app.get('/GetTimerDetails', function(req, res) {
  res.send(timer);
});

app.get('/setEmergency', function(req, res) {
  timer = parseInt(timer);
  timer += 1800;
  timer = timer.toString();
  res.send(timer);
});

var port = Number(process.env.PORT || 8085);
app.listen(port, () => console.log('app listening on port: '+port))
