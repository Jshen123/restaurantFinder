var rateStars = document.getElementsByClassName("rate-star");
var rating = document.querySelector(".stars");

function addClicks() {
    for (i = 0; i < rateStars.length; i++) {
        rateStars[i].addEventListener("click", handleClick(i))
    }
}

function handleClick(i) {
    return function() {
        rating.setAttribute("data-rating", i + 1);
        setRating(rating.getAttribute("data-rating"));
    }
}

function setRating(rating) {
    for (i = 0; i < rateStars.length; i++) {
        if (i < rating) {
            rateStars[i].classList.add("checked");
        } else {
            rateStars[i].classList.remove("checked");
        }
    }
}

addClicks();
setRating(rating.getAttribute("data-rating"));

$('#comment-form').submit(function() {
    var numStars = rating.getAttribute("data-rating");
    var comment = $('#comment').val();
    var id = $("#getId").attr("data-id");

    var commentData = {
        rating: numStars,
        comment: comment,
        username: "",
        restaurant_id: id
    }

    urlString = "/restaurants/" + id;

    $.ajax({
        type: "POST",
        url: urlString,
        data: commentData,
        success: function() {
            console.log("success");
        },
        error: function() {
            console.log("failed");
        }
    })
})