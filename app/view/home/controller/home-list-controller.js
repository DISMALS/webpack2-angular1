class HomeListCtrl {
    constructor($scope, $state, $stateParams) {
        console.log(13112);
        $scope.tabData = [{
                heading: '患者列表',
                route: 'dryad.home.module.main',
                disable: false,
                params: {
                    index: 0
                }
            },
            {
                heading: '地域分布',
                route: 'dryad.home.module.list.area',
                disable: false,
                params: {
                    index: 1
                }
            }
        ];
/*
        $state.go($scope.tabData[0]['route'], $scope.tabData[0]['params']);
*/
    }
}
HomeListCtrl.$inject = ['$scope', '$state', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('homeListCtrl', HomeListCtrl);
}