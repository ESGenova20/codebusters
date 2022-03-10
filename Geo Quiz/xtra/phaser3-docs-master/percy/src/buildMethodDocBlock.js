/**
 * [description]
 *
 * @method Phaser.Animations.AnimationManager#add
 * @fires AddAnimationEvent
 * @since 3.0.0
 * 
 * @param {string} key - [description]
 * @param {Phaser.Animations.Animation} animation - [description]
 * 
 * @return {Phaser.Animations.AnimationManager} The Animation Manager for method chaining.
 */

function buildDocBlock (module, data, src)
{
    //  Build the method docblock:

    var className = data.className;

    var docblock = [];

    docblock.push('/**');
    docblock.push(' * [description]');
    docblock.push(' *');
    docblock.push(' * @method ' + className);
    docblock.push(' * @since 3.0.0');

    if (data.parameters.length > 0)
    {
        docblock.push(' *');

        for (var i = 0; i < data.parameters.length; i++)
        {
            var param = data.parameters[i];

            var name = param.name;

            if (param.optional)
            {
                name = '[' + name + ']';
            }

            docblock.push(' * @param {' + param.type + '} ' + name + ' - ' + param.description);
        }
    }
    
    if (data.hasReturn)
    {
        docblock.push(' *');
        docblock.push(' * @return {' + data.returns.type + '} [description]');
    }

    docblock.push(' */');

    //  Inject the docblock into the source and put into the output

    var out = [];

    for (var i = 0; i < src.length; i++)
    {
        var line = src[i];

        if (i === data.start)
        {
            out = out.concat(docblock);
        }

        out.push(line);
    }

    return out;
}
