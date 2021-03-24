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
