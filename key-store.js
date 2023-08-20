const VALID_KEYS_PATH = __dirname + '/valid-keys.txt';
const fs = require('fs');
const shortid = require('shortid');
let VALID_KEYS_PATH_Write = __dirname + '/valid-keys.txt';
// To generate a unique API KEY, use shortid.generate()
const LINE_ENDING = require('os').EOL;


module.exports = function (req, res) {
    try {
        let stream = fs.createWriteStream(VALID_KEYS_PATH_Write, {flags: 'a'})
        let shortId = shortid()
        stream.write(shortId + ',')
        stream.end();
        stream.on('finish', () => {
            console.log('written successfully!');
        });
        res.status(201).send({json: shortId})
    } catch (error) {
        console.log('error', error)
        res.status(400).send("Failed")
    }
};

