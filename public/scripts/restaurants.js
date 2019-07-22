$(document).ready(function() {
    $('#test').submit(function() {
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

        console.log(qString);
    })
})