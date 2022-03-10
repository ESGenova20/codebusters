function showPropertiesModal (data, src)
{
    //  Build-up the modal content
    var container = $('#paramsContainer');

    //  Clear out anything that may have been in there already
    container.empty();

    //  Build the parameters list

    var props = data.constructor.properties;

    for (var i = 0; i < props.length; i++)
    {
        var param = props[i];

        var div = $('<div>', { class: 'container' });
        var row = $('<div>', { class: 'row py-2' });
        var col1 = $('<div>', { class: 'col col-sm-2' });
        var col2 = $('<div>', { class: 'col col-sm-4' });
        var col3 = $('<div>', { class: 'col' });
        var col4 = $('<div>', { class: 'col col-sm-2' });

        var label = $('<label>', { for: 'prop' + i }).text(param.name);
        var input = $('<input>', { type: 'text', id: 'cpp' + i, class: 'form-control', value: param.type });
        var select = getTypesList('prop' + i, input, param);
        var def = $('<input>', { type: 'text', id: 'def' + i, class: 'form-control', value: param.default });

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
        col4.append(def);

        container.append(div);
    }

    //  Show the modal
    $('#paramsModal').modal('show');

    //  Button save ...
    $('#updateButton').click(function(event) {

        //  Update the data object with the parameter settings

        for (var i = 0; i < props.length; i++)
        {
            var param = props[i];

            param.type = $('#cpp' + i).val();
            param.default = $('#def' + i).val();
        }

        $('#paramsModal').modal('hide');

        $(this).off(event);

    });
}
