function parseSource ()
{
    var src = ($('#input').val()).split('\n');

    // console.log(src.length, 'lines');

    var module = findModule(src);

    if (module === '')
    {
        //  Bail out
        $('#sourceAlert').text('Module not found in function. Aborting.');
        $('#sourceAlert').show();
    }

    var data = findFunction(module, src, '.');

    if (!Array.isArray(data.parameters))
    {
        //  Bail out
        $('#sourceAlert').text('Unable to detect function parameters. Aborting.');
        $('#sourceAlert').show();
    }

    // console.log(data);

    if (data.parameters.length === 0)
    {
        //  Skip the modal
        var out = buildDocBlock(module, data, src);
        $('#output').text(out.join('\n'));
    }
    else
    {
        showParametersModal(module, data, src);
    }
}
