Ext.define('MyFirst.model.Room', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            { name: 'ID', type: 'string' },
            { name: 'RoomOpCode', type: 'string' },
            { name: 'RoomName', type: 'string' },
            { name: 'RoomCode', type: 'string' },
            { name: 'PriceCase', type: 'string' },
            { name: 'RoomStateName', type: 'string' },
            { name: 'RoomColor', type: 'string' },
            { name: 'RoomOpenTimes', type: 'string' },
            { name: 'RoomAreaName', type: 'string' },
            { name: 'RoomTypeName', type: 'string' },
            { name: 'ReservationEmpName', type: 'string' },
            { name: 'ReservationDateTime', type: 'string' },
            { name: 'OpenRoomDateTime', type: 'string' },
            { name: 'GuestCount', type: 'int' },
            { name: 'GuestName', type: 'string' },
            { name: 'MinConsume', type: 'string' },
            { name: 'ConsumeAmount', type: 'string' },
            { name: 'PresentAmount', type: 'string' },
            { name: 'DiscountAmount', type: 'string' },
            { name: 'ServiceAmount', type: 'string' }
        ]
    }
});