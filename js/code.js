$(function(){
    var $hakoniwa = $("#hakoniwa");
    window.controller = $hakoniwa.initShellView();

    /*
    var $legacy = $('#legacy');
    $legacy.typist({
        height: $legacy.height(),
        width: $legacy.width(),
        backgroundColor: '#fff',
        textColor: '#444',
        fontFamily: '"Droid Sans Mono", sans-serif;'
    }).typist('prompt');

    demmy.code.random($legacy);
    */
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
            $shell.typist('wait', 500)
                  .typist('type', 'mkdir -p jp/demmy')
                  .typist('prompt');
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
        $shell.typist('wait', 500)
              .typist('type', 'ed -p @')
              .typist('wait', 1000)
              .typist('prompt', '@')
              .typist('wait', 500)
              .typist('type', 'i')
              .typist('wait', 500);
        for(var i = 0; i < code.source.length; i++){
            $shell.typist('echo', code.source[i]);
        }
        $shell.typist('echo', '.')
              .typist('prompt', '@')
              .typist('wait', 500)
              .typist('type', 'wq ' + code.file)
              .typist('echo', String(ns.length(code.source)))
              .typist('prompt');
        if(typeof(code.compile) != "undefined"){
            $shell.typist('wait', 500)
                  .typist('type', code.compile)
                  .typist('wait', 500)
                  .typist('prompt');
        }
        $shell.typist('wait', 500)
              .typist('type', code.run)
              .typist('show', code.result)
              .typist('prompt');
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
