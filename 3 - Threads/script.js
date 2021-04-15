const fs = require('fs')
const path = require('path')
const EventEmitter = require('events')

const myEmitter = new EventEmitter()

const readStream0 = fs.createReadStream(path.join(__dirname, "/files/0.txt"), {encoding: 'utf-8'})
const writeStream1 = fs.createWriteStream(path.join(__dirname, "/files/1.txt"), {encoding: 'utf-8'})
const writeStream2 = fs.createWriteStream(path.join(__dirname, "/files/2.txt"), {encoding: 'utf-8'})

const quarterSize = 2
const halfSize = 4

let chunk = 'abc'
let buff = []
let isSorted1 = false

readStream0.on('readable', () => { myEmitter.emit('writeSortedDataToFiles') })

myEmitter.on('writeSortedDataToFiles', async () => { 

  if (isSorted1)
    return 

  // Read and sort the first half of input data
  chunk = await readStream0.read(halfSize)
  console.log(chunk);
  
  buff = []
  buff = buff.concat(chunk.split(''))
  buff.forEach((element, i, a) => a[i] = Number.parseInt(element))
  buff.sort((a, b) => a - b)

  for (let i = 0; i < buff.length; i++)
    writeStream1.write(`${buff[i]}`)

  // Read and sort the first half of input data
  chunk = await readStream0.read(halfSize)
  console.log(chunk);
  
  buff = []
  buff = buff.concat(chunk.split(''))
  buff.forEach((element, i, a) => a[i] = Number.parseInt(element))
  buff.sort((a, b) => a - b)

  for (let i = 0; i < buff.length; i++)
    writeStream2.write(`${buff[i]}`)

  writeStream1.end()
  writeStream2.end()

  myEmitter.emit('readFromTwoFiles')

  isSorted1 = true
})

myEmitter.on('readFromTwoFiles', async () => {
  const readStream1 = fs.createReadStream(path.join(__dirname, "/files/1.txt"), {encoding: 'utf-8'})
  const readStream2 = fs.createReadStream(path.join(__dirname, "/files/2.txt"), {encoding: 'utf-8'})
  const writeStream3 = fs.createWriteStream(path.join(__dirname, "/files/3.txt"), {encoding: 'utf-8'})



  readStream1.on('readable', () => {})
  readStream2.on('readable', () => { myEmitter.emit('readPeaceOfData') })

  myEmitter.on('readPeaceOfData', async () => { 
    readStream1.read(quarterSize)
    readStream2.read(quarterSize)
    



  })


})