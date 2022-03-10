function findFunction (module, src, glue)
{
    var className = $('#class').val() + glue + module;

    //  Now we have the module name, we can scan for the function, starting from the top (and ignoring any local functions)

    var functionString = 'var ' + module + ' = function';
    var scanLength = functionString.length;
    var parameters;
    var functionStartLine = -1;
    var functionEndLine = -1;

    for (var i = 0; i < src.length; i++)
    {
        var line = src[i].trim();

        if (functionStartLine === -1 && line.substr(0, scanLength) === functionString)
        {
            functionStartLine = i;
            parameters = extractParameters(line);
        }

        if (functionStartLine !== -1 && line === '};')
        {
            functionEndLine = i;
            break;
        }
    }

    var returnThis = false;
    var returnNull = false;
    var returnValue = false;

    //  Let's try and find return statements

    if (functionStartLine !== -1 && functionEndLine !== -1)
    {
        for (var i = functionStartLine; i <= functionEndLine; i++)
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
    }

    return {
        className: className,
        parameters: parameters,
        start: functionStartLine,
        end: functionEndLine,
        hasReturn: (returnThis || returnNull || returnValue),
        returns: {
            this: returnThis,
            null: returnNull,
            value: returnValue,
            type: '[type]'
        }
    };
}
