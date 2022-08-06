// const fs = require("fs")

// function tokenise(text){

// }


// function get_pos_by_func_name(fn, fn_name){
//     // let tokens = tokenise(fs.readdirSync(fn))
//     let file = fs.readFileSync(fn).toString()
//     const thing = `function\s*([A-z0-9]+)?\s*\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)\s*\{(?:[^}{]+|\{(?:[^}{]+|\{[^}{]*\})*\})*\}`
//     const re = new RegExp(thing)
//     let found = file.match(re)
//     console.log(found)
// }

// get_pos_by_func_name("./src/utils.js", "get_pos_by_func_name")