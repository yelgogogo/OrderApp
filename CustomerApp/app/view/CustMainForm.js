Ext.define('CustomerApp.view.CustMainForm', {

    extend: 'Ext.NavigationView',
    xtype: 'custmainform',

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
                xtype: 'goodstypes',
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
        var me = this;
        me.CreateMyButton('cusOrderButton', '订单修改', 'right', false);
        me.CreateMyButton('queryButton', '消费查询', 'right', false);
        me.CreateMyButton('orderButton', '下单', 'right', false);
        me.CreateMyButton('cusPosButton', '微信支付', 'right', true);

//        Ext.Array.each(userStore.rights, function (rights) {
//            if (rights == "落单") {
//                me.CreateMyButton('orderButton', '落单', 'right', true);
//                //me.CreateMyButton('orderMemButton', '会员点单', 'right', true);
//            }
//            if (rights == "经理查询")
//                me.CreateMyButton('mngButton', '经理查询', 'left', false);
//            if (rights == "赠送")
//                me.CreateMyButton('presentButton', '赠送', 'right', true);               
//        });
    }
});
