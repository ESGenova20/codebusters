function parseSource ()
{
    console.log('parse component source');

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

    var data = findComponent(module, src);

    if (data.componentStart === -1)
    {
        //  Bail out
        $('#sourceAlert').text('Unable to detect component function. Aborting.');
        $('#sourceAlert').show();
    }

    // console.log(data);

    findComponentFunctions(data, src);

    console.log(data);

    var out = buildDocBlock(data, src);

    $('#output').text(out.join('\n'));
}
