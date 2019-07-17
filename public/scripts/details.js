$(document).ready(function() {
  const d = new Date();
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

  // Run these when page loaded
  addClicks();
  setRating(rating.getAttribute("data-rating"));
  
  // function to get current date
  function getDate() {
    var months = ['January', "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }

  // Comment submithandler
  $('#comment-form').submit(function(e) {
    //prevent form submission
    e.preventDefault();
    e.stopPropagation();

    var numStars = rating.getAttribute("data-rating");  //rating
    var comment = $('#comment').val();                  //comment
    var id = $("#getId").attr("data-id");               //restaurant_id

    var commentData = {
      rating: numStars,
      comment: comment,
      create_date: getDate()
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

  // Post request success handler
  function postSuccessHandler(res) {
    const {err, msg} = res;

    if (err) {
      alert(msg);   // Alert error message

    } else {
      alert(`You've succesfully posted a review!`);

      //Clear comment
      $('#comment').val('');
    }
  };

});