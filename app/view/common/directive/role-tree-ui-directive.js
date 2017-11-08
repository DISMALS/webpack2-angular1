let DryadRoleTreeUi = ($timeout,_) => {
    return {
        restrict: "EA",
        scope:{
            roleOptions:'='
        },
        transclude: true,
        replace: true,
        template: require('../html/role-tree-ui.html'),
        controller: ['$scope', ($scope) => {
            
        }],
        link: ($scope, ele, attr) => {
            let roleLeftM = $(ele).find('ul.role-l-m');
            let isEnableBtn = $(ele).find('div.isEnableBtn');
            //角色编辑时选中的角色
            $scope.chooiseRole = {};

            //角色是否禁用
            $scope.isEnable = true;

            // 是否可以进行保存权限操作
            $scope.canSave = false;

            //重新组织角色列表数据
            $scope.roleData = angular.copy($scope.roleOptions.roleData).map((item,index) => {
                item.index = index;
                if(index == 0){
                    item.active = true;
                    $scope.chooiseRole = angular.copy(item);
                    $scope.prevRoleActive = angular.copy(item);
                    $scope.isEnable = angular.copy(item.isEnable);
                    $scope.data = $scope.roleOptions.chooiseRole($scope.chooiseRole).map((data,i) => {
                        data.index = i;
                        data.some = _.filter(data.child,(node) => {return !node.isSelected;}).length > 0 && _.filter(data.child,(node) => {return !node.isSelected;}).length < data.child.length ? true : false;
                        return data;
                    });
                }else{
                    item.active = false;
                }
                return item;
            });

            //选中角色
            $scope.roleActive = (role,index) => {
                $scope.prevRoleActive = angular.copy($scope.chooiseRole);
                $scope.roleData.map((item,i) => {
                    if(i == index){
                        item.active = true;
                        $scope.chooiseRole = angular.copy(item);
                        $scope.isEnable = item.isEnable;
                        $scope.data = $scope.roleOptions.chooiseRole($scope.chooiseRole).map((data,k) => {
                            data.index = k;
                            data.some = _.filter(data.child,(node) => {return !node.isSelected;}).length > 0 && _.filter(data.child,(node) => {return !node.isSelected;}).length < data.child.length ? true : false;
                            return data;
                        });
                    }else{
                        item.active = false;
                    }
                });
                $scope.canSave = false;
            }
            
            //是否禁用角色
            $scope.isEnableFn = (event) => {
                $scope.isEnable = !$scope.isEnable;
                $scope.roleData[$scope.chooiseRole.index].isEnable = angular.copy($scope.isEnable);
                $scope.chooiseRole.isEnable = angular.copy($scope.isEnable);
                $scope.canSave = true;
            };

            //toggle role list
            $scope.toggles = (scope, node) => {
                if (node.child && node.child.length > 0) {
                    scope.toggle();
                }
            };

            //checkbox
            $scope.checkBox = (node,event,self) => {
                if(!$scope.isEnable){return false;}
                let targetDom = $(event.currentTarget);
                let parentDom = $(targetDom.parent());
                let parentOfParent = $(parentDom.parent());
                if(node.child){ //一级
                    node.some = false;
                    if(node.isSelected){
                        targetDom.addClass('butify-checkbox-all');
                        node.child.map((item,i) => {
                            item.isSelected = true;
                        });
                        $(parentDom[0]).next('ol').find('.butify-checkbox').addClass('butify-checkbox-all');
                    }else{
                        node.child.map((item,i) => {
                            item.isSelected = false;
                        });
                        targetDom.removeClass('butify-checkbox-all');
                        $(parentDom[0]).next('ol').find('.butify-checkbox').removeClass('butify-checkbox-all');
                    }
                }else{ //二级
                    let selfParent = self.$parent.$parentNodeScope.$modelValue;
                    if(node.isSelected){ //选中
                        targetDom.addClass('butify-checkbox-all');
                        let isSelectedArr = _.filter(selfParent.child,(item) => {
                            return item.isSelected;
                        });
                        if(isSelectedArr.length == selfParent.child.length){
                            $scope.data[selfParent.index].isSelected = true;
                            $scope.data[selfParent.index].some = false;
                        }else{
                            $scope.data[selfParent.index].isSelected = false;
                            $scope.data[selfParent.index].some = true;
                        }
                    }else{  //取消选中
                        targetDom.removeClass('butify-checkbox-all');
                        let noSelectedArr = _.filter(selfParent.child,(item) => {
                            return !item.isSelected;
                        });
                        if(noSelectedArr.length > 0){
                            $scope.data[selfParent.index].isSelected = false;
                        }
                        if((noSelectedArr.length == 0) || (noSelectedArr.length == selfParent.child.length)){
                            $scope.data[selfParent.index].some = false;
                        }else{
                            $scope.data[selfParent.index].some = true;
                        }
                    }
                    
                }
            };

            //save
            $scope.save = (chooiseRole,data) => {
                if($scope.canSave){
                    $scope.roleOptions.saveFn(chooiseRole,data);
                }
                $scope.canSave = false;
            };

            //监听checkbox变化
            $scope.$watch('data',(newValue,oldValue) => {
                if(newValue != oldValue){
                    $scope.canSave = true;
                }
            },true);

            //监听角色是否禁用
            
        }
    };
};
DryadRoleTreeUi.$inject = ['$timeout','_'];

module.exports = (ngMold) => {
    ngMold.run(["$templateCache", ($templateCache) => {
        $templateCache.put('common/role-tree-ui.html',`
        <div ui-tree-handle class="tree-node role-list">
            <i  data-ng-click="toggles(this,node)" data-ng-class="{'full-selectdown':!this.collapsed,'right-icon':this.collapsed}" data-ng-if="node.child && node.child.length > 0"></i>
            <div class="butify-checkbox" data-ng-class="{'butify-checkbox-some' : (node.child.length > 0) && node.some,'butify-checkbox-all':node.isSelected,'butify-checkbox-disabled':!isEnable}" data-ng-click="checkBox(node,$event,this)">
                <i class="all-chooise all-chooise-disabled"></i>
                <i class="some-chooise some-chooise-disabled"></i>
                <input data-ng-model="node.isSelected" data-ng-disabled="!isEnable" type="checkbox" class="role-check">
            </div>
            <i class="file-icon" data-ng-if="node.child && node.child.length > 0"></i>
            <span class="tree-title role-title"><b data-ng-bind="node.name"></b><p>({{node.decription}})</p></span>
        </div>
        <ol ui-tree-nodes class="child-list"  data-ng-model="node.child" data-ng-class="{hidden: this.collapsed}">
            <li data-ng-repeat="node in node.child" ui-tree-node data-ng-include="'common/role-tree-ui.html'"></li>
        </ol>
        `);
    }]);
    ngMold.directive('dryadRoleTreeUi', DryadRoleTreeUi);
}