'use strict';
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var mongurl = 'mongodb://172.25.165.67:27017/healthRecords';
var fs = require('file-system');
var path = require("path");
var express = require('express');
var cors = require('cors');
var walk = require('walk');
var app = express();
app.use(cors());
app.get('/records', function(req, res) {
    console.log("inside app get");
    var array123 = [];
    MongoClient.connect(mongurl, function(err, db) {
        var callback = function(a) {
            console.log('its completed' + res);
            for (var i = 0; i < a.length; i++) {
              a[i].record = JSON.parse(a[i].record);
            }
            for (var i = 0; i < a.length; i++) {
              a[i].record.recovery = {
                "Diabetic_Fasting" : [],
                "Diabetic_Non_Fasting" : [],
                "BP_Score_systolic" : [],
                "BP_Score_diastolic" : [],
                "BMI" : [],
                "Family_History" : "Y",
                "Smoking" : "Y"
              }
              for (var j = 0; j < 12; j++) {
                a[i].record.recovery.Diabetic_Fasting.push(Math.floor(Math.random()*(150-70+1)+70));
                a[i].record.recovery.Diabetic_Non_Fasting.push(Math.floor(Math.random()*(220-90+1)+90));
                a[i].record.recovery.BP_Score_systolic.push(Math.floor(Math.random()*(100-50+1)+50));
                a[i].record.recovery.BP_Score_diastolic.push(Math.floor(Math.random()*(200-80+1)+80));
                a[i].record.recovery.BMI.push(Math.floor(Math.random()*(55-15+1)+15));
              }
            }
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
});
var port = 8086;
app.listen(port);
console.log("app listening on port: "+port);
