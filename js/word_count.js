var m = angular.module('WordCount', ['PresetUrl']);


m.filter('string', function(){
    return function(input){
        return input ? input : '';
    };
});
m.filter('includes', function(){
    return function(input, linefeed, space){
        if(!linefeed){
            input = input.replace(/\n/g, '');
        }
        if(!space){
            input = input.replace(/ /g, '');
        }
        return input;
    };
});
m.filter('split', function(){
    return function(input, delimiter){
        var reg = new RegExp(delimiter, 'g');
        return input.split(reg).filter(function(e){
            return e;
        });
    };
});
m.filter('count', function(){
    return function(input){
        return Number(input.length);
    };
});
m.filter('limit', function(){
    return function(input, limit, $scope, toggle){
        if(input > Number(limit)){
            $scope[toggle] = true;
        } else{
            $scope[toggle] = false;
        }
        return input;
    };
});


m.controller('InputController', function(watchPresetUrl, setPresetUrl, $scope){

    var stob = function(s){
        return s == 'true' ? true : false;
    };
    var ston = function(s){
        return Number(s);
    };
    var map = {
        cs: { name: 'characters', fromstring: stob },
        ws: { name: 'words', fromstring: stob },
        ls: { name: 'lines', fromstring: stob },
        lf: { name: 'linefeed', fromstring: stob },
        sp: { name: 'space', fromstring: stob },
        cl: { name: 'charactersLimit', fromstring: ston },
        wl: { name: 'wordsLimit', fromstring: ston }
    };
    setPresetUrl($scope, map);
    watchPresetUrl($scope, map, 'presetUrl');

}).$inject = ['watchPresetUrl', 'setPresetUrl', '$scope'];
