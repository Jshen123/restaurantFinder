$(document).ready(function() {
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

  $('#comment-form').submit(function(e) {
    //prevent form submission
    e.preventDefault();
    e.stopPropagation();

    var numStars = rating.getAttribute("data-rating");
    var comment = $('#comment').val();
    var id = $("#getId").attr("data-id");

    var commentData = {
      rating: numStars,
      comment: comment,
      username: "",
      create_date: "",
      restaurant_id: id
    }

    var urlString = "/restaurants/" + id;

    $.ajax({
      type: "POST",
      url: urlString,
      data: commentData,
      success: postSuccessHandler,
      error: function() {
        console.log('something went wrong');
      }
    })

  });

  function postSuccessHandler(success) {
    if (success) {
      alert(`You've succesfully posted a review!`);

      //Clear comment
      $('#comment').val('');
      
    } else {
      alert(`Failed to post a review!`);
    }
  };

  
});