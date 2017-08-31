myApp.component('login',{
    templateUrl:'./login.html',
    controller:loginCtrl
});

loginCtrl.$inject = ['$scope','$http'];

function loginCtrl($scope,$http){
    console.log($scope);
}

// myApp.controller('login',['$scope',
//     function($scope){
//         console.log('首页模块加载了s！');
//     }
// ]);
