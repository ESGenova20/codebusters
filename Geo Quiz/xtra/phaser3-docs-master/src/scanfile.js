var fs = require('fs-extra');
var extract = require('extract-comments');
var beautify = require('json-beautify');
var doctrine = require('doctrine');

var CONFIG = require('./config');

var ScanFile = function (source, filename)
{
    fs.readFile(source, 'utf8', (err, data) => {

        if (err)
        {
            throw err;
        }

        var comments = [];
        var blocks = extract.block(data);

        for (var i = 0; i < blocks.length; i++)
        {
            var block = blocks[i];

            comments.push(doctrine.parse(block.value, CONFIG.DOCTRINE));
        }

        // comments = JSON.stringify(comments);
        comments = beautify(comments, null, 2, 100); // just for debugging really
        // comments = beautify(blocks, null, 2, 100); // just for debugging really

        fs.writeFile(CONFIG.DEST_PATH + filename, comments, { encoding: 'utf8', flag: 'w' }, function (error) {

            if (error)
            {
                throw error;
            }
            else
            {
                console.log(filename, 'saved');
            }

        });

    });
};

module.exports = ScanFile;
