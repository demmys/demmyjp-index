$(function(){
    var $shell = $('#shell');
    $shell.typist({
        height: $shell.height(),
        width: $shell.width(),
        backgroundColor: '#ecf0f1',
        textColor: '#27ae60',
        fontFamily: '"Droid Sans Mono", sans-serif;'
    });

    var code = demmy.code.C;

    $shell.typist('prompt')
          .typist('wait', 500)
          .typist('type', 'vim ' + code.file)
          .typist('wait', 1000);
    for(var i = 0; i < code.source.length; i++){
        $shell.typist('echo', code.source[i]);
    }
    $shell.typist('wait', 1000)
          .typist('prompt')
          .typist('wait', 500)
          .typist('type', code.compile)
          .typist('prompt')
          .typist('wait', 500)
          .typist('type', code.run)
          .typist('show', code.result);
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

    var es = function(text){
        for(var i = 0; i < text.length; i++){
            if(text[i] == ' '){
                text[i] = '&nbsp;';
            }
        }
        return text;
    };

    ns.C = {
        file: 'hello.c',
        source: [
            '#include <stdio.h>',
            ' ',
            'int main(int argc, char *argv[]){',
            es('    puts("Hello, World!");'),
            es('    return 0;'),
            '}'
        ],
        compile: 'gcc -o hello hello.c',
        run: './hello',
        result: 'Hello, World!'
    };

}(this, 'demmy', 'code'));
