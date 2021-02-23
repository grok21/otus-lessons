const fs = require('fs')
const path = require('path')
const args = require('minimist')(process.argv.slice(2));

const getFiles = baseDirectory => { 
    const isFile = fileName => fs.lstatSync(fileName).isFile()
    
    return fs.readdirSync(baseDirectory).map(fileName => path.join(baseDirectory, fileName))
                                 .filter(isFile)
                                 .map(fileName => path.basename(fileName))
}

const getDirectories = baseDirectory => {
    const isDirectory = directoryName => fs.lstatSync(directoryName).isDirectory()

    return fs.readdirSync(baseDirectory).map(directoryName => path.join(baseDirectory, directoryName))
                                 .filter(isDirectory)
                                 .map(directoryName => path.basename(directoryName))
}

const tree = (baseDirectory, currentDepth, maxDepth) => {
    
    // Print base directory
    let outStr = ""
    for (let i = 0; i < currentDepth - 1; i++) 
        outStr += "' "
    outStr += "߅ "
    console.log(outStr + path.basename(baseDirectory))
    outStr = ""

    // If current depth is bigger than max then return
    currentDepth++
    if (currentDepth > maxDepth) {
        currentDepth--
        return
    }
    
    // Print list of internal directories
    const directories = getDirectories(baseDirectory)
    for (let i = 0; i < directories.length; i++) 
        tree(path.join(baseDirectory, directories[i]), currentDepth, maxDepth)
    
    // Print list of files in base directory
    const files = getFiles(baseDirectory)
    if (files.length === 0) {
        currentDepth--
        return 
    }
    for (let i = 0; i < currentDepth - 1; i++) 
        outStr += "' "
    outStr += "߅ " 
    
    for (let i = 0; i < files.length; i++)
        console.log(outStr + files[i])

    currentDepth--
    return
}

const baseDirectory = args["_"][0]
if (baseDirectory === undefined) {
    console.log("ERROR: set base directory")
    return
}

const maxDepth = args["d"] || args["depth"] || 1
if (!Number.isInteger(maxDepth)) {
    console.log("ERROR: set correct depth")
    return
}

tree(baseDirectory, 0, maxDepth)
