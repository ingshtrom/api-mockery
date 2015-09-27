'use strict';

var fs = require('fs'),
    path = require('path'),
    _ = require('lodash');

class RouteDefs {
    constructor () {
        var fstat, harFileLocation;

        console.log('[RouteDefs.constructor()] => file located at ', process.env.FILE);

        harFileLocation = process.env.FILE;
        fstat = fs.statSync(harFileLocation);

        if (!fstat.isFile()) {
            console.error('The path given was not a file: ', harFileLocation);
            process.exit(1);
        }

        if (!path.isAbsolute(harFileLocation)) {
            console.error('The path given was not absolute: ', harFileLocation);
            process.exit(1);
        }

        this.harFileLocation = harFileLocation;
    }

    getDefs () {
        if (!this.parsedContents) {
            this.parse();
        }
        return this.parsedContents;
    }

    getPOST () {
    }

    parse () {
        var tmpContents, harFileRawContent;
        console.log('[RouteDefs.parse()] => starting to parse the .har file located at ' + this.harFileLocation);
        tmpContents = [];

        console.log('[RouteDefs.parse()] => Reading from the har file. This could take a while...');
        harFileRawContent = JSON.parse(fs.readFileSync(this.harFileLocation, 'utf8'));
        console.log('[RouteDefs.parse()] => Done reading the har file. Now time to process!');

        console.log('[RouteDefs.parse()] => .har version: ' + harFileRawContent.log.version);
        console.log('[RouteDefs.parse()] => creator: ' + JSON.stringify(harFileRawContent.log.creator));

        // parse the darn thang!
        console.log('[RouteDefs.parse()] => looping through log entries...');
        _.each(harFileRawContent.log.entries, function (entry) {
            tmpContents.push(entry);
        });
        console.log('[RouteDefs.parse()] => found a total of ' + tmpContents.length + ' entries.');

        this.parsedContents = tmpContents;
        console.log('[RouteDefs.parse()] => done parsing the .har file');
    }
}

module.exports.class = RouteDefs;