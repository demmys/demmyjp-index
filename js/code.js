$(function(){
    /*
     * Toggler
     */
    $(".circle-toggler").click(function(e){
        $target = $(e.target);
        $target.toggleClass("active");
        $target.parent().parent().children("ul.togglee-list").toggleClass("active");
    });

    /*
     * Header
     */
    $("header>h1").shellView()
                  .delay(500)
                  .type("demmy.jp", 200)
                  .delay(5000)
                  .stopBlink(false);

    /*
     * Hakoniwa
     */
    var $hakoniwa = $("#hakoniwa");
    $hakoniwa.shellView();
    demmy.code.random($hakoniwa);
});

(function(window, library, namespace, undefined){
'use strict'
    var lib = window[library];
    if(!lib){
        lib = {};
        window[library] = lib;
    }
    var ns = lib[namespace];
    if(!ns){
        ns = {};
        lib[namespace] = ns;
    }

    ns.length = function(source){
        var len = source.length;
        for(var i = 0; i < source.length; i++){
            if(source[i] != ' '){
                len += source[i].length;
            }
        }
        return len;
    };

    var codes = new Array();

    ns.c = codes.push({
        file: 'hello.c',
        source: [
            '#include <stdio.h>',
            ' ',
            'int main(int argc, char *argv[]){',
            '    puts("Hello, World!");',
            '    return 0;',
            '}'
        ],
        compile: 'gcc -o hello hello.c',
        run: './hello',
        result: 'Hello, World!'
    });

    ns.java = codes.push({
        before: function($shell){
            $shell.delay(500)
                  .type('mkdir -p jp/demmy')
                  .prompt();
        },
        file: 'jp/demmy/Hello.java',
        source: [
            'package jp.demmy;',
            ' ',
            'class Hello{',
            '    public static void main(String[] args){',
            '        System.out.println("Hello, World!");',
            '    }',
            '}'
        ],
        compile: 'javac jp/demmy/Hello.java',
        run: 'java jp/demmy/Hello',
        result: 'Hello, World!'
    });

    ns.run = function($shell, code){
        if(typeof(code.before) == "function"){
            code.before($shell);
        }
        $shell.delay(500)
              .type('ed -p @')
              .newLine()
              .delay(1000)
              .print('@')
              .delay(500)
              .print('i')
              .newLine()
              .delay(500)
        for(var i = 0; i < code.source.length; i++){
            $shell.type(code.source[i]).newLine();
        }
        $shell.type('.')
              .newLine()
              .print('@')
              .delay(500)
              .type('wq ' + code.file)
              .echo(String(ns.length(code.source)))
              .prompt();
        if(typeof(code.compile) != "undefined"){
            $shell.delay(500)
                  .type(code.compile)
                  .delay(500)
                  .prompt()
        }
        $shell.delay(500)
              .type(code.run)
              .echo(code.result)
              .prompt();
    };

    ns.random = function($shell){
        var r;
        var show = function(){
            r = Math.floor(Math.random() * codes.length);
            ns.run($shell, codes[r]);
        };
        window.setInterval(function(){
            var queue = $shell.queue();
            if(typeof(queue) != "undefined" && queue.length == 0){
                show();
            }
        }, 2000);
    };

}(this, 'demmy', 'code'));
