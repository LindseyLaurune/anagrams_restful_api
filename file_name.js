
  
const http = require('http');
const url = require('url');

    var results = [];
    var fs = require('fs');
    var textByLine = fs.readFileSync('dictionary.txt').toString().toLowerCase().split("\n");
    const map = {};
    for(var i=0;i<textByLine.length;i++)
    {
        results[i] = textByLine[i].split('').sort().join('').toLowerCase();
            if (undefined === Object.prototype.setdefault) {
            Object.prototype.setdefault = function(key, def) {
                if (! this.hasOwnProperty(key)) {
                    this[key] = def;
                }
                return this[key];
            };
        }
        
        map.setdefault(results[i], []).push(textByLine[i]);
    }
    /*for(var i=0;i<20;i++)
    {
        console.log(results[i]+ " "+map[results[i]]);
    }*/
    

module.exports = http.createServer((req, res, map) => {

    var service = require('./service.js');
    const reqUrl = url.parse(req.url, true);

    // GET Endpoint
    if (reqUrl.pathname == '/anagrams' && req.method === 'GET') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            map[results[5]]);

        service.sampleRequest(req, res, map);

        // POST Endpoint
    } else if (reqUrl.pathname == '/test' && req.method === 'POST') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        service.testRequest(req, res,map);

    } else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqUrl.pathname);

        service.invalidRequest(req, res, map);

    }
});


