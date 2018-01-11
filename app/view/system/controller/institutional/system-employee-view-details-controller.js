require('../../../../../images/default-logo.png');
class SystemEmployeeViewDetailsCtrl {
    constructor($scope, $stateParams,$state,systemService,$timeout) {
        $scope.id = $stateParams.id;
        $scope.departmentObj = {};
        $scope.otherObj = {
            headPicUrl:`/images/default-logo.png`
        }
        // 初始化数据
        $scope.initData = () => {
            if(!$scope.id){return false;}
            systemService.queryDoctorInformation($scope.id).then(rps => {
                if(rps.status == 200){
                    $scope.departmentObj = rps.data;
                    if($scope.departmentObj.headPicUrl){
                    		$scope.otherObj.headPicUrl = $scope.departmentObj.headPicUrl;
                    }
                    
                }else{
                    toastr.error(rps.errorMessage,null,1500);
                }
            });
            console.log($scope.otherObj.headPicUrl)
        };
        $scope.initData();
        
        //print
        $scope.print = () => {
			var popupWin = window.open('', '_blank');
            var headstr = "<html><head><title></title></head><body  style='display:flex;justify-content:center;align-items:center;'>";
			var footstr = "</body>";
			var str = `
			<div class="print-main" style="overflow:hidden;width:400px;border:1px solid #00a6c9;padding:10px;">
				<div class="print-main-top" style="overflow:hidden;">
					<div class="print-main-top-l" style="float:left;margin-left:40px;margin-right:80px;overflow: hidden;margin-top: 20px;border-radius:50%;">
						<div class="print-headimg" style="width:100px;height:100px;">
							<img style="width:100px;height:100px;" src=`+$scope.otherObj.headPicUrl+` alt="员工头像">
						</div>
					</div>
					<div class="print-main-top-r" style="float:left;">
						<p>姓名:<span>`+$scope.departmentObj.name+`</span></p>
						<p>职业:<span>`+$scope.departmentObj.roleName+`</span></p>
						<p>科室:<span>`+$scope.departmentObj.deptName+`</span></p>
					</div>
				</div>
				<div class="print-qrimg" style="text-align:center;">
					<img style="width:240px;height:240px;" src=`+$scope.departmentObj.qrCodeUrl+` alt="员工二维码">
				</div>
			</div>
			`
			popupWin.document.write(headstr + str + footstr);
            popupWin.document.close();
            popupWin.focus();
            $timeout(function(){
            		popupWin.print();
            })
        };
        //download
        $scope.download = () => {
            var popupWin = window.open('', '_blank');
            var headstr = "<html><head><title></title></head><body  style='display:flex;justify-content:center;align-items:center;'>";
			var footstr = "</body>";
			var str = `
			<div class="print-main" style="overflow:hidden;width:400px;border:1px solid #00a6c9;padding:10px;">
				<div class="print-main-top" style="overflow:hidden;">
					<div class="print-main-top-l" style="float:left;margin-left:40px;margin-right:80px;overflow: hidden;margin-top: 20px;border-radius:50%;">
						<div class="print-headimg" style="width:100px;height:100px;">
							<img style="width:100px;height:100px;" src=`+$scope.otherObj.headPicUrl+` alt="员工头像">
						</div>
					</div>
					<div class="print-main-top-r" style="float:left;">
						<p>姓名:<span>`+$scope.departmentObj.name+`</span></p>
						<p>职业:<span>`+$scope.departmentObj.roleName+`</span></p>
						<p>科室:<span>`+$scope.departmentObj.deptName+`</span></p>
					</div>
				</div>
				<div class="print-qrimg" style="text-align:center;">
					<img style="width:240px;height:240px;" src=`+$scope.departmentObj.qrCodeUrl+` alt="员工二维码">
				</div>
			</div>
			`
			popupWin.document.write(headstr + str + footstr);
            popupWin.document.close();
            popupWin.focus();
            $timeout(function(){
            		popupWin.print();
            })
        };

        //edit
        $scope.edit = () => {
            $state.go('dryad.system.institutional-management.details', { id: $scope.id,pageindex:$stateParams.pageindex,searchkey:$stateParams.searchkey});
        };

        //cancel
        $scope.close = () => {
            $state.go('dryad.system.institutional-management.list.employee',{pageindex:$stateParams.pageindex,searchkey:$stateParams.searchkey});
        };


    }
}
SystemEmployeeViewDetailsCtrl.$inject = ['$scope', '$stateParams','$state','systemService','$timeout'];
module.exports = (ngMold) => {
	require.ensure(['../../service/system-service'], (require) => {
        require('../../service/system-service')(ngMold);
    }, './system/system-service');
    ngMold.controller('systemEmployeeViewDetailsCtrl', SystemEmployeeViewDetailsCtrl);
}