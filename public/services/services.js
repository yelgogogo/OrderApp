define(['angular'], function(angular) {
    // $rootScope.apppgmid ='';
    var web_url = "..";
    // if($location.path().split("\/")[1]){
    //     var $rootScope.apppgmid = $location.path().split("\/")[1] + "\/";
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

    app.service('RoomService', function($resource,$rootScope,$location) {
        if($location.path().split("\/")[1]){
            if($location.path().split("\/")[1].search(".html")>0){
                $rootScope.apppgmid ="";
            }else{
                $rootScope.apppgmid = "\/" + $location.path().split("\/")[1] ;
            };
        };
        this.getUnStr = function() {
            return $resource(web_url + $rootScope.apppgmid +'/WebServiceEx.asmx/JSON_Decrypt', {}, {
                get: {
                    method: "POST"
                }
            });
        };

        this.getSysParm = function() {
            return $resource(web_url + $rootScope.apppgmid +'/WebServiceEx.asmx/JSON_GetSysParam', {}, {
                get: {
                    method: "POST"
                }
            });
        };


        this.chkCustomerOp = function() {
            return $resource(web_url + $rootScope.apppgmid +'/WebServiceEx.asmx/JSON_ChkCustomerOp', {}, {
                get: {
                    method: "POST"
                }
            });
        };
    });

    app.service('MsgService', function ($resource,$rootScope) {
        this.sendMsg = function () {
            return $resource(web_url + $rootScope.apppgmid +"/WebServiceEx.asmx/JSON_SendWeChatTemplateMessageToRights", {}, {
                send: {
                    method: "POST"
                }
            });
        }
    });

    app.service('FoodService', function ($resource,$rootScope) {
        this.getFoodList = function () {
            return $resource(web_url + $rootScope.apppgmid +"/WebServiceEx.asmx/JSON_Get_RoomGoods", {}, {
                query: {
                    method: "POST"
                }
            });
        };

        this.addCustomerOrder = function () {
            return $resource(web_url + $rootScope.apppgmid +"/WebServiceEx.asmx/JSON_Add_CustomerOrders", {}, {
                add: {
                    method: "POST"
                }
            });
        };

        this.modCustomerOrder = function () {
            return $resource(web_url + $rootScope.apppgmid +"/WebServiceEx.asmx/JSON_Mod_CustomerOrders", {}, {
                add: {
                    method: "POST"
                }
            });
        };

        this.getCustomerOrder = function () {
            return $resource(web_url + $rootScope.apppgmid +"/WebServiceEx.asmx/JSON_GetRoomCustomerOrderList", {}, {
                get: {
                    method: "POST"
                }
            });
        };

        this.getOrdered = function () {
            return $resource(web_url + $rootScope.apppgmid +"/WebServiceEx.asmx/JSON_GetRoomOrderList", {}, {
                get: {
                    method: "POST"
                }
            });
        };
    });

    return app;

});
