console.log('sourced!');
$(document).ready(function(){
  console.log('jquery was correctly sourced!');
  getBookData();
  function getBookData() {
    $.ajax({
      type: 'GET',
      url: '/books',
      success: function(response) {
        console.log('response', response); // response is an array of book objects
        $('#bookShelf').empty(); // clears the books in the #bookShelf
        for (var i = 0; i < response.length; i++) {
          var currentBook = response[i]; // Loops through books - This is an object
          var $newBook = $('<tr>'); // Creating a new row for each book
          $newBook.data('id', currentBook.id);
          $newBook.append('<td>' + currentBook.title + '</td>');
          $newBook.append('<td>' + currentBook.author + '</td>');
          $newBook.append('<td>' + currentBook.edition + '</td>');
          $newBook.append('<td>' + currentBook.publisher + '</td>');
          $newBook.append('<td><button class="deleteButton">Delete</button></td>');
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

  $('#bookShelf').on('click', '.deleteButton', function(){
    var idOfBookToDelete = $(this).parent().parent().data().id;
    console.log('The id to delete is: ', idOfBookToDelete);
    // for waldo, number 48 -> /books/delete/48
    $.ajax({
      type: 'DELETE',
      url: '/books/delete/' + idOfBookToDelete,
      success: function(response) {
        console.log(response);
        getBookData();
      }
    })
  });

});
