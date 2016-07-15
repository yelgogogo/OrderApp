Ext.define('MyFirst.view.PosForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.posform',
    xtype: 'pos',
    requires: [
        'Ext.field.Toggle',
        'Ext.field.Text',
        'Ext.field.Select',
        'Ext.form.FieldSet',
        'Ext.Toolbar',
        'Ext.Button'
    ],

    config: {
        id: 'posForm',
        scroll: 'vertical',
        items: [
            
    		{
    		    xtype: 'fieldset',
    		    margin: '20 0 30 0',  //使用margin调整与上面元素和下面元素之间的空隙
                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'txtTotalMoney',
                        label: '应收金额',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'txtTruePayMoney',
                        label: '实收金额',
                        required: true
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'txtPayMode',
                        label: '付款方式',
                        options: [
                                { text: '现金', value: '现金' },
                                { text: '微信', value: '微信' },
                                { text: '支付宝', value: '支付宝' },
                                { text: '信用卡', value: '信用卡' },
                                { text: '饿了么', value: '饿了么' },
                                { text: '美团', value: '美团' },
                                { text: '会员卡', value: '会员卡' }
                            ]
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'posOkButton',
                scrollDock: 'bottom',
                ui:'confirm',
                text: '确认买单'
            },
            {
                xtype: 'button',
                hidden: true,
                itemId: 'closeButton2',
                docked: 'bottom',
                ui: 'confirm',
                text: '关台'
            }
        ],
        dockedItems: [
            {
	            id: 'dxTitle',  //给他一个ID
	            xtype: 'toolbar',  //xtype类型是toolbar，完整的xtype枚举见这里http://docs.sencha.com/touch/1-1/#!/api/Ext.Component
	            ui: 'light',  //light表示浅色的背景图案
	            dock: 'top',  //工具栏放置在最顶部
	            title: "星星点单"  //工具栏的标题
            }
		]
    }
});