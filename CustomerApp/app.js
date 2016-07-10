/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'CustomerApp',

    requires: [
        'Ext.MessageBox',
        'app.util.CustomerProxy'
    ],
    //指明模型，User代表model/User.js
    models: ["GoodsType", "Good", 'GoodsDetail', 'Order'],
    //指明控制器，controller/Login.js
    controllers: ["Customer" ],
    stores: [
     "GoodsTypes",
     'Goods',
     'GoodsDetails',
     'Orderings',
     'Orders'
    ],
    views: [
        'ListGoods',
        'ListGoodsDetail',
        'ListGoodsType',
        'ListOrderings',
        'ListOrders',
        'CustMainForm'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

     launch: function () {
        Ext.Msg.defaultAllowedConfig.showAnimation = false;
        app.pgmid=window.location.href.split('/')[3] + '\/';
        if (app.pgmid.indexOf('.html') >= 0){
            app.pgmid='';
        };
        app.numclickn=1;
        Ext.override(Ext.util.SizeMonitor, {
            constructor: function (config) {
                var namespace = Ext.util.sizemonitor;

                if (Ext.browser.is.Firefox) {
                    return new namespace.OverflowChange(config);
                } else if (Ext.browser.is.WebKit) {
                    if (!Ext.browser.is.Silk && Ext.browser.engineVersion.gtEq('535') && !Ext.browser.engineVersion.ltEq('537.36')) {
                        return new namespace.OverflowChange(config);
                    } else {
                        return new namespace.Scroll(config);
                    }
                } else if (Ext.browser.is.IE11) {
                    return new namespace.Scroll(config);
                } else {
                    return new namespace.Scroll(config);
                }
            }
        });
        Ext.override(Ext.util.PaintMonitor, {
            constructor: function (config) {
                if (Ext.browser.is.Firefox || (Ext.browser.is.WebKit && Ext.browser.engineVersion.gtEq('536') && !Ext.browser.engineVersion.ltEq('537.36') && !Ext.os.is.Blackberry)) {
                    return new Ext.util.paintmonitor.OverflowChange(config);
                }
                else {
                    return new Ext.util.paintmonitor.CssAnimation(config);
                }
            }
        });

        var reg = new RegExp("(^|&)" + "Key" + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r == null) {
            Ext.Msg.alert('提示', '地址错误!', Ext.emptyFn);
            return;
        }
        var UnStr = unescape(r[2]);
        // var para = UnStr;
        app.util.CustomerProxy.getUnStr(UnStr, function (destr) {
            var para = destr;
            app.util.CustomerProxy.chkCustomerOp(para, function () {
            Ext.Viewport.setMasked({ xtype: 'loadmask' });
            app.util.CustomerProxy.loadCustomerGoods(app.CurRoom.ID, function () {
                var mainView = Ext.create('CustomerApp.view.CustMainForm');
                app.OrderType = '下单';
                //mainView.down('titlebar').setTitle(app.CurRoom.RoomName + ' ' + app.OrderType);
                app.util.CustomerProxy.getSysParm('txtPlaceName', function (pname) {
                    app.CurPlace = pname;
                    mainView.down('titlebar').setTitle(pname + ' ' + app.CurRoom.RoomName + ' ' + '下单');
                });
                Ext.Viewport.add(mainView);
                Ext.Viewport.setMasked(false);
            });
        });
        });

    }
});