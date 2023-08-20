const VALID_KEYS_PATH = __dirname + '/valid-keys.txt';
let fs = require('fs')

async function readFile() {
    try {
        let fileContent = await fs.readFileSync(VALID_KEYS_PATH, 'utf-8')
        return fileContent
    } catch (error) {
     console.log('readFile error')
    }
}

module.exports = async function (req, res, next) {
    let headerAuthValue = req.headers["auth_token"]
    let fileContent = await readFile()
    let fileContentArray = fileContent.split(',')
    let authPass = fileContentArray.find((each => each === headerAuthValue))
    if (authPass) {
        next()
    }else{
        res.status('401').send("Unauthorized")
    }

};
