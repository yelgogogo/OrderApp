Ext.define('MyFirst.view.ListOrders', {
    extend: 'Ext.List',
    alias: 'widget.orderedslist',

    xtype: 'ordereds',

    config: {
        store: 'Orders',
        scrollable: true,
        cls: 'list',
        itemHeight: 32,
        selectedCls: '',
        pressedCls: '',
        //useSimpleItems: false,listTpl
        //<a href="http://cli.im/api/qrcode">201505150002</a> 二维码
        itemTpl: [
            '<div class="bh" style = "background-color:{BackColor};color: {ForeColor}">',
            '<div class="bone" style = "width:20%">{GoodsTypeName}</div>',
            '<div class="bone" style = "width:50%">{GoodsName}</div>',
          //  '<div class="bone" style = "width:15%">{GoodsTypeName}<br />状态:{Status}</div>',
            '<div class="bone" style = "width:15%">{GoodsCount}{Unit}</div>',
            '<div class="bone" style = "width:15%;text-align:right;padding-right:10px">{SubTotal}</div>',
         // '<div class="bone" style = "width:30%;text-align:right;">{PresentUser}<br />{OrderTime}</div>',
            '</div>',
         '</div>'
        ],
        items: [
            {
                xtype: 'fieldset',
                docked: 'top',
                defaults: {                    
                    xtype: 'textfield',
                    labelWidth: '50%',
                    inputCls: 'dxtextright',
                    flex: 1
                },
                layout: 'hbox',
                items: [
                        {
                            docked: 'top', 
                            readOnly: true,
                            label: '订房人',
                            itemId: 'txtReserver'
                        },
                        {
                            readOnly: true,
                            label: '消费合计',
                            itemId: 'txtConsumed',
                            value: '0'
                        },
                        {
                            readOnly: true,
                            label: '赠送合计',
                            itemId: 'txtPresented',
                            value: '0'
                        }

                                            
                    ]
            },
                {
                            docked: 'top',
                            xtype: 'toolbar', 
                            cls: 'bluetoolbar',
                            readOnly: true,
                            itemId: 'textGoodsTitle',
                            value: '0',
                            // style: 'background-color: #112D41;color: #112D41',
                            items: [
                            {
                                xtype: 'button',
                                readOnly: true,
                                text: '分类',
                                width: '20%',
                                itemId: 'txtGoodsType'
                            },
                            {
                                readOnly: true,
                                xtype: 'button',
                                text: '菜品',
                                width: '43%',
                                itemId: 'txtGoodsName',
                                value: '0'
                            },
                            {
                                readOnly: true,
                                xtype: 'button',
                                text: '数量',
                                width: '15%',
                                itemId: 'txtUnit',
                                value: '0'
                            },
                            {
                                readOnly: true,
                                xtype: 'button',
                                text: '小计',
                                width: '15%',
                                itemId: 'txtSubtotal',
                                value: '0'
                            }                     
                        ]
                    }
                //         ,
                // {
                //             // docked: 'top',
                //             xtype: 'titlebar',  
                //             readOnly: true,
                //             Width:'30%',
                //             title: '菜单',
                //             itemId: 'textgoods',
                //             value: '0'
                //         }
//            {
//                height: 20,
//                minheight:20,
//                xtype: 'textfield',
//                label: '消费合计:',
//                itemId: 'txtConsumed',
//                docked: 'top',
//                readOnly : true,
//                value:'0'
//            },
//            {
//                xtype: 'textfield',
//                label: '赠送合计:',
//                itemId: 'txtPresented',
//                docked: 'top',
//                readOnly: true,
//                value: '0'
//            }
//            ,
//            {
//                docked: 'top',
//                html: ['<div class="bh">',
//                '<div class="bone" style = "width:50%"><div>菜品</div><div>价格/单位</div></div>',
//                '<div class="bone" style = "width:30%">数量|小计</div>',
//                '<div class="bone" style = "width:20%">落单人</div>',
//                '</div>',
//                '</div>'].join("")
//            }
        ]
    }
});
