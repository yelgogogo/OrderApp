Ext.define('MyFirst.view.ListGoods', {
    extend: 'Ext.DataView',
    alias: 'widget.goodslist',
    requires: 'Ext.SegmentedButton',

    xtype: 'goods',

    config: {
        store: 'Goods',
        // scrollable: true,
        scrollable:{direction:'vertical',directionLock:true},
        inline: true,
        cls: 'dataview-inline',
        //margin:'5 5 5 5',
        items: [
            {
                xtype: 'toolbar',
                layout:'vbox',
                ui: 'gray',
                scrollable:{direction:'vertical',directionLock:true},
                vertical:true,
                docked:'left',
                width:'20%',
                items: [
                    {
                        xtype: 'segmentedbutton',
                        layout:'vbox',
                        vertical:true,
                        scroll:true,
                        // height: '800px',
                        // width: '100px',
                        // defaults: {
                        //     flex: 1
                        // },
                        allowDepress: false
                    }
                ]
            }
		],
        variableHeights: true,
        useSimpleItems: true,
        itemTpl: [
		'<div style ="background-color:#fff;width:5.7em;height:45px;margin:2px;text-align:center;font-size: medium;overflow: hidden;padding-top:3px;position: relative;">' +
        '<div style ="position: absolute;right:1px;bottom:1px;color:red">{GoodsCountTxt}</div>' +
        '<div style ="height:20px">{GoodsName}<BR>¥{Price}</div></div>'
		]
    },

    initialize: function () {
        this.config.title = '';
        this.callParent();
        goodsTypes = Ext.getStore('GoodsTypes');
        var segmentedButton = this.down('segmentedbutton');
        goodsTypes.each(function(gtypes){
            segmentedButton.add({ text: gtypes.data.GoodsTypeName });
        });
    }
});
