Ext.define('MyFirst.view.LoginForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.loginform',

    requires: [
        'Ext.field.Toggle',
        'Ext.field.Text',
        'Ext.form.FieldSet',
        'Ext.Toolbar',
        'Ext.Button'
    ],

    config: {
        id: 'loginForm',
        scroll: 'vertical',
        //layout: { type: 'hbox', align: 'center' },
        items: [
            {
					xtype: 'toolbar',  //使用普通的Container容器即可
					height: 68,  //高度要跟图片尺寸相适应，由于我在下面html代码中给图片加了16px的margin-top，所以Container高度设置成图片高度+16，防止图片显示不完整
					//width: 96,  //图片的宽度
                    ui: 'light',
                    title: "星星点单"  //工具栏的标题
					//html: '<img src="../dxmobile/app/view/room.png" style="margin-top: 16px;" />'  //直接设定html代码来显示图片，注意有16像素的顶部margin
	        },
    		{
    		    xtype: 'fieldset',
    		    margin: '20 0 30 0',  //使用margin调整与上面元素和下面元素之间的空隙
                items: [
                    {
                        xtype: 'textfield',
                        name: 'userno',
                        //label: '工号',
                        required: true,
                        placeHolder: '您的工号',
                        itemId: 'usernameText'
                    },
                    {
                        xtype: 'passwordfield',
                        name: 'password',
                        //label: '密码',
                        required: true,
                        placeHolder: '您的密码',
                        itemId: 'passwordText'
                    },
                    {
                        xtype: 'togglefield',
                        name: 'isremember',
                        label:'记住密码'
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'loginButton',
                ui: 'confirm',
                text: '登录'
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
		],
        listeners:[
            {
        	    delegate:"#loginButton",
        	    event:"tap",
        	    fn:"onLoginButtonTap"
            }
        ]
    },
    onLoginButtonTap:function(){
    	//Ext.Msg.alert("Login Failure");
    	this.fireEvent("onLoginClicked");
    }

});