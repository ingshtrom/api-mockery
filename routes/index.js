var express = require('express');
var router = express.Router();
var _ = require('lodash');
var RouteDefs = require('./route-defs.class.js').class;

var routeDefs = new RouteDefs().getDefs();
// var routeDefs = [
  // {
  //   id: 'foobar',
  //   path: '/foobar',
  //   response: {
  //     content: '{'a':'b','c':4}'
  //   }
  // }
//   {
//         'startedDateTime': '2015-09-26T23:46:12.751Z',
//         'time': 41.38199999988501,
//         'request': {
//           'method': 'GET',
//           'url': 'http://192.168.1.64:8080/current_user/security_actions?action=UPDATE_BUSINESS',
//           'httpVersion': 'HTTP/1.1',
//           'headers': [
//             {
//               'name': 'Pragma',
//               'value': 'no-cache'
//             },
//             {
//               'name': 'Origin',
//               'value': 'http://192.168.1.64:8888'
//             },
//             {
//               'name': 'Accept-Encoding',
//               'value': 'gzip, deflate, sdch'
//             },
//             {
//               'name': 'Host',
//               'value': '192.168.1.64:8080'
//             },
//             {
//               'name': 'Accept-Language',
//               'value': 'en-US,en;q=0.8,nb;q=0.6'
//             },
//             {
//               'name': 'Authorization',
//               'value': '41efd2ca-3551-454d-a4d5-774f77fc2e8e'
//             },
//             {
//               'name': 'Accept',
//               'value': 'application/json, text/plain, */*'
//             },
//             {
//               'name': 'Cache-Control',
//               'value': 'no-cache'
//             },
//             {
//               'name': 'User-Agent',
//               'value': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.99 Safari/537.36'
//             },
//             {
//               'name': 'Connection',
//               'value': 'keep-alive'
//             },
//             {
//               'name': 'Referer',
//               'value': 'http://192.168.1.64:8888/'
//             },
//             {
//               'name': 'DNT',
//               'value': '1'
//             }
//           ],
//           'queryString': [
//             {
//               'name': 'action',
//               'value': 'UPDATE_BUSINESS'
//             }
//           ],
//           'cookies': [],
//           'headersSize': 550,
//           'bodySize': 0
//         },
//         'response': {
//           'status': 200,
//           'statusText': 'OK',
//           'httpVersion': 'HTTP/1.1',
//           'headers': [
//             {
//               'name': 'Pragma',
//               'value': 'no-cache'
//             },
//             {
//               'name': 'Content-Encoding',
//               'value': 'gzip'
//             },
//             {
//               'name': 'X-Content-Type-Options',
//               'value': 'nosniff'
//             },
//             {
//               'name': 'Server',
//               'value': 'Jetty(7.2.1.v20101111)'
//             },
//             {
//               'name': 'X-Frame-Options',
//               'value': 'DENY'
//             },
//             {
//               'name': 'Content-Type',
//               'value': 'application/json;charset=UTF-8'
//             },
//             {
//               'name': 'Access-Control-Allow-Origin',
//               'value': 'http://192.168.1.64:8888'
//             },
//             {
//               'name': 'Cache-Control',
//               'value': 'no-cache, no-store, max-age=0, must-revalidate'
//             },
//             {
//               'name': 'Access-Control-Allow-Credentials',
//               'value': 'true'
//             },
//             {
//               'name': 'Transfer-Encoding',
//               'value': 'chunked'
//             },
//             {
//               'name': 'X-XSS-Protection',
//               'value': '1; mode=block'
//             },
//             {
//               'name': 'Expires',
//               'value': '0'
//             }
//           ],
//           'cookies': [],
//           'content': {
//             'size': 42,
//             'mimeType': 'application/json',
//             'compression': -35,
//             'text': '[{\"name\":\"UPDATE_BUSINESS\",\"active\":true}]'
//           },
//           'headersSize': 426,
//           'bodySize': 77,
//           '_transferSize': 503
//         },
//         'cache': {},
//         'timings': {
//           'blocked': 0.556999999844265,
//           'dns': -1,
//           'connect': -1,
//           'send': 0.07899999991423101,
//           'wait': 40.1959999999235,
//           'receive': 0.5500000002030134,
//           'ssl': -1
//         },
//         'connection': '19888',
//         'pageref': 'page_1'
//       }
// ];

router.get('*', function(req, res) {
  'use strict';
  var routeDef, regexp, sanitizedOgUrl;

  // the RegExp constructor will escape forward slashes, but not question marks
  sanitizedOgUrl = req.originalUrl.replace('?', '\\?')
  regexp = new RegExp(sanitizedOgUrl);

  routeDef = _.find(routeDefs, function routeDefFinder (routeDef) {
    console.log('routeDefFinder', req.originalUrl, routeDef.request.url, regexp);
    return regexp.test(routeDef.request.url);
  });

  if (routeDef) {
    if (routeDef.headers) {
      _.each(routeDef.headers, function routeDefHeadersIterator (headerObj) {
        res.set(headerObj.name, headerObj.value);
      });
    }
    res.type(routeDef.response.content.mimeType);
    res.status(200).send(routeDef.response.content.text);
    console.log('sent response => ', res);
    return;
  } else if (req.originalUrl === '/favicon.ico') {
    res.status(500).send();
    return;
  }

  res.status(500).send('Error! API endpoint not found.');
  console.log('req', req);
});

module.exports = router;
