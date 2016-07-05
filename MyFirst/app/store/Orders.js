Ext.define('MyFirst.store.Orders', {
    extend: 'Ext.data.Store',

    config: {

        model: 'MyFirst.model.Order',
        grouper: {
            sortProperty: 'OpCode',
//            sortProperty: 'Price', direction: "ASC",
            groupFn: function (record) {
                return record.get('OpCode');
            }
        }

    }
});
