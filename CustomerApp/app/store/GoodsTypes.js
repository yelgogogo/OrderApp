Ext.define('CustomerApp.store.GoodsTypes', {
    extend: 'Ext.data.Store',

    config: {

        model: 'CustomerApp.model.GoodsType',
        sorters: [
            {
                property: 'DisplayOrder',
                direction: 'ASC'
            }
        ],
        autoLoad: true
    }
});
