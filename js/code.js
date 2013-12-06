$(function(){
    var $shell = $('#shell');
    $shell.typist({
        height: $shell.height(),
        width: $shell.width(),
        backgroundColor: '#fff',
        textColor: '#444',
        fontFamily: '"Droid Sans Mono", sans-serif;'
    }).typist('prompt');

    demmy.code.run($shell, demmy.code.c);
    window.setInterval(function(){
        if($shell.queue().length == 0){
            demmy.code.run($shell, demmy.code.c);
        }
    }, 2000);
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

    ns.c = {
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
    };

    ns.run = function($shell, code){
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
              .typist('prompt')
              .typist('wait', 500)
              .typist('type', code.compile)
              .typist('wait', 500)
              .typist('prompt')
              .typist('wait', 500)
              .typist('type', code.run)
              .typist('show', code.result)
              .typist('prompt');
    };

}(this, 'demmy', 'code'));
