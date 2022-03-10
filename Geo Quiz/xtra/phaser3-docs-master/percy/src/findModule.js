//  Scan for the module export (from the bottom, as it's usually the last line of the file)
function findModule (src)
{
    var module = '';

    for (var i = src.length - 1; i > 0; i--)
    {
        var line = src[i].trim();

        if (line.substr(0, 14) === 'module.exports')
        {
            module = line.substr(17);
            module = module.replace(';', '');
            break;
        }
    }

    // console.log('Module:', module);

    return module;
}
