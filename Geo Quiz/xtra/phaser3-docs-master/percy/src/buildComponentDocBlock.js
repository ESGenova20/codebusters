/**
 * Provides methods used for setting the alpha properties of a Game Object.
 * Should be applied as a mixin and not used directly.
 * 
 * @name Phaser.GameObjects.Components.Alpha
 * @since 3.0.0
 */

function buildDocBlock (data, src)
{
    var componentName = data.componentName;
    var namespace = data.memberOf + '.' + data.componentName;

    var docblock = [];

    docblock.push('/**');
    docblock.push(' * [description]');
    docblock.push(' *');
    docblock.push(' * @name ' + namespace);
    docblock.push(' * @since 3.0.0');
    docblock.push(' */');

    /**
     * Clears all alpha values associated with this Game Object.
     * Immediately sets the alpha levels back to 1 (fully opaque)
     *
     * @method Phaser.GameObjects.Components.Alpha#clearAlpha
     * @since 3.0.0
     *
     * @param
     * 
     * @return {Phaser.GameObjects.GameObject} This Game Object instance.
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

    /**
     * The alpha value of the Game Object.
     *
     * This is a global value, impacting the entire Game Object, not just a region of it.
     * 
     * @name Phaser.GameObjects.Components.Alpha#alpha
     * @type {float}
     * @since 3.0.0
     */
    var getGetterBlock = function (getter)
    {
        var docblock = [];

        docblock.push('    /**');
        docblock.push('     * [description]');
        docblock.push('     *');
        docblock.push('     * @name ' + namespace + '#' + getter.name);
        docblock.push('     * @type {[type]}');
        docblock.push('     * @since 3.0.0');
        docblock.push('     */');

        return docblock;
    };

    var out = [];

    var addedHeader = false;
    var methods = data.methods;
    var getters = data.getters;

    for (var i = 0; i < src.length; i++)
    {
        var line = src[i];
        var found = false;

        if (i === data.componentStart)
        {
            addedHeader = true;
            out = out.concat(docblock);
            out.push(src[i]);
        }
        else if (addedHeader)
        {
            for (var m = 0; m < methods.length; m++)
            {
                if (line === methods[m].match)
                {
                    out = out.concat(getMethodBlock(methods[m]));
                    out.push(line);
                    found = true;
                }
            }

            for (var g = 0; g < getters.length; g++)
            {
                if (line === getters[g].match)
                {
                    out = out.concat(getGetterBlock(getters[g]));
                    out.push(line);
                    found = true;
                }
            }

            if (!found)
            {
                out.push(line);
            }
        }
        else
        {
            out.push(line);
        }
    }

    return out;
}
