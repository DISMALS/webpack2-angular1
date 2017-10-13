// let menuList = require('./app/config/data/menu.json');
class MainCtrl {
    constructor($rootScope, $scope, $state, APP_CONFIG, mainService, $uibModal, $cookies) {
        $scope.practiceimg = APP_CONFIG.API_HOST + '/images/practice.png';
        $scope.userimg = APP_CONFIG.API_HOST + '/images/user-icon.png';
        this.uibModal = $uibModal;
        this.state = $state;
        this.cookies = $cookies;
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

        //初始化数据
        let initData = () => {
            mainService.test().then(function(data) {
                $scope.menuList = data;
            });
        }
        initData();

        $scope.toggles = (scope, node) => {
            if (node.child && node.child.length > 0) {
                scope.toggle();
            } else { //直接跳转路由
                $state.go(node.state);
            }

        };

        $scope.selectedItem = (item) => {
            console.log(item);
            $scope.searchList = [];
        }

        $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
            if (fromState.name && toState.name == 'authorize.lock') {
                $cookies.put('lockroute', fromState.name);
            }
        });
    };
    //新建病历
    medicalRecords() {
        this.uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: 'app/view/common/html/check-number.html',
            controller: 'checkCtrl',
            controllerAs: 'checkCtrlVm',
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
            // initData();
        });
    };

    //删除确认弹窗
    deleteModal() {
        this.uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: 'app/view/common/html/delete-modal.html',
            controller: 'deleteModalCtrl',
            controllerAs: 'deleteModalCtrlVm',
            size: 'width-400',
            resolve: {
                items: function() {
                    return {
                        title: '提示',
                        content: '删除后不可恢复，确定要删除该选项么？'
                    };
                },
                deleteModalCtrl: ($q, $ocLazyLoad) => {
                    const deferred = $q.defer();
                    require.ensure(['./delete-modal-controller'], (require) => {
                        const ctrl = require('./delete-modal-controller')(require('../../../common/module'));
                        $ocLazyLoad.inject({
                            name: 'dryadApp',
                            files: [ctrl]
                        });
                        deferred.resolve(ctrl);
                    }, './common/delete-modal-ctrl');
                    return deferred.promise;
                }
            }
        }).result.then(function(result) {
            // initData();
        });
    };

    //修改密码
    editPassWord() {
        this.uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: 'app/view/common/html/edit-password.html',
            controller: 'editPasswordCtrl',
            controllerAs: 'editPasswordVm',
            size: 'width-400',
            resolve: {
                items: function() {
                    return {
                        title: '修改密码'
                    };
                },
                deleteModalCtrl: ($q, $ocLazyLoad) => {
                    const deferred = $q.defer();
                    require.ensure(['./edit-password-controller'], (require) => {
                        const ctrl = require('./edit-password-controller')(require('../../../common/module'));
                        $ocLazyLoad.inject({
                            name: 'dryadApp',
                            files: [ctrl]
                        });
                        deferred.resolve(ctrl);
                    }, './common/edit-password-ctrl');
                    return deferred.promise;
                }
            }
        }).result.then(function(result) {
            // initData();
        });
    };

    //锁屏
    lock() {
        console.log(this.state.$current);
        this.state.go('authorize.lock', {
            nowroute: this.state.$current.name
        });
    };

    //退出
    signOut() {
        // console.log(this.cookies);
        this.state.go('authorize.login');
    };
}

MainCtrl.$inject = ['$rootScope', '$scope', '$state', 'APP_CONFIG', 'mainService', '$uibModal', '$cookies'];

module.exports = (ngMold) => {
    require.ensure(['../service/main-service'], (require) => {
        const service = require('../service/main-service')(ngMold);
    }, 'main-serve');
    ngMold.controller('mainCtrl', MainCtrl);
}