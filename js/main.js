'use strict';

angular.module('todo')
  .controller('ItemsCtrl', function($scope, $http) {
    $http.get('http://yeonsik-21519.apne1.actionbox.io:3000/items.json')
      .success(function(data, status) {
        $scope.items = data;
      })
      .error(function(data, status) {
        $scope.status = status;
      });
    $scope.addPost = function() {
      $http.post("http://yeonsik-21519.apne1.actionbox.io:3000/items", { item: $scope.item })
        .success(function (data, status) {
          $scope.items.push({done:false, title:$scope.item.title});
          $scope.item.title = '';
        }).error(function (data, status) {
          $scope.status = status;
        });
    };
    $scope.deletePost = function(item) {
      $http.delete('hhttp://yeonsik-21519.apne1.actionbox.io:3000/items/'+item.id)
      .success(function (data, status) {
          var index = $scope.items.indexOf(post);
          $scope.items.splice(index, 1);
        }).error(function (data, status) {
          $scope.status = status;
        });
    };
    $scope.remain = function() {
        $scope.remainCount = 0;
        angular.forEach($scope.items, function(value, key) {
          if(value.done === false) {
            $scope.remainCount++;
          }
        });
      };
  });