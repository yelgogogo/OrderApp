Ext.define('CustomerApp.store.Orders', {
    extend: 'Ext.data.Store',

    config: {

        model: 'CustomerApp.model.Order',
        grouper: {
            sortProperty: 'OpCode',
//            sortProperty: 'Price', direction: "ASC",
            groupFn: function (record) {
                return record.get('OpCode');
            }
        }

    }
});
