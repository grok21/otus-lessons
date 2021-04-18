const fs = require('fs')
const path = require('path')
const EventEmitter = require('events')

const myEmitter = new EventEmitter()

const readStream0 = fs.createReadStream(path.join(__dirname, "/files/0.txt"), {encoding: 'utf-8'})
const writeStream1 = fs.createWriteStream(path.join(__dirname, "/files/1.txt"), {encoding: 'utf-8'})
const writeStream2 = fs.createWriteStream(path.join(__dirname, "/files/2.txt"), {encoding: 'utf-8'})

const quarterSize = 2
const halfSize = 4

let chunk0 = 'abc'
let buff0 = []
let isSorted1 = false

function sortChunkOfData (buffer, chunkk) {
  buffer = []
  buffer = buffer.concat(chunkk.split(''))
  buffer.forEach((element, i, a) => a[i] = Number.parseInt(element))
  buffer.sort((a, b) => a - b)
  return buffer
}

readStream0.on('readable', () => { myEmitter.emit('writeSortedDataToFiles') })

myEmitter.on('writeSortedDataToFiles', async () => { 

  if (isSorted1) {
    return
  }

  // Read and sort the first half of input data
  chunk0 = await readStream0.read(halfSize)
  buff0 = sortChunkOfData(buff0, chunk0)
  for (let i = 0; i < buff0.length; i++)
    writeStream1.write(`${buff0[i]}`)

  // Read and sort the first half of input data
  chunk0 = await readStream0.read(halfSize)
  buff0 = sortChunkOfData(buff0, chunk0)
  for (let i = 0; i < buff0.length; i++)
    writeStream2.write(`${buff0[i]}`)

  writeStream1.end()
  writeStream2.end()

  isSorted1 = true
})

writeStream1.on('close', () => {
  writeStream1.destroy()
  writeStream2.destroy()
  myEmitter.emit('readFromTwoFiles')
})

myEmitter.on('readFromTwoFiles', async () => {
  const readStream1 = fs.createReadStream(path.join(__dirname, "/files/1.txt"), {encoding: 'utf-8'})
  const readStream2 = fs.createReadStream(path.join(__dirname, "/files/2.txt"), {encoding: 'utf-8'})
  const writeStream3 = fs.createWriteStream(path.join(__dirname, "/files/3.txt"), {encoding: 'utf-8'})

  let chunk1 = ''
  let chunk2 = ''
  let buff1 = []
  let buff2 = []
  let isSorted2 = false

  readStream1.on('readable', () => {})
  readStream2.on('readable', () => { myEmitter.emit('readPeaceOfData') })

  myEmitter.on('readPeaceOfData', async () => { 
    
    if (isSorted2) 
      return 

    chunk1 = readStream1.read(quarterSize)
    chunk2 = readStream2.read(quarterSize)
    buff1 = sortChunkOfData(buff1, chunk1)
    buff2 = sortChunkOfData(buff2, chunk2)
    let i = 0
    let j = 0

    while (true) {
      
      if (i === buff1.length) {
        i = 0
        chunk1 = readStream1.read(quarterSize)
        if (chunk1)
          buff1 = sortChunkOfData(buff1, chunk1)
      }

      if (j === buff2.length) {
        j = 0
        chunk2 = readStream2.read(quarterSize)
        if (chunk2)
          buff2 = sortChunkOfData(buff2, chunk2)
      }

      if (!(chunk1 || chunk2))
        break

      if (!chunk1) {
        writeStream3.write(`${buff2[j]}`)
        j++
        continue
      }

      if (!chunk2) {
        writeStream3.write(`${buff1[i]}`)
        i++
        continue
      }

      if (buff1[i] < buff2[j]) {
        writeStream3.write(`${buff1[i]}`)
        i++
      } else {
        writeStream3.write(`${buff2[j]}`)
        j++
      }
    }

    isSorted2 = true
    writeStream3.end()
  })

  writeStream3.on('close', () => {
    writeStream3.destroy()
    console.log('The end');
  })
})
