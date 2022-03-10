function showConstructorParametersModal (data, src)
{
    //  Build-up the modal content
    var container = $('#paramsContainer');

    //  Clear out anything that may have been in there already
    container.empty();

    //  Build the parameters list

    var params = data.constructor.parameters;

    for (var i = 0; i < params.length; i++)
    {
        var param = params[i];

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

    //  Show the modal
    $('#paramsModal').modal('show');

    //  Button save ...
    $('#updateButton').click(function(event) {

        //  Update the data object with the parameter settings

        for (var i = 0; i < params.length; i++)
        {
            var param = params[i];

            param.type = $('#cp' + i).val();
            param.optional = $('#check' + i).is(':checked');
        }

        $('#paramsModal').modal('hide');
    
        $(this).off(event);

    });
}
