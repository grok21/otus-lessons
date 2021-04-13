const fs = require('fs')
const path = require('path')
const EventEmitter = require('events')

const readStream1 = fs.createReadStream(path.join(__dirname, "/files/1.txt"), {encoding: 'utf-8'})
const readStream2 = fs.createReadStream(path.join(__dirname, "/files/2.txt"), {encoding: 'utf-8'})
const writeStream = fs.createWriteStream(path.join(__dirname, "/files/3.txt"), {encoding: 'utf-8'})

let chunk1 = 'abc'
let chunk2 = 'abc'
let buff = []

const myEmitter = new EventEmitter()

readStream1.on('readable', () => {})
readStream2.on('readable', () => { myEmitter.emit('readPeaceOfData') })

myEmitter.on('readPeaceOfData', async () => {
  chunk1 = await readStream1.read(2)
  chunk2 = await readStream2.read(2)
  console.log(chunk1 + ' ' + chunk2 + ' ' + buff);
  if (chunk1 === null || chunk2 === null)
    myEmitter.emit('endOfCycle')
  myEmitter.emit('sortPeaceOfData')
})


myEmitter.on('sortPeaceOfData', () => {
  if (chunk1 === null || chunk2 === null)
    myEmitter.emit('endOfCycle')
  buff = []
  buff = buff.concat(chunk1.split(''))
  buff = buff.concat(chunk2.split(''))
  buff.forEach((element, i, a) => a[i] = Number.parseInt(element))
  buff.sort((a, b) => a - b)
  
  myEmitter.emit('writePeaceOfData')
})

myEmitter.on('writePeaceOfData', () => {
  for (let i = 0; i < buff.length; i++)
    writeStream.write(`${buff[i]}`)
  myEmitter.emit('readPeaceOfData')
})

myEmitter.on('endOfCycle', () => {
  console.log('The end')
})
