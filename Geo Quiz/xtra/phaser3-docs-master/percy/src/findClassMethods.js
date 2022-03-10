function findClassMethods (data, src)
{
    var start = data.constructor.end + 1;

    //  Let's scan for function brackets:

    var methods = [];

    var firstLine = false;

    var searchStart = '    {';
    var scanLengthStart = searchStart.length;
    var methodStart = -1;

    var searchEnd = '    }';
    var scanLengthEnd = searchEnd.length;
    var methodEnd = -1;

    for (var i = start; i < src.length; i++)
    {
        var line = src[i];

        if (methodStart === -1 && line.substr(0, scanLengthStart) === searchStart)
        {
            methodStart = i - 1;
        }
        else if (methodStart > -1 && methodEnd === -1 && line.substr(0, scanLengthEnd) === searchEnd)
        {
            methodEnd = i;

            var methodName = src[methodStart].substr(4, src[methodStart].search(/:/g) - 4);

            var parameters = extractParameters(src[methodStart]);
            
            var returnThis = false;
            var returnNull = false;
            var returnValue = false;

            //  Let's try and find return statements

            for (var i = methodStart; i <= methodEnd; i++)
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
            var method = {
                name: methodName,
                parameters: parameters,
                start: methodStart,
                end: methodEnd,
                match: src[methodStart],
                hasReturn: (returnThis || returnNull || returnValue),
                returns: {
                    this: returnThis,
                    null: returnNull,
                    value: returnValue,
                    type: '[type]'
                }
            };

            // console.log(method);

            methods.push(method);

            if (!firstLine)
            {
                data.methodsStart = methodStart;
                firstLine = true;
            }

            methodStart = -1;
            methodEnd = -1;
        }
    }

    data.methods = methods;

    return data;
}
