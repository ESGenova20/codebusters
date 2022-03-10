function getTypesList (id, input, param)
{
    var types = [
        '[type]',
        'string',
        'integer',
        'float',
        'number',
        'boolean',
        'any',
        'function',
        'object',
        'array',
        'Phaser.Scene',
        'Phaser.Textures.Texture',
        'Phaser.Textures.Frame',
        'Phaser.Animations.Animation',
        'Phaser.Events.EventDispatcher',
        'Phaser.Events.Event',
        'Phaser.GameObjects.GameObject',
        'Phaser.GameObjects.Sprite',
        'Phaser.GameObjects.Image',
        'Phaser.GameObjects.Graphics',
        'Phaser.GameObjects.Components.Animation',
        'Phaser.Structs.Map',
        'Phaser.Structs.Set',
        'Phaser.Tweens.Tween',
        'Phaser.Class',
        'Phaser.Curves.Curve',
        'Phaser.Curves.Path',
        'Phaser.Geom.Circle',
        'Phaser.Geom.Ellipse',
        'Phaser.Geom.Line',
        'Phaser.Geom.Point',
        'Phaser.Geom.Polygon',
        'Phaser.Geom.Rectangle',
        'Phaser.Geom.Triangle',
        'Phaser.Math.Vector2',
        'Phaser.Math.Vector3',
        'Phaser.Math.Vector4',
        'Phaser.Math.Matrix3',
        'Phaser.Math.Matrix4',
        'Phaser.Textures.Texture',
        'Phaser.Textures.Frame',
    ];

    //  some quick helpers
    var match = {

        'config': 'object',
        'x': 'number',
        'y': 'number',
        'key': 'string',
        'width': 'number',
        'height': 'number',
        'angle': 'number',
        'alpha': 'float',
        'scale': 'float',
        'scaleX': 'float',
        'scaleY': 'float',
        'scene': 'Phaser.Scene',
        '_texture': 'string',
        'texture': 'Phaser.Textures.Texture',
        'file': 'Phaser.Loader.File',
        'baseURL': 'string',
        'sourceIndex': 'integer',
        'frame': 'string|integer',
        'gameObject': 'Phaser.GameObjects.GameObject',
        'graphics': 'Phaser.GameObjects.Graphics',
        'sprite': 'Phaser.GameObjects.Sprite',
        'image': 'Phaser.GameObjects.Image',
        'line': 'Phaser.Geom.Line',
        'point': 'Phaser.Geom.Point',
        'points': 'Phaser.Geom.Point[]',
        'pointA': 'Phaser.Geom.Point',
        'pointB': 'Phaser.Geom.Point',
        'polygon': 'Phaser.Geom.Polygon',
        'rect': 'Phaser.Geom.Rectangle',
        'rectA': 'Phaser.Geom.Rectangle',
        'rectB': 'Phaser.Geom.Rectangle',
        'circle': 'Phaser.Geom.Circle',
        'ellipse': 'Phaser.Geom.Ellipse',
        'triangle': 'Phaser.Geom.Triangle',
        'curve': 'Phaser.Curves.Curve'
    };

    var select = $('<select>', { class: 'custom-select', id: id });

    for (var i = 0; i < types.length; i++)
    {
        var type = $('<option>', { value: types[i] }).text(types[i]);

        select.append(type);
    }

    select.on('change', function () {

        input.val(this.value);

    });

    if (param)
    {
        for (var key in match)
        {
            if (param.name === key)
            {
                input.val(match[key]);
                break;
            }
        }
    }

    return select;
}
