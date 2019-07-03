$(document).ready(function() {
    $('.card-title.link').click(function() {
        var restId = $(this).data('id');
        console.log(restId);
    })
})