// require('../service/common-service.js');
class MainCtrl {
    constructor($rootScope, $scope, $state, APP_CONFIG, mainService, $uibModal) {
        $scope.practiceimg = APP_CONFIG.API_HOST + '/images/practice.png';
        $scope.userimg = APP_CONFIG.API_HOST + '/images/user-icon.png';
        $scope.search = {
            searchKey: null
        };
        $scope.searchList = [{
            name: 'wangyong',
            sex: 'man',
            img: $scope.userimg
        }, {
            name: 'xiaohao',
            sex: 'women',
            img: $scope.userimg
        }, {
            name: 'dayong',
            sex: 'man',
            img: $scope.userimg
        }, {
            name: 'xiaoyong',
            sex: 'man',
            img: $scope.userimg
        }];
        mainService.test().then(function(data) {
            console.log(data);
        });

        $scope.selectedItem = (item) => {
            console.log(item);
            $scope.searchList = [];
        }

        //新建病历
        $scope.medicalRecords = () => {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: 'app/view/common/html/check-number.html',
                controller: 'checkCtrl',
                size: 'width-320',
                resolve: {
                    items: function() {
                        return {
                            action: 'ADD',
                        };
                    },
                    checkCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./check-controller'], (require) => {
                            const ctrl = require('./check-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './common/check-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                initData();
            });
        }

    }
}

MainCtrl.$inject = ['$rootScope', '$scope', '$state', 'APP_CONFIG', 'mainService', '$uibModal'];

module.exports = (ngMold) => {
    require.ensure(['../service/main-service'], (require) => {
        const service = require('../service/main-service')(ngMold);
    }, 'main-serve');
    ngMold.controller('mainCtrl', MainCtrl);
}