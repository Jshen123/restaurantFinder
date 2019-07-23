$(document).ready(function() {
    $('#confirm').on('click', function() {
        var qString = "?"

        var arrLength = 27;
        for (i = 0; i < arrLength; i++) {
            var checkId = '#check' + i;
            var checkBox = $(checkId)
            if (checkBox.is(':checked')) {
                qString += "tag=" + checkBox.val() + "&";
            }
        }

        // Check if last character is &
        if (qString[qString.length - 1] == '&') {
            qString = qString.substring(0, qString.length - 1);
        }

        window.location.href = '/restaurants' + qString;
    })

    var expButton = $("#expand");

    expButton.on('click', function() {
        if (expButton.html() == "<strong>Click here to Filter Restaurants</strong>") {
            expButton.html("<strong>Click to Contract</strong>");
            $('#search').collapse('toggle');
        } else {
            expButton.html("<strong>Click here to Filter Restaurants</strong>");
            $('#search').collapse('toggle');
        }

    })
})