function findComponentFunctions (data, src)
{
    var start = data.componentStart + 1;

    //  Let's scan for function brackets:

    var components = [];
    var getters = [];

    var firstLine = false;

    var searchStart = '    {';
    var scanLengthStart = searchStart.length;
    var componentStart = -1;

    var getterSearchStart = '        get: function ()';
    var getterScanLengthStart = getterSearchStart.length;

    var searchEnd = '    }';
    var scanLengthEnd = searchEnd.length;
    var componentEnd = -1;
    
    var isGetter = false;

    for (var i = start; i < src.length; i++)
    {
        var line = src[i];

        if (componentStart === -1 && line.substr(0, scanLengthStart) === searchStart)
        {
            componentStart = i - 1;
        }
        else if (componentStart === -1 && line.substr(0, getterScanLengthStart) === getterSearchStart)
        {
            componentStart = i - 2;

            var getterName = src[componentStart].substr(4, src[componentStart].search(/:/g) - 4);

            var getter = {
                name: getterName,
                start: componentStart,
                match: src[componentStart]
            };

            isGetter = true;

            getters.push(getter);
        }
        else if (componentStart > -1 && componentEnd === -1 && line.substr(0, scanLengthEnd) === searchEnd)
        {
            if (isGetter)
            {
                isGetter = false;
                componentStart = -1;
                componentEnd = -1;
                continue;
            }

            componentEnd = i;

            var componentName = src[componentStart].substr(4, src[componentStart].search(/:/g) - 4);

            var parameters = extractParameters(src[componentStart]);
            
            var returnThis = false;
            var returnNull = false;
            var returnValue = false;

            //  Let's try and find return statements

            for (var i = componentStart; i <= componentEnd; i++)
            {
                var line = src[i];

                if (line.indexOf('return this') !== -1)
                {
                    returnThis = true;
                }
                else if (line.indexOf('return null') !== -1)
                {
                    returnNull = true;
                }
                else if (line.indexOf('return') !== -1)
                {
                    returnValue = true;
                }
            }

            //  We've got the start and end, let's extract it
            var component = {
                name: componentName,
                parameters: parameters,
                start: componentStart,
                end: componentEnd,
                match: src[componentStart],
                hasReturn: (returnThis || returnNull || returnValue),
                returns: {
                    this: returnThis,
                    null: returnNull,
                    value: returnValue,
                    type: '[type]'
                }
            };

            // console.log(component);

            components.push(component);

            componentStart = -1;
            componentEnd = -1;
        }
    }

    data.methods = components;
    data.getters = getters;

    return data;
}
