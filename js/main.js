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
          $scope.items.push(data);
          $scope.item.title = '';
        }).error(function (data, status) {
          $scope.status = status;
        });
    };
    $scope.deletePost = function() {
      angular.forEach($scope.items, function(value, key) {
          if(value.done === true) {
            $http.delete('http://yeonsik-21519.apne1.actionbox.io:3000/items/'+value.id)
            .success(function (data, status) {
                var index = $scope.items.indexOf(value);
                $scope.items.splice(index, 1);
              }).error(function (data, status) {
                $scope.status = status;
              });
          }
        });
      /*
      $http.delete('http://yeonsik-21519.apne1.actionbox.io:3000/items/'+item.id)
      .success(function (data, status) {
          var index = $scope.items.indexOf(post);
          $scope.items.splice(index, 1);
        }).error(function (data, status) {
          $scope.status = status;
        });
    */
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