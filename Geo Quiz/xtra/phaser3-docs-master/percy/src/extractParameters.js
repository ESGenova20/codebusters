function extractParameters (line)
{
    var start = line.indexOf('(') + 1;
    var end = line.lastIndexOf(')');

    //  Catch broken function declarations

    if (start === -1 || end === -1)
    {
        return false;
    }

    //  Catch: function ()

    if (end === start)
    {
        return [];
    }

    var extraction = line.substring(start, end);

    var args = extraction.split(',');

    args.forEach(function(value, index, array) {
        array[index] = {
            name: value.trim(),
            type: '[type]',
            description: '[description]',
            optional: false
        };
    });

    // console.log(args);

    return args;
}
