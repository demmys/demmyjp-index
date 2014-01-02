(function(window, $, undefined){
    'use strict'

    var ShellView = function($shellViewElement, promptSymbol){
        this.promptSymbol = promptSymbol;
        this.$shell = $shellViewElement;
        this.$cursor = $shellViewElement.children('.shell-view-cursor');
        this.$stdout = $shellViewElement.children('.shell-view-command');
        this.startBlink();
    };
    ShellView.prototype = {
        startBlink: function(){
            this.blinkTimer = setInterval((function(){
                this.$cursor.toggle();
            }).bind(this), 500);
            return this;
        },
        stopBlink: function(){
            clearInterval(this.blinkTimer);
            this.$stdout.hide();
            return this
        },
        wait: function(millis){
            return this.$shell.delay(millis);
        },
        newLine: function(){
            return this.$stdout.append($("<br>"));
        },
        print: function(text){
            return this.$stdout.append(text);
        },
        echo: function(text, next){
            this.newLine((function(){
                this.print(text, next);
            }).bind(this));
        },
        prompt: function(next){
            this.echo(this.promptSymbol, next);
        }
    };

    var ATTR_BLINK_TIMER = 'data-shell-view-blink-timer',
        ATTR_PROMPT = 'data-shell-view-prompt';

    /*
     * initialize an element for viewing shell
     */
    $.fn.initShellView = function(prompt){
        if(typeof(prompt) == 'undefined'){
            prompt = '$ ';
        }
        this.append($('<span>').addClass('shell-view-command').append(prompt))
            .append($('<span>').addClass('shell-view-cursor').append('|'));
        this.attr(ATTR_PROMPT, prompt);
        return this.startBlink();
    };

    /*
     * get specific child node
     */
    $.fn.cursor = function(){
        return this.children('.shell-view-cursor');
    };
    $.fn.stdout = function(){
        return this.children('.shell-view-command');
    };

    /*
     * cursor blink
     */
    $.fn.startBlink = function(){
        return this.attr(ATTR_BLINK_TIMER, setInterval((function(){
            this.cursor().toggle();
        }).bind(this), 500));
    };
    $.fn.stopBlink = function(){
        clearInterval(this.attr(ATTR_BLINK_TIMER));
        this.cursor().hide();
        return this;
    };

    /*
     * output
     */
    $.fn.newLine = function(){
        this.queue((function(){
            this.stdout().append($("<br>"));
            this.dequeue();
        }).bind(this));
        return this;
    };
    $.fn.print = function(text){
        this.queue((function(){
            this.stdout().append(text);
            this.dequeue();
        }).bind(this));
        return this;
    };
    $.fn.type = function(text, interval){
        for(var i = 0; i < text.length; i++){
            this.print(text[i]).delay(interval);
        }
        return this;
    };
    $.fn.echo = function(text){
        return this.newLine().print(text);
    };
    $.fn.prompt = function(){
        return this.echo(this.attr(ATTR_PROMPT));
    };

}(this, jQuery))
