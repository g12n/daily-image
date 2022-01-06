import * as bs from "browser-sync"

import { spawn } from 'child_process';

const ls = spawn('node',["index.js"]);

// .init starts the server
bs.init({
    watch: true,
    server: "./_site",
    files: [
        {
            match: ["./index.js","./svgmodels/*.js", "./modules/*.js" ],
            fn: function (event, file) {
                console.log(event)
               if(event === "change") {
                   console.log("changed");
                   spawn('node',["index.js"]);
               }

            },
            options: {
                ignored: '*.txt'
            }
        }
    ]
});

