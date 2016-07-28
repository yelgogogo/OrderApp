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
    name: 'MyFirst',

    requires: [
        'Ext.MessageBox',
        'app.util.Proxy'
    ],
    models: ["User", "Room", "GoodsType", "Good", 'GoodsDetail', 'Order','OverView'],
    controllers: [
    "Login",
    "Order"],
    stores: [
     'User',
     'OverViews',
     'Rooms',
     "GoodsTypes",
     'Goods',
     'GoodsDetails',
     'Orderings',
     'Orders',
     'CancelOrders'
    ],
    views: [
    "LoginForm",
    "MainView",

    'Card',
    'List',
    'Info',

    'ListGoods',
    'ListGoodsDetail',
    'ListGoodsType',
    'ListOrderings',
    'ListOrders',
    'ListOrdered',
    'PosForm',
    'ListCustomerOrders',
    'ListOverView',
    "RoomForm"
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
        app.CusRoomId = -1;
        app.util.Proxy.getSysParm('txtPlaceAdress', function (sysparm) {
            app.CurPlacemsg = sysparm;
        });
        app.util.Proxy.getSysParm('txtPlaceName', function (sysparm) {
            app.CurPlace = sysparm;
        });
        app.util.Proxy.getSysParm('txtElemeRestaurantID', function (sysparm) {
            app.ElemeRestaurantId = sysparm;
        });
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



        var reg = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)", "i");
        var regstate = new RegExp("(^|&)" + "state" + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var rstate = window.location.search.substr(1).match(regstate);
        // console.log(r);        
        if (rstate != null) {
            app.CusRoomId = unescape(rstate[2]);
            // Ext.Msg.alert('room'+app.CusRoomIndex);
        };
        if (r != null) {
            var code = unescape(r[2]);

            app.util.Proxy.getOpenid(code, function (openid) {    
                app.openid = openid;
                app.util.Proxy.chkOpenid(app.openid, function () { 

                });
            });
        }
        else{
            var loginView = Ext.create('MyFirst.view.LoginForm');
            
            app.util.Proxy.getSysParm('txtPlaceName', function (pname) {
                app.CurPlace = pname;
                loginView.down('toolbar').setTitle(app.CurPlace);
            });
            var userStore = Ext.getStore('User').load();
            if (userStore.data.length > 0 && userStore.data.items[0].data.isremember == 1) {
                loginView.user = userStore.data.items[0].data;
                loginView.setValues(loginView.user);
            };
            Ext.Viewport.add([loginView]);
        };
        //Ext.Viewport.add({ xtype: 'loginform' }); //loginform  mainview test
        //Ext.Viewport.add({ xtype: 'mainview' });
    }
});