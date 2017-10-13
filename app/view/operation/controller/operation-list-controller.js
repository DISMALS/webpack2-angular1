class OperationListCtrl {
    constructor($scope) {

    }
}
OperationListCtrl.$inject = ['$scope'];


module.exports = (ngMold) => {
    ngMold.controller('operationListCtrl', OperationListCtrl);
}