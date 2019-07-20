$(document).ready(function() {

  // Disable spaces and special characters in username field
  // Allow characters: {aA-zZ}, {0-9}, {'-','_'}
  $('input[type=username]').keypress(function(e) {
    if(!/[0-9a-zA-Z-_]/.test(String.fromCharCode(e.which)))
      return false;
  });

  // Check if fields are empty on keyup
  // Also check if client enter the same password twice
  $('input').keyup(function() {
    let username = $('input[type=username]').val();
    let password = $('input[name=password]').val();
    let confirmPassword = $('input[name=confirmPassword]').val();

    if($.trim(username).length && password.length && password == confirmPassword) {
      $(':input[type="submit"]').prop('disabled', false);
    } else {
      $(':input[type="submit"]').prop('disabled', true);
    }
  });

});