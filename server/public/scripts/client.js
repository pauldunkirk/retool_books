var myApp = angular.module('BooksApp', []);
myApp.controller('BooksController', ['$http', function($http) {
    // console.log('BooksController sourced');
    var self = this;
    self.newBookObject = {};
// self.booksList.id
    getBooks();

    function getBooks() {
        $http({
            method: 'GET',
            url: '/books'
        }).then(function(response) {
            // console.log(response.data);
            self.booksList = response.data;
        });
    }
    self.newBook = function() {
        $http({
            method: 'POST',
            url: '/books/new',
            data: self.newBookObject
        }).then(function(response) { // end http
            console.log(response);
            getBooks();
        }); // end .then function
    };// end newBook function


      self.deleteBook = function(bookIdToDelete) {
        console.log(bookIdToDelete);
      $http({
          method: 'DELETE',
          url: '/books/delete/' + bookIdToDelete
      }).then(function(response) {
          console.log(response);
          getBooks();
      });
    };

    self.deleteBook = function(bookIdToDelete) {
      console.log(bookIdToDelete);
    $http({
        method: 'PUT',
        url: '/books/delete/' + bookIdToDelete
    }).then(function(response) {
        console.log(response);
        getBooks();
    });
    };


    // $('#bookShelf').on('click', '.saveButton', function(){
    //   var idOfBookToSave = $(this).parent().parent().data().id;
    //   var titleOfBookToSave = $(this).parent().parent().find('.bookTitle').val();
    //   var bookObjectToSave = {
    //     title: titleOfBookToSave
    //   };
    //   // for waldo, number 48 -> /books/save/48
    //   $.ajax({
    //     type: 'PUT',
    //     url: '/books/save/' + idOfBookToSave,
    //     data: bookObjectToSave,
    //     success: function(response) {
    //       console.log(response);
    //       getBookData();
    //     }
    //   })
    // });











}]);
