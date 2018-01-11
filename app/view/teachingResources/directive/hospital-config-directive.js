let DryadHospitalConfig = ($timeout,_) => {
    return {
        restrict: "ECMA",
        scope: {
            chooiseList:'=', //双向数据绑定
            cityList:'=',
            getHospitalList:"=" //绑定方法，@绑定属性
        },
        transclude: true,
        replace: true,
        template: require('../html/hospital-config.html'),
        controller:['$scope',function($scope){
            $scope.isShow = false;
            
            //处理城市列表数据
            $scope.cityList = $scope.cityList.map((item,i) => {
                if(i == 0){
                    item.active = true;
                }else{
                    item.active = false;
                }
                return item;
            });

            //已选择的医院
            $scope.chooiseLists = angular.copy($scope.chooiseList) || [];

            //显示下拉框
            $scope.showSelect = (flag) => {
                if(flag == 1){
                    $scope.$emit('chooiseHospital',{chooiseList:$scope.chooiseLists});
                }else if(flag == 2){
                    $scope.chooiseLists = angular.copy($scope.chooiseList) || [];
                    $scope.todoHospitalList();
                }
                $scope.isShow = !$scope.isShow;
            }
        }],
        link:function(scope,ele,attr){
            //初始化获取选中城市的医院列表
            scope.initHospitalList = null;
            scope.todoHospitalList = () => {
                scope.initHospitalList = scope.getHospitalList().map((item,i) => {
                    item.active = false;
                    return item;
                });
                if(scope.chooiseLists.length > 0 ){
                    scope.chooiseLists.forEach(function(element) {
                        scope.initHospitalList.forEach((item,i) => {
                            if(element.id == item.id){
                                scope.initHospitalList[i].active = true;
                            }
                        });
                    }, this);
                }
                scope.hospitalList = angular.copy(scope.initHospitalList);
            }
            scope.todoHospitalList();

            //city click
            scope.cityClick = (city,index) => {
                scope.cityList.map((item,i) => {
                    if(i == index){
                        item.active = true;
                    }else{
                        item.active = false;
                    }
                    return item;
                });
                //获取选中城市的医院列表
                scope.todoHospitalList();
            };

            //hospital click
            scope.hospitalClick = (hospital,index) => {
                if(!hospital.active){
                    scope.chooiseLists.push(hospital);
                    scope.hospitalList[index].active = true;
                }else{
                    scope.hospitalList[index].active = false;
                    isHas = _.filter(scope.chooiseLists,(item) => {
                        return item.id !== hospital.id;
                    });
                    scope.chooiseLists = isHas;
                }
            };

            //点击展示的选中项删除
            scope.deleteChooise = (item,index) => {
                scope.chooiseLists.splice(index,1);
                scope.todoHospitalList();
            }

            //点击空白区域隐藏
            $(window).on('click', (evt) => {
                let targets = evt.target;
                if ((targets.className !== $(ele)[0].className) && $(ele).find(targets).length == 0) {
                    scope.isShow = false;
                    scope.$apply();
                }
            });
            
        }
    }
};

DryadHospitalConfig.$inject = ['$timeout','_'];
module.exports = (ngMold) => {
    ngMold.directive('dryadHospitalConfig',DryadHospitalConfig);
};