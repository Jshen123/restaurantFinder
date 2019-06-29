$(document).ready(function() {
    $('#add-form').submit(function() {
        var name = $('#restaurantName').val();
        var address = $('#restaurantAddress').val();
        var description = $('#restaurantDesc').val();
        var priceRating = $('input[name="priceRadio"]:checked').val();
        var foodType = $('#foodTypes option:selected').val();

        // Need better way to grab data for restaurant hours
        var arrLength = 7;
        var timesFrom = new Array(arrLength);
        var timesTo = new Array(arrLength);

        for (i = 0; i < arrLength; i++) {
            var fromId = '#timeFrom' + i.toString();
            var toId = '#timeTo' + i.toString();

            timesFrom[i] = $(fromId).val();
            timesTo[i] = $(toId).val();
        }
    })
})