let DryadScreenUi = ($timeout) => {
    return {
        restrict: "ECMA",
        scope: {
            // screenData: '=',
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
            $scope.screenData = [{
                logic: null,
                theme: null,
                conditions: null,
                domainValues: null
            }];
        }],
        controllerAs: 'screenVm',
        link: ($scope, ele, attr) => {
            let screenmain = $(ele);
            let screening = $(ele).prev('a');
            let iIcon = $(screening).find('i');

            // save a template for this screen conditions
            $scope.remeber = false;
            $scope.templateName = null;

            //screen box show and hide
            let showHide = () => {
                if (screenmain.hasClass('show')) {
                    screenmain.removeClass('show').hide(500);
                    $(iIcon).removeClass('full-selectup').addClass('full-selectdown');
                } else {
                    if ($scope.screenData.length == 0) {
                        $scope.screenData.push({
                            logic: null,
                            theme: null,
                            conditions: null,
                            domainValues: null
                        });
                    }
                    $(iIcon).removeClass('full-selectdown').addClass('full-selectup');
                    screenmain.addClass('show').show(500);
                }
            };

            $(screening).bind('click', () => {
                showHide();
            });

            //add row
            $scope.addRow = (index) => {
                let rowData = {
                    logic: null,
                    theme: null,
                    conditions: null,
                    domainValues: null
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
                $scope.screenData = [{
                    logic: null,
                    theme: null,
                    conditions: null,
                    domainValues: null
                }];
                $scope.remeber = false;
                $scope.templateName = null;
            };

            //search screen
            $scope.searchScreen = () => {
                let obj = {
                    screenData: angular.copy($scope.screenData),
                    remeber: $scope.remeber,
                    templateName: $scope.templateName
                }
                screenmain.removeClass('show').hide(500);
                $(iIcon).removeClass('full-selectup').addClass('full-selectdown');
                $scope.searchFn(obj);
                $scope.screenData = [{
                    logic: null,
                    theme: null,
                    conditions: null,
                    domainValues: null
                }];
                $scope.remeber = false;
                $scope.templateName = null;
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

            //reception data
            $scope.$on('edite', (evt, obj) => {
                $scope.screenData = obj.screenData;
                $scope.remeber = obj.remeber;
                $scope.templateName = obj.templateName;
                showHide();
            });
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