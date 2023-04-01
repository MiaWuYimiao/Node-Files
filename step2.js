const axios = require('axios');
const fs = require('fs')
const argv = process.argv;
let argv2 = argv[2];

if(argv2.slice(0,4) === 'http') {
    webCat(argv2);
} else {
    cat(argv2);
}


function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if(err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`${data}`);
    })
}

async function webCat(url) {
    try {
        const res = await axios.get(url);
        console.log(res.data);
    } catch (err) {
        console.log(`Error fetching ${url}:
            ${err}`);
        process.exit(1);
    }
}