$(document).ready(function() {

  $('.login-form').submit(function(e) {
    //prevent form submission
    e.preventDefault();
    e.stopPropagation();

    let username = $('input[type=username]').val();
    let password = $('input[type=password]').val();

    let loginCredentials = {
      username: username,
      password: password
    };

    $.ajax({
      type: "POST",
      url: "/login",
      data: loginCredentials,
      success: postSuccessHandler,
      error: function() {
        console.log('something went wrong');
      }
    })
  });

  function postSuccessHandler(res) {
    const {err, msg} = res;

    if (err) {
      // Alert error message
      alert(msg);

      // Clear passworld field
      $('input[type=password]').val('');
    } else {
      window.location.href = '/';
    }
  }

});