define(['angular'], function(angular) {

    var app = angular.module('directives', ['factories']);

    app.directive('emptyLine', function() {
        return {
            restrict: "E",
            replace: true,
            template: '<div class="col-xs-12">&nbsp;</div>'
        };
    });

    app.directive('navTop', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'views/common/navTop.html',
        };
    });

    app.directive('leftMenu', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'views/common/leftMenu.html',
        };
    });

    app.directive('mainFooter', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'views/common/mainFooter.html',
        };
    });

    app.directive('mainContent', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'views/tpls/mainContent.html',
        };
    });

    app.directive('focus', function() {
        return {
            link: function(scope, element, attrs) {
                element[0].focus();
            }
        };
    });

    app.directive('restaurantTab', function() {
        return {
            restrict: "E",
            scope: {
                state: "=",
                restaurant: "="
            },
            templateUrl: "tpls/tabs.html",
            link: function(scope) {
                scope.tabs = [{
                    name: "菜单",
                    state: "menu"
                }, {
                    name: "评价",
                    state: "ratings"
                }, {
                    name: "商家",
                    state: "info"
                }];
                scope.changeState = function(scope, element, attrs) {
                    // todo
                };
            }
        };
    });

    app.directive('menuNav', function() {
        return {
            restrict: "E",
            scope: {
                itemsTypes: '=items',
                good:"=category"
            },
            templateUrl: "tpls/menu.html",
            link: function (scope, element, attrs) {
                scope.selectMenu = function (idx) {
                    scope.good = idx;
                };
            }
        };
    });

    app.directive('restaurantFood', function () {
        return {
            restrict: "E",
            scope: {
                goods: '=goods'
            },
            templateUrl: "tpls/goods.html"
        };
    });

    app.directive('cartAdd', ['Cart','Types',function(Cart,Types) {
        return {
            restrict: "E",
            template: '<a class="btn-add"><i class="glyphicon glyphicon-plus-sign"></i></a>',
            link: function (scope, element, attrs) {
                scope.GoodsCount = 0;
                scope.add = function (o) {
                    Cart.addProduct(o);
                    // Types.addProduct(o);
                    ++scope.GoodsCount;
                }
                scope.decrease = function (o) {
                    Cart.decreaseProduct(o);
                    // Types.decreaseProduct(o);
                    --scope.GoodsCount;
                }
            }
        };
    }]);

    app.directive('cartDecrease', function() {
        return {
            restrict: "E",
            template: '<a class="btn-minus"><i class="glyphicon glyphicon-minus-sign"></i></a>'
        };
    });

    app.directive('rating', function () {
        return {
            restrict: "E",
            scope: {},
            template: '<a class="rating-link"><i class="glyphicon glyphicon-star" ng-repeat="x in [1,2,3,4,5]"></i>0评价</a>'
        };
    });

    app.directive('loading', function() {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="loading"><img src="images/loadingcirclests16.gif" />LOADING...</div>',
            link: function(scope, element, attr) {
                scope.$watch('loading', function(val) {
                    if (val)
                        $(element).show();
                    else
                        $(element).hide();
                });
            }
        };
    });

    return app;

});
