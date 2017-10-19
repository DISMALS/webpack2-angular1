let DryadScreenUi = ($timeout) => {
    return {
        restrict: "ECMA",
        scope: {
            screenData: '=',
            searchFn: '='
        },
        transclude: true,
        replace: true,
        template: require('../../common/html/screen-ui.html'),
        controller: ['$scope', ($scope) => {
            $scope.searchSelect = [{
                id: 1,
                name: '测试1测试1测试1测试1测试1测试1'
            }, {
                id: 2,
                name: '测试2测试2测试2测试2测试2'
            }, {
                id: 3,
                name: '测试3测试3测试3测试3'
            }];
        }],
        controllerAs: 'screenVm',
        link: ($scope, ele, attr) => {
            let screenmain = $(ele);
            let screening = $(ele).prev('a');
            let iIcon = $(screening).find('i');
            $scope.show = false; //只有点击的时候内容才会渲染出来

            $(screening).bind('click', () => {
                if (screenmain.hasClass('show')) {
                    $scope.show = false;
                    screenmain.removeClass('show').hide(500);
                    $(iIcon).removeClass('full-selectup').addClass('full-selectdown');
                } else {
                    $scope.show = true;
                    $(iIcon).removeClass('full-selectdown').addClass('full-selectup');
                    screenmain.addClass('show').show(500);
                }
            });

            //add row
            $scope.addRow = (index) => {
                let rowData = {
                    logic: null,
                    theme: null,
                    conditions: null,
                    domainValues: ''
                };
                $scope.screenData.splice(index + 1, 0, rowData);
            };

            //delete row 
            $scope.deleteRow = (index) => {
                $scope.screenData.splice(index, 1);
            };

            //close screen
            $scope.closeScreen = () => {
                $(iIcon).removeClass('full-selectup').addClass('full-selectdown');
                screenmain.removeClass('show').hide(500);
                $scope.resetScreen();
            };

            //search screen
            $scope.searchScreen = () => {
                let screenData = angular.copy($scope.screenData);
                screenmain.removeClass('show').hide(500);
                $(iIcon).removeClass('full-selectup').addClass('full-selectdown');
                $scope.searchFn(screenData);
                $scope.resetScreen();
            };

            //reset screen
            $scope.resetScreen = () => {
                $scope.screenData = $scope.screenData.map((item) => {
                    for (let k in item) {
                        item[k] = null;
                    }
                    return item;
                });
            };

            //点击空白处关闭弹窗
            // $(window).on('click', (evt) => {
            //     let targets = evt.target;
            //     if ((targets.className !== screenmain[0].className) && (screenmain.find(targets).length == 0) && targets.className != 'screening' && targets.className != 'full-selectdown') {
            //         if (screenmain.hasClass('show')) {
            //             screenmain.removeClass('show').hide();
            //         }
            //     }
            // });
        }
    };
};
DryadScreenUi.$inject = ['$timeout'];

module.exports = (ngMold) => {
    ngMold.directive('dryadScreenUi', DryadScreenUi);
}