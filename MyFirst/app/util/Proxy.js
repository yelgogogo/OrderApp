Ext.define('app.util.Proxy', {

    singleton: true,
    //1.webservice 默认支持post 所以需要webconfig里添加支持 get post，Jsonp默认是get 发送，params传参
    //     Ext.data.JsonP.request({
    //            url: '../'+app.pgmid+'WebServiceEx.asmx/TestJsonp',
    //            callbackKey: 'callback',
    //            params: {
    //                v1: 'abc'
    //            },
    //            success: function (result) {
    //                console.log(result);
    //                Ext.Msg.alert("请求成功" + result.cad);
    //            },
    //            failure: function () {
    //                Ext.Msg.alert("失败请求");
    //            }
    //        });
    //requires: ['Ext.data.proxy.JsonP'],
    //短网址API
    getShortUrl: function (apiurl,longurl,callback) {
        console.log(longurl);
        var successCallback = function (result)  {
            var data = result;
            if (data.url == '') {
                Ext.Msg.alert('短Url取回失败提示');
                return;
            };
            // var Json_Url = Ext.decode(data);
            // // var strvalue = Ext.decode(data);
            // Ext.Msg.alert("撤单成功!");
            callback(data.url);
        };
        var failureCallback = function (result) {
            Ext.Msg.alert("Url转换失败!");
        };
       Ext.data.JsonP.request({
            url: apiurl,
            callbackKey: 'callback',
            params: {
                url: longurl
            },
          success: successCallback,
          failure: failureCallback
       });     
    },
    //发送微信模板消息
    sendMsg: function (strrights,templateid,url,weChatData,callback) {
        var successCallback = function (resp, ops) {
            var data = Ext.decode(resp.responseText).d;
            // var strvalue = Ext.decode(data);
            // Ext.Msg.alert("撤单成功!");
            callback();
        };
        var failureCallback = function (result) {
            Ext.Msg.alert("消息发送失败!");
        };
       Ext.Ajax.request({
          url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_SendWeChatTemplateMessageToRights',
          jsonData: {
                strrights: strrights,
                templateID: templateid,
                url: url,
                sendData: Ext.encode(weChatData)
          },
          success: successCallback,
          failure: failureCallback
       });     
    },
    //打印
    printQrCode: function (printstr) {
        var successCallback = function (resp, ops) {
            var data = Ext.decode(resp.responseText).d;
            // var strvalue = Ext.decode(data);
            Ext.Msg.alert("打印成功!");
        };
        var failureCallback = function (result) {
            Ext.Msg.alert("打印失败!");
        };
       Ext.Ajax.request({
          url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_YunPrint',
          jsonData: {
              printStr : printstr,
              roomID : app.CurRoom.ID,
              userNo:Ext.getStore('User').load().data.items[0].data.userno
          },
          success: successCallback,
          failure: failureCallback
       });     
    },
    cancelorders: function (instr,callback) {
        var successCallback = function (resp, ops) {
            var data = Ext.decode(resp.responseText).d;
            // var strvalue = Ext.decode(data);
            Ext.Msg.alert("撤单成功!");
            callback();
        };
        var failureCallback = function (result) {
            Ext.Msg.alert("撤单失败!");
        };
       Ext.Ajax.request({
          url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_CancelOrders',
          jsonData: {
              cancelOrders : instr,
              userNo:Ext.getStore('User').load().data.items[0].data.userno
          },
          success: successCallback,
          failure: failureCallback
       });     
    },
    exchange: function (oldroomid,newroomid,userno,callback) {
        var successCallback = function (resp, ops) {
            var data = Ext.decode(resp.responseText).d;
            // var strvalue = Ext.decode(data);
            if (data.indexOf("Room") == -1) {
                Ext.Msg.alert('提示', data, Ext.emptyFn);

            }else{
                var Json_Room = Ext.decode(data);
                var roomStore = Ext.getStore('Rooms');
                Ext.Array.each(Json_Room.Room, function (room) {
                    var record = roomStore.findRecord('ID', room.ID);
                    record.setData(room);
                });
                // //更新新旧房台的记录
                // var roomStore = Ext.getStore('Rooms');
                // Ext.Array.each Json_Order
                // var record = roomStore.findRecord('ID', roomID);
                // record.setData(Json_Order.Room[0]);
                // app.CurRoom = record.data;
                Ext.Msg.alert("转台成功!");
            };
            callback();
        };
        var failureCallback = function (result) {
            Ext.Msg.alert("转台失败!");
        };
       Ext.Ajax.request({
          url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_ExchangeRoom',
          jsonData: {
                oldRoomID:oldroomid,
                newRoomID:newroomid,
                userNo:userno
          },
          success: successCallback,
          failure: failureCallback
       });     
    },
    clearCusOrder: function (roomid,op,user,callback) {
        var successCallback = function (resp, ops) {
            var data = Ext.decode(resp.responseText).d;
            // var strvalue = Ext.decode(data);
            Ext.Msg.alert("清空成功!");
            callback();
        };
        var failureCallback = function (result) {
            Ext.Msg.alert("清空失败!");
        };
       Ext.Ajax.request({
          url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_ClearRoomCustomerOrders',
          jsonData: {
                roomID:roomid,
                opCode:op,
                userNo:user
          },
          success: successCallback,
          failure: failureCallback
       });     
    },
    getEnStr: function (instr,callback) {
        var successCallback = function (resp, ops) {
            var data = Ext.decode(resp.responseText).d;
            // var strvalue = Ext.decode(data);
            callback(data);
        };
        var failureCallback = function (result) {
            Ext.Msg.alert("加载参数失败!");
        };
       Ext.Ajax.request({
          url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_Encrypt',
          jsonData: {
              text: instr
          },
          success: successCallback,
          failure: failureCallback
       });     
    },
    getSysParm: function (sysparm,callback) {
        var successCallback = function (resp, ops) {
            var data = Ext.decode(resp.responseText).d;
            var Pname = Ext.decode(data);
            callback(Pname[0].ParaValue);
        };
        var failureCallback = function (result) {
            Ext.Msg.alert("加载系统参数失败!");
        };
       Ext.Ajax.request({
          url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_GetSysParam',
          jsonData: {
              paraCode: sysparm
          },
          success: successCallback,
          failure: failureCallback
       });     
    },
    getOpenid: function (code,callback) {
        // var exurl ='https://api.weixin.qq.com/sns/oauth2/access_token?appid='+appid+'&secret='+appsecret+'&code='+code+'&grant_type=authorization_code'
        var successCallback = function (resp, ops) {
            var data = Ext.decode(resp.responseText).d; 
            Json_WX=Ext.decode(data);
            if (Json_WX.openid == null) {
                Ext.Msg.alert('提示', data, Ext.emptyFn);
                return;
            };
            console.log(Json_WX.openid);
            callback(Json_WX.openid);
        };
        var failureCallback = function (result) {
            Ext.Msg.alert("微信获取失败!");
        };
       Ext.Ajax.request({
          url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_GetWeChatOpenID',
          jsonData: {
              code: code
          },
          success: successCallback,
          failure: failureCallback
       });     
    },
    chkOpenid: function (openid,callback) {
        // var exurl ='https://api.weixin.qq.com/sns/oauth2/access_token?appid='+appid+'&secret='+appsecret+'&code='+code+'&grant_type=authorization_code'
        thisobj=this;
        
        var successCallback = function (resp, ops) {
            var data = Ext.decode(resp.responseText).d; 
            
                //本地登录用户缓存
            if (data) {

                var result=Ext.decode(data);
                var userStore = Ext.getStore('User').load();
                userStore.removeAll();

                var user = Ext.create("MyFirst.model.User");
                user.set("username", result.user);
                user.set("password", result.password);
                user.set("userno", result.userno);
                user.set("isremember", 0);
                user.set("rights", result.rights);
                userStore.add(user);
                userStore.sync();
                // Ext.Msg.alert(Ext.getStore('User').load().data.items[0].data);
                //Ext.Viewport.setMasked({ xtype: 'loadmask' });
                Ext.Viewport.setMasked({ xtype: 'loadmask' });
                thisobj.loadRooms(function () {
                    var mainView = Ext.create('app.view.Card');
                    Ext.Viewport.add(mainView);
                    // loginView.reset();
                    // loginView.hide();
                    mainView.show();
                    Ext.Viewport.setMasked(false);

                });
            }
            else{
                var loginView = Ext.create('MyFirst.view.LoginForm');
                
                thisobj.getSysParm('txtPlaceName', function (pname) {
                    loginView.down('toolbar').setTitle(pname);
                });
                var userStore = Ext.getStore('User').load();
                if (userStore.data.length > 0 && userStore.data.items[0].data.isremember == 1) {
                    loginView.user = userStore.data.items[0].data;
                    loginView.setValues(loginView.user);
                }
                Ext.Viewport.add([loginView]);
            };
            // else
            //     Ext.Msg.alert("用户名或密码错误!");
        };
        var failureCallback = function (result) {
            //Ext.Msg.alert("微信认证失败!");
        };
       Ext.Ajax.request({
          url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_CheckWeChatOpenID',
          jsonData: {
              openid: openid
          },
          success: successCallback,
          failure: failureCallback
       });     
    },
    loadRoomsJsonP: function (callback) {

        var roomStore = Ext.getStore('Rooms'),
            roomModels, roomAreas = {};

        var successCallback = function (result) {
            roomStore.removeAll();
            Ext.Array.each(result, function (room) {
                roomModels = Ext.create('MyFirst.model.Room', room);
                roomStore.add(roomModels);
                if (roomModels.data.RoomAreaName) {
                    roomAreas[roomModels.data.RoomAreaName] = {
                        areaName: roomModels.data.RoomAreaName
                    };
                }
            });
            app.roomAreas = roomAreas;
            //}
            callback();
        };
        var failureCallback = function (result) {
            Ext.Msg.alert("加载房台失败!");
        };
        Ext.data.JsonP.request({
            url: '../'+app.pgmid+'WebServiceEx.asmx/JSONP_Get_Room',
            callbackKey: 'callback',
            success: successCallback,
            failure: failureCallback
        });
    },
    loadRooms: function (callback) {

        var roomStore = Ext.getStore('Rooms'),
            roomModels, roomAreas = {};

        var successCallback = function (resp, ops) {
            roomStore.removeAll();
            var data = Ext.decode(resp.responseText).d;
            //if (data != "") {
            var Json_Room = Ext.decode(data);
            Ext.Array.each(Json_Room, function (room) {
                roomModels = Ext.create('MyFirst.model.Room', room);
                roomStore.add(roomModels);
                if (roomModels.data.RoomAreaName) {
                    roomAreas[roomModels.data.RoomAreaName] = {
                        areaName: roomModels.data.RoomAreaName
                    };
                }
            });
            app.roomAreas = roomAreas;
            //}
            callback();
        };
        var failureCallback = function (resp, ops) {
            Ext.Msg.alert("加载房台失败!", resp.responseText);
        };
        Ext.Ajax.request({
            url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_Get_Room',
            jsonData: {
            //RoomAreaId: '1'
        },
        success: successCallback,
        failure: failureCallback
    });
},
loadOrderGoods: function (roomID, callback) {

    var goodsStore = Ext.getStore('Goods'),
        goodsTypes = Ext.getStore('GoodsTypes'),
        goodsModels, goodsTypesArr = {};

    var successCallback = function (resp, ops) {
        goodsStore.removeAll();
        goodsTypes.removeAll();
        var data = Ext.decode(resp.responseText).d;
        if (data && data != "") {
            var Json_Goods = Ext.decode(data);
            Ext.Array.each(Json_Goods, function (Good) {
                goodsModels = Ext.create('MyFirst.model.Good', Good);
                goodsStore.add(goodsModels);

                if (goodsModels.data.GoodsTypeName) {
                    goodsTypesArr[goodsModels.data.GoodsTypeName] = {
                        GoodsTypeName: goodsModels.data.GoodsTypeName,
                        DisplayOrder: goodsModels.data.DisplayOrder
                    };
                }
            });
            Ext.Array.each(Ext.Object.getValues(goodsTypesArr), function (goodsType) {
                goodsTypes.add(goodsType);
            });
        }
        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("加载菜品失败!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_Get_RoomGoods',
        jsonData: {
            roomID: roomID
        },
        success: successCallback,
        failure: failureCallback
    });
},
// loadOrderedGoods: function (roomID, callback) {

//     var orderStore = Ext.getStore('Orders');
//     orderStore.removeAll();
//     orderStore.clearFilter(true);
// //    orderStore.filterBy(function (Orders) {
// //    	return Orders.get('OpCode') == app.CurRoom.RoomOpCode
// //    });
//     var successCallback = function (resp, ops) {

//         var data = Ext.decode(resp.responseText).d;
//         var Json_Order = eval('(' + data + ')');
//         Ext.Array.each(Json_Order.Orders, function (order) {
//             orderModel = Ext.create('MyFirst.model.Order', order);
//             orderStore.add(orderModel);
//         });


//         //更新该房台的记录
//         var roomStore = Ext.getStore('Rooms');
//         var record = roomStore.findRecord('ID', roomID);
//         record.setData(Json_Order.Room[0]);
//         app.CurRoom = record.data;
//         callback();
//     };
//     var failureCallback = function (resp, ops) {
//         Ext.Msg.alert("加载已点单失败!", resp.responseText);
//     };
//     Ext.Ajax.request({
//         url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_GetRoomOrderList',
//         jsonData: {
//             roomID: roomID
//         },
//         success: successCallback,
//         failure: failureCallback
//     });
// },
loadOrderMemGoods: function (roomID, callback) {

    var goodsStore = Ext.getStore('Goods'),
        goodsTypes = Ext.getStore('GoodsTypes'),
        goodsModels, goodsTypesArr = {};

    var successCallback = function (resp, ops) {
        goodsStore.removeAll();
        goodsTypes.removeAll();
        var data = Ext.decode(resp.responseText).d;
        if (data && data != "") {
            var Json_Goods = Ext.decode(data);
            Ext.Array.each(Json_Goods, function (Good) {
                goodsModels = Ext.create('MyFirst.model.Good', Good);
                goodsStore.add(goodsModels);

                if (goodsModels.data.GoodsTypeName) {
                    goodsTypesArr[goodsModels.data.GoodsTypeName] = {
                        GoodsTypeName: goodsModels.data.GoodsTypeName,
                        DisplayOrder: goodsModels.data.DisplayOrder
                    };
                }
            });
            Ext.Array.each(Ext.Object.getValues(goodsTypesArr), function (goodsType) {
                goodsTypes.add(goodsType);
            });
        }
        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("加载菜品失败!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_Get_RoomMemberGoods',
        jsonData: {
            roomID: roomID
        },
        success: successCallback,
        failure: failureCallback
    });
},
loadPresentGoods: function (roomID, callback) {

    var goodsStore = Ext.getStore('Goods'),
        goodsTypes = Ext.getStore('GoodsTypes'),
        goodsModels, goodsTypesArr = {};

    var successCallback = function (resp, ops) {
        goodsStore.removeAll();
        goodsTypes.removeAll();
        var data = Ext.decode(resp.responseText).d;
        if (data && data != "") {
            var Json_Goods = Ext.decode(data);
            Ext.Array.each(Json_Goods, function (Good) {
                goodsModels = Ext.create('MyFirst.model.Good', Good);
                goodsStore.add(goodsModels);

                if (goodsModels.data.GoodsTypeName) {
                    goodsTypesArr[goodsModels.data.GoodsTypeName] = {
                        GoodsTypeName: goodsModels.data.GoodsTypeName,
                        DisplayOrder: goodsModels.data.DisplayOrder
                    };
                }
            });
            Ext.Array.each(Ext.Object.getValues(goodsTypesArr), function (goodsType) {
                goodsTypes.add(goodsType);
            });
        }
        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("加载菜品失败!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_Get_PresentGoods',
        jsonData: {
            roomID: roomID,
            PresentUserNO: Ext.getStore('User').load().data.items[0].data.userno
        },
        success: successCallback,
        failure: failureCallback
    });
},
loadOrder: function (roomID, callback) {

    var orderStore = Ext.getStore('Orders');
    orderStore.removeAll();
    orderStore.clearFilter(true);
//    orderStore.filterBy(function (Orders) {
//    	return Orders.get('OpCode') == app.CurRoom.RoomOpCode
//    });
    var successCallback = function (resp, ops) {
        // var temp = Ext.create('MyFirst.model.Order', { 'GoodsName': '菜品','GoodsTypeName': '分类', 'Price': '价格', 'Unit': '', 'GoodsCount': '数量', 'SubTotal': '小计', 'PresentUser': '落单人', 'OpCode':app.CurRoom.RoomOpCode });
        // orderStore.add(temp);
        var data = Ext.decode(resp.responseText).d;
        var Json_Order = eval('(' + data + ')');
        Ext.Array.each(Json_Order.Orders, function (order) {
            orderModel = Ext.create('MyFirst.model.Order', order);
            orderStore.add(orderModel);
        });


        //更新该房台的记录
        var roomStore = Ext.getStore('Rooms');
        var record = roomStore.findRecord('ID', roomID);
        record.setData(Json_Order.Room[0]);
        app.CurRoom = record.data;
        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("加载已点单失败!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_GetRoomOrderList',
        jsonData: {
            roomID: roomID
        },
        success: successCallback,
        failure: failureCallback
    });
},
loadHisOrder: function (roomID, callback) {

    var orderStore = Ext.getStore('Orders');
    orderStore.removeAll();
    orderStore.clearFilter(true);
//    orderStore.filterBy(function (Orders) {
//       return Orders.get('OpCode') != app.CurRoom.RoomOpCode
//    });
    var successCallback = function (resp, ops) {
        var data = Ext.decode(resp.responseText).d;
        var Json_Order = eval('(' + data + ')');
        var pn='0';
        var n=0;
        var sum=0;
        var total=0;
        Ext.Array.each(Json_Order.Orders, function (order) {
            orderModel = Ext.create('MyFirst.model.Order', order);
            if (orderModel.data.OpCode > pn ){
               if(pn!='0'){
               sum += total
               var temp=Ext.create('MyFirst.model.Order', { 'Unit': '共计','SubTotal': total,'OpCode':pn});
               orderStore.add(temp);
               temp=Ext.create('MyFirst.model.Order', { 'GoodsName': '--------------------------------','GoodsTypeName': '--------', 'Unit': '-------','SubTotal': '-------', 'PresentUser': '----------------------','OpCode':pn});
               orderStore.add(temp);
               };
               total=0;
               n = n + 1;
               title='===第';
               title+=n;
               title+='轮点菜===';
               temp=Ext.create('MyFirst.model.Order', { 'GoodsName': title,'OpCode':orderModel.data.OpCode});
               orderStore.add(temp);
               // temp= Ext.create('MyFirst.model.Order', { 'GoodsName': '菜品', 'GoodsTypeName': '分类','Price': '价格', 'Unit': '', 'GoodsCount': '数量', 'SubTotal': '小计', 'PresentUser': '落单人','OpCode':orderModel.data.OpCode });
               // orderStore.add(temp);
            };
            
            orderStore.add(orderModel);
            total += Number(orderModel.data.SubTotal);
            pn = orderModel.data.OpCode;
        });
        if(pn!='0'){
//           if(pn==orderModel.data.OpCode){
               sum += total
               temp=Ext.create('MyFirst.model.Order', { 'Unit': '共计','SubTotal': total,'OpCode':pn});
               orderStore.add(temp);
               temp=Ext.create('MyFirst.model.Order', { 'GoodsName': '--------------------------------','GoodsTypeName': '--------', 'Unit': '-------','SubTotal': '-------', 'PresentUser': '----------------------','OpCode':pn});
               orderStore.add(temp);
//           };
        };
        app.roomhisconsumed = sum;
        // temp=Ext.create('MyFirst.model.Order', { 'Unit': '总计','SubTotal': sum});
        // orderStore.add(temp);
      //  orderStore.clearFilter(true);
      //  orderStore.filterBy(function (Orders) {
      //      return Orders.get('OpCode') != app.CurRoom.RoomOpCode
      //  });
        //orderModel = Ext.create('MyFirst.model.Order', { 'GoodsName': '菜品', 'Price': '价格', 'Unit': '', 'GoodsCount': '数量', 'SubTotal': '小计', 'PresentUser': '落单人' });
        //orderStore.insert(0, orderModel);
        //更新该房台的记录
        var roomStore = Ext.getStore('Rooms');
        var record = roomStore.findRecord('ID', roomID);
        record.setData(Json_Order.Room[0]);
        app.CurRoom = record.data;
        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("加载已点单失败!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_GetRoomHisOrderList',
        jsonData: {
            roomID: roomID
        },
        success: successCallback,
        failure: failureCallback
    });
},
loadCustomerOrder: function (roomID, opCode, callback) {

    var goodsStore = Ext.getStore('Goods');
    goodsStore.clearFilter(true);
    goodsStore.each(function (item, index, length) {
            item.data.GoodsCount = 0;
        });

    var successCallback = function (resp, ops) {
        var data = Ext.decode(resp.responseText).d;
        if(!data){ 
            Ext.Msg.alert("无客人自选单信息!");
            return;
        };
        var Json_CustomerOrder = Ext.decode(data);
        Ext.Array.each(Json_CustomerOrder, function (main) {
            // var goodsidx = goodsStore.findBy(function(goods){
            //         return goods.get('GoodsName') == main.GoodsName;
            //     });

            // // 'GoodsName', main.GoodsName);

            // var goods = goodsStore.data.items[goodsidx];
            var goods = goodsStore.findRecord('GoodsName', main.GoodsName, 0, false, false, true);
            goods.data.GoodsCount = main.GoodsCount;
            goods.data.Remarks = main.Remarks;
            if (main.GoodsDetails) {
                Ext.Array.each(main.GoodsDetails, function (detail) {
                    Ext.Array.each(goods.data.GoodsDetails, function (gdetail) {
                        if (gdetail.ID == detail.ID)
                            gdetail.GoodsDetailCount = detail.GoodsDetailCount;
                        else
                            gdetail.GoodsDetailCount = 0;
                    });
                });
            }
        });

        //        if (goods) 
        //            goods.data.GoodsDetails[index] = data;

        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("加载已点单失败!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_GetRoomCustomerOrderList',
        jsonData: {
            roomID: roomID,
            opCode: opCode
        },
        success: successCallback,
        failure: failureCallback
    });
},
loadOverView: function (callback) {

    var viewStore = Ext.getStore('OverViews');
    viewStore.removeAll();

    var successCallback = function (resp, ops) {
        var data = Ext.decode(resp.responseText).d;
        var Json_View = Ext.decode(data);
        Ext.Array.each(Json_View, function (view) {
            viewModel = Ext.create('MyFirst.model.OverView', view);
            viewStore.add(viewModel);
        });
        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("加载实时营业总览失败!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_GetManagerOverView',
        jsonData: {
    },
    success: successCallback,
    failure: failureCallback
});
},
openRoom: function (roomID, callback) {

    var successCallback = function (resp, ops) {
        var data = Ext.decode(resp.responseText).d;
        if (data.indexOf("{ Room:") == -1) {
            Ext.Msg.alert('提示', data, Ext.emptyFn);
            return;
        }
        var Json_Order = eval('(' + data + ')');

        //更新该房台的记录
        var roomStore = Ext.getStore('Rooms');
        var record = roomStore.findRecord('ID', roomID);
        record.setData(Json_Order.Room[0]);
        app.CurRoom = record.data;

        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("开台失败!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_OpenRoom',
        jsonData: {
            roomID: roomID,
            userNo: Ext.getStore('User').load().data.items[0].data.userno
        },
        success: successCallback,
        failure: failureCallback
    });
},
orderRoom: function (submitMobile, callback) {

    var successCallback = function (resp, ops) {
        Ext.Viewport.setMasked(false);
        var data = Ext.decode(resp.responseText).d;
        if (data.indexOf("{ Room:") == -1) {
            Ext.Msg.alert('提示', data, Ext.emptyFn);
            return;
        }
        var Json_Order = eval('(' + data + ')');

        //更新该房台的记录
        var roomStore = Ext.getStore('Rooms');
        var record = roomStore.findRecord('ID', app.CurRoom.ID);
        record.setData(Json_Order.Room[0]);
        app.CurRoom = record.data;
        Ext.Msg.alert(app.OrderType + "成功!");
        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Viewport.setMasked(false);
        Ext.Msg.alert("落单失败!", resp.responseText);
    };
    Ext.Ajax.request({
        method: 'POST',
        url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_Add_Orders',
        async: true, //异步执行
        params: submitMobile,
        jsonData: {
            submitMobile: submitMobile
        },
        success: successCallback,
        failure: failureCallback
    });
},
posRoom: function (roomID, totalMoney, trueMoney, payMode, callback) {

    var successCallback = function (resp, ops) {
        var data = Ext.decode(resp.responseText).d;
        if (data.indexOf("{ Room:") == -1) {
            Ext.Msg.alert('提示', data, Ext.emptyFn);
            return;
        }
        var Json_Order = eval('(' + data + ')');

        //更新该房台的记录
        var roomStore = Ext.getStore('Rooms');
        var record = roomStore.findRecord('ID', roomID);
        record.setData(Json_Order.Room[0]);
        app.CurRoom = record.data;

        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("买单失败!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_PosRoom',
        jsonData: {
            roomID: roomID,
            totalMoney: totalMoney,
            trueMoney: trueMoney,
            payMode: payMode,
            userNo: Ext.getStore('User').load().data.items[0].data.userno
        },
        success: successCallback,
        failure: failureCallback
    });
},
closeRoom: function (roomID, callback) {

    var successCallback = function (resp, ops) {
        var data = Ext.decode(resp.responseText).d;
        if (data.indexOf("{ Room:") == -1) {
            Ext.Msg.alert('提示', data, Ext.emptyFn);
            return;
        }
        var Json_Order = eval('(' + data + ')');

        //更新该房台的记录
        var roomStore = Ext.getStore('Rooms');
        var record = roomStore.findRecord('ID', roomID);
        record.setData(Json_Order.Room[0]);
        app.CurRoom = record.data;

        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("关台失败!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_CloseRoom',
        jsonData: {
            roomID: roomID,
            userNo: Ext.getStore('User').load().data.items[0].data.userno
        },
        success: successCallback,
        failure: failureCallback
    });
},
doBalance: function (callback) {

    var successCallback = function (resp, ops) {
        Ext.Viewport.setMasked(false);
        var msg = Ext.decode(resp.responseText).d;
        if (msg && msg != "") {
            Ext.Msg.alert('提示', msg, Ext.emptyFn);
            return;
        }
        Ext.Msg.alert("营业结束成功!");
        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Viewport.setMasked(false);
        Ext.Msg.alert("营业结束失败!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_BoBalance',
        jsonData: {
            userNo: Ext.getStore('User').load().data.items[0].data.userno
        },
        success: successCallback,
        failure: failureCallback
    });
}
});
