console.log('sourced!');
$(document).ready(function(){
  console.log('jquery was correctly sourced!');
  getBookData();
  function getBookData() {
    $.ajax({
      type: 'GET',
      url: '/books',
      success: function(response) {
        console.log('response', response);
        $('#bookShelf').empty();
        for (var i = 0; i < response.length; i++) {
          var currentBook = response[i];
          var $newBook = $('<tr>');
          $newBook.append('<td>' + currentBook.title + '</td>');
          $newBook.append('<td>' + currentBook.author + '</td>');
          $newBook.append('<td>' + currentBook.edition + '</td>');
          $newBook.append('<td>' + currentBook.publisher + '</td>');
          $('#bookShelf').prepend($newBook);
        }
      }
    });
  }

  $('#newBookForm').on('submit', function(event){
    event.preventDefault();
    var newBookObject = {};
    var formFields = $(this).serializeArray();

    formFields.forEach(function (field) {
      newBookObject[field.name] = field.value;
    });

    $.ajax({
      type: 'POST',
      url: '/books/new',
      data: newBookObject,
      success: function(response){
        console.log(response);
        getBookData();
        $('#newBookForm > input').val('');
      }
    });
  });
});
