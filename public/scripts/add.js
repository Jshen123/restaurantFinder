// Takes the string of a time in 24 hour time converts it into AMPM time, and then returns it.
function convertTime(timeString) {
    if (timeString == "") {
        return "";
    }

    var hour = parseInt(timeString.substring(0, 2));
    var minute = timeString.substring(3, 5);

    if (hour <= 12) {
        amPm = "am";
        if (hour == 0) {
            hour += 12;
        }
        convHour = hour.toString()
    } 
    
    else {
        amPm = "pm";
        convHour = (hour - 12).toString()
    }

    return convHour + ":" + minute + amPm;
}

function getPrice(priceString) {
    if (priceString == "$") {
        return 1;
    } else if (priceString == "$$") {
        return 2;
    } else {
        return 3;
    }
}

$(document).ready(function() {
    $('#add-form').submit(function() {
        var rName = $('#restaurantName').val();
        var rAddress = $('#restaurantAddress').val();
        var rDescription = $('#restaurantDesc').val();

        var priceRating = $('input[name="priceRadio"]:checked').val();
        var numRating = getPrice(priceRating);

        var foodType = $('#foodTypes option:selected').val();

        var arrLength = 7;
        var hours = new Array(arrLength);
        for (i = 0; i < arrLength; i++) {
            var fromId = '#timeFrom' + i.toString();
            var toId = '#timeTo' + i.toString();
            var checkId = '#check' + i.toString();

            initTimeFrom = $(fromId).val();
            initTimeTo = $(toId).val();

            fromTime = convertTime(initTimeFrom);
            toTime = convertTime(initTimeTo);

            if (fromTime != "" && toTime != "" && fromTime == toTime && $(checkId).is(":checked")) {
                restaurantHours = "OPEN";
            } else if (fromTime != "" && toTime != "" && $(checkId).is(":checked")) {
                restaurantHours = fromTime + "-" + toTime;
            } else {
                restaurantHours = "CLOSED";
            }

            hours[i] = restaurantHours;
        }

        // var restData = new FormData();
        // restData.append('name', rName);
        // restData.append('address', rAddress);
        // restData.append('description', rDescription);
        // restData.append('price', numRating);
        // restData.append('sunday', hours[0]);
        // restData.append('monday', hours[1]);
        // restData.append('tuesday', hours[2]);
        // restData.append('wednesday', hours[3]);
        // restData.append('thursday', hours[4]);
        // restData.append('friday', hours[5]);
        // restData.append('saturday', hours[6]); 

        // var restData = {
        //     name: rName,
        //     address: rAddress,
        //     description: rDescription,
        //     price: numRating,
        //     sunday: hours[0],
        //     monday: hours[1],
        //     tuesday: hours[2],
        //     wednesday: hours[3],
        //     thursday: hours[4],
        //     friday: hours[5],
        //     saturday: hours[6]
        // }

        // $.ajax({
        //     url: '/admin/add',
        //     type: 'POST',
        //     processData: false,
        //     contentType: false,
        //     data: restData,
        //     success: function() {
        //         console.log("success");
        //     },
        //     error: function() {
        //         console.log("failed");
        //     }
        // })
    })
})