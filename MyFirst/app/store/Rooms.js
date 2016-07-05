Ext.define('MyFirst.store.Rooms', {
    extend: 'Ext.data.Store',

    requires: 'Ext.DateExtras',

    config: {

        model: 'MyFirst.model.Room',

        grouper: {
            sortProperty: 'RoomName',
            groupFn: function (record) {
                return record.get('RoomAreaName');
            }
        },

        sorters: [
            {
                property: 'RoomCode',
                direction: 'ASC'
            }
        ]
    }
});
