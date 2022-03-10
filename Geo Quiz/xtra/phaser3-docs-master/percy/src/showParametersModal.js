function showParametersModal (module, data, src)
{
    //  Build-up the modal content
    var container = $('#paramsContainer');

    //  Clear out anything that may have been in there already
    container.empty();

    //  Build the parameters list

    for (var i = 0; i < data.parameters.length; i++)
    {
        var param = data.parameters[i];

        var div = $('<div>', { class: 'container' });
        var row = $('<div>', { class: 'row py-2' });
        var col1 = $('<div>', { class: 'col col-sm-2' });
        var col2 = $('<div>', { class: 'col col-sm-4' });
        var col3 = $('<div>', { class: 'col' });
        var col4 = $('<div>', { class: 'col col-sm-1' });

        var label = $('<label>', { for: 'param' + i }).text(param.name);
        var input = $('<input>', { type: 'text', id: 'cp' + i, class: 'form-control', value: param.type });
        var select = getTypesList('param' + i, input, param);
        var check = $('<input>', { type: 'checkbox', id: 'check' + i, class: 'form-check-input' });

        row.on('mouseover', function () {

            $(this).css('background-color', '#01FF70');

        });

        row.on('mouseout', function () {

            $(this).css('background-color', '#fff');

        });

        div.append(row);

        row.append(col1, col2, col3, col4);

        col1.append(label);
        col2.append(select);
        col3.append(input);
        col4.append(check);

        container.append(div);
    }

    if (data.hasReturn)
    {
        var typeString = '';

        if (data.returns.this)
        {
            typeString = data.className;
        }

        if (data.returns.value)
        {
            if (data.returns.this)
            {
                typeString = typeString.concat('|');
            }

            typeString = typeString.concat('[type]');
        }

        if (data.returns.null)
        {
            if (data.returns.this || data.returns.value)
            {
                typeString = typeString.concat('|');
            }

            typeString = typeString.concat('null');
        }

        if (typeString.indexOf('#') !== -1)
        {
            typeString = typeString.substr(0, typeString.indexOf('#'));
        }

        var div = $('<div>', { class: 'container' });
        var row = $('<div>', { class: 'row py-2' });
        var col1 = $('<div>', { class: 'col col-sm-2' });
        var col2 = $('<div>', { class: 'col col-sm-4' });
        var col3 = $('<div>', { class: 'col' });

        var label = $('<label>', { for: 'returnValue', style: 'font-weight: bold; text-decoration: underline' }).text('Returns');
        var input = $('<input>', { type: 'text', id: 'returnValue', class: 'form-control', value: typeString });
        var select = getTypesList('returnValueDrop', input);

        label.on('click', function () {

            input.val($('#cp0').val());

        });

        row.on('mouseover', function () {

            $(this).css('background-color', '#01FF70');

        });

        row.on('mouseout', function () {

            $(this).css('background-color', '#fff');

        });

        div.append(row);

        row.append(col1, col2, col3);

        col1.append(label);
        col2.append(select);
        col3.append(input);

        container.append(div);
    }

    //  Show the modal
    $('#paramsModal').modal('show');

    //  Set-up quick buttons

    $('#setAllNumber').click(function () {

        for (var i = 0; i < data.parameters.length; i++)
        {
            $('#cp' + i).val('number');
        }

        if (data.hasReturn)
        {
            $('#returnValue').val('number');
        }

    });

    $('#setAllFloat').click(function () {

        for (var i = 0; i < data.parameters.length; i++)
        {
            $('#cp' + i).val('float');
        }

        if (data.hasReturn)
        {
            $('#returnValue').val('float');
        }

    });

    $('#setAllString').click(function () {

        for (var i = 0; i < data.parameters.length; i++)
        {
            $('#cp' + i).val('string');
        }

        if (data.hasReturn)
        {
            $('#returnValue').val('string');
        }

    });

    $('#setAllArray').click(function () {

        for (var i = 0; i < data.parameters.length; i++)
        {
            $('#cp' + i).val('array');
        }

        if (data.hasReturn)
        {
            $('#returnValue').val('array');
        }

    });

    $('#setAllGO').click(function () {

        for (var i = 0; i < data.parameters.length; i++)
        {
            $('#cp' + i).val('Phaser.GameObjects.GameObject');
        }

        if (data.hasReturn)
        {
            $('#returnValue').val('Phaser.GameObjects.GameObject');
        }

    });

    //  Button save ...
    $('#generateButton').click(function() {

        //  Update the data object with the parameter settings

        for (var i = 0; i < data.parameters.length; i++)
        {
            var param = data.parameters[i];

            param.type = $('#cp' + i).val();
            param.optional = $('#check' + i).is(':checked');
        }

        //  and the Return value

        if (data.hasReturn)
        {
            data.returns.type = $('#returnValue').val();
        }

        $('#paramsModal').modal('hide');

        var out = buildDocBlock(module, data, src);

        $('#output').text(out.join('\n'));

    });
}
