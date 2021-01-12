
const input1 = {
    "name": 1,
    "items": [{
        "name": 2,
        "items": [ {"name": 3}, {"name": 4}]
    }, {
        "name": 5,
        "items": [{"name": 6}]
    }]
}

const input2 = {
    "name": 1
}


let depth = 0
function tree (input) {
    depth++
    let outStr = ""
    for (let i = 0; i < depth - 1; i++) 
        outStr += "' "
    outStr += "߅ "
    outStr += input["name"]
    console.log(outStr)
    
    if (input["items"] === undefined) {
        depth--
        return
    }

    for (let i = 0; i < input["items"].length; i++)
        tree(input["items"][i])
    depth--
    return
}

tree(input1)
console.log("\n")
tree(input2)
