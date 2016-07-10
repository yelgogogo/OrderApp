Ext.define('CustomerApp.controller.Customer', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            custmainform: 'custmainform',
            goodslist: 'goods',
            goodsdetaillist: 'goodsdetail',
            goodstypelist: 'goodstypes',
            orderingslist: 'orderings',
            orderedlist: 'ordereds',
            txtConsumed: '#txtConsumed',
            orderingsButton: 'orderings button',
            queryButton: '#queryButton',
            cusOrderButton: '#cusOrderButton',
            cusPosButton: '#cusPosButton',
            salesButton: '#salesButton',
            confirmOkButton: '#confirmOkButton',
            markToggleButton: 'orderings #markToggle',
            markToggle2Button: 'orderings #markToggle2',
            markToggle3Button: 'orderings #markToggle3',
            txtSubTotal: '#txtSubTotal',
            orderButton: '#orderButton'
        },
        control: {
            markToggleButton: {
                change: 'onmarkToggle'
            },
            markToggle2Button: {
                change: 'onmarkToggle2'
            },
            markToggle3Button: {
                change: 'onmarkToggle3'
            },
            custmainform: {
                push: 'onMainPush',
                pop: 'onMainPop'
            },
            goodslist: {
                onPackGoodsClicked: 'onPackGoodsClicked'
            },
            orderedlist: {
                activate: 'onRoomOrdersActivate'
            },
            goodstypelist: {
                initialize: 'initGoodsType',
                activate: 'onGoodsTypeActivate',
                itemtap: 'onGoodsTypeTap'
            },
            orderingslist: {
                initialize: 'initOrderings',
                onPackGoodsClicked: 'onPackGoodsClicked',
                activate: 'onOrderingActivate'
            },
            orderingsButton: {
                tap: 'onOkOrder'
            },
            confirmOkButton: {
                tap: 'onOkOrder'
            },
            cusPosButton: {
                tap: 'onCusPos'
            },
            queryButton: {
                tap: 'onQuery'
            },
            salesButton: {
                tap: 'onSales'
            },
            cusOrderButton: {
                tap: 'onCusOrder'
            },
            orderButton: {
                tap: 'onLuodan'
            },
            presentButton: {
                tap: 'onZengsong'
            }
        }
    },
    initGoodsType: function (dataView, eOpts) {
    },
    initOrderings: function (dataView, eOpts) {
    },
    onGoodsTypeActivate: function () {
        this.hideCusPosButton();
    },
    onOrderingActivate: function () {
        var goodsStore = Ext.getStore('Goods');
        var sub = 0;
        goodsStore.each(function (item, index, length) {
            sub += item.data.Price * item.data.GoodsCount;
        });
        this.getTxtSubTotal().setValue(sub);
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
    //数量x10
    onmarkToggle3: function (field, slider, thumb, newValue, oldValue) {
            if (slider == 1)
                app.numclickn=10;
            else
                app.numclickn=1;
    },
    //试试手气
    onSales: function () {
        // if (!app.cusPosCode) {
          var cusPosCode = Ext.create('Ext.form.Panel', {
                itemID: 'cusPosImg',
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
        // }
        var randomNumber = function(from, to) {  
            return Math.floor(Math.random() * (to - from + 1) + from);  
        };  
        var rnum=randomNumber(1, 5);
        var imgurl = "../resources/img/"+app.pgmid+"onsale"+rnum+".jpg";
        if (rnum == '1'){ 
            cusPosCode.setHtml('<h3 align="center">恭喜你<BR>长按二维码领取优惠券</h3><p style="text-align:center"><img align="center" src="' + imgurl + '"/></p>');
        }else{
            cusPosCode.setHtml('<h3 align="center">别灰心，再试试手气</h3><p style="text-align:center"><img align="center" src="' + imgurl + '"/></p>');
        };
        cusPosCode.showBy(this.getCusPosButton());
    },
    //微信支付
    onCusPos: function () {
        // if (!app.cusPosCode) {
          var cusPosCode = Ext.create('Ext.form.Panel', {
                itemID: 'cusPosImg',
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
        // }
        var imgurl = "../resources/img/"+app.pgmid+"cuspos.jpg"
        cusPosCode.setHtml('<h3 align="center">长按二维码识别支付</h3><p style="text-align:center"><img align="center" src="' + imgurl + '"/></p>');
        cusPosCode.showBy(this.getCusPosButton());
    },
    onRoomOrdersActivate: function () {
        // var room = app.CurRoom;
        // this.getTxtReserver().setValue(room.ReservationEmpName + '(' + room.ReservationDateTime + ')');
        this.getTxtConsumed().setValue(roomcount);
        // this.getTxtPresented().setValue(room.PresentAmount);
    },
    onGoodsTypeTap: function (dataView, index, dataItem, dataItemModel, e, eOpts) {
        //console.log('onGoodsTypeTap' + dataItemModel);        
        app.GoodsTypeName = dataItemModel.data.GoodsTypeName;
        var goodsStore = Ext.getStore('Goods');
        goodsStore.clearFilter(true);
        goodsStore.filterBy(function (goods) {
            if (app.GoodsTypeName == '店长推荐'){
                return goods.get('IsHot') == true;
            }else{
                return goods.get('GoodsTypeName') == app.GoodsTypeName;
            };
        });
        if (!this.goodslist) {
            this.goodslist = Ext.widget('goodslist');
        }
        this.getCustmainform().push(this.goodslist);
    },
    onPackGoodsClicked: function (list, record, item, index, btn) {
        if (!this.goodsdetaillist)
            this.goodsdetaillist = Ext.widget('goodsdetaillist');

        var detailStore = Ext.getStore('GoodsDetails');
        detailStore.removeAll();
        Ext.Array.each(record.data.GoodsDetails, function (Good) {
            detailStore.add(Good);
        });
        this.getCustmainform().push(this.goodsdetaillist);
    },
    selectOrders: function () {
        if (!this.orderingslist) {
            this.orderingslist = Ext.widget('orderingslist');
        }
        var goodsStore = Ext.getStore('Goods');
        var idx = goodsStore.findBy(function (goods) {
            return goods.get('GoodsCount') > 0;
        });
        if (idx < 0) {
            Ext.Msg.alert("没有点取菜品!");
            return;
        }
        goodsStore.clearFilter(true);
        goodsStore.filterBy(function (goods) {
            return goods.get('GoodsCount') > 0;
        });

        if (app.IsPresent)
            this.getOrderingsButton().setText('确认赠送');
        else
            this.getOrderingsButton().setText('确认下单');
        this.getCustmainform().push(this.orderingslist);
    },
    //落单
    onLuodan: function () {
        var reg = new RegExp("(^|&)" + "Key" + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);

        if (r == null) {
            Ext.Msg.alert('检查提示', '地址错误!', Ext.emptyFn);
            return;
        }
        var UnStr = unescape(r[2]);
        var thisobj = this;
        app.util.CustomerProxy.getUnStr(UnStr, function (destr) {
            var para = destr;

            app.util.CustomerProxy.chkCustomerOp(para, function () {
                app.OrderType = '下单';
                var frmMain = thisobj.getCustmainform();
                var curView = frmMain.getActiveItem();
                if (curView.xtype == 'ordereds') {
                    Ext.Viewport.setMasked({ xtype: 'loadmask' });
                    app.util.Proxy.loadOrderGoods(app.CurRoom.ID, function () {
                        //点击房台后，先载入房台消费信息或者载入菜品信息 
                        if (!this.goodstypelist) {
                            this.goodstypelist = Ext.widget('goodstypelist');
                        }
                        frmMain.push(this.goodstypelist);
                        //frmMain.applyActiveItem(this.goodstypelist, curView);                
                        Ext.Viewport.setMasked(false);
                    });
                }
                else if (curView.xtype == 'goodstypes' || curView.xtype == 'goods'){
                    thisobj.selectOrders();
                };
            });
        });
    },
    //消费查询
    onQuery : function () {
        // Ext.Viewport.setMasked({ xtype: 'loadmask' });

        var frmMain = this.getCustmainform();
        var curView = frmMain.getActiveItem();
        var reg = new RegExp("(^|&)" + "Key" + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);

        if (r == null) {
            Ext.Msg.alert('检查提示', '地址错误!', Ext.emptyFn);
            return;
        }
        var UnStr = unescape(r[2]);
        var thisobj = this;
        app.util.CustomerProxy.getUnStr(UnStr, function (destr) {
            var para = destr;

            app.util.CustomerProxy.chkCustomerOp(para, function () {
            // 
            // Ext.Viewport.setMasked(false);
                if (curView.xtype != 'ordereds')
                thisobj.loadRoomOrder(app.CurRoom.ID);
            });
        });
        // if (curView.xtype != 'ordereds')
        //     this.loadRoomOrder(app.CurRoom.ID);
    },
    //顾客自选单查询
    onCusOrder: function () {
        var reg = new RegExp("(^|&)" + "Key" + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);

        if (r == null) {
            Ext.Msg.alert('检查提示', '地址错误!', Ext.emptyFn);
            return;
        }
        var UnStr = unescape(r[2]);
        var thisobj = this;
        app.util.CustomerProxy.getUnStr(UnStr, function (destr) {
            var para = destr;
            app.util.CustomerProxy.chkCustomerOp(para, function () {
                app.util.CustomerProxy.loadCustomerOrder(app.CurRoom.ID, app.CurRoom.RoomOpCode,function () {
                    thisobj.selectOrders();
                    thisobj.getOrderingsButton().setText('确认修改');
                });
            });
        });
        // var me = this;
        // // this.showClearCusOrderButton();
        // app.util.CustomerProxy.loadCustomerOrder(app.CurRoom.ID, app.CurRoom.RoomOpCode,
        //      function () {
        //          me.selectOrders();
        //          me.getOrderingsButton().setText('确认修改');
        // });
    },
    loadRoomOrder: function (roomID) {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        var frmMain = this.getCustmainform();
        frmMain.down('titlebar').setTitle(app.CurRoom.RoomName + ' 消费查询');
        // this.hideOrderButton();
        // this.hideQueryButton();
        //点击房台后，先载入房台消费信息
        app.util.CustomerProxy.loadOrder(roomID, function () {
            if (!this.orderedlist) {
                this.orderedlist = Ext.widget('orderedslist');
            }
            frmMain.push(this.orderedlist);
            Ext.Viewport.setMasked(false);
        });

    },
    //确认下单
    onOkOrder: function () {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        var goodsStore = Ext.getStore('Goods');
        var allData = [];
        var msgtxt = '';
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
            msgtxt += records.data.GoodsName + ' ' + records.data.GoodsCount + records.data.Unit + records.data.Remarks +';'
            delete records.data.id;
            allData.push(records.data);
        });
        if (allData.length == 0) {
            Ext.Viewport.setMasked(false);
            return;
        }
        var strrights = '落单';
        var strstate = app.CurRoom.ID;
        var templateid = 'tc6Ayn7IGJk5BtQzi94BniwSqHMb3ErgG7rZwpL1eoA';
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f51df2624282eb1&redirect_uri=http%3a%2f%2fstarstech.cc%2f'+app.pgmid+'order.html&response_type=code&scope=snsapi_base&state='+strstate+'#wechat_redirect';
        var Sysdate = new Date();  
        var Curdate = Ext.Date.format(Sysdate, 'Y-m-d H:i:s'); 
        var first = { value: app.CurPlace + ' 客户在线点单提醒', color: '#173177' },
            keyword1 = { value: app.CurRoom.RoomName, color: '#173177' },
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
        var submitMobile = {};
        submitMobile.SubmitOrders = allData;
        submitMobile.orderType = app.OrderType;
        //        submitMobile.isPresent = app.IsPresent;
        submitMobile.roomID = app.CurRoom.ID;

        var dataToBeSentToServer = Ext.JSON.encode(submitMobile);

        var frmMain = this.getCustmainform();
        app.util.CustomerProxy.orderRoom(dataToBeSentToServer, function () {
            frmMain.pop(frmMain.getInnerItems().length - 1);
            app.util.CustomerProxy.loadCustomerGoods(app.CurRoom.ID, function () { });
            app.util.CustomerProxy.sendMsg(strrights,templateid,url,weChatData,function () {})
        });
    },
    setButtonVisiable: function (viewType) {
        this.hideOrderButton();
        this.hideQueryButton();
        this.hideCusOrderButton();
        this.hideCusPosButton();
        this.hideSalesButton();
        this.hideConfirmOkButton();
        switch (viewType) {
            case "goodslist":
            case "goods":
                this.showOrderButton();
                break;
            case "goodstypelist":
            case "goodstypes":
                this.showOrderButton();
                this.showQueryButton();
                this.showCusOrderButton();
                var frmMain = this.getCustmainform();
                frmMain.down('titlebar').setTitle(app.CurRoom.RoomName + ' ' + app.OrderType);
                break;
            case "orderedslist":
            case "ordereds":
                this.showCusPosButton();
                if (this.getTxtConsumed().getValue() >= 100){
                    this.showSalesButton();
                };     
                // this.hideOrderButton();
                // this.hideQueryButton();

                break;
            case "orderingslist":
            case "orderings":
                this.showConfirmOkButton();
                // this.hideOrderButton();
                // this.hideQueryButton();
                break;
            default:
                // this.hideOrderButton();
                // this.hideQueryButton();
                break;
        }
    },
    onMainPush: function (view, item) {
        this.setButtonVisiable(view._activeItem.xtype);
    },
    onMainPop: function (view, item) {
        this.setButtonVisiable(view._activeItem.xtype);
    },
    showOrderButton: function () {
        var orderButton = this.getOrderButton();
        if (!orderButton || !orderButton.isHidden()) {
            return;
        }
        orderButton.show();
    },
    hideOrderButton: function () {
        var orderButton = this.getOrderButton();
        if (!orderButton || orderButton.isHidden()) {
            return;
        }
        orderButton.hide();
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
    showCusOrderButton: function () {
        var cusOrderButton = this.getCusOrderButton();
        if (!cusOrderButton || !cusOrderButton.isHidden()) {
            return;
        }
        cusOrderButton.show();
    },
    hideCusOrderButton: function () {
        var cusOrderButton = this.getCusOrderButton();
        if (!cusOrderButton || cusOrderButton.isHidden()) {
            return;
        }
        cusOrderButton.hide();
    },
    showCusPosButton: function () {
        var cusPosButton = this.getCusPosButton();
        if (!cusPosButton || !cusPosButton.isHidden()) {
            return;
        }
        cusPosButton.show();
    },
    hideCusPosButton: function () {
        var cusPosButton = this.getCusPosButton();
        if (!cusPosButton || cusPosButton.isHidden()) {
            return;
        }
        cusPosButton.hide();
    },
    showSalesButton: function () {
        var salesButton = this.getSalesButton();
        if (!salesButton || !salesButton.isHidden()) {
            return;
        }
        salesButton.show();
    },
    hideSalesButton: function () {
        var salesButton = this.getSalesButton();
        if (!salesButton || salesButton.isHidden()) {
            return;
        }
        salesButton.hide();
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
    }

});