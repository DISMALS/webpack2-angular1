let DryadPageUi = ($timeout, toastr) => {
    return {
        restrict: 'ECMA',
        scope: {
            pageConfig: '=', //pageIndex\pageSize\pageCount\
            pageDataFn:'=',
            pageCount:'='
        },
        transclude: true,
        replace: true,
        template: require('../../common/html/page-ui.html'),
        controller: ['$scope', 'toastr', ($scope, toastr) => {
            $scope.showList = [];
            $scope.pagination = {
                pageCount: 0,
                pageSize:10,
                currentPage: 1,
                goToPage: '',
                items:[],
                goto: function(pageNum) {
                    if ($scope.pageCount > $scope.pageConfig.pageSize) {
                        if (parseInt(pageNum) > $scope.pagination.pageCount) {
                            toastr.error('请输入小于' + ($scope.pagination.pageCount + 1) + '的正整数', null, 3000);
                            $scope.pagination.goToPage = '';
                            return;
                        };
                        $scope.pagination.currentPage = parseInt(pageNum);
                    }
                    $scope.initPageBar($scope.pageCount);
                },
                previousPage: function() {
                    $scope.pagination.currentPage--;
                    $scope.initPageBar($scope.pageCount);
                },
                nextPage: function() {
                    $scope.pagination.currentPage++;
                    $scope.initPageBar($scope.pageCount);
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
                    $scope.showList = arr;
                } else {
                    var arr = [];
                    for (var i = 1; i <= totalPages; i++) {
                        arr.push(i);
                    }
                    $scope.showList = arr;
                };
                if (!first) {
                    $scope.pageConfig.pageIndex = parseInt(pageNum);
                    $scope.pageDataFn($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize);
                    // $scope.$emit('changePage', { pageIndex: $scope.pageConfig.pageIndex });
                }

            }
            $scope.initPageBar($scope.pageConfig.pageCount, true);

            //go to the page
            $scope.jumpTo = (evt) => {
                let value = $scope.pagination.goToPage;
                let reg = /\d/g;
                if (evt.keyCode == 13) {
                    if (reg.test(value)) {
                        if (value == 0) {
                            toastr.error('请输入大于' + 0 + '的正整数', null, 3000);
                            $scope.pagination.goToPage = '';
                        } else if (value > 0) {
                            $scope.pagination.goto($scope.pagination.goToPage);
                            $scope.pagination.goToPage = '';
                        }
                    } else if (value == '') {
                        $scope.pagination.goto(1);
                    } else {
                        toastr.error('输入的页数格式不正确，请重新输入！', null, 3000);
                        $scope.pagination.goToPage = '';
                    }
                }
            }
            $scope.$on('dataList',(evt,obj) => {
                $scope.initPageBar(obj.page.totalCount,true);
            });
        }],
        link: (scope, ele, attr) => {
            // scope.items = 'dd';
            // console.log(scope.pagination);
        }
    };
};
DryadPageUi.$inject = ['$timeout', 'toastr'];

module.exports = (ngMold) => {
    ngMold.directive('dryadUiPage', DryadPageUi);
}