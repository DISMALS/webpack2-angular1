/**
 * Created by wangmu on 17/11/8.
 */

class ResourcePublishCtrl {
    constructor( $scope, $state, $stateParams, $uibModal, moment, ResourceService, _, toastr, conmmonService,APP_CONFIG) {
        $scope.progress = 0;
        $scope.coverUrl = '';
        $scope.fileName = '';
        $scope.getInnerHTML=false;
        $scope.uploadData = {};
        $scope.operation = $stateParams.operation;
        $scope.resourceId = $stateParams.resourceId;
        $scope.operationText = $scope.operation === 'edit' ? '编辑' : '新增';
        $scope.activeTab = $stateParams.activeTab? $stateParams.activeTab : 1;

        $scope.getSearchInfo = () => { //获取下拉选项
            ResourceService.getResourceSearchProperty( ).then((data) => { //获取资源性质
                if ( data.status == 200) {
                    data.data.splice(0,1);
                    $scope.searchResourceList = data.data;
                } else {
                    toastr.error( data.errorMessage, null, 3000 );
                }
            });
            ResourceService.getResourcePositional().then((data) => { //资源分类
                if(data.status==200){
                    $scope.searchPositionalList = data.data;
                }else{
                    toastr.error(data.errorMessage,null,3000);
                    return;
                }
            });
            ResourceService.getResourceSearchClassify( ).then((data) => { //获取资源分类
                if ( data.status == 200) {
                    data.data.splice(0,1);
                    $scope.searchClassifyList = data.data;
                } else {
                    toastr.error( data.errorMessage, null, 3000 );
                }
            });
            ResourceService.getResourceSearchArea(1, 100).then((data) => { //区域中心
                if ( data.status == 200) {
                    $scope.searchArealist = data.data;
                    $scope.searchArealistCopy = $scope.searchArealist;
                } else {
                    toastr.error( data.errorMessage, null, 3000 );
                }
            });
            ResourceService.getResourceSearchOrg(1, 100).then((data) => { //医疗单位
                if ( data.status == 200) {
                    $scope.searchOrgList = data.data;
                    $scope.searchOrgListCopy = $scope.searchOrgList;
                } else {
                    toastr.error( data.errorMessage, null, 3000 );
                }
            });
            if ($scope.operation === 'edit') { //判断是否是编辑操作
                ResourceService.getResourceEdit( $scope.resourceId ).then((data) => {
                    if ( data.status == 200) {
                        $scope.progress = 100;
                        $scope.uploadData = data.data;
                        $scope.fileId = $scope.uploadData.fileId;
                        $scope.playAuth = $scope.uploadData.playAuth;
                        $scope.coverFileId = $scope.uploadData.coverFileId;
                        $scope.coverFileUrl = $scope.uploadData.coverFileUrl;
                        $scope.fileUrl = $scope.uploadData.fileUrl ? data.data.fileUrl: '';
                        $scope.textTitle = $scope.activeTab == 1 ? $scope.uploadData.title : '';
                        $scope.videoTitle = $scope.activeTab == 2 ? $scope.uploadData.title : '';
                        $scope.textContent = $scope.activeTab == 1 ? $scope.uploadData.content : '';
                        $scope.videoContent = $scope.activeTab == 2 ? $scope.uploadData.content : '';
                    } else {
                        toastr.error( data.errorMessage, null, 3000 );
                    }
                })
            }

        }
        $scope.getSearchInfo();
        $scope.goResourceList = () => {
            $state.go('dryad.resource.list.uncommitted');
        }
        //区域中心首拼过滤
        $scope.areaSearch = (value) =>{
        		var reg = /([\u4e00-\u9fa5]+)/g; //匹配中文
                if (value == '' || value == null) {
                    $scope.searchArealist = $scope.searchArealistCopy;
                } else {
                    $scope.searchArealist = [];
                    if (reg.test(value)) { //中文
                        $scope.searchArealistCopy.forEach(function(item) {
                            if (item.name.indexOf(value) > -1) {
                                $scope.searchArealist.push(item);
                            }
                        });
                    } 
                    //暂未首拼字段
                    //暂未首拼字段
                    //暂未首拼字段
//                  else { //字母、数字、特殊字符
//                      value = value.toUpperCase();
//                      for (var i = 0, len = $scope.searchArealistCopy.length; i < len; i++) {
//                          $scope.searchArealistCopy[i].regionShortnameEn=$scope.searchArealistCopy[i].regionShortnameEn.toUpperCase();
//                          if ($scope.searchArealistCopy[i].regionShortnameEn.indexOf(value) > -1) {
//                              $scope.searchArealist.push($scope.searchArealistCopy[i]);
//                          }
//                      }
//                  }
            } 
        }
        //医疗单位首拼过滤
        $scope.orgSearch = (value) =>{
        		var reg = /([\u4e00-\u9fa5]+)/g; //匹配中文
                if (value == '' || value == null) {
                    $scope.searchOrgList = $scope.searchOrgListCopy;
                } else {
                    $scope.searchOrgList = [];
                    if (reg.test(value)) { //中文
                        $scope.searchOrgListCopy.forEach(function(item) {
                            if (item.orgName.indexOf(value) > -1) {
                                $scope.searchOrgList.push(item);
                            }
                        });
                    } 
                    //暂未首拼字段
                    //暂未首拼字段
                    //暂未首拼字段
//                  else { //字母、数字、特殊字符
//                      value = value.toUpperCase();
//                      for (var i = 0, len = $scope.searchOrgListCopy.length; i < len; i++) {
//                          $scope.searchOrgListCopy[i].regionShortnameEn=$scope.searchOrgListCopy[i].regionShortnameEn.toUpperCase();
//                          if ($scope.searchOrgListCopy[i].regionShortnameEn.indexOf(value) > -1) {
//                              $scope.searchOrgList.push($scope.searchOrgListCopy[i]);
//                          }
//                      }
//                  }
            } 
        }
        $scope.serviceFunc = (file) => { //上传视屏
            conmmonService.saveimGroupUpload( file ).then( (data) => { //获得文件id
                if ( data.status == 200) {
                    $scope.fileId = data.data;
                } else {
                    toastr.error( data.errorMessage, null, 3000 );
                }
                conmmonService.getUploadImgUrl ( $scope.fileId  ).then( (data) => { //获得文件url
                    if ( data.status == 200) {
                        $scope.playAuth = data.data.filePath;
                    } else {
                        toastr.error( data.errorMessage, null, 3000 );
                    }
                })
            })
        }
        $scope.goPreview = ( obj ) => { //前往预览页面
            if ($scope.activeTab === 2) { //视频预览
               return $scope.goVideoPreview( obj, 'preview' );
            }
            $uibModal.open({ // 图文预览
                animation: true,
                backdrop: 'static',
                template: require('../html/resource-previewText.html'),
                controller: 'resourcePreviewTextCtrl',
                controllerAs: 'resourcePreviewTextVm',
                size: 'publish-lg',
                resolve: {
                    items: function() {
                        return {
                            action: 'ADD',
                            data: obj
                        };
                    },
                    resourcePreviewTextCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./resource-previewText-controller'], (require) => {
                            const ctrl = require('./resource-previewText-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './resource/resource-previewText-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
            });
        }
        $scope.goVideoPreview = (obj, type) => { //视频预览
            obj.createDate = $scope.operation === 'edit' ? $scope.uploadData.createDate : moment( new Date() ).format('YYYY-MM-DD');
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/resource-previewVideo.html'),
                controller: 'resourcePreviewVideoCtrl',
                controllerAs: 'resourcePreviewVideoVm',
                size: 'publish-lg',
                resolve: {
                    items: function() {
                        return {
                            data: obj,
                            type: type
                        };
                    },
                    resourcePreviewVideoCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./resource-previewVideo-controller'], (require) => {
                            const ctrl = require('./resource-previewVideo-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './resource/resource-previewVideo-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
            });
        }
        //接受返回的umidtor
        $scope.$on('giveHTML',(evt,obj)=>{
            $scope.textContent=obj.html;
            if($scope.activeTab==1){
                $scope.SaveResource(obj.type);
            }
        })
        //如果是富文本编辑，去转换html
        $scope.getSaveResource=(type)=>{
            if($scope.activeTab==1){
                $scope.$broadcast('goUmeditor',{type:type})
            }else{
                $scope.SaveResource(type)
            }
        }
        //最终的保存
        $scope.SaveResource = function ( type ) {
                let obj = {
                    author: $scope.uploadData.author,
                    coverFileId: $scope.coverFileId,
                    coverFileUrl: $scope.coverFileUrl,
                    property: $scope.uploadData.property,
                    classify: $scope.uploadData.classify,
                    positionalId: $scope.uploadData.positionalId,
                    type:  $scope.activeTab === 1 ? 2 : 1,
                    authorIntroduce: $scope.uploadData.authorIntroduce,
                    fileId: $scope.activeTab === 1? '' : $scope.fileId,
                    playAuth: $scope.activeTab === 1? '' : $scope.playAuth,
                    title: $scope.activeTab == 1 ? $scope.textTitle : $scope.videoTitle,
                    orgId: $scope.uploadData.property == 3 ?  $scope.uploadData.orgId : '',
                    areaId: $scope.uploadData.property == 2 ?  $scope.uploadData.areaId : '',
                    content: $scope.activeTab == 1 ? $scope.textContent : $scope.videoContent,
                    resourceId: $scope.uploadData.resourceId  ? $scope.uploadData.resourceId : '',
                    doctorAccountNo: $scope.uploadData.property == 4 ?  $scope.uploadData.doctorAccountNo : '',
                };
                 if (!obj.author) {
                     return toastr.error("请填写作者!");
                 }
                 if (!obj.title) {
                     return toastr.error("请填写资源标题!");
                 }
                 if (!obj.coverFileUrl) {
                     return toastr.error("请上传封面图片!");
                 }
                 if (!obj.content && $scope.activeTab === 1) {
                     return toastr.error("请填写图文内容!");
                 }
                 if (!obj.content && $scope.activeTab === 2) {
                     return toastr.error("请填写视频简介!");
                 }
                 if (!obj.fileId && $scope.activeTab === 2) {
                     return toastr.error("请上传资源视频!");
                 }
                 if (!obj.property) {
                     return toastr.error("请选择资源性质!");
                 }
                 if (!obj.classify) {
                     return toastr.error("请选择资源分类!");
                 }
                 if (!obj.positionalId) {
                     return toastr.error("请选择医生职称!");
                 }

                 if (!obj.areaId && $scope.uploadData.property == 2) {
                     return toastr.error("请填写区域中心");
                 }
                 if (!obj.orgId && $scope.uploadData.property == 3) {
                     return toastr.error("请填写医疗单位");
                 }
                 if (!obj.doctorAccountNo && $scope.uploadData.property == 4) {
                     return toastr.error("请填写医生账号");
                 }
                 if ( type === 'preview') {
                     return $scope.goPreview( obj );
                 }
                 if ( type === 'saveAndSubmit') {
                     return $scope.getSaveAndSubmit( obj );
                 }
                //  console.log(obj)
                 ResourceService.getSave( obj ).then(( data ) =>{
                     if ( data.status == 200) {
                         toastr.success('保存成功', null, 3000);
                         return  $state.go('dryad.resource.list.uncommitted');
                     }
                     toastr.error( data.errorMessage, null, 3000 );
                 })
        }
        $scope.getSaveAndSubmit = ( obj ) => {
            ResourceService.getSaveAndSubmit( obj ).then(( data ) =>{
                if ( data.status == 200) {
                    toastr.success('提交成功');
                    return  $state.go('dryad.resource.list.pendingApproval');
                }
                toastr.error( data.errorMessage );
            })
        }
    };
}
ResourcePublishCtrl.$inject = [ '$scope', '$state', '$stateParams', '$uibModal', 'moment', 'ResourceService', '_', 'toastr', 'conmmonService','APP_CONFIG'];

module.exports = (ngMold) => {
    require.ensure(['../service/resource-service'], (require) => {
        require('../service/resource-service')(ngMold);
    }, './resource/resource-service');
    ngMold.controller('resourcePublishCtrl', ResourcePublishCtrl);
}