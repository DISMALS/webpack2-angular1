require('../../../../images/user-man.png');
require('../../../../images/user-woman.png');
let DryadCommonSearchUi = ($timeout,$state,$cookies,toastr) => {
    return {
        restrict: "ECMA",
        // terminal: true,
        scope: {
            homeDetails:'=',
            medicalRecords:'=',
            searchValue:'=',
            searchList:'=',
            searchBtn:"=",
            createHis:"="
        },
        transclude: true,
        replace: true,
        template: `
            <span class="head-search" data-ng-hide="homeDetails">
                <input class="search-input" data-ng-model="keyWords"  data-ng-keydown="enterFn($event)" type="text" placeholder="姓名/拼音/手机号">
                <div class="search-list">
                    <i class="search-dialog dialog-needle"></i>
                    <span class="search-list-promp" data-ng-if="searchList.length > 0">找到<b>{{searchList.length}}</b>位符合条件的患者</span>
                    <ul class="search-list-main">
                        <li data-ng-repeat="patient in searchList">
                            <a data-ng-click="selectedItem(patient)">
                                <i  class="patients-img">
                                    <img data-ng-if="patient.sex == 'M'" data-ng-src={{man}}>
                                    <img data-ng-if="patient.sex == 'F'" data-ng-src={{woman}}>
                                </i>
                                <div class="patients-name-info">
                                    <p class="patients-name">{{patient.name}}</p>
                                    <p class="patients-info"><i class="patients-sex" data-ng-class="{'patients-man':patient.sex == 'M','patients-women':patient.sex == 'F'}"></i>{{patient.age}}</p>
                                </div>
                            </a>
                            <span id="tooltipsa" class="search-add-medical-record-span look" data-ng-click="createMedicals($event,patient)" data-title="新增病历">
                                <i class="search-add-medical-record"></i>
                            </span>
                            
                        </li>
                    </ul>
                    <a class="search-list-promp"  data-ng-click="medicalRecord()">新增患者</a>
                </div>
                <i data-ng-click="searchValue(keyWords)" class="search"></i>
            </span>
        `,
        controller: ['$scope', ($scope) => {
            $scope.man = 'images/user-man.png';
            $scope.woman = 'images/user-woman.png';
         }],
        controllerAs: 'searchUi',
        // link:{
            
        // },
        compile:(element, attrs, transclude) => {
            return {
                pre:(scope, ele, attr,controller) => {
                    scope.keyWords = '';
        
                    $timeout(() => {
                        $("#tooltipsa").tooltip();
        
                        $input = $($(ele).find('input'));
                        $searchList = $($(ele).find('.search-list'));
                        $searchMedicalRecord = $(ele).find('.search-add-medical-record');
        
                        //新增病历
                        scope.createMedicals = (evt,patient) => {
                            scope.user = $cookies.get('user') ? JSON.parse($cookies.get('user')) : {};
                            if($searchList.hasClass('show')){
                                $searchList.removeClass('show');
                            };
                            //判断当前是否有正在新建的病历
                            let account = $cookies.get('createAccount');
                            let obj = {
                                doctorId:scope.user.employeeId,
                                patientId: patient.patientId
                            }
                            scope.createHis(obj,2);
                            // $state.go('dryad.medicalhistory.search',{createRecord:patient});
                        };
        
                        //新增患者
                        scope.medicalRecord = () => {
                            if($searchList.hasClass('show')){
                                $searchList.removeClass('show');
                            };
                            scope.medicalRecords();
                        };
        
                        //选中患者
                        scope.selectedItem = (patient) => {
                            if($searchList.hasClass('show')){
                                $searchList.removeClass('show');
                            };
                            $state.go('dryad.patients.search',{createPatients:patient});
                        }
        
                        //搜索
                        scope.enterFn = (evt) => {
                            if(evt.keyCode == 13){
                                scope.searchValue(scope.keyWords);
                            }
                        };
        
                        scope.$on('searchResult',(evt,obj) => {
                            $searchList.addClass('show');
                            // scope.keyWords = '';
                        });
                        
                        //点击空白处关闭弹窗
                        $(window).on('click', (evt) => {
                            let targets = evt.target;
                            if ((targets.className != $input[0].className)) {
                                if($searchList.hasClass('show')){
                                    $searchList.removeClass('show');
                                };
                                // scope.$apply();
                            }
                        });
                    },10,false);
                },
                post:(scope, ele, attr,controller) => {
    
                }
            }
        } 
    };
};
DryadCommonSearchUi.$inject = ['$timeout','$state','$cookies','toastr'];

module.exports = (ngMold) => {
    ngMold.directive('dryadCommonSearchUi', DryadCommonSearchUi);
}