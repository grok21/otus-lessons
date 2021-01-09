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

const tree = (base_directory, current_depth, max_depth) => {
    
    // Print base directory
    let out_str = ""
    for (let i = 0; i < current_depth; i++) 
        out_str += "--"
    console.log(out_str + path.basename(base_directory))
    out_str = ""

    // If current depth is bigger than max then return
    current_depth++
    if (current_depth > max_depth) {
        current_depth--
        return
    }
    
    // Print list of internal directories
    const directories = get_directories(base_directory)
    for (let i = 0; i < directories.length; i++) 
        tree(path.join(base_directory, directories[i]), current_depth, max_depth)
    
    // Print list of files in base directory
    const files = get_files(base_directory)
    if (files.length === 0) {
        current_depth--
        return 
    }
    for (let i = 0; i < current_depth; i++) 
        out_str += "--"
    
    for (let i = 0; i < files.length; i++)
        console.log(out_str + files[i])

    current_depth--
    return
}

const base_directory = args["_"][0]
if (base_directory === undefined) {
    console.log("ERROR: set base directory")
    return
}

const max_depth = args["d"] || args["depth"] || 1
if (!Number.isInteger(max_depth)) {
    console.log("ERROR: set correct depth")
    return
}

tree(base_directory, 0, max_depth)
