define(['angular'], function(angular) {
    // apppgmid ='';
    var web_url = "../";
    // if($location.path().split("\/")[1]){
    //     var apppgmid = $location.path().split("\/")[1] + "\/";
    // };
    var app = angular.module('services', ['ngResource']);

    app.service('UserService', function($resource) {

        this.signup = function() {
            return $resource('/user/create', {}, {
                save: {
                    method: 'POST'
                }
            });
        };

        this.signin = function() {
            return $resource('/user/login', {}, {
                query: {
                    method: 'POST'
                }
            });
        };

    });

    app.service('RoomService', function($resource) {
        this.getUnStr = function() {
            return $resource(web_url + apppgmid +'/WebServiceEx.asmx/JSON_Decrypt', {}, {
                get: {
                    method: "POST"
                }
            });
        };

        this.getSysParm = function() {
            return $resource(web_url + apppgmid +'/WebServiceEx.asmx/JSON_GetSysParam', {}, {
                get: {
                    method: "POST"
                }
            });
        };


        this.chkCustomerOp = function() {
            return $resource(web_url + apppgmid +'/WebServiceEx.asmx/JSON_ChkCustomerOp', {}, {
                get: {
                    method: "POST"
                }
            });
        };
    });

    app.service('MsgService', function ($resource) {
        this.sendMsg = function () {
            return $resource(web_url + apppgmid +"/WebServiceEx.asmx/JSON_SendWeChatTemplateMessageToRights", {}, {
                send: {
                    method: "POST"
                }
            });
        }
    });

    app.service('FoodService', function ($resource) {
        this.getFoodList = function () {
            return $resource(web_url + apppgmid +"/WebServiceEx.asmx/JSON_Get_RoomGoods", {}, {
                query: {
                    method: "POST"
                }
            });
        };

        this.addCustomerOrder = function () {
            return $resource(web_url + apppgmid +"/WebServiceEx.asmx/JSON_Add_CustomerOrders", {}, {
                add: {
                    method: "POST"
                }
            });
        };

        this.getCustomerOrder = function () {
            return $resource(web_url + apppgmid +"/WebServiceEx.asmx/JSON_GetRoomCustomerOrderList", {}, {
                get: {
                    method: "POST"
                }
            });
        };

        this.getOrdered = function () {
            return $resource(web_url + apppgmid +"/WebServiceEx.asmx/JSON_GetRoomOrderList", {}, {
                get: {
                    method: "POST"
                }
            });
        };
    });

    return app;

});
