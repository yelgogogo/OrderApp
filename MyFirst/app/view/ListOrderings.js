Ext.define('MyFirst.view.ListOrderings', {
    extend: 'Ext.List',
    alias: 'widget.orderingslist',

    xtype: 'orderings',

    requires: ['MyFirst.view.ListTpl',
    'Ext.field.Toggle',
        'Ext.field.Text',
        'Ext.field.Select',
        'Ext.form.FieldSet',
        'Ext.Toolbar',
        'Ext.Button'],

    config: {
        store: 'Goods',
        plugins: [{
            xtype: 'listTpl',
            isInput: true
        }],
        scrollable: true,
        cls: 'list',
        itemHeight: 32,
        //useSimpleItems: false,listTpl
        itemTpl: new Ext.XTemplate(
        '<div class="bh">',
            '<div class="mydiv bone" fire="onGoodsClick"><div>{GoodsName}(¥{Price})</div></div>',
            '<div class="bv">',
                '<div class="mydiv x-button x-button-chili" fire="onMarkClick" value="-1">',
                '<span class="x-button-icon x-shown chili"></span></div>',
            '</div>',
            '<div class="bv" style="width:40px;text-align:center">',
                '{Remarks}',
            '</div>',
            '<div class="bv">',
                '<div class="mydiv x-button x-button-small" fire="onNumClick" value="-1">',
                '<span class="x-button-icon x-shown lower"></span></div>',
            '</div>',
            '<div class="bv" style="width:40px;text-align:center">',
                '{GoodsCount}',
            '</div>',
            '<div class="bv">',
                '<div class="mydiv x-button x-button-small"  fire="onNumClick" value="1">',
                '<span class="x-button-icon x-shown add"></span></div>',
            '</div>',
         '</div>'
         ),
        items: [

            {
                xtype: 'button',
                itemId: 'btnQueRen',
                scrollDock: 'bottom',

                docked: 'bottom',
                ui:'confirm',
                text: '确认'
            },
            // {
            //     xtype: 'fieldset',
            //     docked: 'bottom',
            //     defaults: {                    
            //         xtype: 'textfield',
            //         labelWidth: '50%',
            //         inputCls: 'dxtextright',
            //         flex: 1
            //     },
            //     layout: 'hbox',
            //     items: [
            //         {   
            //             xtype: 'togglefield',
            //             width: '50%' ,
            //             // name : 'markToggle',
            //             // id : 'markToggle',
            //             itemId: 'markToggle',
            //              docked: 'right',
            //             label: '全部加辣'
            //         },
            //         {
            //             xtype: 'textfield',
            //             itemId: 'txtSubTotal',
            //             readOnly: true,
            //             width: '50%' ,
            //             docked: 'left',
            //             label: '合计:'
            //        },
            //        {   
            //             xtype: 'togglefield',
            //             width: '50%' ,
            //             // name : 'markToggle',
            //             // id : 'markToggle',
            //             itemId: 'markToggle2',
            //              docked: 'right',
            //             label: '全部微辣'
            //         },
            //    ]
            // },
            {
                xtype: 'fieldset',
                docked: 'bottom',
                defaults: {                    
                    xtype: 'textfield',
                    labelWidth: '50%',
                    inputCls: 'dxtextright',
                    flex: 1
                },
                layout: 'hbox',
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
                            xtype: 'textfield',
                            itemId: 'txtSubTotal',
                            readOnly: true,
                            width: '50%' ,
                            docked: 'left',
                            label: '合计:'
                            },
                            {   
                            xtype: 'togglefield',
                            width: '50%' ,
                            // name : 'markToggle',
                            // id : 'markToggle',
                            itemId: 'markToggle2',
                             docked: 'right',
                            label: '全不辣'
                            }
                        ]
                    },
                    {   
                        xtype: 'togglefield',
                        width: '50%' ,
                        // name : 'markToggle',
                        // id : 'markToggle',
                        itemId: 'markToggle',
                         docked: 'right',
                        label: '全调味'
                    },
                    {   
                        xtype: 'togglefield',
                        width: '50%' ,
                        // name : 'markToggle',
                        // id : 'markToggle',
                        itemId: 'markToggle3',
                         docked: 'left',
                        label: '数x10'
                    }   
               ]
            }
        ],

        selectedCls: 'x-item-pressed',
        pressedCls: '',
        listeners: {
            onMarkClick: function (list, record, item, index, btn) {
                btn.addCls('x-button-pressing');
                var data = record.data;
                var remarks=data.Remarks;
                var remarkchange=remarks;
                var remarkchange2=remarks;
                switch (remarks){
                        case "":
                            remarkchange = '不辣';
                            break;
                        case "不辣":
                            remarkchange = '微辣';
                            break;
                        case "微辣":
                            remarkchange = '加辣';
                            break;
                        case "加辣":
                            remarkchange = '重辣';
                            break;
                        case "重辣":
                            remarkchange = '';
                            break;
                        default:
                            remarkchange = '不辣';
                            break;
                        };

                switch (remarks){
                        case "":
                            remarkchange2 = '要冰';
                            break;
                        case "要冰":
                            remarkchange2 = '不要冰';
                            break;
                        default:
                            remarkchange2 = '要冰';
                            break;
                        };

                if(app.RemarksAll){
                    var goodsStore = Ext.getStore('Goods');
                    goodsStore.each(function(gd) {
                        switch (gd.data.GoodsTypeName){
                            case "粥类":
                            case "主食":
                            case "烤鱼配菜":
                            case "一次用品":
                            case "店长推荐":
                                break;
                            case "饮料":
                            case "酒类":
                                gd.data.Remarks = remarkchange2;
                                break;
                            default:
                                gd.data.Remarks = remarkchange;
                                break;
                        };
                    });
                    this.refresh();
                }else{
                    switch (data.GoodsTypeName){
                        case "粥类":
                        case "主食":
                        case "烤鱼配菜":
                        case "一次用品":
                        case "店长推荐":
                           break;
                        case "饮料":
                        case "酒类":
                            data.Remarks = remarkchange2;
                            break;
                        default:
                            data.Remarks = remarkchange;
                            break;
                    };
                };
                // console.log("onMarkClickClick"); 
                // data = record.data;
                // switch (data.Remarks)
                // {
                // case "":{
                //    data.Remarks = '加辣';
                //     };
                //    break;
                // case "不辣":{
                //    data.Remarks = '';
                //    };
                //    break;
                // case "加辣":{
                //    data.Remarks = '不辣';
                //    };
                //    break;
                // default:{
                //     data.Remarks = '微辣';
                //     };
                //     break; 
                // };
                var task = Ext.create('Ext.util.DelayedTask', function() {
                        item.setData(data);
                    });
                task.delay(100);
            },
            onGoodsClick: function (list, record, item, index, btn) {
                data = record.data;
                if (data.IsPack)
                    this.fireEvent("onPackGoodsClicked", list, record, item, index, btn);
            },
            onNumClick: function (list, record, item, index, btn) {
                // console.log("onNumClick");
                btn.addCls('x-button-pressing');
                var value = btn.getAttribute("value"),
                    GoodsCount = record.data.GoodsCount + Number(value) * app.numclickn,
                    data = record.data;
                if (GoodsCount < 0) {
                    GoodsCount = 0;
                }

                data.GoodsCount = GoodsCount;
                var task = Ext.create('Ext.util.DelayedTask', function() {
                        item.setData(data);
                    });
                task.delay(100);
                //1.不能使用item.setRecord(record);此方法无法更新视图
                //2.不能使用record.set({taste:taste});查看源码会发现此方法会刷新整个视图，效率极其底下。

                if (value == -1 && GoodsCount == 0)
                    btn.hide();
                else if (value == 1 && GoodsCount > 0)
                    btn.show();
            }
        }
        
    }
});
