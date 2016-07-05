Ext.define('CustomerApp.model.GoodsDetail', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            { name: 'ID', type: 'int' },
            { name: 'PackGoodsID', type: 'int' },
            { name: 'GoodsTypeName', type: 'string' },
            { name: 'GoodsName', type: 'string' },
            { name: 'Unit', type: 'string' },
            { name: 'Price', type: 'number' },
            { name: 'GoodsDetailCount', type: 'int', defaultValue: 0 },
            { name: 'GroupCount', type: 'int', defaultValue: 0 },
            { name: 'GroupName', type: 'string' },
            { name: 'IsFixed', type: 'boolean' }
        ]
//        ,
//        belongsTo: 'CustomerApp.model.Good',
    }
});