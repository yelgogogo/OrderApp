Ext.define('MyFirst.view.MngCard', {

    extend: 'Ext.NavigationView',
    xtype: 'mngContainer',

    config: {
        navigationBar: {
            ui: 'dark',
            docked: 'bottom'
        },
        defaultBackButtonText: '返回',
        autoDestroy: false,

        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: '实时营业',
                hidden: false
            },
            {
                xtype: 'overview',
                pinHeaders: false
            }
        ]
    },
    initialize: function () {
        this.callParent();
        var userStore = Ext.getStore('User').load().data.items[0].data
        var me = this;
        me.getNavigationBar().add({
            xtype: 'button',
            id: 'queryButton',
            text: '消费查询',
            align: 'right',
            hidden: true,
            hideAnimation: Ext.os.is.Android ? false : {
                type: 'fadeOut',
                duration: 200
            },
            showAnimation: Ext.os.is.Android ? false : {
                type: 'fadeIn',
                duration: 200
            }
        });
        me.getNavigationBar().add({
                    xtype: 'button',
                    id: 'refreshButton',
                    text: '刷新',
                    align: 'right',
                    hidden: false
                });
        me.getNavigationBar().add({
                    xtype: 'button',
                    id: 'goroomButton',
                    text: '房台',
                    align: 'left',
                    hidden: false
                });
//        me.getNavigationBar().add({
//                    xtype: 'button',
//                    id: 'overViewButton',
//                    text: '营业总览',
//                    align: 'left',
//                    hidden: true
//                });
        Ext.Array.each(userStore.rights, function (rights) {
            if (rights == "落单")
                me.getNavigationBar().add({
                    xtype: 'button',
                    id: 'orderButton',
                    text: rights,
                    align: 'right',
                    hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                });
            if (rights == "赠送")
                me.getNavigationBar().add({
                    xtype: 'button',
                    id: 'presentButton',
                    text: rights,
                    align: 'right',
                    hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                });
        });
    }
});
