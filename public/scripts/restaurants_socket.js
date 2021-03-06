$(document).ready(function() {
  const socket = io('/restaurants');
  const room_id = $("#getId").attr("data-id"); 

  // Join a room on connection
  socket.emit('joinRoom', room_id);

  socket.on('new_comment', function(comment) {
    // Add new comment
    var {username, rating, create_date, comment} = comment;

    $("#comments-section").prepend(`
      <div class="card p-3 border-0">
        <div class="userText">
          <strong>${username}</strong> <span class="commentDate">at ${create_date}</span> <strong>New comment</strong>
        </div>
        <div class="userRating">
          ${generateStars(rating)}
        </div>
        <p>${comment}</p>                 
      </div>
      <br>
    `);
  });

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

});