let DryadPageUi = () => {
    return {
        restrict: 'ECMA',
        scope: {
            pageConfig: '=' //pageIndex\pageSize\pageCount\
        },
        transclude: true,
        replace: true,
        template: require('../../common/html/page-ui.html'),
        controller: ['$scope', ($scope) => {
            let config = $scope.pageConfig;
            console.log($scope);
            $scope.pagination = {
                pageCount: 0,
                pageSize: 20,
                currentPage: 1,
                goToPage: '',
                items: [],
                goto: function(pageNum) {
                    if ($scope.pageCount > $scope.pagination.pageSize) {
                        if (parseInt(pageNum) == 0 || parseInt(pageNum) > $scope.pagination.pageCount) {
                            $uiNoty.error('请输入小于' + ($scope.pagination.pageCount + 1) + '的正整数');
                            return;
                        };
                        $scope.pagination.currentPage = parseInt(pageNum);
                    }

                    initPageBar($scope.pageCount);
                },
                previousPage: function() {
                    $scope.pagination.currentPage--;
                    initPageBar($scope.pageCount);
                },
                nextPage: function() {
                    $scope.pagination.currentPage++;
                    initPageBar($scope.pageCount);
                }
            };

            function initPageBar(pageCount, first) {
                var maxPages = 5;
                var pageNum = $scope.pagination.currentPage;
                var totalPages = $scope.pagination.pageCount = Math.ceil(pageCount / $scope.pagination.pageSize);
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
                    $scope.pages.pageIndex = parseInt(pageNum);
                    $scope.$emit('changePage', { pageIndex: pageIndex });
                }
            }
            initPageBar(config.pageCount, true);
        }],
        controllerAs: 'dryadUiPageVm',
        link: (scope, ele, attr) => {
            // console.log(scope.pageConfig);
            let config = scope.pageConfig;
            // initPageBar(config.pageCount, true);
        }
    };
};
// DryadPageUi.$inject = ['$timeout', '$cookies', '$state'];

module.exports = (ngMold) => {
    ngMold.directive('dryadUiPage', DryadPageUi);
}