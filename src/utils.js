const fs = require("fs")

function get_func_pos_by_name(file, fn_name){

    let [data, err] = fs.readFile(file, {encoding: "utf-8", flag: "r"}, (err, data) => {
        return [data, err]
    })
    
    let lines = data.split("\n")

    return [file, line, col]
}