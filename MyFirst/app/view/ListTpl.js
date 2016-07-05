/*
*list tpl模版加入按钮监控
*<div class="x-button-normal x-button x-iconalign-center x-layout-box-item x-stretched btn"><span class="x-button-icon x-shown lower" fire="showWeibo"></span></div>
*fire="showWeibo" 作用是激活指定事件
*有两个参数cmp:视图本身以及doit
*只要是以上格式的模板都可以被监控到
*其中btn、lower为自定义样式，其他都是st自带样式
*/
Ext.define('MyFirst.view.ListTpl', {
    alias: 'plugin.ListTpl',
    xtype: 'listTpl',
    config: {
        list: null,
        //按下时添加css
        pressedCls: 'pressing',
        //监控对象选择器
        delegate: '.mydiv', //div.mydiv
        //是否监听input控件
        isInput: false
    },
    constructor: function (config) {
        this.initConfig(config);
        this.callParent([config]);
    },
    //初始化
    init: function (list) {
        this.setList(list);
    },
    //更新配置
    updateList: function (newList, oldList) {
        if (newList) {
            //为自定义按钮注册点击事件
            newList.container.element.on({
                tap: 'onTap',
                touchstart: 'onPress',
                touchend: 'onRelease',
                delegate: this.getDelegate(),
                scope: this
            });
            if (this.getIsInput()) {
                //为自定义按钮注册点击事件
                newList.container.element.on({
                    blur: 'onBlur',
                    delegate: 'input[type="text"]',
                    scope: this
                });
            }
        }
    },
    //执行动作
    onTap: function (e) {
        var me = this.getList(),
        item = Ext.getCmp(Ext.get(e.getTarget()).up('.x-list-item').id),
        index = item.$dataIndex,
        record = me.getStore().getAt(index),
        el = e.getTarget(this.getDelegate(), null, true),
        fire = el.getAttribute('fire'),
        action = 'do' + fire;
        me.fireAction(fire, [me, record, item, index, el], action);
    },
    //按钮按下时，添加css
    onPress: function (e, node) {
        var el = e.getTarget(this.getDelegate(), null, true);
        el.addCls(this.getPressedCls());
    },
    //按钮松开时，移除css
    onRelease: function (e, node) {
        var el = e.getTarget(this.getDelegate(), null, true);
        el.removeCls(this.getPressedCls());
    },
    //焦点离开时，将值填充到store中
    onBlur: function (e) {
        var me = this.getList(),
        item = Ext.getCmp(Ext.get(e.getTarget()).up('.x-list-item').id),
        index = item.$dataIndex,
        record = me.getStore().getAt(index),
        el = e.getTarget('input', null, true),
        value = el.getValue(),
        name = el.getAttribute('name');
        record.data[name] = value;
    }
});