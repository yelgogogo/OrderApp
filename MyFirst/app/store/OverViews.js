Ext.define('MyFirst.store.OverViews', {
    extend: 'Ext.data.Store',

    config: {

        model: 'MyFirst.model.OverView',

        grouper: {
            sortProperty: 'GroupName',
            groupFn: function (record) {
                return record.get('GroupName');
            }
        }
//        ,
//        sorters: [
//            {
//                property: 'ID',
//                direction: 'ASC'
//            }
//        ]
    }
});
