(function(window, $, undefined){
    'use strict'

    var ATTR_BLINK_TIMER = 'data-shell-view-blink-timer',
        ATTR_PROMPT = 'data-shell-view-prompt';

    $.fn.extend({
        /*
         * initialize an element for viewing shell
         */
        shellView: function(prompt){
            if(typeof(prompt) == 'undefined'){
                prompt = this.defaultPrompt();
            }
            this.append($('<span>').addClass('shell-view-command').append(prompt))
                .append($('<span>').addClass('shell-view-cursor').append('|'));
            this.attr(ATTR_PROMPT, prompt);
            return this.startBlink();
        },
        defaultPrompt: function(){
            return '$ ';
        },
        /*
         * get specific child node
         */
        cursor: function(){
            return this.children('.shell-view-cursor');
        },
        stdout: function(){
            return this.children('.shell-view-command');
        },
        /*
         * cursor blink
         */
        startBlink: function(){
            this.queue((function(){
                this.attr(ATTR_BLINK_TIMER, setInterval((function(){
                    this.cursor().toggle();
                }).bind(this), 500));
                this.dequeue();
            }).bind(this));
            return this;
        },
        stopBlink: function(cursorVisible){
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
        },

        /*
         * output
         */
        newLine: function(){
            this.queue((function(){
                this.stdout().append($('<br>'));
                this.scrollTop(this.stdout().height());
                this.dequeue();
            }).bind(this));
            this.scrollTop(this.stdout().height());
            return this;
        },
        print: function(text){
            this.queue((function(){
                this.stdout().append(text);
                this.scrollTop(this.stdout().height());
                this.dequeue();
            }).bind(this));
            return this;
        },
        type: function(text, interval){
            if(typeof(interval) == 'undefined'){
                interval = 100;
            }
            this.stopBlink(true);
            for(var i = 0; i < text.length; i++){
                this.print(text[i]).delay(interval);
            }
            this.startBlink();
            return this;
        },
        echo: function(text){
            return this.newLine().print(text);
        },
        prompt: function(prompt){
            if(typeof(prompt) == 'string'){
                this.attr(ATTR_PROMPT, prompt);
            }
            return this.echo(this.attr(ATTR_PROMPT));
        },
        clear: function(){
            this.stdout().empty().append(this.attr(ATTR_PROMPT));
        },
        /*
         * interrupt
         */
        interrupt: function(callback){
            this.queue((function(){
                callback(this);
                this.dequeue();
            }).bind(this));
            return this;
        }
    });
}(this, jQuery))
