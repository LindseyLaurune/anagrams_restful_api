
const url = require('url');


exports.sampleRequest = function (req, res, map) {
    //var calc = require('./calculations.js');
    //var test = calc.mapCalc("hi");
    const reqUrl = url.parse(req.url, true);
    var name = 'World';
    if (reqUrl.query.name) {
        name = reqUrl.query.name;
        results = name.split('').sort().join('').toLowerCase();
       
    }
   
    var response = {
         "anagrams" : map[results]

    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
};

exports.testRequest = function (req, res, map) {
    body = '';

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {

        postBody = JSON.parse(body);

        var response = {
            "text": "Post Request Value is  " + postBody.words
        };
        var str1 = [];
        var str1 = JSON.stringify(postBody.words).replace('[','').replace(']','').replace(/['"]+/g, '').split(',');
        var end1 = [];
        str1.forEach(function(item){
            end1= item.split('').sort().join('').toLowerCase();
                if (undefined === Object.prototype.setdefault) {
                Object.prototype.setdefault = function(key, def) {
                    if (! this.hasOwnProperty(key)) {
                        this[key] = def;
                    }
                    return this[key];
                };
            }

            map.setdefault(end1, []).push(item);
            console.log(item);
        });

        
        //results= postBody.words.split('').sort().join('').toLowerCase();
          /*  if (undefined === Object.prototype.setdefault) {
            Object.prototype.setdefault = function(key, def) {
                if (! this.hasOwnProperty(key)) {
                    this[key] = def;
                }
                return this[key];
            };
        }
        
        map.setdefault(results, []).push(textByLine[i]);*/

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(postBody.words));
    });
};

exports.invalidRequest = function (req, res, map) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};
