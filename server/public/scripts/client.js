var myApp = angular.module('BooksApp', []);
myApp.controller('BooksController', ['$http', function($http) {
  console.log('BooksController sourced');
  var self = this;
  self.booksList;

getBooks();
function getBooks(){
  $http({
    method: 'GET',
    url: '/books'
  }).then(function(response){
    console.log(response.data);
    self.booksList = response.data;
  });
}



// self.booksList.push(angular.copy(self.booksList));





}]);
