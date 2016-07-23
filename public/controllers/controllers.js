define(['angular', 'services','directives', 'data'], function(angular, services, directives, data) {

    var app = angular.module('controllers', ['factories']);    

    app.constant('APP_TITLE', 'BB Shop');

    app.controller("rootCtrl", function ($scope,Rooms, $rootScope) {
        var a=Rooms.getRoomID();
        var b=Rooms.getOpCode();
        var c=Rooms.getPlaceName();

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
            }

        }, true);
    });

    app.controller("HomeController", function($scope,$rootScope, APP_TITLE, Cart, Rooms, FoodService) {
        
        // $scope.APP_TITLE = $rootScope.CurPlace;

        // $scope.hotCities = data.hotCities;


    });

    app.controller("ShopController", function($scope, APP_TITLE, Cart, Rooms, Types, FoodService) {
        // $scope.goodslist = '';
        // var roomID='1';
        // $scope.types=[];
        // FoodService.getFoodList().query({roomID:roomID})
        //     .$promise.then(function(goods){    
        //         $scope.goodslist = angular.fromJson(goods.d);
        //         var goodsTypesArr = {};
        //         var goodtypetemp = [];
        //         var goodtemp = [];
        //         var goodlistcopy = angular.copy($scope.goodslist);
        //         $scope.goodslist.forEach(function(data){
        //             if (!goodsTypesArr[data.DisplayOrder] ){
        //                 var goodtemp = goodlistcopy.filter(
        //                         function(orderid){
        //                             return orderid.DisplayOrder == data.DisplayOrder
        //                         });
        //                 goodtemp.forEach(function(tempdata){
        //                     tempdata._id=tempdata.ID;
        //                     tempdata.GoodsName=tempdata.GoodsName;
        //                     tempdata.Price=tempdata.Price;
        //                     tempdata.description==tempdata.Unit;
        //                     tempdata.pics=['images\/'+tempdata.ID+'.jpg'];
        //                     // delete tempdata.DisplayOrder;
        //                     // delete tempdata.GoodsTypeName;
        //                 });
        //                 goodsTypesArr[data.DisplayOrder] = {
        //                     _id: data.DisplayOrder,
        //                     name: data.GoodsTypeName,
                            
        //                     goods:goodtemp
        //                 }
        //                 $scope.types.push(goodsTypesArr[data.DisplayOrder]);
        //             }
        //         });
        //     }, function(err){
        //         console.log(err);
        //     });


        $scope.types=[];
	    $scope.types= Types.getTypes();
	    $scope.tabs  = data.tabs;
        // $scope.types = data.goodTypes;
        $scope.Cart  = Cart;

        $scope.shop_title   = Rooms.getPlaceName;

        $scope.currentState = "menu";
        $scope.currentType  = "1"; // type id
        $scope.currentGoods = [];
        $scope.currentName  = "";

        $scope.$watch('currentType', function (n, o) {
            // console.log(n + 'changed' + o);
            $scope.types.forEach(function (gt, i) {
                if(gt._id === $scope.currentType) {
                    $scope.currentGoods = gt.goods;
                    $scope.currentName  = gt.GoodsName;               
                }
            });
        });

        $('.restaurant-content').height($('body').outerHeight(true) - $('.shop-header').outerHeight(true) - $('.menu-cart').outerHeight(true) * 2);

        // $('.restaurant-food').height(screen.height - $('.shop-header').outerHeight(true) - $('.menu-cart').outerHeight(true) * 2);

    });

    app.controller("McartController", function($scope,$rootScope, Cart,Rooms, FoodService, MsgService, $filter) {



        $scope.sendtoserver = function (o) {                
            var submitMobile = {};
            var app_OrderType='下单';
            var app_CurRoom_ID=Rooms.getRoomID();
            var msgtxt='';
            submitMobile.SubmitOrders = angular.copy(o);
            submitMobile.SubmitOrders.forEach(function(goods){
                goods.GoodsCount = goods.GoodsCount;
                // goods.Remarks=goods.chili;
                if (!goods.Remarks){goods.Remarks='';};
                msgtxt += goods.GoodsName + ' ' + goods.GoodsCount + goods.Unit + goods.Remarks +';'
                delete goods.pics;
                delete goods.$$hashKey;

                });


            submitMobile.orderType = app_OrderType;
            //        submitMobile.isPresent = app.IsPresent;
            submitMobile.roomID = app_CurRoom_ID;

            var submitMobile_json = angular.toJson(submitMobile);
            var app_pgmid = '';
            var app_CurPlace = '麦克食品店';
            var app_CurRoom_RoomName = '大厅01';
            var strrights = '落单';
            var strstate = app_CurRoom_ID;
            var templateid = 'tc6Ayn7IGJk5BtQzi94BniwSqHMb3ErgG7rZwpL1eoA';
            var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f51df2624282eb1&redirect_uri=http%3a%2f%2fstarstech.cc%2f'+app_pgmid+'order.html&response_type=code&scope=snsapi_base&state='+strstate+'#wechat_redirect';
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
        };

        $scope.countMinus = function(gd) {
            Cart.decreaseProduct(gd);
        };
        $scope.remark = function(gd) {
            Cart.setRemarks(gd);
        };   
        $('.restaurant-cart').height($('body').outerHeight(true) - $('.shop-header').outerHeight(true) - $('.restaurant-cart-bottom').outerHeight(true));
    });

    app.controller("CheckoutController", function($scope, APP_TITLE, Cart, Rooms, FoodService) {
        
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

        FoodService.getOrdered().get({roomID:roomID})
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
            var app_CurRoom_ID=Rooms.getRoomID();
            var msgtxt='';
            submitMobile.SubmitOrders = angular.copy(o);
            submitMobile.SubmitOrders.forEach(function(goods){
                if (!goods.Remarks){goods.Remarks='';};
                msgtxt += goods.GoodsName + ' ' + goods.GoodsCount + goods.Unit + goods.Remarks +';'
                delete goods.pics;
                delete goods.$$hashKey;

                });


            submitMobile.orderType = app_OrderType;
            //        submitMobile.isPresent = app.IsPresent;
            submitMobile.roomID = app_CurRoom_ID;

            var submitMobile_json = angular.toJson(submitMobile);
            var app_pgmid = '';
            var app_CurPlace = '麦克食品店';
            var app_CurRoom_RoomName = '大厅01';
            var strrights = '落单';
            var strstate = app_CurRoom_ID;
            var templateid = 'tc6Ayn7IGJk5BtQzi94BniwSqHMb3ErgG7rZwpL1eoA';
            var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f51df2624282eb1&redirect_uri=http%3a%2f%2fstarstech.cc%2f'+app_pgmid+'order.html&response_type=code&scope=snsapi_base&state='+strstate+'#wechat_redirect';
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

        $('.restaurant-checkout').height($('body').outerHeight(true) - $('.shop-header').outerHeight(true) - $('.restaurant-checkout-bottom').outerHeight(true));

    });

    return app;

});
