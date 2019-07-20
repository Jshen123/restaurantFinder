$(document).ready(function() {

  // Check if fields are empty on page load
  if($.trim($('input[type="username"]').val()).length && ($('input[type="password"]').val()).length) {
    $(':input[type="submit"]').prop('disabled', false);
  } else {
    $(':input[type="submit"]').prop('disabled', true);
  }

  // Disable spaces and special characters in username field
  // Allow characters: {aA-zZ}, {0-9}, {'-','_'}
  $('input[type=username]').keypress(function(e) {
    if(!/[0-9a-zA-Z-_]/.test(String.fromCharCode(e.which)))
      return false;
  });

  // Check if fields are empty on keyup
  $('input').keyup(function() {
    let username = $('input[type=username]').val();
    let password = $('input[type=password]').val();

    if($.trim(username).length && password.length) {
      $(':input[type="submit"]').prop('disabled', false);
    } else {
      $(':input[type="submit"]').prop('disabled', true);
    }
  });


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

    console.log(loginCredentials);

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
      $(':input[type="submit"]').prop('disabled', true);

    } else {
      window.location.href = '/';
    }
  }

});