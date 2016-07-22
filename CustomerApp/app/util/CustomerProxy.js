Ext.define('app.util.CustomerProxy', {

    singleton: true,
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
    chkCustomerOp: function (Op, callback) {
        var opCode = Op.substr(0, 12);
        var roomID = Op.substring(12, 20);

        var successCallback = function (resp, ops) {
            var data = Ext.decode(resp.responseText).d;
            if (data.indexOf("{ Room:") == -1) {
                Ext.Msg.alert('返回提示', data, Ext.emptyFn);
                app.CurRoom='';
                return;
            }
            var Json_Room = eval('(' + data + ')');
            app.CurRoom = Json_Room.Room[0];
            Ext.Viewport.setMasked(false);
            callback();
        };
        var failureCallback = function (resp, ops) {
            Ext.Msg.alert("钥匙读取错误!", resp.responseText);
        };
        Ext.Ajax.request({
            url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_ChkCustomerOp',
            jsonData: {
                opCode: opCode,
                roomID: roomID
            },
            success: successCallback,
            failure: failureCallback
        });

    },
    getUnStr: function (instr,callback) {
        var successCallback = function (resp, ops) {
            var data = Ext.decode(resp.responseText).d;
            // var strvalue = Ext.decode(data);
            callback(data);
        };
        var failureCallback = function (result) {
            Ext.Msg.alert("加载参数失败!");
        };
       Ext.Ajax.request({
          url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_Decrypt',
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
            callback(Pname[0].ParaValue
);
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
    loadCustomerGoods: function (roomID, callback) {
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
                    goodsModels = Ext.create('CustomerApp.model.Good', Good);
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
                    goodsModels = Ext.create('CustomerApp.model.Good', Good);
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
    loadOrder: function (roomID, callback) {

        var orderStore = Ext.getStore('Orders');
        orderStore.removeAll();
    	orderStore.clearFilter(true);
//    	orderStore.filterBy(function (Orders) {
//    		return Orders.get('OpCode') == app.CurRoom.RoomOpCode
//    	});
        var successCallback = function (resp, ops) {
            var data = Ext.decode(resp.responseText).d;
            var Json_Order = Ext.decode(data);
            roomcount = 0;
            Ext.Array.each(Json_Order, function (order) {
                orderModel = Ext.create('CustomerApp.model.Order', order);
                roomcount += order.SubTotal;
                orderStore.add(orderModel);
            });
            
            //var temp = Ext.create('CustomerApp.model.Order', { 'GoodsName': '菜品','GoodsTypeName': '分类', 'Price': '价格', 'Unit': '', 'GoodsCount': '数量', 'SubTotal': '小计', 'PresentUser': '落单人', 'OpCode':orderModel.data.OpCode });
            //orderStore.insert(0, temp);
            //更新该房台的记录
            app.CurRoom = Json_Order.Room[0];
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
    orderRoom: function (submitMobile, callback) {

        var successCallback = function (resp, ops) {
            Ext.Viewport.setMasked(false);
            var msg = Ext.decode(resp.responseText).d;
            if (msg && msg != "") {
                Ext.Msg.alert(msg);
                return
            }
            Ext.Msg.alert(app.OrderType + "成功!");
            callback();
        };
        var failureCallback = function (resp, ops) {
            Ext.Viewport.setMasked(false);
            Ext.Msg.alert("点单失败!", resp.responseText);
        };
        Ext.Ajax.request({
            method: 'POST',
            url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_Add_CustomerOrders',
            async: true, //异步执行
            params: submitMobile,
            jsonData: {
                submitMobile: submitMobile
            },
            success: successCallback,
            failure: failureCallback
        });
    }
});
