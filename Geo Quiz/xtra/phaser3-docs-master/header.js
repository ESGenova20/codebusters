var fs = require('fs');
var dirTree = require('directory-tree');
var prependFile = require('prepend-file');

var rootDir = '../phaser/src/';
var txt = `/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2019 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

`;

var filteredTree = dirTree(rootDir, { extensions: /\.js$/ }, (item, PATH) => {

    var where = item.path.replace('..\\phaser\\src\\', '');

    if (where.substr(0, 21) !== 'physics\\matter-js\\lib' && where.substr(0, 9) !== 'polyfills')
    {
        console.log(item.path);
        prependFile.sync(item.path, txt);
    }

});
