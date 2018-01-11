let DryadRoleTreeUi = ($timeout,_) => {
    return {
        restrict: "EA",
        scope:{
            optionsInstance:'=',
            roleList:"=",
            permissionList:"="
        },
        transclude: true,
        replace: true,
        template: require('../html/role-tree-ui.html'),
        controller: ['$scope', ($scope) => {
            
        }],
        link: (scope, ele, attr) => {
            scope.optionList = {};
            scope.roleData = [];
            //角色编辑时选中的角色
            scope.chooiseRole = {};

            //角色是否禁用
            scope.isEnable = true;

            // 是否可以进行保存权限操作
            scope.canSave = false;

            //重新组织角色列表数据
            scope.$watch('roleList',(newValue,oldValue) => {
                if(newValue != oldValue){
                    // 重新处理角色列表
                    scope.roleData = angular.copy(scope.roleList).map((item,index) => {
                        item.index = index;
                        if(item.active){
                            item.active = true;
                            scope.chooiseRole = angular.copy(item);
                            scope.prevRoleActive = angular.copy(item);
                            scope.isEnable = angular.copy(item.status);
                        }else{
                            item.active = false;
                        }
                        return item;
                    });
                    // 获取角色权限
                    if(newValue && newValue.length > 0){
                        scope.optionsInstance.chooiseRole(newValue[0]);
                    }
                }
            },true);

            //监听权限列表变化
            scope.$watch('permissionList',(newValue,oldValue) => {
                if(newValue != oldValue){
                    scope.permissionList = scope.permissionList;
                }
            });
            

            //选中角色
            scope.roleActive = (role,index) => {
                scope.prevRoleActive = angular.copy(scope.chooiseRole);
                scope.roleData.forEach((item,i) => {
                    if(i == index){
                        item.active = true;
                        scope.chooiseRole = angular.copy(item);
                        scope.isEnable = angular.copy(item.status);
                        scope.optionsInstance.chooiseRole(role);
                    }else{
                        item.active = false;
                    }
                });
                scope.canSave = false;
            }
            
            //是否禁用角色
            scope.isEnableFn = (event,chooiseRole) => {
                scope.isEnable = !scope.isEnable;
                scope.roleData[scope.chooiseRole.index].status = scope.isEnable ? 1 : 0;
                scope.chooiseRole.status = scope.isEnable ? 1 : 0;
                scope.canSave = true;
                scope.optionsInstance.isDisabledFn(scope.isEnable,chooiseRole);
            };

            //toggle role list
            scope.toggles = (scope, node) => {
                if (node.subFunctionList && node.subFunctionList.length > 0) {
                    scope.toggle();
                }
            };

            //checkbox ,posessFunction:0、没有选中，1全部选中，2部分选中
            scope.checkBox = (node,event,self) => {
                if(!scope.isEnable){return false;}
                let targetDom = $(event.currentTarget);
                let parentDom = $(targetDom.parent());
                let parentOfParent = $(parentDom.parent());

                let selfParent = null;
                if(self.$parent.$parentNodeScope){ //有父级
                    selfParent = self.$parent.$parentNodeScope.$modelValue;//从二级获取一级项目
                }

                if(node.subFunctionList){ //有子集，全选或全不选
                    // node.some = false;
                    if(self.$parent.$parentNodeScope){ //有三级
                        if(node.posessFunction == 0 || node.posessFunction == 2){ //点击全选
                            node.posessFunction = 1;
                            let isSelectedArr = _.filter(selfParent.subFunctionList,(item) => {
                                return item.posessFunction == 1;
                            });
                            if(isSelectedArr.length == selfParent.subFunctionList.length){ //全部选中
                                scope.permissionList[selfParent.index].posessFunction = 1;
                            }else if(isSelectedArr.length > 0 && isSelectedArr.length < selfParent.subFunctionList.length){ //部分选中
                                scope.permissionList[selfParent.index].posessFunction = 2; 
                            }else if(isSelectedArr.length == 0){ //无选中
                                scope.permissionList[selfParent.index].posessFunction = 0;
                            }
                            targetDom.addClass('butify-checkbox-all');
                            node.subFunctionList.map((item,i) => {
                                item.posessFunction = 1;
                            });
                            $(parentDom[0]).next('ol').find('.butify-checkbox').addClass('butify-checkbox-all');
                        }else if(node.posessFunction == 1){ //取消全选
                            node.posessFunction = 0;
                            let noSelectedArr = _.filter(selfParent.subFunctionList,(item) => {
                                return item.posessFunction == 0;
                            });
                            if(noSelectedArr.length == 0){
                                scope.permissionList[selfParent.index].posessFunction = 1;
                            }else if(noSelectedArr.length == selfParent.subFunctionList.length){
                                scope.permissionList[selfParent.index].posessFunction = 0;
                            }else if(noSelectedArr.length > 0 && noSelectedArr.length < selfParent.subFunctionList.length){
                                scope.permissionList[selfParent.index].posessFunction = 2;
                            }
                            node.subFunctionList.map((item,i) => {
                                item.posessFunction = 0;
                            });
                            targetDom.removeClass('butify-checkbox-all');
                            $(parentDom[0]).next('ol').find('.butify-checkbox').removeClass('butify-checkbox-all');
                        }
                    }else{ //一级
                        if(node.posessFunction == 0 || node.posessFunction == 2){ //点击全选
                            node.posessFunction = 1;
                            targetDom.addClass('butify-checkbox-all');
                            node.subFunctionList.forEach((item,i) => {
                                item.posessFunction = 1;
                                if(item.subFunctionList && item.subFunctionList.length > 0){
                                    item.subFunctionList.forEach((ele,i) => {
                                        ele.posessFunction = 1;
                                    });
                                }
                            });
                            $(parentDom[0]).next('ol').find('.butify-checkbox').addClass('butify-checkbox-all');
                        }else if(node.posessFunction == 1){ //点击取消全选
                            node.posessFunction = 0;
                            node.subFunctionList.map((item,i) => {
                                item.posessFunction = 0;
                                if(item.subFunctionList && item.subFunctionList.length > 0){
                                    item.subFunctionList.forEach((ele,i) => {
                                        ele.posessFunction = 0;
                                    });
                                }
                            });
                            targetDom.removeClass('butify-checkbox-all');
                            $(parentDom[0]).next('ol').find('.butify-checkbox').removeClass('butify-checkbox-all');
                        }
                    }
                }else{ //无子集 ，
                    if(node.posessFunction == 0 || node.posessFunction == 2){ //选中
                        node.posessFunction = 1;
                        targetDom.addClass('butify-checkbox-all');
                        if(!selfParent){return false}; //没有父级

                        let selfParentParent = null;
                        if(self.$parent.$parentNodeScope.$parentNodeScope){ //有三级时选中
                            selfParentParent = self.$parent.$parentNodeScope.$parentNodeScope.$modelValue; //从三级获取一级项目
                            
                            //判断二级列表的选中状态
                            let isChiledSelectedArr = _.filter(selfParent.subFunctionList,(item) => {
                                return item.posessFunction == 1;
                            });
                            if(isChiledSelectedArr.length == 0){
                                selfParentParent.subFunctionList[selfParent.index].posessFunction = 0;
                            }else if(isChiledSelectedArr.length == selfParent.subFunctionList.length){
                                selfParentParent.subFunctionList[selfParent.index].posessFunction = 1;
                            }else if(isChiledSelectedArr.length > 0 && isChiledSelectedArr.length < selfParent.subFunctionList.length){
                                selfParentParent.subFunctionList[selfParent.index].posessFunction = 2;
                            }

                            //判断一级列表的选中状态
                            let isSelectedArr = _.filter(selfParentParent.subFunctionList,(item) => {
                                return item.posessFunction == 1;
                            });
                            let isSomeSelectedArr = _.filter(selfParentParent.subFunctionList,(item) => {
                                return item.posessFunction == 2;
                            });
                            if(isSelectedArr.length == 0 && isSomeSelectedArr.length == 0){
                                scope.permissionList[selfParentParent.index].posessFunction = 0;
                            }else if(isSelectedArr.length == selfParent.subFunctionList.length){
                                scope.permissionList[selfParentParent.index].posessFunction = 1;
                            }else if((isSelectedArr.length > 0 && isSelectedArr.length < selfParent.subFunctionList.length) || isSomeSelectedArr.length > 0){
                                scope.permissionList[selfParentParent.index].posessFunction = 2;
                            }
                        }else{  //无三级时选中
                            let isSelectedArr = _.filter(selfParent.subFunctionList,(item) => {
                                return item.posessFunction == 1;
                            });
                            if(isSelectedArr.length == selfParent.subFunctionList.length){ //全部选中
                                scope.permissionList[selfParent.index].posessFunction = 1;
                            }else if(isSelectedArr.length > 0 && isSelectedArr.length < selfParent.subFunctionList.length){ //部分选中
                                scope.permissionList[selfParent.index].posessFunction = 2; 
                            }else if(isSelectedArr.length == 0){ //无选中
                                scope.permissionList[selfParent.index].posessFunction = 0;
                            }
                        }
                    }else if(node.posessFunction == 1){  //取消选中
                        node.posessFunction = 0;
                        targetDom.removeClass('butify-checkbox-all');
                        if(!selfParent){return false}; //没有父级

                        let selfParentParent = null;
                        if(self.$parent.$parentNodeScope.$parentNodeScope){ //有三级时取消选中
                            selfParentParent = self.$parent.$parentNodeScope.$parentNodeScope.$modelValue; //从三级获取一级项目
                            
                            //判断二级列表选中状态
                            let noChiledSelectedArr = _.filter(selfParent.subFunctionList,(item) => {
                                return item.posessFunction == 0;
                            });
                            if(noChiledSelectedArr.length == selfParent.subFunctionList.length){
                                selfParentParent.subFunctionList[selfParent.index].posessFunction = 0;
                            }else if(noChiledSelectedArr.length > 0 && noChiledSelectedArr.length < selfParent.subFunctionList.length){
                                selfParentParent.subFunctionList[selfParent.index].posessFunction = 2;
                            }

                            //判断一级列表的选中状态
                            let isSelectedArr = _.filter(selfParentParent.subFunctionList,(item) => {
                                return item.posessFunction == 1;
                            });
                            let isSomeSelectedArr = _.filter(selfParentParent.subFunctionList,(item) => {
                                return item.posessFunction == 2;
                            });
                            if(isSelectedArr.length == 0 && isSomeSelectedArr.length == 0){
                                scope.permissionList[selfParentParent.index].posessFunction = 0;
                            }else if(isSelectedArr.length == selfParentParent.subFunctionList.length){
                                scope.permissionList[selfParentParent.index].posessFunction = 1;
                            }else if((isSelectedArr.length > 0 && isSelectedArr.length < selfParentParent.subFunctionList.length) || isSomeSelectedArr.length > 0){
                                scope.permissionList[selfParentParent.index].posessFunction = 2;
                            }
                        }else{ // 无三级时取消选中
                            let noSelectedArr = _.filter(selfParent.subFunctionList,(item) => {
                                return item.posessFunction == 0;
                            });
                            if(noSelectedArr.length == 0){
                                scope.permissionList[selfParent.index].posessFunction = 1;
                            }else if(noSelectedArr.length == selfParent.subFunctionList.length){
                                scope.permissionList[selfParent.index].posessFunction = 0;
                            }else if(noSelectedArr.length > 0 && noSelectedArr.length < selfParent.subFunctionList.length){
    
                                scope.permissionList[selfParent.index].posessFunction = 2;
                            }
                        } 
                    }
                }
            };

            //save
            scope.save = (chooiseRole,data) => {
                if(scope.canSave){
                    scope.optionsInstance.saveFn(chooiseRole,data);
                }
                scope.canSave = false;
            };

            //监听checkbox变化
            scope.$watch('permissionList',(newValue,oldValue) => {
                if(newValue != oldValue){
                    scope.canSave = true;
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
            <i  data-ng-click="toggles(this,node)" data-ng-class="{'full-selectdown':!this.collapsed,'right-icon':this.collapsed}" data-ng-if="node.subFunctionList && node.subFunctionList.length > 0"></i>
            <div class="butify-checkbox" data-ng-class="{'butify-checkbox-some' : (node.posessFunction == 2),'butify-checkbox-all': (node.posessFunction == 1),'butify-checkbox-disabled': !isEnable}" data-ng-click="checkBox(node,$event,this)">
                <i class="all-chooise all-chooise-disabled"></i>
                <i class="some-chooise some-chooise-disabled"></i>
                <input data-ng-model="node.selected" data-ng-disabled="!isEnable" type="checkbox" class="role-check">
            </div>
            <i class="file-icon" data-ng-if="node.subFunctionList && node.subFunctionList.length > 0"></i>
            <span class="tree-title role-title"><b data-ng-bind="node.functionName"></b><p data-ng-if="node.decription">({{node.decription}})</p></span>
        </div>
        <ol ui-tree-nodes class="child-list"  data-ng-model="node.subFunctionList" data-ng-class="{hidden: this.collapsed}">
            <li data-ng-repeat="node in node.subFunctionList" ui-tree-node data-ng-include="'common/role-tree-ui.html'"></li>
        </ol>
        `);
    }]);
    ngMold.directive('dryadRoleTreeUi', DryadRoleTreeUi);
}