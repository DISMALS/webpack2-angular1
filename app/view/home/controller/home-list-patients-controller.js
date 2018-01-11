class HomeListPatientsCtrl {
    constructor($scope, $state, $cookies, homeService, $stateParams) {
        $scope.user = JSON.parse($cookies.get('user'));
        $scope.type = $stateParams.type;
        if ( $scope.type ) {
            $cookies.putObject('mainType', $scope.type);
        } else {
            $scope.type = $cookies.get('mainType')
        }

        $scope.doctorId = $scope.user.employeeId;
        $scope.pageConfig = {
            pageIndex: 1,
            pageSize: 10
        }

        $scope.init = (pageNo, listSize)=> {
            $scope.patientsListShow = false;
            let obj = {};
            if ( $scope.type == 1) {
                 obj = {
                    keyword: '',
                    pageNo: pageNo,
                    listSize: listSize,
                    doctorId:$scope.doctorId
                };
            } else {
                 obj = {
                    keyword: '',
                    pageNo: pageNo,
                    listSize: listSize,
                    doctorId:$scope.doctorId,
                    cs: $scope.type == 4 ? '0' : '',
                    level: $scope.type == 2 ? '3' : '',
                }
            }
            homeService.patientsSearch( obj, $scope.type ).then( data => {
                if (data.status == 200) {
                    if (data.data) {
                        _.each(data.data, (item, i) => {
                            item.index = ((obj.pageNo - 1) * 10) + i + 1;
                            item.sexN = item.sex == 'M' ? '男' : '女';
                            item.visitDate = item.visitDate ? moment(item.visitDate).format('YYYY-MM-DD') : '';
                             if($scope.user.userType==4){
                                item.name=changeDesensitization(4,item.name)
                            }
                        })
                    } else {
                        $scope.patientsListShow = true;
                    }
                    $scope.patientList = data.data;
                    $scope.pageConfig.pageCount = data.pager.totalCount;
                    $scope.initPageBar($scope.pageConfig.pageCount, true);
                    $scope.$broadcast('dataList',{data:$scope.patientList ? $scope.patientList : []});
                    // console.log($scope.patientsListShow);
                } else {
                    $scope.patientsListShow = true;
                    toastr.error(data.errorMessage, null, 1500);
                }
            })
        }
        $scope.init($scope.pageConfig.pageIndex, $scope.pageConfig.pageSize);
        //字段转换
       function changeDesensitization(type,data){
        if(type==1){ //名字
            return data.replace(/.(?=.)/g, '*');
        }
        if(type==2){//手机电话
            return data.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        }
        if(type==3){//固定电话
            return data.replace(/^.+(.)(.)(.)$/g, '****$1$2$3');
        }
        if(type==4){//地址
            // let dataObj=''
            // for(var i=0;i<data.length;i++){
            //     dataObj+='*';
            // }
            return '***';
        }
    }
        // 分页函数-----------------------------------------------
        $scope.pagination = {
            pageCount: 0,
            pageSize:10,
            currentPage: 1,
            goToPage: '',
            items:[],
            goto: function(pageNum) {
                if ($scope.pageConfig.pageCount > $scope.pageConfig.pageSize) {
                    if (parseInt(pageNum) > $scope.pagination.pageCount) {
                        toastr.error('请输入小于' + ($scope.pagination.pageCount + 1) + '的正整数');
                        $scope.pagination.goToPage = '';
                        return;
                    };
                    $scope.pagination.currentPage = parseInt(pageNum);
                }
                $scope.initPageBar($scope.pageConfig.pageCount);
            },
            previousPage: function() {
                $scope.pagination.currentPage--;
                $scope.initPageBar($scope.pageConfig.pageCount);
            },
            nextPage: function() {
                $scope.pagination.currentPage++;
                $scope.initPageBar($scope.pageConfig.pageCount);
            }
        };
        $scope.initPageBar = (pageCount, first) => {
            var maxPages = 5;
            var pageNum = $scope.pagination.currentPage;
            var totalPages = $scope.pagination.pageCount = Math.ceil(pageCount / $scope.pageConfig.pageSize);
            if (totalPages > maxPages) {
                var start, end, arr = [];
                if (parseInt(pageNum) <= Math.floor(maxPages / 2 + 1)) {
                    start = 1;
                    end = maxPages;
                } else if (parseInt(pageNum) > totalPages - Math.floor(maxPages / 2)) {
                    start = totalPages - maxPages + 1;
                    end = totalPages;
                } else {
                    start = parseInt(pageNum) - Math.floor(maxPages / 2);
                    end = parseInt(pageNum) + Math.ceil(maxPages / 2 - 1);
                }
                for (var i = start; i <= end; i++) {
                    arr.push(i);
                }
                $scope.pagination.items = arr;
            } else {
                var arr = [];
                for (var i = 1; i <= totalPages; i++) {
                    arr.push(i);
                }
                $scope.pagination.items = arr;
            };
            if (!first) {
                $scope.pageConfig.pageIndex = parseInt(pageNum);
                // $scope.pageDataFn($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize);
                $scope.init($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize);
                // $scope.$emit('changePage', { pageIndex: $scope.pageConfig.pageIndex });
            }

        }
        $scope.jumpTo = (evt) => {
            let value = $scope.pagination.goToPage;
            let reg = /\d/g;
            if (evt.keyCode == 13) {
                if (reg.test(value)) {
                    if (value == 0) {
                        toastr.error('请输入大于' + 0 + '的正整数');
                        $scope.pagination.goToPage = '';
                    } else if (value > 0) {
                        $scope.pagination.goto($scope.pagination.goToPage);
                        $scope.pagination.goToPage = '';
                    }
                } else if (value == '') {
                    $scope.pagination.goto(1);
                } else {
                    toastr.error('输入的页数格式不正确，请重新输入！', null, 2000);
                    $scope.pagination.goToPage = '';
                }
            }
        }
        // 分页函数-----------------------------------------------
        $scope.tableOptions ={
            elem:'#layuiTable',
            skin:{
                even:true,
                size:'sm',
                skin:'row'
            },
            cols:[[
                { field: "index", title: '#',width: '6%',align: 'center',unresize:true},
                { field: "name", title: '姓名', align: 'center',unresize:true},
                { field: "sexN", title: '性别', width: '7%', align: 'center',unresize:true},
                { field: "birthday", title: '出生日期', width: '15%', align: 'center',unresize:true},
                { field: "visitDate", title: '最近就诊日期', width: '15%', align: 'center',unresize:true},
                { field: "job", title: '职业', width: '15%', align: 'center',unresize:true},
                {
                    title: '操作', 
                    align: 'center',
                    unresize:true,
                    toolbar:`<div><a class="layui-btn layui-btn-mini" lay-event="detail">查看详情</a></div>`
                }
            ]]
        };

        //监听table事件
        layui.table.on('tool(layuiTable)', function(obj){
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的DOM对象
            if(layEvent === 'detail'){
                $scope.openHomeDetails(data)
            }
        });

        //双击行选中
        $scope.$on('dblclickRow',(evt,obj) => {
            let row = $scope.patientList[parseInt(obj.index)];
            $scope.openHomeDetails(row);
        });
        //查看详情
        //open page the details
        $scope.openHomeDetails = (row) => {
            $scope.$emit('addTab', {
                close: true,
                sex: row.sex,
                createdate:row.createDate || '',
                title: row.name,
                data: row,
                route: 'dryad.home.module.main.details.baseinfo',
                params: {
                    pid: row.patientId
                }
            });
        };

    }
}
HomeListPatientsCtrl.$inject = ['$scope', '$state', '$cookies', 'homeService', '$stateParams'];

module.exports = (ngMold) => {
    require.ensure(['../service/home-service'], (require) => {
        require('../service/home-service')(ngMold);
    }, './home/home-service');
    ngMold.controller('homeListPatientsCtrl', HomeListPatientsCtrl);
}
