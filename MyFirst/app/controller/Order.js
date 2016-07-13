Ext.define('MyFirst.controller.Order', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            roomAreaPicker: 'rooms segmentedbutton',

            roomContainer: 'roomContainer',
            roomslist: 'rooms',
            orderedlist: 'ordereds',
            orderingslist: 'orderings',
            orderedgoodslist: 'orderedgoods',
            goodslist: 'goods',
            goodstypelist: 'goodstypes',

            overviewform: 'overviewform',

            pos: "pos",
            txtTotalMoney: '#txtTotalMoney',
            txtTruePayMoney: '#txtTruePayMoney',
            txtPayMode: '#txtPayMode',

            txtSubTotal: '#txtSubTotal',
            txtReserver: '#txtReserver',
            txtConsumed: '#txtConsumed',
            txtPresented: '#txtPresented',
            orderingsButton: 'orderings button',
            markToggleButton: 'orderings #markToggle',
            markToggle2Button: 'orderings #markToggle2',
            markToggle3Button: 'orderings #markToggle3',
            confirmCancel: 'orderedgoods #confirmCancel',
            doBalanceButton: '#doBalanceButton',
            refreshButton: '#refreshButton',
            posButton: '#posButton',
            clearCusOrderButton: '#clearCusOrderButton',
            closeButton: '#closeButton',
            queryButton: '#queryButton',
            hisQueryButton: '#hisqueryButton',
            orderButton: '#orderButton',
            confirmOkButton: '#confirmOkButton',
            cancelButton: '#cancelButton',
            mngButton: '#mngButton',
            orderMemButton: '#orderMemButton',
            presentButton: '#presentButton',
            qrCodeButton: '#qrCodeButton',
            customerButton: '#customerButton',
            exchangeButton: '#exchangeButton',
            posOkButton: 'pos #posOkButton',
            closeButton2: 'pos #closeButton2'
        },
        control: {
            roomslist: {
                initialize: 'initRoom',
                activate: 'onRoomActivate',
                itemtap: 'onRoomTap'
            },
            roomAreaPicker: {
                toggle: 'onRoomAreaChange'
            },
            doBalanceButton: {
                tap: 'onBalance'
            },
    //        mngButton: {
    //            tap: 'onJinglichaxun'
    //        },
            refreshButton: {
                tap: 'onRefresh'
            },

            markToggleButton: {
                change: 'onmarkToggle'
            },
            markToggle2Button: {
                change: 'onmarkToggle2'
            },
            markToggle3Button: {
                change: 'onmarkToggle3'
            },
            roomContainer: {
                pop: 'onMainPop',
                push: 'onMainPush'
            },
            orderedlist: {
                activate: 'onRoomOrdersActivate'
            },
            orderedgoodslist: {
                onPackGoodsClicked: 'onPackGoodsClicked'
                // activate: 'onRoomOrdersActivate',
                // activate: 'onOrderingActivate'
            },
            // roomslist: {
            //     itemtap: 'onRoomTap'
            // },
            goodslist: {
                onPackGoodsClicked: 'onPackGoodsClicked'
            },
            goodstypelist: {
                activate: 'onGoodsTypeActivate',
                itemtap: 'onGoodsTypeTap'
            },
            orderingslist: {
                onPackGoodsClicked: 'onPackGoodsClicked',
                activate: 'onOrderingActivate'
            },
            pos: {
                activate: 'onPosActivate'
            },
            orderingsButton: {
                tap: 'onOkOrder'
            },
            confirmOkButton: {
                tap: 'onOkOrder'
            },
            clearCusOrderButton: {
                tap: 'onclearCusOrder'
            },
            //refreshButton: {
            //    tap: 'onRefresh'
            //},
            queryButton: {
                tap: 'onQuery'
            },
            hisQueryButton: {
                tap: 'onHisQuery'
            },
            orderButton: {
                tap: 'onLuodan'
            },
            exchangeButton: {
                tap: 'onExchange'
            },
            confirmCancel: {
                tap: 'onConfirmCancel'
            },
            cancelButton: {
                tap: 'onCancel'
            },
            mngButton: {
                tap: 'onJinglichaxun'
            },
            orderMemButton: {
                tap: 'onLuodanMem'
            },
            closeButton: {
                tap: 'onClose'
            },
            presentButton: {
                tap: 'onZengsong'
            },
            posButton: {
                tap: 'onPos'
            },
            posOkButton: {
                tap: 'onOkPos'
            },
            qrCodeButton: {
                tap: 'onQrCodeButton_Clicked'
            },
            customerButton: {
                tap: 'onCustomerButton_Clicked'
            },
            closeButton2: {
                tap: 'onClose'
            }
        }
    },
    //全部加辣
    onmarkToggle: function (field, slider, thumb, newValue, oldValue) {
        var goodsStore = Ext.getStore('Goods');

        goodsStore.each(function (records) {
            if (slider == 1)
                records.data.Remarks = '加辣';
            else
                records.data.Remarks = '';
        });
        var goodsview = this.getOrderingslist();
        goodsview.refresh();
    },
    //全部微辣
    onmarkToggle2: function (field, slider, thumb, newValue, oldValue) {
        var goodsStore = Ext.getStore('Goods');

        goodsStore.each(function (records) {
            if (slider == 1)
                records.data.Remarks = '微辣';
            else
                records.data.Remarks = '';
        });
        var goodsview = this.getOrderingslist();
        goodsview.refresh();
    },
    //数量 X 10
    onmarkToggle3: function (field, slider, thumb, newValue, oldValue) {

            if (slider == 1)
                app.numclickn=10;
            else
                app.numclickn=1;
    },
    //清空顾客自选单
    onclearCusOrder: function () {
        me=this;
        Ext.Msg.confirm("清空点单", "确认要清空所有点单吗?",
            function (btn) {
                if (btn == 'yes'){
                    Ext.Viewport.setMasked({ xtype: 'loadmask' });
                    var roomCard = me.getRoomContainer();
                    var user = Ext.getStore('User').load().data.items[0].data;
                    app.util.Proxy.clearCusOrder(app.CurRoom.ID,app.CurRoom.RoomOpCode,user.userno,function () {
                         //dataView.refresh();
                         roomCard.pop(roomCard.getInnerItems().length - 1);
                         Ext.Viewport.setMasked(false);
                    });
                }
        });
    },
    //转台选择
    onExchange: function () {
        var opt=[];
        var roomstore = Ext.getStore('Rooms');
        roomstore.each(function(room){
            if(room.data.RoomStateName == '空房'){
                var x=room.data.RoomName;
                // opt.push( Ext.encode({text: room.data.RoomName, value: room.data.ID} ) );
                opt.push( {text: room.data.RoomName, value: room.data.ID} );
            }
        });
        var exchangeNo = Ext.getCmp('txtExchangeNo')
        if (!exchangeNo){
            var select = Ext.create('Ext.field.Select',{
                xtype: 'selectfield',
                itemId: 'txtExchangeNo',
                label: '转到台号',
                docked: 'bottom',
                id: 'txtExchangeNo'
            });
            this.getOrderedlist().add(select);
            select.setOptions(opt);
            var dataView = this.getOrderedlist();
            dataView.refresh();
        }else{
            exchangeNo.setOptions(opt);
            var newroomid=exchangeNo.getValue();
            this.onDoExchange(newroomid);
        }

    },
    //确认转台
    onDoExchange: function (newroomid) {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        var exchangeNo = Ext.getCmp('txtExchangeNo');
        var roomCard = this.getRoomContainer();
        var dataView = this.getRoomslist();
        var user = Ext.getStore('User').load().data.items[0].data;
        app.util.Proxy.exchange(app.CurRoom.ID,newroomid,user.userno,function () {
            exchangeNo.destroy();
             dataView.refresh();
             roomCard.pop(roomCard.getInnerItems().length - 1);
             Ext.Viewport.setMasked(false);
        });
    },
    //确认撤单
    onConfirmCancel: function () {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        var cancelStore = Ext.getStore('CancelOrders');
        var allData = [];
        // goodsStore.filterBy(function (goods) {
        //     return goods.get('GoodsCount') < 0;
        // });
        cancelStore.each(function (records) {
            delete records.data.id;
            records.data.Remarks = '本单撤消';
            allData.push(records.data);
        });
        if (allData.length == 0) {
            Ext.Viewport.setMasked(false);
            return;
        }

        var dataToBeSentToServer = Ext.JSON.encode(allData);

        var roomCard = this.getRoomContainer();
        var dataView = this.getRoomslist();
        app.util.Proxy.cancelorders(dataToBeSentToServer,
             function () {
                 //dataView.refresh();
                 roomCard.pop(roomCard.getInnerItems().length - 1);
                 Ext.Viewport.setMasked(false);
             });
    },
    goRoom: function (roomid) {
        //获取房台ID
        var roomstore = Ext.getStore('Rooms');
        var roomselect = roomstore.findRecord('ID', roomid, 0, false, false, true);
        // var roomID = roomstore.data.ID;
        if (roomselect.data.RoomStateName == "消费" || roomselect.data.RoomStateName == "开房"){
            app.CurRoom = roomselect.data;
            var frmMain = this.getRoomContainer();
            frmMain.getNavigationBar().show();
            frmMain.down('titlebar').show();
            if (app.CurRoom.RoomStateName == "打单" || app.CurRoom.RoomStateName == "收银") {
                this.loadRoomOrder(app.CurRoom.ID);
            }else {
                var user = Ext.getStore('User').load().data.items[0].data;
                // this.showCustomerButton();
                if (Ext.Array.contains(user.rights, "赠送")) {
                    app.OrderType = "赠送";
                    this.loadPresentGoods(app.CurRoom.ID);
                }else if (Ext.Array.contains(user.rights, "落单")) {
                    app.OrderType = "落单";
                    this.loadOrderGoods(app.CurRoom.ID);
                }
            };
        };
    },
    onRoomTap: function (dataView, index, dataItem, dataItemModel, e, eOpts) {
        if (dataItemModel.data.RoomStateName == "坏房")
            return;
        if (dataItemModel.data.RoomStateName == "空房"
        || dataItemModel.data.RoomStateName == "订房"
        || dataItemModel.data.RoomStateName == "带位") {
            Ext.Msg.confirm("开台", "确认要开台吗?",
                function (btn) {
                    if (btn == 'yes'){
                        app.util.Proxy.openRoom(dataItemModel.data.ID, function () { 
                            dataView.refresh();
                            // app.util.Proxy.printQrCode(printstr);
                            app.util.Proxy.getEnStr(app.CurRoom.RoomOpCode + app.CurRoom.ID, function (enstr) {
                                var myUrl = Ext.global.window.location.href.replace(/order\.html.*$/g,'customer.html') + "?Key=" + enstr;
                                var apiurl = 'http://50r.cn/urls/add.jsonp'
                                var url = "http://qr.topscan.com/api.php?&w=260&text=" + myUrl;
                                console.log(url);
                                app.util.Proxy.getShortUrl(apiurl,myUrl,function (shorturl) {
                                    var printstr = '<CB>'+app.CurPlace+'</CB><BR>' + '<CB>'+app.CurRoom.RoomName+'</CB><BR><QR>' +shorturl + '</QR><BR><C>'+app.CurPlacemsg+'</C>'
                                    app.util.Proxy.printQrCode(printstr);
                                });
                            });
                        });
                    };
                });
            return;
        }
        //获取房台ID
        var roomID = dataItemModel.data.ID;
        app.CurRoom = dataItemModel.data;
        var frmMain = this.getRoomContainer();
        //        if (!this.roomDetail) {
        //            this.roomDetail = Ext.widget('roomdetail');
        //        }
        //        frmMain.push(this.roomDetail);
        frmMain.getNavigationBar().show();
        frmMain.down('titlebar').show();
        // this.hideRefreshButton();
        // this.hideDoBalanceButton();
        // this.hideMngButton();
        if (app.CurRoom.RoomStateName == "打单" || app.CurRoom.RoomStateName == "收银") {
            this.loadRoomOrder(app.CurRoom.ID);
            // this.showCloseButton();
            // this.hideOrderButton();
            // this.hideOrderMemButton();
            // this.hidePresentButton();
            // this.hideQueryButton();
            // this.hideHisQueryButton();
            // this.hideQrCodeButton();
            // this.hideCustomerButton();
        }
        else {
            var user = Ext.getStore('User').load().data.items[0].data;
            // this.showCustomerButton();
            if (Ext.Array.contains(user.rights, "赠送")) {
                app.OrderType = "赠送";
                // this.showOrderButton();
                // this.showOrderMemButton();
                // this.showPresentButton();
                // this.showQueryButton();
                // this.showHisQueryButton();
                //this.setPresentButton();
                this.loadPresentGoods(app.CurRoom.ID);
            }
            else if (Ext.Array.contains(user.rights, "落单")) {
                app.OrderType = "落单";
                // this.showQrCodeButton();
                // this.showCustomerButton();
                // this.showOrderButton();
                // this.showOrderMemButton();
                // this.showPresentButton();
                // this.showQueryButton();
                // this.showHisQueryButton();
                this.loadOrderGoods(app.CurRoom.ID);
            }
        }
    },
    onRoomOrdersActivate: function () {
        var room = app.CurRoom;
        this.getTxtReserver().setValue(room.ReservationEmpName + '(' + room.ReservationDateTime + ')');
        this.getTxtConsumed().setValue(room.ConsumeAmount);
        this.getTxtPresented().setValue(room.PresentAmount);
    },
    onRoomHisOrdersActivate: function () {
        // var room = app.CurRoom;
        // this.getTxtReserver().setValue(room.ReservationEmpName + '(' + room.ReservationDateTime + ')');
        this.getTxtConsumed().setValue(app.roomhisconsumed);
        // this.getTxtPresented().setValue(room.PresentAmount);
    },
    loadRoomOrder: function (roomID) {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        var frmMain = this.getRoomContainer();
        frmMain.down('titlebar').setTitle(app.CurRoom.RoomName + ' 消费查询');
        app.util.Proxy.loadOrder(roomID, function () {
            //点击房台后，先载入房台消费信息
            if (!this.orderedlist) {
                this.orderedlist = Ext.widget('orderedslist');
                //roomDetail.add(this.orderedlist);
            }
            frmMain.push(this.orderedlist);
            //roomDetail.setActiveItem(this.orderedlist);
            Ext.Viewport.setMasked(false);
        });
    },
    loadHisRoomOrder: function (roomID) {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        var frmMain = this.getRoomContainer();
        frmMain.down('titlebar').setTitle(app.CurRoom.RoomName + ' 历史查询');
        app.util.Proxy.loadHisOrder(roomID, function () {
            //点击房台后，先载入房台消费信息
            if (!this.orderedlist) {
                this.orderedlist = Ext.widget('orderedslist');
                //roomDetail.add(this.orderedlist);
            }
            frmMain.push(this.orderedlist);
            //roomDetail.setActiveItem(this.orderedlist);
            Ext.Viewport.setMasked(false);
        });
    },
    loadPresentGoods: function (roomID) {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        var frmMain = this.getRoomContainer();
        frmMain.down('titlebar').setTitle(app.CurRoom.RoomName + ' 赠送');
        app.util.Proxy.loadPresentGoods(roomID, function () {
            //点击房台后，先载入点单菜品信息 
            if (!this.goodstypelist) {
                this.goodstypelist = Ext.widget('goodstypelist');
                //roomDetail.add(this.goodstypelist);
            }
            frmMain.push(this.goodstypelist);
            //roomDetail.setActiveItem(this.goodstypelist);
            Ext.Viewport.setMasked(false);
        });
    },
    loadOrderGoods: function (roomID) {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        var frmMain = this.getRoomContainer();
        frmMain.down('titlebar').setTitle(app.CurRoom.RoomName + ' 落单');
        app.util.Proxy.loadOrderGoods(roomID, function () {
            //点击房台后，先载入赠送菜品信息 
            if (!this.goodstypelist) {
                this.goodstypelist = Ext.widget('goodstypelist');
            }
            frmMain.push(this.goodstypelist);
            Ext.Viewport.setMasked(false);
        });
    },
    // loadOrderedGoods: function (roomID) {
    //     var goodsStore = Ext.getStore('Goods'),
    //     orderStore = Ext.getStore('Orders');
    //     goodsStore.removeAll();
    //     goodsStore.clearFilter(true);
    //     orderStore.each(function (records) {
    //         // var goodscursor=Ext.create('MyFirst.model.Goods', { 'ID':records.data.GoodsID,'Unit': records.data.Unit,'GoodsTypeName': records.data.GoodsTypeName,'GoodsName':records.id.GoodsName,'Price':records.id.Price,'GoodsCount':records.id.GoodsCount});
    //         // goodsStore.add(goodscursor);
    //     });
    // },
    loadOrderMemGoods: function (roomID) {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        var frmMain = this.getRoomContainer();
        frmMain.down('titlebar').setTitle(app.CurRoom.RoomName + ' 会员点单');
        app.util.Proxy.loadOrderMemGoods(roomID, function () {
            //点击房台后，先载入赠送菜品信息 
            if (!this.goodstypelist) {
                this.goodstypelist = Ext.widget('goodstypelist');
            }
            frmMain.push(this.goodstypelist);
            Ext.Viewport.setMasked(false);
        });
    },
    goGoodsType: function (goodtypename) {
        var goodsStore = Ext.getStore('Goods');
        goodsStore.clearFilter(true);
        goodsStore.filterBy(function (goods) {
            return goods.get('GoodsTypeName') == goodtypename;
        });
        var frmMain = this.getRoomContainer();
        if (!this.goodslist) {
            this.goodslist = Ext.widget('goodslist');
        };
        frmMain.push(this.goodslist);
    },
    onGoodsTypeTap: function (dataView, index, dataItem, dataItemModel, e, eOpts) {
        var goodstypename = dataItemModel.data.GoodsTypeName;
        var goodsStore = Ext.getStore('Goods');
        // this.hideQueryButton();
        // this.hideHisQueryButton();
        // this.hideQrCodeButton();
        // this.hideCustomerButton();
        if (app.OrderType == "落单") {
            // this.hideOrderMemButton();
            // this.hidePresentButton();
        }
        else if (app.OrderType == "赠送") {
            // this.hideOrderButton();
            // this.hideOrderMemButton();
        }
        else if (app.OrderType == "会员点单") {
            // this.hideOrderButton();
            // this.hidePresentButton();
        }
        goodsStore.clearFilter(true);
        goodsStore.filterBy(function (goods) {
            if (goodstypename == '店长推荐'){
                return goods.get('IsHot') == true;
            }else{
                return goods.get('GoodsTypeName') == goodstypename;
            };
        });
        var frmMain = this.getRoomContainer();
        if (!this.goodslist) {
            this.goodslist = Ext.widget('goodslist');
            //this.getRoomDetail().add(this.goodslist);
        }
        frmMain.push(this.goodslist);
        //this.getRoomDetail().setActiveItem(this.goodslist);
    },
    onOrderingActivate: function () {
        var goodsStore = Ext.getStore('Goods');
        var sub = 0;
        goodsStore.each(function (item, index, length) {
            sub += item.data.Price * item.data.GoodsCount;
        });
        this.getTxtSubTotal().setValue(sub);
    },
    onPackGoodsClicked: function (list, record, item, index, btn) {
        var detailStore = Ext.getStore('GoodsDetails');
        detailStore.removeAll();
        Ext.Array.each(record.data.GoodsDetails, function (Good) {
            detailStore.add(Good);
        });
        var frmMain = this.getRoomContainer();
        if (!this.goodsdetaillist) {
            this.goodsdetaillist = Ext.widget('goodsdetaillist');
        }
        // this.hideOrderButton();
        // this.hidePresentButton();
        // this.hideOrderMemButton();
        // this.hideQueryButton();
        // this.hideHisQueryButton();
        // this.hideQrCodeButton();
        // this.hideCustomerButton();
        frmMain.push(this.goodsdetaillist);
    },
    //选单
    selectOrders: function () {
        var goodsStore = Ext.getStore('Goods');
        var idx = goodsStore.findBy(function (goods) {
            return goods.get('GoodsCount') > 0;
        });
        if (idx < 0) {
            Ext.Msg.alert("没有点取菜品!");
            return;
        }
        // this.hideOrderButton();
        // this.hidePresentButton();
        // this.hideOrderMemButton();
        // this.hideQueryButton();
        // this.hideHisQueryButton();
        // this.hideQrCodeButton();
        // this.hideCustomerButton();
        // this.hideCancelButton();

        goodsStore.clearFilter(true);
        goodsStore.filterBy(function (goods) {
            return goods.get('GoodsCount') > 0;
        });

        var frmMain = this.getRoomContainer();
        if (!this.orderingslist) {
            this.orderingslist = Ext.widget('orderingslist');
            //this.getRoomDetail().add(this.orderingslist);
        }
        frmMain.push(this.orderingslist);
        //this.getRoomDetail().setActiveItem(this.orderingslist);
        this.getMarkToggleButton();
        this.getMarkToggle2Button();
        if (app.OrderType == "赠送")
            this.getOrderingsButton().setText('确认赠送');
        else
            this.getOrderingsButton().setText('确认落单');
    },
    //已选单
    selectOrdered: function () {
        var goodsStore = Ext.getStore('Goods');
        var idx = goodsStore.findBy(function (goods) {
            return goods.get('GoodsCount') > 0;
        });
        // if (idx < 0) {
        //     Ext.Msg.alert("没有选取菜品!");
        //     return;
        // }
        // this.hideOrderButton();
        // this.hidePresentButton();
        // this.hideOrderMemButton();
        // this.hideQueryButton();
        // this.hideHisQueryButton();
        // this.hideQrCodeButton();
        // this.hideCustomerButton();
        // this.hideCancelButton();

        goodsStore.clearFilter(true);
        goodsStore.filterBy(function (goods) {
            return goods.get('GoodsCount') > 0;
        });

        var frmMain = this.getRoomContainer();
        if (!this.orderingslist) {
            this.orderingslist = Ext.widget('orderingslist');
            //this.getRoomDetail().add(this.orderingslist);
        }
        frmMain.push(this.orderingslist);
        //this.getRoomDetail().setActiveItem(this.orderingslist);
        if (app.OrderType == "赠送")
            this.getConfirmCancel().setText('确认赠送');
        else
            this.getConfirmCancel().setText('确认撤单');
    },
    //落单
    onLuodan: function () {
        var frmMain = this.getRoomContainer();
        var curView = frmMain.getActiveItem();
        if (curView.xtype == 'ordereds' || app.OrderType != "落单") {
            app.OrderType = "落单";
            // this.showOrderButton();
            // this.showPresentButton();
            // this.showOrderMemButton();
            // this.showQueryButton();
            this.loadOrderGoods(app.CurRoom.ID);
        }
        else if (curView.xtype == 'goodstypes' || curView.xtype == 'goods') {
            this.selectOrders();
        }
    },
    //撤单
    onCancel: function () {
        var frmMain = this.getRoomContainer();
        frmMain.down('titlebar').setTitle(app.CurRoom.RoomName + ' 撤单');
        var curView = frmMain.getActiveItem();
        var cancelStore = Ext.getStore('CancelOrders');
        var orderStore = Ext.getStore('Orders');
        cancelStore.removeAll();
        // orderStore.clearFilter(true);
        // orderStore.filterBy(function (orders) {
        //     return orders.get('GoodsCount') > 0;
        // });

        // this.hideOrderButton();
        // this.hidePresentButton();
        // this.hideOrderMemButton();
        // this.hideQueryButton();
        // this.hideHisQueryButton();
        // this.hideQrCodeButton();
        // this.hideCustomerButton();
        // this.hidePosButton();
        // this.hideCancelButton();


        var frmMain = this.getRoomContainer();
        if (!this.orderedgoodslist) {
            this.orderedgoodslist = Ext.widget('orderedgoodslist');
            //this.getRoomDetail().add(this.orderingslist);
        }
        frmMain.push(this.orderedgoodslist);
        //this.getRoomDetail().setActiveItem(this.orderingslist);
        if (app.OrderType == "赠送")
            this.getConfirmCancel().setText('确认赠送');
        else
            this.getConfirmCancel().setText('确认撤单');
    },
    //会员点单
    onLuodanMem: function () {
        var frmMain = this.getRoomContainer();
        var curView = frmMain.getActiveItem();
        if (curView.xtype == 'ordereds' || app.OrderType != "会员点单") {
            var me = this;
            Ext.Msg.prompt('尊敬的客人，您好!', '请输入手机号:', function (buttonId, text) {
                if (buttonId == 'cancel')
                    return;
                Ext.Viewport.setMasked({ xtype: 'loadmask' });
                var successCallback = function (resp, ops) {
                    Ext.Viewport.setMasked(false);
                    var msg = Ext.decode(resp.responseText).d;
                    if (msg.indexOf("ok") > -1) {
                        app.CardNo = text;
                        app.CardCurrentMoney = msg.substr(2).split(';')[1].split(':')[1];
                        Ext.Msg.alert(msg.substr(2));
                        app.OrderType = "会员点单";
                        // me.showOrderButton();
                        // me.showPresentButton();
                        // me.showOrderMemButton();
                        // me.showQueryButton();
                        me.loadOrderMemGoods(app.CurRoom.ID);
                    }
                    else {
                        Ext.Msg.alert(msg);
                        return;
                    }
                };
                var failureCallback = function (resp, ops) {
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert("请求失败!", resp.responseText);
                };
                Ext.Ajax.request({
                    method: 'POST',
                    url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_CheckMemberCard',
                    async: true, //异步执行
                    //params: text,
                    jsonData: {
                        cardNo: text
                    },
                    success: successCallback,
                    failure: failureCallback
                });
            });
        }
        else if (curView.xtype == 'goodstypes' || curView.xtype == 'goods') {
            this.selectOrders();
        }
    },
    //赠送
    onZengsong: function (isPresent) {
        var frmMain = this.getRoomContainer();
        var curView = frmMain.getActiveItem();
        if (curView.xtype == 'ordereds' || app.OrderType != "赠送") {
            app.OrderType = "赠送";
            // this.showOrderButton();
            // this.showPresentButton();
            // this.showOrderMemButton();
            // this.showQueryButton();
            this.loadPresentGoods(app.CurRoom.ID);
        }
        else if (curView.xtype == 'goodstypes' || curView.xtype == 'goods') {
            this.selectOrders();
        }
    },
    //消费查询
    onQuery: function () {
        var frmMain = this.getRoomContainer();
        var curView = frmMain.getActiveItem();
        if (curView.xtype != 'ordereds') {
            // this.hideCommandButton();
            // if (app.CurRoom.RoomStateName == "消费"){
            // 	// this.showPosButton();
            // 	// this.showCancelButton();
            // };
                
            // if (app.CurRoom.RoomStateName == "开房" || app.CurRoom.RoomStateName == "收银")
            //     this.showCloseButton();
            this.loadRoomOrder(app.CurRoom.ID);
        }
    },
    //消费历史查询
    onHisQuery: function () {
        var frmMain = this.getRoomContainer();
        var curView = frmMain.getActiveItem();
        if (curView.xtype != 'ordereds') {
            // this.hideCommandButton();
    //        if (app.CurRoom.RoomStateName == "消费")
    //            this.showPosButton();
    //        if (app.CurRoom.RoomStateName == "开房" || app.CurRoom.RoomStateName == "收银")
    //            this.showCloseButton();
            this.loadHisRoomOrder(app.CurRoom.ID);
        }
    },
    //经理查询
    onJinglichaxun: function () {
        var frmMain = this.getRoomContainer();
        var curView = frmMain.getActiveItem();
        // this.hideDoBalanceButton();
        // this.hideMngButton();
        Ext.Viewport.setMasked({ xtype: 'loadmask' });

        app.util.Proxy.loadOverView(function () {
            //点击房台后，先载入房台消费信息
            if (!this.overviewform) {
                this.overviewform = Ext.widget('overviewform');
                //roomDetail.add(this.orderedlist);
            }
            var viewStore = Ext.getStore('OverViews');
            this.overviewform.setValues(viewStore.data.items[0].data);
            frmMain.push(this.overviewform);
            //roomDetail.setActiveItem(this.orderedlist);
            Ext.Viewport.setMasked(false);
        });
    },
    //生成房台点单二维码
    onQrCodeButton_Clicked: function () {
        //console.log("onGoodsImgClick" + btn);
        var thisobj=this;
        if (!app.qrCode) {
            app.qrCode = Ext.create('Ext.form.Panel', {
                itemID: 'goodsImgOverlay',
                xtype: 'panel',
                left: 0,
                top: 0,
                modal: true,
                hideOnMaskTap: true,
                hidden: true,
                width: 300,
                height: 400,
                contentEl: '',
                styleHtmlContent: true,
                scrollable: true,
                showAnimation: Ext.os.is.Android ? false : {
                    type: 'pop',
                    duration: 200
                }
            });
        }

       app.util.Proxy.getEnStr(app.CurRoom.RoomOpCode + app.CurRoom.ID, function (enstr) {
            var myUrl = Ext.global.window.location.href.replace(/order\.html.*$/g,'customer.html') + "?Key=" + enstr;
            // var myUrl = 'http://t.cn/R5nSrRs'
            var apiurl = 'http://50r.cn/urls/add.jsonp'
            // window.location=myUrl;
            // var myUrl = "?Key=" + enstr;
            // var myUrl = Ext.global.window.location.href.replace('order', 'customer') + "?Op=" + app.CurRoom.RoomOpCode + app.CurRoom.ID;
            var url = "http://qr.topscan.com/api.php?&w=260&text=" + myUrl;
            console.log(url);
            // Ext.Msg.show({"msg":myUrl});
            //app.qrCode.setHtml('<img src="http://qr.topscan.com/api.php?text="' + window.location.href + app.CurRoom.RoomOpCode + '>');
            app.qrCode.setHtml('<h3 align="center">扫描二维码点单</h3><p style="text-align:center"><img align="center" src="' + url + '"/></p>');
            app.qrCode.showBy(thisobj.getQrCodeButton());
            app.util.Proxy.getShortUrl(apiurl,myUrl,function (shorturl) {
                // var shorturl = 'http://dwz.cn/3HoSUe';
                var printstr = '<CB>'+app.CurPlace+'</CB><BR>' + '<CB>'+app.CurRoom.RoomName+'</CB><BR><QR>' +shorturl + '</QR><BR><C>'+app.CurPlacemsg+'</C>'
                app.util.Proxy.printQrCode(printstr);
            });
       });
       
    },
    //顾客自选单
    onCustomerButton_Clicked: function () {
        var me = this;
        // this.showClearCusOrderButton();
        app.util.Proxy.loadCustomerOrder(app.CurRoom.ID, app.CurRoom.RoomOpCode,
             function () {
                // me.showClearCusOrderButton();
                 me.selectOrders();
             })
    },
    //关台 
    onClose: function () {
        var frmMain = this.getRoomContainer();
        var dataView = this.getRoomslist();
        if (app.CurRoom.RoomStateName == "开房" || app.CurRoom.RoomStateName == "收银") {
            app.util.Proxy.closeRoom(app.CurRoom.ID,
             function () {
                 dataView.refresh();
                 frmMain.pop(frmMain.getInnerItems().length - 1);
             })
        }
    },
    //买单
    onPos: function () {
        var frmMain = this.getRoomContainer();
        if (app.CurRoom.RoomStateName == "消费") {
            if (!this.pos) {
                this.pos = Ext.widget('posform');
            }
            frmMain.down('titlebar').setTitle(app.CurRoom.RoomName + ' 买单');
            frmMain.push(this.pos);
            // this.hidePosButton();
        }
    },
    //买单界面激活时
    onPosActivate: function () {
        this.getPosOkButton().show();
        this.getCloseButton2().hide();
        var goodsStore = Ext.getStore('Orders');
        var sub = 0;
        goodsStore.each(function (item, index, length) {
            if (!item.data.IsPresent && !item.data.IsCanceled && item.data.Status && item.data.Status != "收银")
                sub += Number(item.data.SubTotal);
        });
        this.getTxtTotalMoney().setValue(sub);
        this.getTxtTruePayMoney().setValue(sub);
    },
    //确认买单
    onOkPos: function () {
        var pB = this.getPosOkButton();
        var cB = this.getCloseButton2();
        var dataView = this.getRoomslist();
        var strrights = '经理查询';
        var templateid = 'J2Y3L14ThLGBnniv1DxDG-5X6DGYRbU8gsSsYEBt2OQ';
        var url = '';
        var Sysdate = new Date();  
        var Curdate = Ext.Date.format(Sysdate, 'Y-m-d H:i:s'); 
        var first = { value: app.CurRoom.RoomName+'已结账完成', color: '#173177' },
            tName = { value: this.getTxtTotalMoney().getValue()+'元, 实收:'+this.getTxtTruePayMoney().getValue()+', 支付方式为:' + this.getTxtPayMode().getValue(), color: '#173177' },
            storeName = { value: app.CurPlace, color: '#173177' },
            gTime = { value: Curdate, color: '#173177' },
            remark = { value: '星星点单消息推送', color: '#173177' };

        var weChatData =
            {
                first: first,
                tName: tName,
                storeName: storeName,
                gTime: gTime,
                remark: remark
            };
        app.util.Proxy.posRoom(app.CurRoom.ID,
        this.getTxtTotalMoney().getValue(),
        this.getTxtTruePayMoney().getValue(),
        this.getTxtPayMode().getValue(),
             function () {
                 //frmMain.pop(frmMain.getInnerItems().length - 1);
                 //dataView.refresh();
                 pB.hide();
                 cB.show();
                 dataView.refresh();
                 app.util.Proxy.sendMsg(strrights,templateid,url,weChatData,function () {});
             })
    },
    //确认下单
    onOkOrder: function () {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        var goodsStore = Ext.getStore('Goods');
        var allData = [];
        goodsStore.filterBy(function (goods) {
            return goods.get('GoodsCount') > 0;
        });
        goodsStore.each(function (records) {
            if (records.data.GoodsDetails && records.data.GoodsDetails.length > 0) {
                records.data.GoodsDetails = records.data.GoodsDetails.filter(function (goodsDetail) {
                    delete goodsDetail.id;
                    return goodsDetail.GoodsDetailCount > 0;
                });
            }
            delete records.data.id;
            allData.push(records.data);
        });
        if (allData.length == 0) {
            Ext.Viewport.setMasked(false);
            return;
        }
        var subTotal = 0;
        if (app.OrderType == "会员点单") {
            //            Ext.Array.each(allData, function (records) {
            //                subTotal += records.Price * records.GoodsCount;
            //            });
            //            if (subTotal > app.CardCurrentMoney) {
            //                Ext.Msg.alert("卡内余额不足(" + app.CardCurrentMoney + ")!");
            //                Ext.Viewport.setMasked(false);
            //                return;
            //            }
        }
        else
            app.CardNo = "";
        var submitMobile = {};
        submitMobile.SubmitOrders = allData;
        submitMobile.isPresent = app.OrderType == "赠送" ? true : false;
        submitMobile.roomID = app.CurRoom.ID;
        submitMobile.userNo = Ext.getStore('User').load().data.items[0].data.userno;
        submitMobile.cardNo = app.CardNo;
        submitMobile.orderType = app.OrderType;

        var dataToBeSentToServer = Ext.JSON.encode(submitMobile);

        var roomCard = this.getRoomContainer();
        var dataView = this.getRoomslist();
        app.util.Proxy.orderRoom(dataToBeSentToServer,
             function () {
                 dataView.refresh();
                 roomCard.pop(roomCard.getInnerItems().length - 1);
             });
    },
    showRefreshButton: function () {
        var refreshButton = this.getRefreshButton();
        if (!refreshButton || !refreshButton.isHidden()) {
            return;
        }
        refreshButton.show();
    },
    hideRefreshButton: function () {
        var refreshButton = this.getRefreshButton();
        if (!refreshButton || refreshButton.isHidden()) {
            return;
        }
        refreshButton.hide();
    },
    showExchangeButton: function () {
        var exchangeButton = this.getExchangeButton();
        if (!exchangeButton || !exchangeButton.isHidden()) {
            return;
        }
        exchangeButton.show();
    },
    hideExchangeButton: function () {
        var exchangeButton = this.getExchangeButton();
        if (!exchangeButton || exchangeButton.isHidden()) {
            return;
        }
        exchangeButton.hide();
    },
    showDoBalanceButton: function () {
        var doBalanceButton = this.getDoBalanceButton();
        if (!doBalanceButton || !doBalanceButton.isHidden()) {
            return;
        }
        doBalanceButton.show();
    },
    hideDoBalanceButton: function () {
        var doBalanceButton = this.getDoBalanceButton();
        if (!doBalanceButton || doBalanceButton.isHidden()) {
            return;
        }
        doBalanceButton.hide();
    },
    showOrderButton: function () {
        var orderButton = this.getOrderButton();
        if (!orderButton || !orderButton.isHidden()) {
            return;
        }
        orderButton.show();
    },
    showCancelButton: function () {
        var cancelButton = this.getCancelButton();
        if (!cancelButton || !cancelButton.isHidden()) {
            return;
        }
        cancelButton.show();
    },
    showMngButton: function () {
        var mngButton = this.getMngButton();
        if (!mngButton || !mngButton.isHidden()) {
            return;
        }
        mngButton.show();
    },
    hideOrderButton: function () {
        var orderButton = this.getOrderButton();
        if (!orderButton || orderButton.isHidden()) {
            return;
        }
        orderButton.hide();
    },
    hideCancelButton: function () {
        var cancelButton = this.getCancelButton();
        if (!cancelButton || cancelButton.isHidden()) {
            return;
        }
        cancelButton.hide();
    },
    hideMngButton: function () {
        var mngButton = this.getMngButton();
        if (!mngButton || mngButton.isHidden()) {
            return;
        }
        mngButton.hide();
    },
    showOrderMemButton: function () {
        var orderMemButton = this.getOrderMemButton();
        if (!orderMemButton || !orderMemButton.isHidden()) {
            return;
        }
        orderMemButton.show();
    },
    hideOrderMemButton: function () {
        var orderMemButton = this.getOrderMemButton();
        if (!orderMemButton || orderMemButton.isHidden()) {
            return;
        }
        orderMemButton.hide();
    },
    showPresentButton: function () {
        var presentButton = this.getPresentButton();
        if (!presentButton || !presentButton.isHidden()) {
            return;
        }
        presentButton.show();
        //presentButton.setUi('confirm');
    },
    hidePresentButton: function () {
        var presentButton = this.getPresentButton();
        if (!presentButton || presentButton.isHidden()) {
            return;
        }
        presentButton.hide();
        //presentButton.setUi('decline');
    },
    showQueryButton: function () {
        var queryButton = this.getQueryButton();
        if (!queryButton || !queryButton.isHidden()) {
            return;
        }
        queryButton.show();
    },
    hideQueryButton: function () {
        var queryButton = this.getQueryButton();
        if (!queryButton || queryButton.isHidden()) {
            return;
        }
        queryButton.hide();
    },
    showHisQueryButton: function () {
        var hisqueryButton = this.getHisQueryButton();
        if (!hisqueryButton || !hisqueryButton.isHidden()) {
            return;
        }
        hisqueryButton.show();
    },
    hideHisQueryButton: function () {
        var hisqueryButton = this.getHisQueryButton();
        if (!hisqueryButton || hisqueryButton.isHidden()) {
            return;
        }
        hisqueryButton.hide();
    },
    showCustomerButton: function () {
        var customerButton = this.getCustomerButton();
        if (!customerButton || !customerButton.isHidden()) {
            return;
        }
        customerButton.show();
    },
    hideCustomerButton: function () {
        var customerButton = this.getCustomerButton();
        if (!customerButton || customerButton.isHidden()) {
            return;
        }
        customerButton.hide();
    },
    showPosButton: function () {
        var posButton = this.getPosButton();
        if (!posButton || !posButton.isHidden()) {
            return;
        }
        posButton.show();
    },
    hidePosButton: function () {
        var posButton = this.getPosButton();
        if (!posButton || posButton.isHidden()) {
            return;
        }
        posButton.hide();
    },
    showConfirmOkButton: function () {
        var confirmOkButton = this.getConfirmOkButton();
        if (!confirmOkButton || !confirmOkButton.isHidden()) {
            return;
        }
        confirmOkButton.show();
    },
    hideConfirmOkButton: function () {
        var confirmOkButton = this.getConfirmOkButton();
        if (!confirmOkButton || confirmOkButton.isHidden()) {
            return;
        }
        confirmOkButton.hide();
    },
    showClearCusOrderButton: function () {
        var clearCusOrderButton = this.getClearCusOrderButton();
        if (!clearCusOrderButton || !clearCusOrderButton.isHidden()) {
            return;
        }
        clearCusOrderButton.show();
    },
    hideClearCusOrderButton: function () {
        var clearCusOrderButton = this.getClearCusOrderButton();
        if (!clearCusOrderButton || clearCusOrderButton.isHidden()) {
            return;
        }
        clearCusOrderButton.hide();
    },
    showQrCodeButton: function () {
        var qrCodeButton = this.getQrCodeButton();
        if (!qrCodeButton || !qrCodeButton.isHidden()) {
            return;
        }
        qrCodeButton.show();
    },
    hideQrCodeButton: function () {
        var qrCodeButton = this.getQrCodeButton();
        if (!qrCodeButton || qrCodeButton.isHidden()) {
            return;
        }
        qrCodeButton.hide();
    },
    showCloseButton: function () {
        var closeButton = this.getCloseButton();
        if (!closeButton || !closeButton.isHidden()) {
            return;
        }
        closeButton.show();
    },
    hideCloseButton: function () {
        var closeButton = this.getCloseButton();
        if (!closeButton || closeButton.isHidden()) {
            return;
        }
        closeButton.hide();
    },
    onMainPop: function (view, item) {
        this.setButtonVisiable(view._activeItem.xtype);
    },
    onMainPush: function (view, item) {
        this.setButtonVisiable(view._activeItem.xtype);
    },
    initRoom: function () {
        var firstButton = this.getRoomAreaPicker().getItems().items[0];
        this.getRoomAreaPicker().setPressedButtons(firstButton);
        this.filterByButton(firstButton);
    },
    onRefresh: function () {
        app.util.Proxy.loadRooms(function () { });
    },
    onBalance: function () {
        var roomStore = Ext.getStore('Rooms');
        roomStore.each(function (item, index, length) {
            if (item.data.RoomStateName != "空房" && item.data.RoomStateName != "坏房") {
                Ext.Msg.alert("房台未清空，请刷新后检查!");
                return;
            }
        });
        var me = this;
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        app.util.Proxy.loadOverView(function() {
            var viewStore = Ext.getStore('OverViews');
            var strrights = '经理查询';
            var templateid = 'J2Y3L14ThLGBnniv1DxDG-5X6DGYRbU8gsSsYEBt2OQ';
            var url = '';
            var Sysdate = new Date();  
            var Curdate = Ext.Date.format(Sysdate, 'Y-m-d H:i:s'); 
            var first = { value: '营业结束已完成', color: '#A68C00' },
                tName = { value: viewStore.data.items[0].data.PosedAmount +'元, 累计开台:'+viewStore.data.items[0].data.HallPosed, color: '#A68C00' },
                storeName = { value: app.CurPlace, color: '#A68C00' },
                gTime = { value: Curdate, color: '#A68C00' },
                remark = { value: '星星点单消息推送', color: '#A68C00' };
            var weChatData =
                {
                    first: first,
                    tName: tName,
                    storeName: storeName,
                    gTime: gTime,
                    remark: remark
                };
            app.util.Proxy.sendMsg(strrights,templateid,url,weChatData,function () {});
            app.util.Proxy.doBalance(function () { 
                me.onRefresh(); 
            });
        });
    },
    onRoomAreaChange: function (seg, btn, toggle) {
        if (toggle) {
            this.filterByButton(btn);
        }
    },
    onGoodsTypeActivate: function (seg, btn, toggle) {
        if (app.CusRoomId >= 0){
            this.onCustomerButton_Clicked();
            app.CusRoomId = -1;
        };
        if (app.CurRoom.RoomStateName=="开房"){
            this.goGoodsType('一次用品');
        };
    },
    onRoomActivate: function () {
        var frmMain = this.getRoomslist().parent;
        var refreshButton = this.getRefreshButton();
        if (refreshButton) {
            refreshButton.show();
        };
        var doBalanceButton = this.getDoBalanceButton();
        if (doBalanceButton) {
            doBalanceButton.show();
        };
        var mngButton = this.getMngButton();
        if (mngButton) {
            mngButton.show();
        };
        //frmMain.getNavigationBar().hide();
        frmMain.down('titlebar').hide();
        if (app.CusRoomId >= 0){
            this.goRoom(app.CusRoomId);
        };
    },
    filterByButton: function (btn) {
        Ext.getStore('Rooms').clearFilter(true);
        Ext.getStore('Rooms').filter(function (record) {
            return record.get('RoomAreaName') == btn._text;
        });
    },
    hideCommandButton: function (view, item) {
        this.hideRefreshButton();
        this.hideDoBalanceButton();
        this.hideMngButton();
        this.hidePosButton();
        this.hideCloseButton();
        this.hideQueryButton();
        this.hideHisQueryButton();
        this.hideOrderButton();
        this.hidePresentButton();
        this.hideOrderMemButton();
        this.hideQrCodeButton();
        this.hideCustomerButton();
        this.hideCancelButton();
        this.hideClearCusOrderButton();
        this.hideExchangeButton();
        this.hideConfirmOkButton();
    },
    setButtonVisiable: function (viewType) {
        this.hideCommandButton();
        switch (viewType) {
            case "goodslist":
            case "goods":
                if (app.CurRoom.RoomStateName == "开房"
                || app.CurRoom.RoomStateName == "消费") {
                    if (app.OrderType == "赠送")
                        this.showPresentButton();
                    else if (app.OrderType == "落单")
                        this.showOrderButton();
                    else if (app.OrderType == "会员点单")
                        this.showOrderMemButton();
                }
                // this.hidePosButton();
                // this.hideCloseButton();
                break;
            case "goodstypelist":
            case "goodstypes":
                if (app.CurRoom.RoomStateName == "开房"
                || app.CurRoom.RoomStateName == "消费") {
                    this.showOrderButton();
                    this.showPresentButton();
                    this.showOrderMemButton();
                    this.showQueryButton();
                    this.showHisQueryButton();
                    this.showQrCodeButton();
                    this.showCustomerButton();
                }
                var frmMain = this.getRoomContainer();
                frmMain.down('titlebar').setTitle(app.CurRoom.RoomName + app.OrderType);
                break;
            case "orderedslist":
            case "ordereds": //消费查询界面
                if (app.CurRoom.RoomStateName == "开房"
                || app.CurRoom.RoomStateName == "消费") {
                    //                    this.showOrderButton();
                    //                    this.showPresentButton();
                    //                    this.showOrderMemButton();
                }
                this.showCloseButton();
                this.showPosButton();
                this.showCancelButton();
                this.showExchangeButton();
                break;
            case "orderingslist":
            case "orderings": //落单界面
                if (app.CurRoom.RoomStateName == "开房"
                || app.CurRoom.RoomStateName == "消费") {
                    //                    this.showOrderButton();
                    //                    this.showPresentButton();
                    //                    this.showOrderMemButton();
                }
                this.showClearCusOrderButton();
                this.showConfirmOkButton();
                // this.showCloseButton();
                // this.showPosButton();
                // this.showCancelButton();
                // this.showExchangeButton();
                break;
            case "rooms":
                this.showRefreshButton();
                this.showDoBalanceButton();
                this.showMngButton();
                break;
            default:
                // this.hideCommandButton();
                break;
        }
    }
});