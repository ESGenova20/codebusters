    /**
     * [description]
     *
     * @class AnimationManager
     * @memberOf Phaser.Animations
     * @constructor
     * @since 3.0.0
     * 
     * @param {Phaser.Game} game - [description]
     */

        /**
         * [description]
         *
         * @name namespace#property
         * @type {Phaser.Game}
         * @protected
         * @since 3.0.0
         */

    /**
     * [description]
     *
     * @method Phaser.Curves.Curve#getSpacedPoints
     * @since 3.0.0
     *
     * @param {integer} [divisions] - [description]
     *
     * @return {Phaser.Math.Vector2[]} [description]
     */

function buildDocBlock (data, src)
{
    // {
    //     className: module,
    //     memberOf: namespace,
    //     extends: extend,
    //     components: components,
    //     constructor: {
    //         parameters: parameters,
    //         start: start,
    //         end: end,
    //         properties: []
    //     }
    // }

    var className = data.className;

    var docblock = [];

    docblock.push('/**');
    docblock.push(' * @classdesc');
    docblock.push(' * [description]');
    docblock.push(' *');
    docblock.push(' * @class ' + className);

    if (data.extends)
    {
        docblock.push(' * @extends ' + data.memberOf + '.' + data.extends);
    }

    docblock.push(' * @memberOf ' + data.memberOf);
    docblock.push(' * @constructor');
    docblock.push(' * @since 3.0.0');

    if (data.components.length > 0)
    {
        docblock.push(' *');

        for (var i = 0; i < data.components.length; i++)
        {
            docblock.push(' * @extends ' + data.memberOf + '.' + data.components[i]);
        }
    }

    if (data.constructor.parameters.length > 0)
    {
        docblock.push(' *');

        for (var i = 0; i < data.constructor.parameters.length; i++)
        {
            var param = data.constructor.parameters[i];

            var name = param.name;

            if (param.optional)
            {
                name = '[' + name + ']';
            }

            docblock.push(' * @param {' + param.type + '} ' + name + ' - ' + param.description);
        }
    }

    docblock.push(' */');

    var namespace = data.memberOf + '.' + data.className;

    //  Inject the constructor docblock into the output

        /**
         * [description]
         *
         * @name namespace#property
         * @type {Phaser.Game}
         * @protected
         * @since 3.0.0
         */


    var getLine = function (lineNumber, data, src)
    {
        var props = data.constructor.properties;
        var found = false;
        var result = []

        for (var i = 0; i < props.length; i++)
        {
            var prop = props[i];

            if (prop.line === lineNumber)
            {
                result.push('');
                result.push('        /**');
                result.push('         * ' + prop.description);
                result.push('         *');
                result.push('         * @name ' + namespace + '#' + prop.name);
                result.push('         * @type {' + prop.type + '}');

                if (prop.private)
                {
                    result.push('         * @private');
                }

                if (prop.default !== '')
                {
                    result.push('         * @default ' + prop.default);
                }

                result.push('         * @since 3.0.0');
                result.push('         */');

                break;
            }
        }

        result.push(src[lineNumber]);

        return result;
    };

    /**
     * [description]
     *
     * @method Phaser.Curves.Curve#getSpacedPoints
     * @since 3.0.0
     *
     * @param {integer} [divisions] - [description]
     *
     * @return {Phaser.Math.Vector2[]} [description]
     */
    var getMethodBlock = function (method)
    {
        var docblock = [];

        docblock.push('    /**');
        docblock.push('     * [description]');
        docblock.push('     *');
        docblock.push('     * @method ' + namespace + '#' + method.name);
        docblock.push('     * @since 3.0.0');

        if (method.parameters.length > 0)
        {
            docblock.push('     *');

            for (var i = 0; i < method.parameters.length; i++)
            {
                var param = method.parameters[i];

                var name = param.name;

                if (param.optional)
                {
                    name = '[' + name + ']';
                }

                docblock.push('     * @param {' + param.type + '} ' + name + ' - ' + param.description);
            }
        }

        if (method.hasReturn)
        {
            docblock.push('     *');
            docblock.push('     * @return {' + method.returns.type + '} [description]');
        }

        docblock.push('     */');

        return docblock;
    };

    var out = [];

    for (var i = 0; i < src.length; i++)
    {
        if (i === data.constructor.classStart)
        {
            out = out.concat(docblock);
            out.push(src[i]);
        }
        else
        {
            out = out.concat(getLine(i, data, src));
        }
    }

    var out2 = [];

    //  Inject method blocks
    var methods = data.methods;

    for (var i = 0; i < out.length; i++)
    {
        var line = out[i];
        var found = false;

        for (var m = 0; m < methods.length; m++)
        {
            if (line === methods[m].match)
            {
                out2 = out2.concat(getMethodBlock(methods[m]));
                out2.push(line);
                found = true;
            }
        }

        if (!found)
        {
            out2.push(line);
        }
    }

    return out2;
}
