function findComponent (module, src)
{
    var namespace = $('#class').val();

    //  Now we have the module name, we can scan for the component object, starting from the top (and ignoring any local functions)

    var componentStart = -1;
    var componentSearch = 'var ' + module + ' = {';
    var componentScanLength = componentSearch.length;

    for (var i = 0; i < src.length; i++)
    {
        var line = src[i];

        if (componentStart === -1 && line === componentSearch)
        {
            componentStart = i;
            break;
        }
    }

    return {
        componentName: module,
        memberOf: namespace,
        componentStart: componentStart
    };
}
