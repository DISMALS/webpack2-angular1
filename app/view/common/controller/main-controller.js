let menuList = require('../../../config/data/menu.json');
require('../../../../images/practice.png');
require('../../../../images/user-icon.png');
class MainCtrl {
    constructor($rootScope, $scope, $state, APP_CONFIG, mainService, $uibModal, $cookies, $q) {
        $scope.practiceimg = 'images/practice.png';
        $scope.userimg = 'images/user-icon.png';
        this.uibModal = $uibModal;
        this.state = $state;
        this.cookies = $cookies;
        this.q = $q;
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
            console.log(menuList);
            $scope.menuList = menuList;
            // mainService.test().then(function(data) {
            //     $scope.menuList = data;
            // });
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
            template: require('../html/check-number.html'),
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
            template: require('../html/delete-modal.html'),
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
            template: require('../html/edit-password.html'),
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
        let cookies = this.cookies.getAll();
        for (let item in cookies) {
            this.cookies.remove(item);
        }
        this.state.go('authorize.login');
    };
}

MainCtrl.$inject = ['$rootScope', '$scope', '$state', 'APP_CONFIG', 'mainService', '$uibModal', '$cookies', '$q'];

module.exports = (ngMold) => {
    require.ensure(['../service/main-service'], (require) => {
        const service = require('../service/main-service')(ngMold);
    }, './common/main-serve');
    ngMold.controller('mainCtrl', MainCtrl);
}