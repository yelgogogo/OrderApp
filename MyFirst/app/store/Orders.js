Ext.define('MyFirst.store.Orders', {
    extend: 'Ext.data.Store',

    config: {

        model: 'MyFirst.model.Order',
        sorters: [{
                property: 'GoodsTypeName',
                direction: 'ASC'
            },{
                property: 'Price',
                direction: 'DESC'
            },{
                property: 'GoodsName',
                direction: 'ASC'
            }
        ],
        grouper: {
            sortProperty: 'OpCode',
            // sortProperty: 'Price', direction: "DEC",
            groupFn: function (record) {
                return record.get('OpCode');
            }
        }

    }
});
