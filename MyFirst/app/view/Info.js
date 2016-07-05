Ext.define('MyFirst.view.Info', {

    extend: 'Ext.Container',
    xtype: 'roomInfo',

    config: {

        cls: 'roomInfo',

        tpl: Ext.create('Ext.XTemplate',
			'<h3>{RoomName} <small>{RoomTypeName}</small></h3>'
		)
    }
});
