const fs = require('fs')
const path = require('path')
const args = require('minimist')(process.argv.slice(2));

const get_files = base_directory => { 
    const isFile = fileName => fs.lstatSync(fileName).isFile()
    
    return fs.readdirSync(base_directory).map(fileName => path.join(base_directory, fileName))
                                 .filter(isFile)
                                 .map(fileName => path.basename(fileName))
}

const get_directories = base_directory => {
    const isDirectory = directoryName => fs.lstatSync(directoryName).isDirectory()

    return fs.readdirSync(base_directory).map(directoryName => path.join(base_directory, directoryName))
                                 .filter(isDirectory)
                                 .map(directoryName => path.basename(directoryName))
}

const tree = (base_directory, currentDepth, maxDepth) => {
    
    // Print base directory
    let outStr = ""
    for (let i = 0; i < currentDepth - 1; i++) 
        outStr += "' "
    outStr += "߅ "
    console.log(outStr + path.basename(base_directory))
    outStr = ""

    // If current depth is bigger than max then return
    currentDepth++
    if (currentDepth > maxDepth) {
        currentDepth--
        return
    }
    
    // Print list of internal directories
    const directories = get_directories(base_directory)
    for (let i = 0; i < directories.length; i++) 
        tree(path.join(base_directory, directories[i]), currentDepth, maxDepth)
    
    // Print list of files in base directory
    const files = get_files(base_directory)
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

const base_directory = args["_"][0]
if (base_directory === undefined) {
    console.log("ERROR: set base directory")
    return
}

const maxDepth = args["d"] || args["depth"] || 1
if (!Number.isInteger(maxDepth)) {
    console.log("ERROR: set correct depth")
    return
}

tree(base_directory, 0, maxDepth)
