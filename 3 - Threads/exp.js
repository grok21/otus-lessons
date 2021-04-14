const fs = require('fs')
const path = require('path')
const EventEmitter = require('events')

const myEmitter = new EventEmitter()

const readStream = fs.createReadStream(path.join(__dirname, "/data_exp.txt"), {encoding: 'utf-8'})

let chunk = 'abc'
let buff = []
let isSorted = false

readStream.on('readable', () => { myEmitter.emit('writeSortedDataToFiles') })

myEmitter.on('writeSortedDataToFiles', async () => { 

  if (isSorted)
    return 

  //writeStream.pause()
  chunk = await readStream.read(2)
  readStream.destroy()
  console.log(chunk);
  //readStream.pause()

  const writeStream = fs.createWriteStream(path.join(__dirname, "/data_exp.txt"), {encoding: 'utf-8'})

  buff = []
  buff = buff.concat(chunk.split(''))
  buff.forEach((element, i, a) => a[i] = Number.parseInt(element))
  buff.sort((a, b) => a - b)

  //writeStream.resume()
  for (let i = 0; i < buff.length; i++)
    writeStream.write(`${buff[i]}`)

  isSorted = true
})