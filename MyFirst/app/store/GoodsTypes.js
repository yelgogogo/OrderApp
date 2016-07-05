Ext.define('MyFirst.store.GoodsTypes', {
    extend: 'Ext.data.Store',

    config: {

        model: 'MyFirst.model.GoodsType',
        sorters: [
            {
                property: 'DisplayOrder',
                direction: 'ASC'
            }
        ],
        autoLoad: true
    }
});
