(function(window, $, undefined){
    "use strict"

    var ShellView = function($shellViewElement){
        this.$shell = $shellViewElement;
        this.startBlink();
    };
    ShellView.prototype = {
        startBlink: function(next){
            this.blinkTimer = setInterval((function(){
                this.$shell.children(".shell-view-cursor").toggle();
                next && next();
            }).bind(this), 500);
        },
        stopBlink: function(next){
            clearInterval(this.blinkTimer);
            this.$shell.children(".shell-view-cursor").hide();
            next && next();
        }
    };

    $.fn.initShellView = function(){
        this.append($("<span>").addClass("shell-view-cursor").append("|"));
        return new ShellView(this);
    };
}(this, jQuery))
