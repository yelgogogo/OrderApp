define(['angular', 'services','directives', 'data'], function(angular, services, directives, data) {

    var app = angular.module('controllers', ['factories']);    

    app.constant('APP_TITLE', 'BB Shop');

    app.controller("rootCtrl", function ($scope,Rooms,Eleme,Types,Cart,Locals,$rootScope) {
        var a=Rooms.getRoomID();
        var b=Rooms.getOpCode();
        var c=Rooms.getPlaceName();
        var d=Rooms.getElemeRestaurantID();
        $rootScope.stage=0;
        
        var destroyElemeWatch = $scope.$watch('ElemeRestaurantID', function (n, o) {
            // console.log(n + 'changed' + o);
            if(n){ 
            var e=Eleme.getEleme(n);
            destroyElemeWatch();}
        });

        var destroyRoomWatch = $scope.$watch('roomID', function (n, o) {
            // console.log(n + 'changed' + o);
            if(n){ 
                var f=Types.getTypes(n);
                var cartstore =[];
                cartstore=Locals.getObject($rootScope.Key);
                if(cartstore.length>0) 
                    Cart.setProducts(cartstore);
                destroyRoomWatch();
            }
        });

        var destroyStageWatch = $scope.$watch('stage', function (n, o) {
            // console.log(n + 'changed' + o);
            if(n>1){ 
                $rootScope.elemeload=true;
                $rootScope.typeData.forEach(function(tdata){
                    tdata.goods.forEach(function(gdata){
                        var breakeach=false;
                        var elemeselect =[];
                        $rootScope.elemeData.forEach(function(edata){
                                    if(!breakeach){
                                        elemeselect=edata.foods.filter(function(elmeid){return elmeid.name==gdata.GoodsName});
                                        if(elemeselect.length>0){
                                            breakeach = true;
                                        }
                                    }
                        });
                        if(elemeselect.length>0){
                            gdata.rating=elemeselect[0].rating;
                            gdata.pics=[elemeselect[0].image_url];
                        }else{
                            gdata.rating=0;
                            // gdata.sales=0;
                            gdata.pics=['resources/img'+$rootScope.apppgmid+'/'+gdata.GoodsCode+'.jpg'];
                        };
                        var cartselect =[];
                        cartselect=Cart.getProducts().filter(function(cid){return cid.GoodsName==gdata.GoodsName});
                        if(cartselect.length>0)
                            gdata.GoodsCount=cartselect[0].GoodsCount;
                    });
                });
                destroyStageWatch();
            }
        });

        $scope.$watch(function() {
            return $rootScope.cartData;
        }, function() {
            $scope.totalCount = 0;
            $scope.totalPrice = 0.0;

            $scope.cartData = $rootScope.cartData;
            if($scope.cartData) {                
                $rootScope.cartData.forEach(function(goods) {
                    $scope.totalCount += goods.GoodsCount || 0;
                    $scope.totalPrice += (goods.GoodsCount || 0) * (goods.Price || 0);
                });
                Locals.setObject($rootScope.Key,$rootScope.cartData);
            }

        }, true);
    });

    app.controller("HomeController", function($scope,$rootScope, Types,APP_TITLE,Eleme,Cart, Rooms, FoodService) {
        // var a=Eleme.getEleme();
        $rootScope.currentType  = "1";
        // $rootScope.elemeload = false;

        

    });



    app.controller("ShopController", function($scope,$filter,$rootScope, Eleme,Cart, Rooms, Types, FoodService) {
        
        $rootScope.tens = 1;
        $rootScope.RemarksAll = false;

        $scope.types=$rootScope.typeData;
        
	    $scope.tabs  = data.tabs;
        $scope.Cart  = Cart;

        $scope.shop_title   = Rooms.getPlaceName;

        $scope.currentState = "menu";
         // type id
        $scope.currentGoods = [];
        $scope.currentName  = "";


        // if(!$rootScope.elemeload){
        //     $rootScope.elemeload=true;
        //     $rootScope.typeData.forEach(function(tdata){

        //         tdata.goods.forEach(function(gdata){
        //             var breakeach=false;
        //             var elemeselect =[];
        //             $rootScope.elemeData.forEach(function(edata){

        //                         if(!breakeach){
        //                             elemeselect=edata.foods.filter(function(elmeid){return elmeid.name==gdata.GoodsName});
        //                             if(elemeselect.length>0){
        //                                 breakeach = true;
        //                             }
        //                         }
        //             });
        //             if(elemeselect.length>0){
        //                 gdata.rating=elemeselect[0].rating;
        //                 gdata.sales=elemeselect[0].sales;
        //                 gdata.pics=[elemeselect[0].image_url];
        //             }else{
        //                 gdata.rating=0;
        //                 gdata.sales=0;
        //                 gdata.pics=['resources/img'+$rootScope.apppgmid+'/'+gdata.ID+'.jpg'];
        //             };
        //         });
        //     });
        // };

            // $rootScope.typeData.forEach(function(tdata){
            //     tdata.goods.forEach(function(gdata){
            //         var breakeach=false;
            //         var elemeselect ={};
            //         $rootScope.elemeData.forEach(function(edata){
            //                     if(!breakeach){
            //                         elemeselect=edata.foods.find(function(elme){return elme.name==gdata.GoodsName})
            //                         if(elemeselect){
            //                             breakeach = true;
            //                         };
            //                     };
            //         });
            //         if(elemeselect){
            //             gdata.rating=elemeselect.rating;
            //             gdata.sales=elemeselect.sales;
            //             gdata.pics=[elemeselect.image_url];
            //         }else{
            //             gdata.rating=0;
            //             gdata.sales=0;
            //             gdata.pics=['resources/img'+$rootScope.apppgmid+'/'+gdata.ID+'.jpg'];
            //         };
            //     });
            // });

        $rootScope.typeData.forEach(function (gt, i) {
                if(gt._id == $rootScope.currentType) {
                    $scope.currentGoods = gt.goods;
                    $scope.currentName  = gt.GoodsName;               
                }
            });

        $scope.$watch('currentType', function (n, o) {
            $rootScope.currentType=n;
            $rootScope.typeData.forEach(function (gt, i) {
                if(gt._id == $rootScope.currentType) {
                    $scope.currentGoods = gt.goods;
                    $scope.currentName  = gt.GoodsName;               
                }
            });
        });

        $('.restaurant-content').height($('body').outerHeight(true) - $('.shop-header').outerHeight(true) - $('.menu-cart').outerHeight(true) * 2);


    });

    app.controller("McartController", function($scope,$rootScope, Types,Cart,Rooms, FoodService, MsgService, $filter) {

        $rootScope.tens = 1;
        $rootScope.RemarksAll = false;
        $scope.sendtoserver = function (o) {                
            var submitMobile = {};
            var app_OrderType='下单';
            var msgtxt='';
            if(!Rooms.getRooms()){
                alert("Key错误");
                return;
            }else{
                if(Rooms.getOpCode()!=Rooms.getRooms().Room[0].RoomOpCode){
                    alert("opcode错误");
                    return;
                };
            };

            submitMobile.SubmitOrders = angular.copy(o);
            submitMobile.SubmitOrders.forEach(function(goods){
                // goods.Remarks=goods.chili;
                if (!goods.Remarks){goods.Remarks='';};
                msgtxt += goods.GoodsName + ' ' + goods.GoodsCount + goods.Unit + goods.Remarks +';'
                delete goods.pics;
                // delete goods.sales;
                delete goods.rating;
                delete goods.$$hashKey;

                });


            submitMobile.orderType = app_OrderType;
            //        submitMobile.isPresent = app.IsPresent;
            submitMobile.roomID = Rooms.getRoomID();
            submitMobile.opCode = Rooms.getOpCode();
            var submitMobile_json = angular.toJson(submitMobile);
            var app_CurPlace = Rooms.getPlaceName();
            var app_CurRoom_RoomName = Rooms.getRooms().Room[0].RoomName;
            var strrights = '落单';
            var strstate = Rooms.getRoomID();
            var templateid = 'tc6Ayn7IGJk5BtQzi94BniwSqHMb3ErgG7rZwpL1eoA';
            var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f51df2624282eb1&redirect_uri=http%3a%2f%2fstarstech.cc'+$rootScope.apppgmid+'%2forder.html&response_type=code&scope=snsapi_base&state='+strstate+'#wechat_redirect';
            var Sysdate = new Date();  
            var Curdate= $filter('date')(Sysdate,'yyyy-MM-dd HH:mm:ss');
            // var Curdate = Ext.Date.format(Sysdate, 'Y-m-d H:i:s'); 
            var first = { value: app_CurPlace + ' 客户在线点单提醒', color: '#173177' },
                keyword1 = { value: app_CurRoom_RoomName, color: '#173177' },
                keyword2 = { value: Curdate, color: '#173177' },
                keyword3 = { value: msgtxt, color: '#173177' },
                remark = { value: '星星点单消息推送', color: '#173177' };

            var weChatData =
                {
                    first: first,
                    keyword1: keyword1,
                    keyword2: keyword2,
                    keyword3: keyword3,
                    remark: remark
                };


            FoodService.addCustomerOrder().add({submitMobile: submitMobile_json})
                .$promise.then(function(msg){
                	alert("已经通知服务员确认");
                	Cart.setProducts([]);
                    Types.clearProducts();
                    MsgService.sendMsg().send({
                        strrights: strrights,
                        templateID: templateid,
                        url: url,
                        sendData: angular.toJson(weChatData)
                    })
                        .$promise.then(function(msg){
                            console.log(msg);
                        }, function(err){
                            console.log(err);
                        });

                    console.log(msg);
                }, function(err){
                    console.log(err);
                });
        };


        // $scope.chili = true;
        $scope.tensFlag = false;

        $scope.changeTaste = function(s) {
            Cart.setAllTaste(s);
        };

        $scope.changeTens = function(tensFlag) {
            if(tensFlag) Cart.setTimes(10);
            else Cart.setTimes(1);
        };

        $scope.countPlus = function(gd) {
            Cart.addProduct(gd);
            Types.addProduct(gd);        
        };

        $scope.countMinus = function(gd) {
            Cart.decreaseProduct(gd);
            Types.decreaseProduct(gd); 
        };
        $scope.remark = function(gd) {
            Cart.setRemarks(gd);
        };   
        $('.restaurant-cart').height($('body').outerHeight(true) - $('.shop-header').outerHeight(true) - $('.restaurant-cart-bottom').outerHeight(true));
    });

    app.controller("CheckoutController", function($scope,$rootScope, Types, APP_TITLE, Cart, Rooms, FoodService,MsgService, $filter) {

        $scope.APP_TITLE = APP_TITLE;

        $scope.orderingData = [];
        $scope.orderedData = [];
        $scope.posCount = 0;
        $scope.posPrice = 0;

        var roomID=Rooms.getRoomID();
        var opCode=Rooms.getOpCode();
        
        FoodService.getCustomerOrder().get({roomID:roomID,opCode: opCode})
            .$promise.then(function(goods){  
                if (!goods.d){
                    return;
                };
                var goodslist = angular.fromJson(goods.d);

                $scope.orderingData=goodslist;
                // if(goodslist && $scope.totalPrice == 0) {                
                //     goodslist.forEach(function(goods) {
                //         $scope.totalCount += goods.GoodsCount || 0;
                //         $scope.totalPrice += (goods.GoodsCount || 0) * (goods.Price || 0);
                //     });
                // };
                }, function(err){
                    console.log(err);
                }
            );

        FoodService.getOrdered().get({roomID:roomID,opCode:opCode})
            .$promise.then(function(goods){  
                if(!goods.d){ 
                    return;
                };
                var orderedlist = angular.fromJson(goods.d);
                // if(!orderedlist){ 
                //     alert("无客人自选单信息!");
                //     return;
                //     };
                $scope.orderedData=orderedlist;
                if(orderedlist) {                
                    orderedlist.forEach(function(goods) {
                        $scope.posCount += goods.GoodsCount || 0;
                        $scope.posPrice += (goods.SubTotal || 0);
                    });
                };
                }, function(err){
                    console.log(err);
                }
            );

        $scope.sendtoserver = function (o) {                
            var submitMobile = {};
            var app_OrderType='下单';
            var msgtxt='';
            if(!Rooms.getRooms()){
                alert("Key错误");
                return;
            }else{
                if(Rooms.getOpCode()!=Rooms.getRooms().Room[0].RoomOpCode){
                    alert("opcode错误");
                    return;
                };
            };

            submitMobile.SubmitOrders = angular.copy(o);
            submitMobile.SubmitOrders.forEach(function(goods){
                if (!goods.Remarks){goods.Remarks='';};
                msgtxt += goods.GoodsName + ' ' + goods.GoodsCount + goods.Unit + goods.Remarks +';'
                delete goods.pics;
                // delete goods.sales;
                delete goods.rating;
                delete goods.$$hashKey;

                });


            submitMobile.orderType = app_OrderType;
            //        submitMobile.isPresent = app.IsPresent;
            submitMobile.roomID = Rooms.getRoomID();
            submitMobile.opCode = Rooms.getOpCode();

            var submitMobile_json = angular.toJson(submitMobile);
            var app_CurPlace = Rooms.getPlaceName();
            var app_CurRoom_RoomName = Rooms.getRooms().Room[0].RoomName;
            var strrights = '落单';
            var strstate = Rooms.getRoomID();
            var templateid = 'tc6Ayn7IGJk5BtQzi94BniwSqHMb3ErgG7rZwpL1eoA';
            var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f51df2624282eb1&redirect_uri=http%3a%2f%2fstarstech.cc'+$rootScope.apppgmid+'%2forder.html&response_type=code&scope=snsapi_base&state='+strstate+'#wechat_redirect';
            var Sysdate = new Date();  
            var Curdate= $filter('date')(Sysdate,'yyyy-MM-dd HH:mm:ss');
            // var Curdate = Ext.Date.format(Sysdate, 'Y-m-d H:i:s'); 
            var first = { value: app_CurPlace + ' 客户在线修改提醒', color: '#173177' },
                keyword1 = { value: app_CurRoom_RoomName, color: '#173177' },
                keyword2 = { value: Curdate, color: '#173177' },
                keyword3 = { value: msgtxt, color: '#173177' },
                remark = { value: '星星点单消息推送', color: '#173177' };

            var weChatData =
                {
                    first: first,
                    keyword1: keyword1,
                    keyword2: keyword2,
                    keyword3: keyword3,
                    remark: remark
                };


            FoodService.modCustomerOrder().add({submitMobile: submitMobile_json})
                .$promise.then(function(msg){
                	alert("已经通知服务员确认，请勿重复提交");
                    MsgService.sendMsg().send({
                        strrights: strrights,
                        templateID: templateid,
                        url: url,
                        sendData: angular.toJson(weChatData)
                    })
                        .$promise.then(function(msg){
                            console.log(msg);
                        }, function(err){
                            console.log(err);
                        });

                    console.log(msg);
                }, function(err){
                    console.log(err);
                });
        };

        $scope.decrease = function(gd) {
            gd.GoodsCount -= 1;
            if (gd.GoodsCount<0){gd.GoodsCount=0};
        }; 

        $scope.increase = function(gd) {
            gd.GoodsCount += 1;
        };  

        $('.restaurant-checkout').height($('body').outerHeight(true) - $('.shop-header').outerHeight(true) - $('.restaurant-checkout-bottom').outerHeight(true));

    });

    return app;

});
