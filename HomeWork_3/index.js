let str = "3 2 1"
let str_arr = str.split(' ')
str_arr.forEach((elem, i, a) => a[i] = Number.parseInt(elem))
console.log(str_arr)
str_arr.sort((a, b) => a - b)
console.log(str_arr)



/*
const fs = require('fs')
const util = require('util')
const stream = require('stream')
const pipeline = util.promisify(stream.pipeline)

async function run() {
    await pipeline(
        fs.createReadStream('lowercase.txt'),
        async function* (source) {
            for await (const chunk of source) {
                yield String(chunk).toUpperCase()
            }
        },
        fs.createWriteStream('uppercase.txt')
    )
    console.log('Pipeline succeeded.')
}
run().catch(console.error)
*/

/*
const fs = require('fs')
const path = require('path')

const readStream = fs.createReadStream(path.join(__dirname, "test.txt"), {encoding: 'utf-8'})

async function print() {
  for await (const chunk of readStream) {
    console.log(chunk)
  }
}

print()
*/
