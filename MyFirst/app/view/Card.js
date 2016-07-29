Ext.define('MyFirst.view.Card', {

    extend: 'Ext.NavigationView',
    xtype: 'roomContainer',

    config: {
        navigationBar: {
            ui: 'dark',
            docked: 'bottom',
            hidden: false
        },
        defaultBackButtonText: '返回',
        autoDestroy: false,

        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: '',
                hidden: false
            },
            {
                xtype: 'rooms',
                pinHeaders: false
            }
        ]
    },
    CreateMyButton: function (btnID, btnText, btnAlign, btnIsHidden) {
        var me = this;
        me.getNavigationBar().add({
            xtype: 'button',
            id: btnID,
            text: btnText,
            align: btnAlign,
            hidden: btnIsHidden
            // ,
            // hideAnimation: Ext.os.is.Android ? false : {
            //     type: 'fadeOut',
            //     duration: 200
            // },
            // showAnimation: Ext.os.is.Android ? false : {
            //     type: 'fadeIn',
            //     duration: 200
            // }
        });
    },
    initialize: function () {
        this.callParent();
        var userStore = Ext.getStore('User').load().data.items[0].data;
        var me = this;
        var orderadd = false;
        var queryadd = false;
        var posadd = false;
        me.CreateMyButton('refreshButton', '刷新', 'right', false);
        Ext.Array.each(userStore.rights, function (rights) {
//            if (rights == "落单") {
//                me.CreateMyButton('orderButton', '落单', 'right', true);
//                //me.CreateMyButton('orderMemButton', '会员点单', 'right', true);
//            }
//            if (rights == "经理查询")
//                me.CreateMyButton('mngButton', '经理查询', 'left', false);
//            if (rights == "经理查询")
//                me.CreateMyButton('mngButton', '经理查询', 'left', false);
//            if (rights == "赠送")
//                me.CreateMyButton('presentButton', '赠送', 'right', true);    
        	
            switch (rights)
            {
            case "落单":{
               me.CreateMyButton('qrCodeButton', '台码', 'left', true);
               me.CreateMyButton('closeButton', '关台', 'right', true);
               me.CreateMyButton('clearCusOrderButton', '清空', 'right', true);
               me.CreateMyButton('exchangeButton', '转台', 'right', true);
               //me.CreateMyButton('queryButton', '消费', 'right', true);
               queryadd = true;
               me.CreateMyButton('customerButton', '自选', 'left', true);         
               orderadd = true;
               me.CreateMyButton('pullElemeButton', '新订单', 'right', true);
               me.CreateMyButton('pullOrderButton', '抓单', 'right', true);
               me.CreateMyButton('getElemeButton', '取单', 'left', true);
               };
               break;
            case "经理查询":{
               me.CreateMyButton('mngButton', '经理查询', 'left', false);
               me.CreateMyButton('cancelButton', '撤单', 'right', true);
               };
               break;
            case "收银":{
               me.CreateMyButton('hisqueryButton', '历史', 'right', true);
               //me.CreateMyButton('orderButton', '落单', 'right', true);
               posadd = true;
			         me.CreateMyButton('doBalanceButton', '营业结束', 'left', false);
               };
               break;
            };

        });
        if (queryadd = true)
          me.CreateMyButton('queryButton', '消费', 'right', true);
        if (orderadd = true){
          	me.CreateMyButton('orderButton', '落单', 'right', true);
            me.CreateMyButton('confirmOkButton', '确认落单', 'right', true);
        };
        if (posadd = true)
          me.CreateMyButton('posButton', '买单', 'right', true);
    }
});
