const CleanFunctionParent = function (name)
{
    const hashPos = name.indexOf('#');

    return (hashPos === -1) ? name : name.substring(0, hashPos);
};

module.exports = CleanFunctionParent;
