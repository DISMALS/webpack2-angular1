class SystemDrugDictionaryCtrl {
    constructor($scope, $state, $stateParams) {
        $scope.tabData = [{
                heading: '控制类药物',
                route: 'dryad.system.drug-dictionary.controlclass',
                disable: false,
                params: {
                    index: 0
                }
            },
            {
                heading: '缓解类药物',
                route: 'dryad.system.drug-dictionary.easeclass',
                disable: false,
                params: {
                    index: 1
                }
            }, {
                heading: '未分类药物',
                route: 'dryad.system.drug-dictionary.unclassified',
                disable: false,
                params: {
                    index: 2
                }
            }
        ];
        $state.go($scope.tabData[0]['route'], $scope.tabData[0]['params']);
    }
}
SystemDrugDictionaryCtrl.$inject = ['$scope', '$state', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('systemDrugDictionaryCtrl', SystemDrugDictionaryCtrl);
}