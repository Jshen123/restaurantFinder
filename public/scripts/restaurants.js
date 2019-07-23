$(document).ready(function() {
    $(".select-box").click(function() {
        if ($(this).hasClass("checked")) {
            $(this).removeClass("checked");
        } else {
            $(this).addClass("checked");
        }
    });

    var selectBoxes = document.getElementsByClassName("select-box");

    $('#confirm').on('click', function() {
        var qString = "?"

        for (i = 0; i < selectBoxes.length; i++) {
            if (selectBoxes[i].classList.contains("checked")) {
                qString += "tag=" + selectBoxes[i].innerHTML + "&"; 
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