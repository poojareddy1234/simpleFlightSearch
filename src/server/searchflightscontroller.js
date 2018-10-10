var couchbase = require('couchbase');

module.exports = {
    ins: function () {

        var cluster = (new couchbase.Cluster('http://localhost:8091?detailed_errcodes=1'));//.openBucket('flights','password',function(){});
        cluster.authenticate('Administrator', 'password');
        var bucket = cluster.openBucket('flights', function (err) {
            console.log(err);
            bucket.operationTimeout = 120 * 1000;
            bucket.insert('1160', {
                "flightNumber": "1160",
                "carrier": "UA",
                "origin": "IAH",
                "departure": "2018-09-11T12:05:00",
                "destination": "ORD",
                "arrival": "2018-09-11T14:38:00",
                "aircraft": "Boeing 737-800",
                "distance": 925,
                "travelTime": "02:41",
                "status": "Arrived at Gate"

            }, function (err, result) {
                if (err) {
                    console.log("error");
                    console.log(err)
                } else {
                    console.log("success");
                    console.log(result)
                }
            })
        });
        // add a document to a bucket

    },

    selectdoc: function (flightNumber, dateOfjrny) {
        return new Promise((resolve, reject) => {
            var cluster = (new couchbase.Cluster('http://localhost:8091?detailed_errcodes=1'));//.openBucket('flights','password',function(){});
            cluster.authenticate('Administrator', 'password');
            var n1ql = 'SELECT d.* FROM `flights` d WHERE flightNumber = $1 and departure LIKE \''+dateOfjrny+'%\'';
            var query = couchbase.N1qlQuery.fromString(n1ql)
            console.log(flightNumber);
            console.log(query);
            var bucket = cluster.openBucket("flights", function (err) {
                bucket.query(query, [flightNumber], function (err, result) {
                    if (err) {
                        console.log("error");
                        console.log(err)
                    } else {
                        console.log("success");
                        console.log(result);
                        resolve(result);
                    }
                })
            });

        });
    },
    updateDatedoc: function () {
        return new Promise((resolve, reject) => {
            var cluster = (new couchbase.Cluster('http://localhost:8091?detailed_errcodes=1'));//.openBucket('flights','password',function(){});
            cluster.authenticate('Administrator', 'password');
            var date=new Date();
            var n1ql = 'update `flights` set departure=\''+date+'\' and arrival=\''+date+'\'';
            var query = couchbase.N1qlQuery.fromString(n1ql)
            console.log(query);
            console.log(date);
            var bucket = cluster.openBucket("flights", function (err) {
                bucket.query(query, function (err, result) {
                    if (err) {
                        console.log("error");
                        console.log(err)
                    } else {
                        console.log("success");
                        console.log(result);
                        resolve(result);
                    }
                })
            });

        });
    },
    selectdocByOrigin: function (origin, destination, dateOfjrny) {
        return new Promise((resolve, reject) => {
            var cluster = (new couchbase.Cluster('http://localhost:8091?detailed_errcodes=1'));//.openBucket('flights','password',function(){});
            cluster.authenticate('Administrator', 'password');
            var n1ql = 'SELECT d.* FROM `flights` d WHERE origin = $1 and destination= $2 and departure LIKE \''+dateOfjrny+'%\''
            var query = couchbase.N1qlQuery.fromString(n1ql)
            console.log(origin);
            console.log(dateOfjrny);
            var bucket = cluster.openBucket("flights", function (err) {
                bucket.query(query, [origin, destination], function (err, result) {
                    if (err) {
                        console.log("error");
                        console.log(err)
                    } else {
                        console.log("success");
                        console.log(result);
                        resolve(result);
                    }
                })
            });

        });
    }

}