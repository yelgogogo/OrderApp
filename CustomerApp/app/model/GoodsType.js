Ext.define('CustomerApp.model.GoodsType', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            { name: 'GoodsTypeName', type: 'string' },
            { name: 'DisplayOrder', type: 'int' }
        ]
    }
});