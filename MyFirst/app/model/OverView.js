Ext.define('MyFirst.model.OverView', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            { name: 'RoomTotal', type: 'int' },
            { name: 'RoomOpenTotal', type: 'int' },
            { name: 'RoomOpen', type: 'int' },
            { name: 'RoomPosed', type: 'int' },
            { name: 'HallTotal', type: 'int' },
            { name: 'HallOpenTotal', type: 'int' },
            { name: 'HallOpen', type: 'int' },
            { name: 'HallPosed', type: 'int' },

            { name: 'PosedAmount', type: 'number' },
            { name: 'PosedRoomAmount', type: 'number' },
            { name: 'PosedHallAmount', type: 'number' },
            { name: 'PosingAmount', type: 'number' },
            { name: 'PosFinallyAmount', type: 'number' },
            { name: 'ConsumeAmount', type: 'number' },
            { name: 'SumServiceAmount', type: 'number' },
            { name: 'SumDiscountAmount', type: 'number' },

            { name: 'PresentAmount', type: 'number' },
            { name: 'PresentAmountEmp', type: 'number' },
            { name: 'CurrentBill', type: 'auto' },
            { name: 'PresentAmountCompany', type: 'number' }
        ]
        // associations: [//使用association，要用type配置关系类型
        //     {type: 'hasMany', model: 'MyFirst.model.CurrentBill',    name: 'CurrentBill'}
        // ]
    }
});

// Ext.define('MyFirst.model.CurrentBill', {
//     extend: 'Ext.data.Model',
//     config:{ 
//     fields: ['PayName', 'Amount'],
//     belongsTo: 'MyFirst.model.OverView'//使用belongsTo配置项，声明这个模型从属于另一个模型
// }
// });