$(document).ready(function() {
  $('.delete-restaurant').on('click', function() {
    $.ajax({
      url: "/admin/delete/" + $(this).data('id'),
      type: "DELETE",
      success: function(res) {
        const {err, msg} = res;
        alert(msg);
        if (!err) {
          window.location.reload(true);
        }
      },
      error: function() {
        console.log("something went wrong");
      }
    })
  })
})