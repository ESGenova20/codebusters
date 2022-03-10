function findProperties (data, src)
{
    var start = data.constructor.start + 1;
    var end = data.constructor.end - 1;
    var search = '        this.';
    var scanLength = search.length;
    var props = data.constructor.properties;

    for (var i = start; i < end; i++)
    {
        var line = src[i];

        if (line.substr(0, scanLength) === search)
        {
            //  Found a property
            var property = line.substring(scanLength);

            //  Does it have an = sign?

            var type = '[type]';
            var def = null;

            // this.name = '';
            var to = property.indexOf('=');

            if (to === -1)
            {
                // Avoid function calls: this.setTexture(entry.texture, entry.frame);

                var brace = property.indexOf(');');

                if (brace === -1)
                {
                    // this.scene;
                    to = property.indexOf(';') + 1;
                    type = 'null';
                }
                else
                {
                    continue;
                }
            }
            else
            {
                var value = property.substr(to + 2).slice(0, -1);

                // console.log(value);

                switch (value)
                {
                    case 'true':
                    case 'false':
                        type = 'boolean';
                        def = value;
                        break;

                    case "''":
                        type = 'string';
                        def = value;
                        break;

                    case '[]':
                        type = 'array';
                        def = value;
                        break;

                    case '{}':
                        type = 'object';
                        def = value;
                        break;

                    case 'null':
                        type = '?[type]';
                        def = value;
                        break;

                    case '0':
                    case '1':
                    case '-1':
                        type = 'number';
                        def = value;
                        break;
                }
            }

            property = property.substr(0, to - 1);

            props.push({
                line: i,
                name: property,
                type: type,
                description: '[description]',
                default: def,
                private: (property.charAt(0) === '_')
            });
        }
    }
}
