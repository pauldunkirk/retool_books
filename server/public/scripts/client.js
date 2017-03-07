var myApp = angular.module('BooksApp', []);
myApp.controller('BooksController', ['$http', function($http) {
    // console.log('BooksController sourced');
    var self = this;
    self.booksList;
    self.newBookObject = {};
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

    // success: function(response){
    //   console.log(response);
    //   getBookData();
    //   $('#newBookForm > input').val('');

    // self.booksList.push(angular.copy(self.booksList));


}]);
