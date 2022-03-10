const CleanFunctionName = function (name)
{
    const hashPos = name.indexOf('#');

    return (hashPos === -1) ? '' : name.substring(hashPos + 1);
};

module.exports = CleanFunctionName;
