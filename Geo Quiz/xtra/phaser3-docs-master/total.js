var fs = require('fs');
var dirTree = require('directory-tree');
var stringOccurrence = require('string-occurrence');

var rootDir = '../phaser/src/';
var output = './desc.txt';

var total = 0;
var subtotal = 0;
var dump = '';
var prevFolder = '';

var filteredTree = dirTree(rootDir, { extensions: /\.js$/ }, (item, PATH) => {

    var file = fs.readFileSync(item.path, 'utf8');

    var fileTotal = stringOccurrence(file, '[description]');

    if (fileTotal > 0)
    {
        item.path = item.path.replace('..\\phaser\\src\\', '');
        item.path = item.path.replace('.js', '');

        var folder = item.path.substr(0, item.path.indexOf('\\'));

        if (prevFolder === '')
        {
            prevFolder = folder;
        }

        if (folder !== prevFolder)
        {
            console.log(prevFolder, '=', subtotal);

            dump = dump.concat('\n' + prevFolder + ' total = ' + subtotal + '\n\n');

            prevFolder = folder;
            subtotal = fileTotal;
        }
        else
        {
            subtotal += fileTotal;
        }

        dump = dump.concat(item.path + ' = ' + fileTotal + '\n');

        // console.log(item.path, '=', fileTotal);

        total += fileTotal;
    }

});

console.log(prevFolder, 'total', subtotal);

dump = dump.concat(prevFolder + ' total = ' + subtotal + '\n\n');

console.log('Total: ' + total);

dump = dump.concat('Total: ' + total);

fs.writeFile(output, dump, function (error) {

    if (error)
    {
        throw error;
    }
    else
    {
        console.log('desc.txt saved');
    }

});
