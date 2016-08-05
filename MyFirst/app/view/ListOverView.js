Ext.define('MyFirst.view.ListOverView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.overviewform',

    xtype: 'overview',

    config: {
        fullscreen: true,
        scrollable: true,
        items: [
                {
                    xtype: 'fieldset',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: '60%',
                        inputCls: 'dxtextright',
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [
                        {
                            docked: 'top',
                            readOnly: true,
                            label: '累计开房',
                            name: 'RoomOpenTotal'
                        },
                        {
                            readOnly: true,
                            label: '当前开房',
                            name: 'RoomOpen'
                        },
                        {
                            readOnly: true,
                            label: '结账房',
                            name: 'RoomPosed'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: '60%',
                        inputCls: 'dxtextright',
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [
                        {
                            docked: 'top',
                            readOnly: true,
                            label: '累计开台',
                            name: 'HallOpenTotal'
                        },
                        {
                            readOnly: true,
                            label: '当前开台',
                            name: 'HallOpen'
                        },
                        {
                            readOnly: true,
                            label: '结账台',
                            name: 'HallPosed'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: '60%',
                        inputCls: 'dxtextright',
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [
                        {
                            docked: 'top',
                            readOnly: true,
                            label: '已收款',
                            name: 'PosedAmount'
                        },
                        {
                            readOnly: true,
                            label: '大厅收款',
                            name: 'PosedHallAmount'
                        },
                        {
                            readOnly: true,
                            label: '外卖收款',
                            name: 'PosedTakeoutAmount'
                        },
                        {
                            docked: 'bottom',
                            readOnly: true,
                            label: '预计总收入',
                            name: 'PosFinallyAmount'
                        },
                        {
                            docked: 'bottom',
                            readOnly: true,
                            label: '预计未收款',
                            name: 'PosingAmount'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: '60%',
                        inputCls: 'dxtextright',
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [
                        {
                            docked: 'top',
                            readOnly: true,
                            label: '赠送合计',
                            name: 'PresentAmount'
                        },
                        {
                            readOnly: true,
                            label: '员工赠送',
                            name: 'PresentAmountEmp'
                        },
                        {
                            readOnly: true,
                            label: '公司例送',
                            name: 'PresentAmountCompany'
                        }
                    ]
                }
        ]
    },
    initialize: function () {
        this.callParent();
        var viewStore = Ext.getStore('OverViews');
        this.setValues(viewStore.data.items[0].data);
    }
});
