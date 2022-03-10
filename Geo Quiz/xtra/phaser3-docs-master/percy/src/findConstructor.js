function findConstructor (module, src)
{
    var namespace = $('#class').val();

    //  Now we have the module name, we can scan for the function, starting from the top (and ignoring any local functions)

    var components = [];
    var extend = false;
    var search = '    function ' + module + ' (';
    var scanLength = search.length;
    var parameters;

    var classStart = -1;
    var classSearch = 'new Class({';
    var classScanLength = classSearch.length;

    var start = -1;
    var end = -1;

    for (var i = 0; i < src.length; i++)
    {
        var line = src[i];

        if (classStart === -1 && line.substr(-classScanLength) === classSearch)
        {
            classStart = i;
        }

        if (line.substr(0, 12) === '    Extends:')
        {
            extend = line.substr(12).trim();
            extend = extend.replace(',', '');
        }

        // Mixins: [
        //     Components.Alpha,
        //     Components.BlendMode,
        //     
        //     to
        //     
        //     Phaser.GameObjects.Components.Alpha

        if (line.substr(0, 19) === '        Components.')
        {
            var component = line.trim();

            component = component.replace(',', '');

            // component = 'Phaser.GameObjects.' + component;

            components.push(component)
        };

        if (start === -1 && line.substr(0, scanLength) === search)
        {
            start = i;
            parameters = extractParameters(line);
        }

        if (start !== -1 && line === '    },')
        {
            end = i;
            break;
        }
    }

    return {
        className: module,
        memberOf: namespace,
        extends: extend,
        components: components,
        constructor: {
            parameters: parameters,
            classStart: classStart,
            start: start,
            end: end,
            properties: []
        }
    };
}
