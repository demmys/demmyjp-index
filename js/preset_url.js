var m = angular.module('PresetUrl', []);


m.factory('rootUrl', function($location){
    var url = $location.absUrl();
    return url.substr(0, url.indexOf('?'));
}).$inject = ['$location'];

m.factory('getPresetUrl', function($location){
    return function($scope, map){
        for(i in map){
            var q = map[i];
            var v = $scope[q.name];
            var f = q.tostring;
            if(v){
                if(f){
                    v = f(v);
                } else{
                    v = String(v);
                }
                $location.search(i, v);
            } else{
                $location.search(i, null);
            }
        }
        return $location.absUrl();
    };
}).$inject = ['$location'];

m.factory('setPresetUrl', function($location){
    return function($scope, map){
        var queries = $location.search();
        for(i in queries){
            var q = map[i];
            var f = q.fromstring;
            var v = queries[i];
            if(f){
                v = f(v);
            }
            $scope[q.name] = v;
        }
    };
}).$inject = ['$location'];

m.factory('watchPresetUrl', function(getPresetUrl){
    return function($scope, map, model){
        var listener = function(){
            $scope[model] = getPresetUrl($scope, map);
        }
        for(i in map){
            $scope.$watch(map[i].name, listener);
        }
        listener();
    };
}).$inject = ['getPresetUrl'];


m.directive('selectOnClick', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            element.bind('click', function(){
                this.select();
            });
        }
    };
});
