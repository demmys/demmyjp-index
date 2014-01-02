(function(window, $, undefined){
    'use strict'

    var ATTR_BLINK_TIMER = 'data-shell-view-blink-timer',
        ATTR_PROMPT = 'data-shell-view-prompt';

    /*
     * initialize an element for viewing shell
     */
    $.fn.shellView = function(prompt){
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
        this.queue((function(){
            this.attr(ATTR_BLINK_TIMER, setInterval((function(){
                this.cursor().toggle();
            }).bind(this), 500));
            this.dequeue();
        }).bind(this));
        return this;
    };
    $.fn.stopBlink = function(cursorVisible){
        this.queue((function(){
            clearInterval(this.attr(ATTR_BLINK_TIMER));
            if(cursorVisible){
                this.cursor().show();
            } else{
                this.cursor().hide();
            }
            this.dequeue();
        }).bind(this));
        return this;
    };

    /*
     * output
     */
    $.fn.newLine = function(){
        this.queue((function(){
            this.stdout().append($('<br>'));
            this.scrollTop(this.stdout().height());
            this.dequeue();
        }).bind(this));
        this.scrollTop(this.stdout().height());
        return this;
    };
    $.fn.print = function(text){
        this.queue((function(){
            this.stdout().append(text);
            this.scrollTop(this.stdout().height());
            this.dequeue();
        }).bind(this));
        return this;
    };
    $.fn.type = function(text, interval){
        if(typeof(interval) == 'undefined'){
            interval = 100;
        }
        this.stopBlink(true);
        for(var i = 0; i < text.length; i++){
            this.print(text[i]).delay(interval);
        }
        this.startBlink();
        return this;
    };
    $.fn.echo = function(text){
        return this.newLine().print(text);
    };
    $.fn.prompt = function(){
        return this.echo(this.attr(ATTR_PROMPT));
    };

}(this, jQuery))
