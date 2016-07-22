define(['angular'], function (angular) {

	var app = angular.module('factories', []);

	app.factory('Cart', function ($rootScope, FoodService) {
		var cartData = [];
		$rootScope.tens = 1;



		return {
			addProduct: function (goods) {
				var flag = false;
				cartData.forEach(function (gd, i) {
					if(gd.ID === goods.ID) {
						gd.GoodsCount = (gd.GoodsCount || 0) + 1 * ($rootScope.tens || 1);
						// gd.chili = true;
						flag = true;
						return;
					}					
				});
				if(!flag) {
					goods.GoodsCount = goods.GoodsCount || 1;
					// goods.chili = true;
					cartData.push(goods);
				}
				$rootScope.cartData = cartData;
			},
			removeProduct: function (goods) {
				// clear the goods
				cartData.forEach(function (gd, i) {
					if(gd.ID === goods.ID) {
						cartData.remove(gd);
						return;
					}
				});
				$rootScope.cartData = cartData;
			},
			decreaseProduct: function (gd) {
				// decrease goods count
				// cartData.forEach(function (gd, i) {
					// if(gd._id === goods._id) {
						gd.GoodsCount = gd.GoodsCount - 1 * ($rootScope.tens || 1);
						if(gd.GoodsCount < 0) gd.GoodsCount = 0;
						// return;
					// }
				// });
				// $rootScope.cartData = cartData;
			},
			getProducts: function () {
				return cartData;
			},
			setProducts: function (data) {
				cartData=data;
			},
			setRemarks: function (data) {
				// cartData.forEach(function(data, i) {
					switch (data.Remarks){
	                case "":
	                   data.Remarks = '加辣';
	                   break;
	                case "不辣":
	                   data.Remarks = '';
	                   break;
	                case "加辣":
	                   data.Remarks = '不辣';
	                   break;
	                default:
	                    data.Remarks = '加辣';
	                    break;
	                };
				// });
			},
			setAllTaste: function(flag) {
				cartData.forEach(function(gd, i) {
					if (flag){
						gd.Remarks="不辣";
					}else{
						gd.Remarks="加辣";
					};
					// gd.chili = flag;
				});
				$rootScope.cartData = cartData;
			},
			setTimes: function(tens) {
				$rootScope.tens = tens;
			},
		};
	});

	app.factory('Rooms', function ($rootScope, RoomService,$location) {
		if ($location.search().Key) {
		    $rootScope.Key = $location.search().Key;
	    	};

		$rootScope.apppgmid='';
		$rootScope.roomData = [];
		$rootScope.roomID='';
		$rootScope.opCode='';

	    var text=$rootScope.Key;
        // $rootScope.types=[];
        RoomService.getUnStr().get({text:text})
            .$promise.then(function(destr){
            	if(!destr.d){
            		return;
		        };
            	$rootScope.opCode = destr.d.substr(0,12);
            	$rootScope.roomID = destr.d.substr(12,20);
    	        RoomService.chkCustomerOp().get({roomID:$rootScope.roomID,opCode:$rootScope.opCode})
		            .$promise.then(function(data){    
		            	if(!data.d){
		            		return;
		            	};
		            	$rootScope.roomData=angular.fromJson(data.d);
		            }, function(err){
		                console.log(err);
		            });


            }, function(err){
                console.log(err);
            });

        $rootScope.CurPlace='';
        RoomService.getSysParm().get({paraCode:"txtPlaceName"})
	        .$promise.then(function(data){    
	        	if(!data.d){
	        		return;
	        	};
	        	var placeName=angular.fromJson(data.d);
	        	$rootScope.CurPlace = placeName[0].ParaValue;
	        }, function(err){
	            console.log(err);
	        });       

		return {
			getRoomID: function () {

				return $rootScope.roomID;
			},
			getOpCode: function () {
				return $rootScope.opCode;
			},
			getPlaceName: function () {
				return $rootScope.CurPlace;
			}
		};
	});

	app.factory('Types', function ($rootScope, FoodService, Rooms) {
		var typeData = [];
		var goodslist = '';
        var roomID=Rooms.getRoomID();
        // $rootScope.types=[];
        FoodService.getFoodList().query({roomID:roomID})
            .$promise.then(function(goods){    
                var goodslist = angular.fromJson(goods.d);
                var goodsTypesArr = {};
                var goodtypetemp = [];
                var goodtemp = [];
                var goodlistcopy = angular.copy(goodslist);
                goodslist.forEach(function(data){
                    if (!goodsTypesArr[data.DisplayOrder] ){
                        var goodtemp = goodlistcopy.filter(
                                function(orderid){
                                    return orderid.DisplayOrder == data.DisplayOrder
                                });
                        goodtemp.forEach(function(tempdata){
                            // tempdata._id=tempdata.ID;
                            // tempdata.GoodsName=tempdata.GoodsName;
                            // tempdata.Price=tempdata.Price;
                            // tempdata.description==tempdata.Unit;
                            tempdata.pics=['images\/'+tempdata.ID+'.jpg'];
                            // delete tempdata.DisplayOrder;
                            // delete tempdata.GoodsTypeName;
                        });
                        goodsTypesArr[data.DisplayOrder] = {
                            _id: data.DisplayOrder,
                            name: data.GoodsTypeName,
                            
                            goods:goodtemp
                        }
                        typeData.push(goodsTypesArr[data.DisplayOrder]);
                    }
                });
            }, function(err){
                console.log(err);
            });

		return {
			getTypes: function () {
				return typeData;
			}
		};
	});

	return app;

});