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
            '<div class="mydiv bone" fire="onGoodsClick"><div>{GoodsName}</div><div>{Price}/{Unit}</div></div>',
            '<div class="bv">',
                '<div class="mydiv x-button" fire="onMarkClick" value="-1">',
                '<span class="x-button-icon x-shown chili"></span></div>',
            '</div>',
            '<div class="bv" style="width:40px;text-align:center">',
                '{Remarks}',
            '</div>',
            '<div class="bv">',
                '<div class="mydiv x-button" fire="onNumClick" value="-1">',
                '<span class="x-button-icon x-shown lower"></span></div>',
            '</div>',
            '<div class="bv" style="width:40px;text-align:center">',
                '{GoodsCount}',
            '</div>',
            '<div class="bv">',
                '<div class="mydiv x-button"  fire="onNumClick" value="1">',
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
                        xtype: 'textfield',
                        itemId: 'txtSubTotal',
                        readOnly: true,
                        width: '50%' ,
                        docked: 'top',
                        label: '合计:'
                   },
                   {   
                        xtype: 'togglefield',
                        width: '50%' ,
                        // name : 'markToggle',
                        // id : 'markToggle',
                        itemId: 'markToggle',
                         docked: 'right',
                        label: '全部加辣'
                    },
                   {   
                        xtype: 'togglefield',
                        width: '50%' ,
                        // name : 'markToggle',
                        // id : 'markToggle',
                        itemId: 'markToggle2',
                         docked: 'left',
                        label: '全部微辣'
                    }
               ]
            }
        ],

        selectedCls: 'x-item-pressed',
        pressedCls: '',
        listeners: {
            onMarkClick: function (list, record, item, index, btn) {
                console.log("onMarkClickClick"); 
                data = record.data;
                // if (data.Remarks != '')
                //     data.Remarks = '';
                // elseif
                //     data.Remarks = '加辣';
                switch (data.Remarks)
                {
                case "":{
                   data.Remarks = '微辣';
                    };
                   break;
                case "微辣":{
                   data.Remarks = '加辣';
                   };
                   break;
                case "加辣":{
                   data.Remarks = '';
                   };
                   break;
                default:{
                    data.Remarks = '微辣';
                    };
                    break; 
                };
                item.setData(data);
            },
            onGoodsClick: function (list, record, item, index, btn) {
                data = record.data;
                if (data.IsPack)
                    this.fireEvent("onPackGoodsClicked", list, record, item, index, btn);
            },
            onNumClick: function (list, record, item, index, btn) {
                console.log("onNumClick");
                var value = btn.getAttribute("value"),
                    GoodsCount = record.data.GoodsCount + Number(value),
                    data = record.data;
                if (GoodsCount < 0) {
                    GoodsCount = 0;
                }

                data.GoodsCount = GoodsCount;
                item.setData(data);
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
