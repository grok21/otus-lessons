const fs = require('fs')
const util = require('util')
const stream = require('stream')
const path = require('path')
const pipeline = util.promisify(stream.pipeline)
const EventEmitter = require('events')

const readStream1 = fs.createReadStream(path.join(__dirname, "/files/1.txt"), {encoding: 'utf-8'})
const readStream2 = fs.createReadStream(path.join(__dirname, "/files/2.txt"), {encoding: 'utf-8'})
const writeStream1 = fs.createWriteStream(path.join(__dirname, "/files/3.txt"))

const myEmitter = new EventEmitter()

let buff = []
let continueProcess = true

function writeChunkToTemporaryBuffer (chunk) {
  let numbersArr = chunk.split('\n')
  numbersArr.forEach((element, i, a) => a[i] = Number.parseInt(element))
  buff = buff.concat(numbersArr)
}

readStream1.on('data', chunk => {
  console.log(111);
  writeChunkToTemporaryBuffer(chunk)
  readStream1.pause()
})


readStream2.on('data', chunk => {
  console.log(222);
  writeChunkToTemporaryBuffer(chunk)
  readStream2.pause()
  myEmitter.emit('go')
})


readStream2.on('end', chunk => {
  continueProcess = false
  console.log(444);
})


myEmitter.on('go', () => {
  console.log(buff)
  buff.sort((a, b) => a - b)
  console.log(buff)
  for (let i = 0; i < buff.length; i++)
      writeStream1.write(`${buff[i]}\n`)
  buff = []
})

/*

while(continueProcess) {
  console.log(333);
  readStream1.read()
  buff.sort((a, b) => a - b)
  for (let i = 0; i < buff.length; i++)
      writeStream1.write(`${buff[i]}\n`)
  buff = []
  readStream1.resume()
  readStream2.resume()
}
*/



/*
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
