Ext.define('CustomerApp.view.ListGoodsType', {
    extend: 'Ext.DataView',
    alias: 'widget.goodstypelist',

    xtype: 'goodstypes',

    requires: [        
        'Ext.Button'
    ],
    config: {
        store: 'GoodsTypes',
        scrollable: 'vertical',
        inline: true,
        emptyText: '无数据显示.',
        //cls: 'dataview-inline',
        itemCls: "dataviw-valign-top",

        variableHeights: true,
//        items: [
//            {
//                xtype: 'button',
//                text: '{GoodsTypeName}'
//            }
//        ]
        useSimpleItems: true,
        itemTpl: [
            '<div class="x-button" style ="width:130px;height:80px;margin:5px;background-image: -webkit-linear-gradient(top, #1A0E58,#C5CAEE 3%,#D7D4EE);">{GoodsTypeName}</div>'
            //'<div class="x-button" style ="width:120px;height:50px;margin:5px;background-image: -webkit-linear-gradient(top, #1A0E58,#C5CAEE 3%,#D7D4EE);">{GoodsTypeName}</div>'
            //'<div cls="x-button">{GoodsTypeName}</div>' <input type="submit" value="{GoodsTypeName}" />
            //'<div class="button" style ="width:90px;height:50px;margin:5px;text-align:center">{GoodsTypeName}</div>'
        ]
    }
});
