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

  function generateStars(rating) {
    var ratingHTML = '';
    for (var i=0; i<rating; i++) {
      ratingHTML += `<span class="fa fa-star checked"></span>`;
    }
    for (var i=rating; i<5; i++) {
      ratingHTML += `<span class="fa fa-star"></span>`;
    }
    return ratingHTML;
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


  // get comments in a sorted order
  $('#sort-form').change(function (e) {
    //prevent form submission
    e.preventDefault();
    e.stopPropagation();

    const id = $("#getId").attr("data-id");   //restaurant_id
    const sort_val = $('#sort').val()

    var sort_clause, sort_order;
    switch (sort_val) {
      case 'time_DESC':
        sort_clause = 'create_date';
        sort_order = 'desc';
        break;
      case 'time_ASC':
        sort_clause = 'create_date';
        sort_order = 'asc';
        break;
      case 'rating_DESC':
        sort_clause = 'rating';
        sort_order = 'desc';
        break;
      case 'rating_ASC':
        sort_clause = 'rating';
        sort_order = 'asc';
        break;
    }

    const sortOrder = {clause: sort_clause, order: sort_order};
    const urlString = "/comments/" + id;
    
    $.ajax({
      type: "POST",
      url: urlString,
      data: sortOrder,
      success: sortCommentSuccessHandler,
      error: function() {
        console.log('something went wrong');
      }
    });

  });

  function sortCommentSuccessHandler(comments) {
    if (comments) {
      // clear comment section
      $("#comments-section").empty();

      // fill in comments in comment section
      comments.forEach(function (comment) {
        var {username, rating, create_date, comment} = comment;

        $("#comments-section").append(`
          <div class="card bg-light p-3">
            <div class="userText">
              <strong>${username}</strong> <span class="commentDate">at ${create_date}</span>
            </div>
            <div class="userRating">
              ${generateStars(rating)}
            </div>
            <p>${comment}</p>         
          </div>
          <br>
        `);
      });
    }
  }

});