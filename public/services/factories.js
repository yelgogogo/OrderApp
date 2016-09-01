define(['angular'], function (angular) {

	var app = angular.module('factories', []);

	app.factory('Cart', function ($rootScope, FoodService) {
		var cartData = [];
		$rootScope.tens = 1;
		$rootScope.RemarksAll = false;


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
					// goods.GoodsCount = goods.GoodsCount || 1;
					// goods.chili = true;
					var goodscpy=angular.copy(goods);
					// var dataadd = angular.fromJson();
					cartData.push(goodscpy);
				}
				$rootScope.cartData = cartData;
				// gd.GoodsCount = gd.GoodsCount + 1 * ($rootScope.tens || 1);
				// if(gd.GoodsCount < 0) gd.GoodsCount = 0;
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
			decreaseProduct: function (goods) {
				//decrease goods count
				cartData.forEach(function (gd, i) {
					if(gd.ID === goods.ID) {
						gd.GoodsCount = gd.GoodsCount - 1 * ($rootScope.tens || 1);
						if(gd.GoodsCount < 0) gd.GoodsCount = 0;
						return;
					}
				});
				$rootScope.cartData = cartData;
			},
			getProducts: function () {
				return cartData;
			},
			setProducts: function (data) {
				cartData=data;
				$rootScope.cartData=data;
			},
			setRemarks: function (data) {
				// cartData.forEach(function(data, i) 
				var remarks=data.Remarks;
				var remarkchange=remarks;
				var remarkchange2=remarks;
				switch (remarks){
						case "":
	                   		remarkchange = '不辣';
		                   	break;
		                case "不辣":
			                remarkchange = '微辣';
			                break;
		                case "微辣":
		                    remarkchange = '加辣';
		                    break;
		                case "加辣":
		                    remarkchange = '重辣';
		                    break;
	  	                case "重辣":
		                    remarkchange = '';
		                    break;
		                default:
		                    remarkchange = '不辣';
		                    break;
		                };

				switch (remarks){
						case "":
	                   		remarkchange2 = '要冰';
		                   	break;
	  	                case "要冰":
		                    remarkchange2 = '不要冰';
		                    break;
		                default:
		                    remarkchange2 = '要冰';
		                    break;
		                };

				if($rootScope.RemarksAll){
					cartData.forEach(function(gd, i) {
						switch (gd.GoodsTypeName){
							case "粥类":
							case "主食":
							case "烤鱼配菜":
							case "一次用品":
							case "店长推荐":
			                    break;
			                case "饮料":
			                case "酒类":
			                    gd.Remarks = remarkchange2;
			                    break;
			                default:
			                    gd.Remarks = remarkchange;
			                    break;
		                };
					});
					$rootScope.cartData = cartData;
				}else{
					switch (data.GoodsTypeName){
						case "粥类":
						case "主食":
						case "烤鱼配菜":
						case "一次用品":
						case "店长推荐":
		                   break;
		                case "饮料":
		                case "酒类":
		                    data.Remarks = remarkchange2;
		                    break;
		                default:
	                    	data.Remarks = remarkchange;
	                    	break;
	                };
	            };
				// });
			},
			setAllTaste: function(flag) {
				cartData.forEach(function(gd, i) {
					if (flag){
						$rootScope.RemarksAll=true;
					}else{
						$rootScope.RemarksAll=false;
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

		$rootScope.roomData = [];
		$rootScope.roomID='';
		$rootScope.opCode='';
		$rootScope.ElemeRestaurantID='';

	    var text=$rootScope.Key.replace(/ /g,"+");
        // $rootScope.types=[];
        RoomService.getUnStr().get({text:text})
            .$promise.then(function(destr){
            	if(!destr.d){
            		return;
		        };
            	$rootScope.opCode = destr.d.substr(0,12)
            	$rootScope.roomID = destr.d.substr(12,3).replace(/^0+/,"");
            	$rootScope.ElemeRestaurantID = destr.d.substr(15,8).replace(/^0+/,"")
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

        // RoomService.getSysParm().get({paraCode:"txtElemeRestaurantID"})
	       //  .$promise.then(function(data){    
	       //  	if(!data.d){
	       //  		return;
	       //  	};
	       //  	var placeName=angular.fromJson(data.d);
	       //  	$rootScope.ElemeRestaurantID = placeName[0].ParaValue;
	       //  }, function(err){
	       //      console.log(err);
	       //  });  

		return {
			getElemeRestaurantID: function () {
				return $rootScope.ElemeRestaurantID;
			},
			getRooms: function () {
				return $rootScope.roomData;
			},
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

	app.factory('Eleme', function ($rootScope, FoodService, Rooms) {
		$rootScope.elemeData = [];
		

		return {
			getEleme: function (rid) {
				var apiUrl="http://v2.openapi.ele.me/restaurant/"+rid+"/menu/"
        var args=angular.toJson({restaurant_id:rid,tp_id:"0"});

        FoodService.getEleme().query({apiUrl: apiUrl,args:args })
            .$promise.then(function(goods){    
                var elemeData = angular.fromJson(goods.d);
                if(elemeData.code!=200){
                	return
                };
                $rootScope.elemeData= elemeData.data.restaurant_menu;
                // alert("eleme");
                $rootScope.stage+=1;
				return $rootScope.elemeData;
        	}, function(err){
            console.log(err);
        });
				

			}
		};
	});
	 //本地存储数据===================================
	app.factory('Locals',['$window',function($window){
	      return{
	        //存储单个属性
	        set :function(key,value){
	          $window.localStorage[key]=value;
	        },
	        //读取单个属性
	        get:function(key,defaultValue){
	          return  $window.localStorage[key] || defaultValue;
	        },
	        //存储对象，以JSON格式存储
	        setObject:function(key,value){
	          $window.localStorage[key]=angular.toJson(value);
	        },
	        //读取对象
	        getObject: function (key) {
	          return angular.fromJson($window.localStorage[key] || '[]');
	        }

	      }
	  }]);

	app.factory('Types', function ($rootScope, FoodService, Rooms) {
		// var typeData = [];
		$rootScope.typeData = [];
		var goodslist = '';
        
        
              //   FoodService.getFoodList().query({roomID:Rooms.getRoomID()})
		            // .$promise.then(function(goods){    
		            //     var goodslist = angular.fromJson(goods.d);
		            //     var goodsTypesArr = [];
		            //     var goodtypetemp = [];
		            //     var goodtemp = [];
		            //     var goodlistcopy = angular.copy(goodslist);
		            //     goodslist.forEach(function(data){
		            //         if (!goodsTypesArr[data.DisplayOrder-1] ){
		            //             var goodtemp = goodlistcopy.filter(
		            //                     function(orderid){
		            //                         return orderid.DisplayOrder == data.DisplayOrder
		            //                     });
		            //             goodtemp.forEach(function(tempdata){

		            //                 	tempdata.rating=0;
		            //                 	tempdata.sales=0;
		            //                 	tempdata.pics=['resources/img'+$rootScope.apppgmid+'/'+tempdata.ID+'.jpg'];
		                        
		            //             });
		            //             goodsTypesArr[data.DisplayOrder-1] = {
		            //                 _id: data.DisplayOrder,
		            //                 name: data.GoodsTypeName,
		            //                 goods:goodtemp
		            //             }
		                        
		            //         }
		            //     });
		            //     $rootScope.typeData=goodsTypesArr;
		            // }, function(err){
		            //     console.log(err);
		            // });
                
        
        // $rootScope.types=[];


		return {
			getTypes: function (roomid) {
				                FoodService.getFoodList().query({roomID:roomid})
		            .$promise.then(function(goods){    
		                var goodslist = angular.fromJson(goods.d);
		                var goodsTypesArr = [];
		                var goodtypetemp = [];
		                var goodtemp = [];
		                var goodlistcopy = angular.copy(goodslist);
		                goodslist.forEach(function(data){
		                    if (!goodsTypesArr[data.DisplayOrder-1] ){
		                        var goodtemp = goodlistcopy.filter(
		                                function(orderid){
		                                    return orderid.DisplayOrder == data.DisplayOrder
		                                });
		                        goodtemp.forEach(function(tempdata){
		                            	tempdata.rating=0;
		                            	tempdata.pics=['resources/img'+$rootScope.apppgmid+'/'+tempdata.ID+'.jpg'];
		                        });
		                        goodsTypesArr[data.DisplayOrder-1] = {
		                            _id: data.DisplayOrder,
		                            name: data.GoodsTypeName,
		                            goods:goodtemp
		                        }
		                        
		                    }
		                });
		                // typeData=goodsTypesArr;
		                $rootScope.typeData=goodsTypesArr;
		                $rootScope.stage+=1;
		                // alert("types");
				return $rootScope.typeData;
		            }, function(err){
		                console.log(err);
		            });
				

			},
			clearProducts: function () {
				$rootScope.typeData.forEach(function(type){
					type.goods.forEach(function(good){
						good.GoodsCount = 0;
					})
				});
				// $rootScope.typeData=typeData;
			},
			addProduct: function (goods) {
				var tselect=[];
				var gselect=[];
				tselect = $rootScope.typeData.filter(function(tid){
					return tid._id == goods.DisplayOrder
				});
				if(tselect.length>0){
                    gselect = tselect[0].goods.filter(function(gid){
						return gid.GoodsName == goods.GoodsName
					})
					if(gselect.length>0){
						gselect[0].GoodsCount = goods.GoodsCount;
					}
                }
			},
			decreaseProduct: function (goods) {
				var tselect=[];
				var gselect=[];
				tselect = $rootScope.typeData.filter(function(tid){
					return tid._id == goods.DisplayOrder
				});
				if(tselect.length>0){
                    gselect = tselect[0].goods.filter(function(gid){
						return gid.GoodsName == goods.GoodsName
					})
					if(gselect.length>0){
						gselect[0].GoodsCount = goods.GoodsCount;
					}
                }			}
		};
	});

	return app;

});