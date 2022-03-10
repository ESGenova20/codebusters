const GetPath = function (path)
{
    // "D:\\wamp\\www\\phaser\\src\\gameobjects\\zone"

    var i = path.indexOf('src');

    if (i === -1)
    {
        return path;
    }

    var section = path.substr(i + 4);

    return section.replace(/\\/g, '/');
};

module.exports = GetPath;
