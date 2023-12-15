#!/usr/bin/env node 


const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process'); 

const read = readline.createInterface({ input, output });

const secret_number = Math.floor(Math.random(0, 101) * 100);

console.log( "Загадано число в диапазоне от 0 до 100" );

read.on('line', (input) => {
    if (input > secret_number) {
        console.log( "Меньше" );
    } else if (input < secret_number) {
        console.log( "Больше" );
    } else {
        console.log( `Отгадано число ${secret_number}` );
        read.close();
    }
})


