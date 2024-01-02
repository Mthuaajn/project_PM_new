$(document).ready(function () {
  $(".delete-link").on("click", function (e) {
    e.preventDefault();
    let actionUrl = e.currentTarget.href;
    let rowToDelete = $(this).closest('tr'); 
    $.ajax({
      url: actionUrl,
      type: "DELETE",
      success: function (result) {
        rowToDelete.remove();
        alert("xóa thành công ");
        location.reload();
      },
    });
  });
});
