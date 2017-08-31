import route from './common/route';
import factory from './common/factory';
import directive from './common/directive';
import controller from './common/controller';

let myApp = angular.module('lkApp',['ui.router','ngAnimate','ngCookies']);
myApp.controller('AppCtrl',['$rootScope','$scope',function($rootScope,$scope){
    // $scope.name = 'dd';
    // console.log($rootScope);
}]);
route(myApp);
// factory(myApp);
// directive(myApp);
// controller(myApp);

