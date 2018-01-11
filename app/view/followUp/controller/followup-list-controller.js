class FollowuplistCtrl {
    constructor($scope, $uibModal, FollowupService, toastr) {
        $scope.status = 'all';
        $scope.onFollowpStatus = ( status) => {
            $scope.status = status ;
            $scope.pagination.currentPage = 1;
            $scope.init(1,10);
        }
        $scope.pageConfig = {
            pageIndex: 1,
            pageSize: 10
        }
        $scope.init = (pageNo, listSize) => {
            FollowupService.getFollowupList( $scope.status, pageNo, listSize).then((data) => {
                if(data.status==200){
                    $scope.pageConfig.pageCount = data.pager.totalCount;
                    $scope.initPageBar($scope.pageConfig.pageCount, true);
                    _.each(data.data, (item,i) => {
                    		item.index = ((pageNo - 1) * 10) + i + 1;
                        let moveUpHtml = item.statusDesc === '已随访' ? '' :
                            '<a class="layui-btn layui-btn-mini grid-edit resourceOperation look"  data-followup-id="' + item.followUpId +'" data-title="修改"></a>' +
                            '<a class="layui-btn layui-btn-mini grid-followup resourceOperation look" data-followup-id="' + item.followUpId +'" data-title="随访"></a>'
                        item.operation =
                            '<div>' +
                            '<a class="layui-btn layui-btn-mini grid-preview resourceOperation look" data-followup-id="' + item.followUpId +'" data-title="查看" ></a>' +
                            moveUpHtml +
                            '</div>';

                    })
                    $scope.$broadcast('dataList',{data:data.data? data.data : []});
                }else{
                    toastr.error(data.errorMessage,null,3000);
                    return;
                }
            })
        }
        $scope.init($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize);

        // 分页函数-----------------------------------------------
        $scope.pagination = {
            pageCount: 0,
            pageSize:10,
            currentPage: 1,
            goToPage: '',
            items:[],
            goto: function(pageNum) {
                if ($scope.pageConfig.pageCount > $scope.pageConfig.pageSize) {
                    if (parseInt(pageNum) > $scope.pagination.pageCount) {
                        toastr.error('请输入小于' + ($scope.pagination.pageCount + 1) + '的正整数');
                        $scope.pagination.goToPage = '';
                        return;
                    };
                    $scope.pagination.currentPage = parseInt(pageNum);
                }
                $scope.initPageBar($scope.pageConfig.pageCount);
            },
            previousPage: function() {
                $scope.pagination.currentPage--;
                $scope.initPageBar($scope.pageConfig.pageCount);
            },
            nextPage: function() {
                $scope.pagination.currentPage++;
                $scope.initPageBar($scope.pageConfig.pageCount);
            }
        };
        $scope.initPageBar = (pageCount, first) => {
            var maxPages = 5;
            var pageNum = $scope.pagination.currentPage;
            var totalPages = $scope.pagination.pageCount = Math.ceil(pageCount / $scope.pageConfig.pageSize);
            if (totalPages > maxPages) {
                var start, end, arr = [];
                if (parseInt(pageNum) <= Math.floor(maxPages / 2 + 1)) {
                    start = 1;
                    end = maxPages;
                } else if (parseInt(pageNum) > totalPages - Math.floor(maxPages / 2)) {
                    start = totalPages - maxPages + 1;
                    end = totalPages;
                } else {
                    start = parseInt(pageNum) - Math.floor(maxPages / 2);
                    end = parseInt(pageNum) + Math.ceil(maxPages / 2 - 1);
                }
                for (var i = start; i <= end; i++) {
                    arr.push(i);
                }
                $scope.pagination.items = arr;
            } else {
                var arr = [];
                for (var i = 1; i <= totalPages; i++) {
                    arr.push(i);
                }
                $scope.pagination.items = arr;
            };
            if (!first) {
                $scope.pageConfig.pageIndex = parseInt(pageNum);
                // $scope.pageDataFn($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize);
                $scope.init($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize);
                // $scope.$emit('changePage', { pageIndex: $scope.pageConfig.pageIndex });
            }

        }
        $scope.jumpTo = (evt) => {
            let value = $scope.pagination.goToPage;
            let reg = /\d/g;
            if (evt.keyCode == 13) {
                if (reg.test(value)) {
                    if (value == 0) {
                        toastr.error('请输入大于' + 0 + '的正整数');
                        $scope.pagination.goToPage = '';
                    } else if (value > 0) {
                        $scope.pagination.goto($scope.pagination.goToPage);
                        $scope.pagination.goToPage = '';
                    }
                } else if (value == '') {
                    $scope.pagination.goto(1);
                } else {
                    toastr.error('输入的页数格式不正确，请重新输入！', null, 2000);
                    $scope.pagination.goToPage = '';
                }
            }
        }
        // 分页函数-----------------------------------------------
        $('.dryad-grid').on('click', '.grid-edit', function () { //编辑
            let followupId = $(this).data('followupId');
            $scope.addFollowup(followupId);
        })

        $('.dryad-grid').on('click', '.grid-followup', function () { //随访
            let followupId = $(this).data('followupId');
            $scope.goFollowupOperation(followupId);
        })
        $('.dryad-grid').on('click', '.grid-preview', function () { //预览
            let followupId = $(this).data('followupId');
            $scope.goSeeFollowup(followupId);
        })
        $scope.tableOptions = {
            elem:'#layuiTable',
            skin:{
                even:true,
                size:'sm', //lg
                skin:'line'
            },
            cols:[[
                { field: "index",title: '#',type: "text",  width: '4%', align: 'center' },
                { field: "patientName", title: '患者姓名', type: "text", width: '', align: 'center' },
                { field: "planDate", title: '计划随访时间', type: "text",  width: '14%', align: 'center' },
                { field: "realEmployeeName", title: '随访人员', type: "text", width: '10%',  align: 'center' },
                { field: "realDate", title: '随访时间', type: "text", width: '10%', align: 'center' },
                { field: "wayDesc", title: '随访方式', type: "text", width: '10%', align: 'center' },
                { field: "statusDesc", title: '随访状态', type: "text", width: '10%', align: 'center' },
                { field: "operation", title: '操作',  type: "control",width: '14%', align: 'left' }
            ]]
        };
        $scope.addFollowup = ( followupId ) => { //增加随访,编辑随访
        		$('.hidetip').hide();
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/addFollowup.html'),
                controller: 'addFollowupCtrl',
                controllerAs: 'addFollowupVm',
                size: 'width-65',
                resolve: {
                    items: function() {
                        return {
                            action: 'ADD',
                            followUpId: followupId ? followupId : ''
                        };
                    },
                    addFollowupCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./addFollowup-controller'], (require) => {
                            const ctrl = require('./addFollowup-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './followUp/addFollowup-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                $scope.init( $scope.pageConfig.pageIndex, 10 );
            });
        }
        $scope.goSeeFollowup = ( followupId ) => { //查看随访
        		$('.hidetip').hide();
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/seeFollow.html'),
                controller: 'seeFollowupCtrl',
                controllerAs: 'seeFollowupVm',
                size: 'width-65',
                resolve: {
                    items: function() {
                        return {
                            action: 'ADD',
                            followUpId: followupId
                        };
                    },
                    seeFollowupCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./seeFollowup-controller'], (require) => {
                            const ctrl = require('./seeFollowup-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './followUp/seeFollowup-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
            });
        }
        $scope.goFollowupOperation = ( followupId ) => { //随访
        		$('.hidetip').hide();
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/followupOperation.html'),
                controller: 'followupOperationCtrl',
                controllerAs: 'followupOperationVm',
                size: 'width-65',
                resolve: {
                    items: function() {
                        return {
                            action: 'ADD',
                            followUpId: followupId
                        };
                    },
                    followupOperationCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./followupOperation-controller'], (require) => {
                            const ctrl = require('./followupOperation-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './followUp/followupOperation-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
//          		$scope.pagination.currentPage = 1;
                $scope.init( $scope.pageConfig.pageIndex, 10 );
            });
        }
    }
}
FollowuplistCtrl.$inject = ['$scope', '$uibModal', 'FollowupService', 'toastr'];


module.exports = (ngMold) => {
    require.ensure(['../service/followup-service'], (require) => {
        require('../service/followup-service')(ngMold);
    }, './followUp/followup-service');
    ngMold.controller('followupListCtrl', FollowuplistCtrl);
}