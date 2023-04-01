const axios = require('axios');
const fs = require('fs')
const argv = process.argv;
let content = null;

if(argv[2] === '--out') {
    if(argv[4].slice(0,4) === 'http'){
        webCat(argv[4], true);
    } else {
        cat(argv[4], true);
    }
}
else if(argv[2].slice(0,4) === 'http') {
    webCat(argv[2], false);
} else {
    cat(argv[2], false);
}


function cat(path, write) {
    fs.readFile(path, 'utf8', function(err, data) {
        if(err) {
            console.error(err);
            process.exit(1);
        } else {
            if(write) {
                fs.writeFile(argv[3], data, 'utf8', err => {
                    if(err) {
                        console.log(`Couldn't write ${argv[3]}:
                            ${err}`);
                    }
                })
            } else {
                console.log(data);
            }
        }
    })
}

async function webCat(url, write) {
    try {
        const res = await axios.get(url);
        if(write) {
            fs.writeFile(argv[3], res.data, 'utf8', err => {
                if(err) {
                    console.log(`Couldn't write ${argv[3]}:
                        ${err}`);
                }
            })
        } else {
            console.log(res.data)
        }
    } catch (err) {
        console.log(`Error fetching ${url}:
            ${err}`);
        process.exit(1);
    }
}