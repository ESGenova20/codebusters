function parseSource ()
{
    console.log('parse class source');

    var src = ($('#input').val()).split('\n');

    // console.log(src.length, 'lines');

    var module = findModule(src);

    if (module === '')
    {
        //  Bail out
        $('#sourceAlert').text('Module not found in function. Aborting.');
        $('#sourceAlert').show();
    }

    console.log(module);

    var data = findConstructor(module, src);

    if (!Array.isArray(data.constructor.parameters))
    {
        //  Bail out
        $('#sourceAlert').text('Unable to detect function parameters. Aborting.');
        $('#sourceAlert').show();
    }

    console.log(data);

    if (data.constructor.parameters.length === 0)
    {
        //  There are no constructor arguments, so move on to the properties
        console.log('no constructor arguments');

        findProperties(data, src);

        console.log(data);

        showPropertiesModal(data, src);

        $('#paramsModal').one('hidden.bs.modal', function (e)
        {
            console.log('props modal hidden');
            console.log(data);

            //  Methods ...
            findClassMethods(data, src);

            var out = buildDocBlock(data, src);

            $('#output').text(out.join('\n'));

        });
    }
    else
    {
        showConstructorParametersModal(data, src);

        $('#paramsModal').one('hidden.bs.modal', function (e)
        {
            console.log('modal hidden, now scan for properties');

            findProperties(data, src);

            console.log(data);

            showPropertiesModal(data, src);

            $('#paramsModal').one('hidden.bs.modal', function (e)
            {
                console.log('props modal hidden');
                console.log(data);

                //  Methods ...
                findClassMethods(data, src);

                var out = buildDocBlock(data, src);

                $('#output').text(out.join('\n'));

            });
        });
    }
}
