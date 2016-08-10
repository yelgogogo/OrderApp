Ext.define('MyFirst.view.ListOrdered', {
    extend: 'Ext.List',
    alias: 'widget.orderedgoodslist',

    xtype: 'orderedgoods',

    requires: ['MyFirst.view.ListTpl'],

    config: {
        store: 'Orders',
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
                '<div class="mydiv x-button" fire="onNumClick" value="-1">',
                '<span class="x-button-icon x-shown lower"></span></div>',
            '</div>',
            '<div class="bv" style="width:40px;text-align:center">',
                '{GoodsCount}',
            '</div>',
//            '<div class="bv">',
//                '<div class="mydiv x-button"  fire="onNumClick" value="1">',
//                '<span class="x-button-icon x-shown add"></span></div>',
//            '</div>',
         '</div>'
         ),
        items: [
            {
                xtype: 'textfield',
                itemId: 'txtSubTotal3',
                readOnly: true,
                docked: 'bottom',
                label: '合计:'
            },
            {
                xtype: 'button',
                itemId: 'confirmCancel',
                scrollDock: 'bottom',
                docked: 'bottom',
                ui:'confirm',
                text: '确认'
            }
        ],

        selectedCls: 'x-item-pressed',
        pressedCls: '',
        listeners: {
            onGoodsClick: function (list, record, item, index, btn) {
                data = record.data;
                if (data.IsPack)
                    this.fireEvent("onPackGoodsClicked", list, record, item, index, btn);
            },
            onNumClick: function (list, record, item, index, btn) {
                // console.log("onNumClick");
                btn.addCls('x-button-pressing');
                var value = btn.getAttribute("value"),
                    GoodsCount = Number(record.data.GoodsCount) + Number(value),
                    data = record.data;
                // var temp = data.GoodsCount;
                var cancelstore = Ext.getStore('CancelOrders');
                var cancelrec = cancelstore.findRecord('OrderDetailID', data.OrderDetailID);
                if (record.data.GoodsCount < 1){
                    return;
                }
                if (cancelrec){
                    cancelrec.data.GoodsCount=Number(cancelrec.data.GoodsCount)+Number(value);
                }
                else{
                    // data.GoodsCount=Number(GoodsCount)+Number(value);
                    var cursor=record.copy();
                    //Ext.create('app.mode;l.Order',data);
                    // var cursor= data;
                    cursor.data.GoodsCount = -1;
                    cancelstore.add(cursor);
                    
                };
                data.GoodsCount =GoodsCount
    
                var task = Ext.create('Ext.util.DelayedTask', function() {
                        item.setData(data);
                    });
                task.delay(100);
                // if (GoodsCount < 1){
                //     btn.hide();
                // }
                //1.不能使用item.setRecord(record);此方法无法更新视图
                //2.不能使用record.set({taste:taste});查看源码会发现此方法会刷新整个视图，效率极其底下。

                // if (value == -1 && data.GoodsCount == 0)
                //     btn.hide();
                // else if (value == 1 && data.GoodsCount > 0)
                //     btn.show();
            }
        }
    }
});
