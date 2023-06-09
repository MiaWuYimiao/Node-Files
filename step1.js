const fs = require('fs')
const argv = process.argv;
let path = argv[2];


function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if(err) {
            console.error(`Error reading ${path}: 
                ${err}`);
            process.exit(1);
        }
        console.log(`${data}`);
    })
}
cat(path);
