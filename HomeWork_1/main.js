
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
    let out_str = ""
    for (let i = 0; i < depth; i++) 
        out_str += "--"
    out_str += input["name"]
    console.log(out_str)
    
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
