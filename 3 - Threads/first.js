const fs = require('fs')
const path = require('path')
const EventEmitter = require('events')

const myEmitter = new EventEmitter()

const readStream0 = fs.createReadStream(path.join(__dirname, "/files/0.txt"), {encoding: 'utf-8'})
const writeStream1 = fs.createWriteStream(path.join(__dirname, "/files/1.txt"), {encoding: 'utf-8'})
const writeStream2 = fs.createWriteStream(path.join(__dirname, "/files/2.txt"), {encoding: 'utf-8'})

let chunk = 'abc'
let buff = []
let isSorted = false

readStream0.on('readable', () => { myEmitter.emit('writeSortedDataToFiles') })

myEmitter.on('writeSortedDataToFiles', async () => { 
  
  if (isSorted)
    return 

  // Read the first half
  chunk = await readStream0.read(4)

  buff = []
  buff = buff.concat(chunk.split(''))
  buff.forEach((element, i, a) => a[i] = Number.parseInt(element))
  buff.sort((a, b) => a - b)

  for (let i = 0; i < buff.length; i++)
    writeStream1.write(`${buff[i]}`)

  // Read the second half
  chunk = await readStream0.read(4)

  buff = []
  buff = buff.concat(chunk.split(''))
  buff.forEach((element, i, a) => a[i] = Number.parseInt(element))
  buff.sort((a, b) => a - b)

  for (let i = 0; i < buff.length; i++)
    writeStream2.write(`${buff[i]}`)
  
  isSorted = true
})