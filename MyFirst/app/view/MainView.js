Ext.define('MyFirst.view.MainView', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.mainview',

    //    requires: [
    //            'Ext.SegmentedButton',
    //            ],
    //    requires: [
    //        'MyFirst.view.LoginForm',
    //        'MyFirst.view.RoomForm'
    //    ],

    config: {
        id: 'mainView',
        tabBarPosition: 'bottom',
//        tabBar: {
//            ui: 'gray',
//            hidden: true
//        },
        items: [
                {
                    //title: '房台',
                    //iconCls: 'home',
                    xtype: 'roomContainer'
                }
//                ,
//                {
//                    iconCls: 'user',
//                    title: '其它',

//                    xtype: 'button',
//                    text: '确定退出吗?',
//                    handler: function () {
//                        //Ext.ComponentQuery.query('#loginForm')[0].show();
//                        //销毁 mainview
//                        //this.getParent().destroy();
//                        //清除本地登录用户缓存
//                        Ext.getStore('User').removeAll();
//                        Ext.getStore('User').sync();

//                        window.location.reload();
//                    }
//                }
        ]
    }
});