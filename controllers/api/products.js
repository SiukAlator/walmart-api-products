var MongoClient = require('mongodb').MongoClient;
var url = process.env.DATABASE_URL;
var async = require('async');


exports.getAllProducts = function (req, res) {
    async.waterfall(
        [
            function (callback) {
                return getData(callback);
            },
            function (resultado, callback) {
                res.send(resultado);
            }
        ],
        function (err, status) {
            res.send({ "code": "500", "message": "Internal Error", "str": err });
        }
    );

    function getData(cb) {

        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            let dbo = db.db("promotions");
            dbo.collection("products").find({}).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                return cb(null, result);
            });
        });
    }
}

exports.searchProduct = function (req, res) {
    let strIn = req.headers.str_in;
    let isPal = false;
    async.waterfall(
        [
            function (callback) {
                return isPalindrome(callback);
            },
            function (resultado, callback) {
                return getData(callback);
            },
            function (resultado, callback) {
                res.send({"is_pal": isPal, "data": resultado});
            }
        ],
        function (err, status) {
            res.send({ "code": "500", "message": "Internal Error", "str": err });
        }
    );

    function isPalindrome(cb) {
        let re = /[\W_]/g;
        let lowRegStr = strIn.toLowerCase().replace(re, '');
        let reverseStr = lowRegStr.split('').reverse().join(''); 
        if (reverseStr === lowRegStr)
            isPal = true;
        return cb(null, null);
      }
    function getData(cb) {
        let re = new RegExp(strIn);
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            let dbo = db.db("promotions");
            dbo.collection("products").find({
                $or:
                    [
                        { "brand": re },
                        { "description": re },
                        { "id": parseInt(strIn)}
                ]
            }).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                return cb(null, result);
            });
        });
    }
}