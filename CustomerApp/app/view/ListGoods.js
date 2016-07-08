Ext.define('CustomerApp.view.ListGoods', {
    extend: 'Ext.List',
    alias: 'widget.goodslist',

    xtype: 'goods',

    requires: ['CustomerApp.view.ListTpl'],

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
        //此处自己定义好图片的 长宽width="81px" height="50px"
        itemTpl: new Ext.XTemplate(
        '<div class="bh">',
            '<div class="bone bh">',
                '<img class="mydiv goodsimg" src = "../resources/img/xxsk/{ID}.jpg" fire="onGoodsImgClick">',
                '<div class="mydiv bone" fire="onGoodsClick"><div>{GoodsName}</div><div>{Price}/{Unit}</div></div>',
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
        //'<div>备注：<input type="text" name="description" value="description"/></div>'
         ),
        selectedCls: 'x-item-pressed',
        pressedCls: '',
        listeners: {
            onGoodsImgClick: function (list, record, item, index, btn) {
                //console.log("onGoodsImgClick" + btn);
                if (!app.overlay) {
                    app.overlay = Ext.create('Ext.form.Panel', {
                        itemID: 'goodsImgOverlay',
                        xtype: 'panel',
                        left: 0,
                        top: 0,
                        modal: true,
                        hideOnMaskTap: true,
                        hidden: true,
                        //此处自己定义好放置原图图片的 panel长宽width="260px" height="400px"
                        //width: Ext.os.deviceType == 'Phone' ? 260 : 400,
                        //height: Ext.os.deviceType == 'Phone' ? '70%' : 400,
                        cls: 'goodsbigimg',
                        contentEl: '',
                        styleHtmlContent: true,
                        scrollable: true
                    });
                }
                app.overlay.setHtml('<img src = ' + btn.dom.src + '>');
                app.overlay.showBy(btn);
            },
            onGoodsClick: function (list, record, item, index, btn) {
                //console.log("onGoodsClick" + btn);
                data = record.data;
                if (data.IsPack)
                    this.fireEvent("onPackGoodsClicked", list, record, item, index, btn);
            },
            onNumClick: function (list, record, item, index, btn) {
                //console.log("onNumClick");
                btn.addCls('x-button-pressing');
                var value = btn.getAttribute("value"),
                    GoodsCount = record.data.GoodsCount + Number(value),
                    data = record.data;
                if (GoodsCount < 0) {
                    GoodsCount = 0;
                }
                data.Remarks = '';
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
