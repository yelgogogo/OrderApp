Ext.define('MyFirst.view.List', {
    extend: 'Ext.DataView',
    alias: 'widget.roomlist',
    requires: 'Ext.SegmentedButton',

    xtype: 'rooms',

    config: {
        store: 'Rooms',
        scrollable: true,
        inline: true,
        cls: 'dataview-inline',
        //margin:'5 5 5 5',
        items: [
            {
                docked: 'bottom',
                xtype: 'toolbar',
                ui: 'gray',
                items: [
                    {
                        xtype: 'segmentedbutton',
                        width: '100%',
                        defaults: {
                            flex: 1
                        },
                        allowDepress: false
                    }
                ]
            }
		],
        variableHeights: true,
        useSimpleItems: true,
        itemTpl: [
		'<div style ="background-color:{RoomColor};width:100px;height:50px;margin:5px;text-align:center;padding-top:15px;position: relative;">' +
        '<div style ="position: absolute;top:1px;color:red">{RoomOpenTimes}</div>' +
        '<div style ="position: absolute;bottom:1px;right:1px;color:blue">{GuestCount}</div>' +
        '<div style ="position: absolute;bottom:1px;right:1px;color:blue">{GuestName}</div>' +
        '<div style ="height:20px">{RoomName}</div></div>'
		]
    },

    initialize: function () {
        this.config.title = '';
        this.callParent();

        var segmentedButton = this.down('segmentedbutton');
        Ext.Array.each(Ext.Object.getValues(app.roomAreas), function (roomArea) {
            segmentedButton.add({ text: roomArea.areaName });
        });
    }
});
