'use strict';
var express = require('express');
var router = express.Router();
var _ = require('lodash');
var RouteDefs = require('./route-defs.class.js').class;
var routeDefs = new RouteDefs().getDefs();
var debug = require('debug')('routing');

router.all('*', function(req, res) {
  var routeDef, regexp, sanitizedOgUrl;

  debug('handling request', req.url);

  // the RegExp constructor will escape forward slashes, but not question marks
  sanitizedOgUrl = req.url
    .replace('?', '\\?')
    .replace('$', '\\$')
    .replace('^', '\\^');

  regexp = new RegExp(sanitizedOgUrl);

  debug('regexp based off request', regexp);

  routeDef = _.find(routeDefs, function routeDefFinder (routeDef) {
    var doUrlsMatch = regexp.test(routeDef.request.url),
        doMethodsMatch = routeDef.request.method === req.method;
    return doUrlsMatch && doMethodsMatch;
  });

  if (routeDef) {
    if (routeDef.response.headers) {
      _.each(routeDef.response.headers, function (headerObj) {
        switch (headerObj.name) {
          case 'Content-Encoding':
            break;
          default:
            res.set(headerObj.name, headerObj.value);
        }
      });
    }

    debug('sending back response', routeDef.response.content.mimeType);
    res.type(routeDef.response.content.mimeType);
    res.status(200);

    if (routeDef.response.content.mimeType === 'application/json') {
      debug('response content', JSON.parse(routeDef.response.content.text));
      res.json(JSON.parse(routeDef.response.content.text));
    } else {
      debug('response content', routeDef.response.content.text);
      res.send(routeDef.response.content.text);
    }

    return;
  } else if (req.url === '/favicon.ico') {
    res.status(404).send();
    return;
  }

  res.status(404).send('Error! API endpoint not found.');
});

module.exports = router;
