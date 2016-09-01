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
                // scope.GoodsCount = scope.gd.GoodsCount;
                scope.add = function (o) {
                    ++scope.gd.GoodsCount;
                    Cart.addProduct(o);
                    // Types.addProduct(o);
                    // ++scope.GoodsCount;
                    
                }
                scope.decrease = function (o) {
                    --scope.gd.GoodsCount;
                    Cart.decreaseProduct(o);
                    // Types.decreaseProduct(o);
                    // // --scope.GoodsCount;
                    
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

    app.directive('star', function () {
        return {
            template: '<ul class="rating" ng-mouseleave="leave()">' +
                '<li ng-repeat="star in stars" ng-class="star" ng-click="click($index + 1)" ng-mouseover="over($index + 1)">' +
                '\u2605' +
                '</li>' +
                '</ul>',
            scope: {
              ratingValue: '=',
              max: '=',
              readonly: '@',
              onHover: '=',
              onLeave: '='
            },
            controller: function($scope){
              $scope.onHover = function(val){
                $scope.hoverVal = val;
              };
              $scope.onLeave = function(){
                $scope.hoverVal = null;
              }
              $scope.onChange = function(val){
                $scope.ratingVal = val;
              }
              $scope.ratingValue = $scope.ratingValue || 0;
              $scope.max = $scope.max || 5;
              $scope.click = function(val){
                if ($scope.readonly && $scope.readonly === 'true') {
                  return;
                }
                $scope.ratingValue = val;
              };
              $scope.over = function(val){
                $scope.onHover(val);
              };
              $scope.leave = function(){
                $scope.onLeave();
              }
            },
            link: function (scope, elem, attrs) {
              elem.css("text-align", "center");
              var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                  scope.stars.push({
                    filled: i < scope.ratingValue
                  });
                }
              };
              updateStars();

              scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                  updateStars();
                }
              });
              scope.$watch('max', function (oldVal, newVal) {
                if (newVal) {
                  updateStars();
                }
              });
            }
        };
    });

    return app;

});
