/**
 * Created by wangmu on 17/11/7.
 */
class ResourceCtrl {
    constructor($scope,  $state) {
    }
}
ResourceCtrl.$inject = ['$scope', '$state'];


module.exports = (ngMold) => {
    ngMold.controller('resourceCtrl', ResourceCtrl);
}