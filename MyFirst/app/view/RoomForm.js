Ext.define('MyFirst.view.RoomForm', {
    extend: 'Ext.Container',
    alias: 'widget.roomform',

    config: {
        layout:'fit',
        items: [{
            xtype: 'dataview',
            scrollable: true,
            inline: true,
            cls:'dataview-inline',
            
            store: {
                fields: ['name', 'color'],
                data: [
                    { name: 'Jamie',color:'red'},
                    { name: 'Rob' ,color:'red'},
                    { name: 'Tommy',color:'green' },
                    { name: 'Jacky', color: 'red' },
                    { name: 'Tommy', color: 'green' },
                    { name: 'Tommy', color: 'green' },
                    { name: 'Tommy', color: 'green' },
                    { name: 'Tommy', color: 'green' },
                    { name: 'abc', color: 'blue' },
                    { name: 'Ed', color: 'red' }
                ]
            },
            itemTpl: '<div class="img" style="background-image:url(\'app/view/room.png\');background-color:{color};margin:5px;width:80px;height:100px">{name}</div>'
        }]
    }
});