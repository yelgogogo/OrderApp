Ext.define('MyFirst.model.Order', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [

            { name: 'OpCode', type: 'string' },
            { name: 'OrderID', type: 'int' },
            { name: 'OrderDetailID', type: 'int' },
            { name: 'OrderTime', type: 'string' },
            { name: 'RoomName', type: 'string' },
            { name: 'OrderSerialNumber', type: 'string' },
            { name: 'ProduceSerialNumber', type: 'string' },
            { name: 'ProduceSite', type: 'string' },
            { name: 'PackNo', type: 'int' },
            { name: 'GoodsTypeName', type: 'string' },
            { name: 'GoodsID', type: 'int' },
            { name: 'GoodsName', type: 'string' },
            { name: 'Price', type: 'string' }, //{ name: 'Price', type: 'number' },
            { name: 'Unit', type: 'string' },
            { name: 'GoodsCount', type: 'string' }, //{ name: 'GoodsCount', type: 'int' },
            { name: 'SubTotal', type: 'string' }, //{ name: 'SubTotal', type: 'number' },
            { name: 'Status', type: 'string' },
            { name: 'IsPresent', type: 'boolean' },
            { name: 'PresentWay', type: 'string' },
            { name: 'PresentUser', type: 'string' },
            { name: 'IsCanceled', type: 'boolean' },
            { name: 'CanceledUser', type: 'string' },
            { name: 'SendUser', type: 'string' },
            { name: 'Remarks', type: 'string' },
            { name: 'BackColor', type: 'string' },
            { name: 'IsDazhe', type: 'boolean' },
            { name: 'MaxDazhe', type: 'int' },
            { name: 'ForeColor', type: 'string' }
        ]
    }
});