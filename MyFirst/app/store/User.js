Ext.define('MyFirst.store.User', {
    extend: 'Ext.data.Store',

    config: {

        model: 'MyFirst.model.User',
        autoLoad: true
    }
});
