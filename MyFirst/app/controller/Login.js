Ext.define('MyFirst.controller.Login', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            loginView: "loginform"
        },

        control: {
            loginView: {
                onLoginClicked: "onlogin"
            }
        }
    },

    onlogin: function (button, e, eOpts) {    
        loginView = this.getLoginView(); // Login Form
        values = loginView.getValues();
        var UserNo = values.userno;
        var Pwd = values.password;
        var openid;
        if (app.openid){
            openid = app.openid;
            }
        else{
            openid = '';
        };

        var IsRemember = values.isremember;

        var successCallback = function (resp, ops) {
            
            var data = Ext.util.JSON.decode(resp.responseText).d;

            if (data) {
                result = eval('(' + data + ')');
                //本地登录用户缓存
                var userStore = Ext.getStore('User').load();
                userStore.removeAll();

                var user = Ext.create("MyFirst.model.User");
                user.set("username", result.user);
                user.set("password", Pwd);
                user.set("userno", UserNo);
                user.set("isremember", IsRemember);
                user.set("rights", result.rights);
                // console.log(user);
                userStore.add(user);
                userStore.sync();
                //Ext.Viewport.setMasked({ xtype: 'loadmask' });
                Ext.Viewport.setMasked({ xtype: 'loadmask' });
                app.util.Proxy.loadRooms(function () {
                    var mainView = Ext.create('MyFirst.view.Card');
                    Ext.Viewport.add(mainView);
                    loginView.reset();
                    loginView.hide();
                    mainView.show();
                    Ext.Viewport.setMasked(false);

                });

                //mainView.setActiveItem(1);
                //Ext.Viewport.setMasked(false);

            }
            else
                Ext.Msg.alert("用户名或密码错误!");
        };
        var failureCallback = function (resp, ops) {
            Ext.Msg.alert("登录失败!", resp.responseText);
        };

        //TODO: Login using server-side authentication service        
        Ext.Ajax.request({
            url: '../'+app.pgmid+'WebServiceEx.asmx/JSON_CheckPassword',
            //            headers: {
            //                'Content-Type': 'application/json;utf-8'
            //            },

            params: values,
            jsonData: {
                username: UserNo,
                password: Pwd,
                wechatid: openid
            },
            success: successCallback,
            failure: failureCallback
        });
    }
});