Ext.define('MyFirst.store.Goods', {
    extend: 'Ext.data.Store',

    config: {

        model: 'MyFirst.model.Good',
        // autoLoad: true,
        grouper: {
            sortProperty: 'GoodsTypeName',
            groupFn: function (record) {
                return record.get('GoodsTypeName');
            }
        },

        sorters: [        
            {
                property: 'Price',
                direction: 'ASC'
            },
            {
                property: 'GoodsName',
                direction: 'ASC'
            }
        ]
    }
});
