let colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",

    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",

    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m"
}

function color(str){
    str = str
        .replace(/`?\&r`?/g,  colors.Reset) // reset
        .replace(/`?\&br`?/g, colors.Bright) // bright
        .replace(/`?\&dm`?/g, colors.Dim) // dim
        .replace(/`?\&u`?/g,  colors.Underscore) // underlined
        .replace(/`?\&bl`?/g, colors.Blink) // flashing text
        .replace(/`?\&rv`?/g, colors.Reverse) // reverse
        .replace(/`?\&hd`?/g, colors.Hidden) // hidden
        .replace(/`?\&0`?/g,  colors.FgBlack) // black text
        .replace(/`?\&1`?/g,  colors.FgRed) // red text
        .replace(/`?\&2`?/g,  colors.FgGreen) // green text
        .replace(/`?\&3`?/g,  colors.FgCyan) // cyan text
        .replace(/`?\&4`?/g,  colors.FgBlue) // blue text
        .replace(/`?\&5`?/g,  colors.FgMagenta) // purple text
        .replace(/`?\&6`?/g,  colors.FgYellow) // yellow text
        .replace(/`?\&7`?/g,  colors.FgWhite) // white text
        .replace(/`?\&b0`?/g, colors.BgBlack) // prob black bg
        .replace(/`?\&b1`?/g, colors.BgRed) // red bg
        .replace(/`?\&b2`?/g, colors.BgGreen) // green bg
        .replace(/`?\&b3`?/g, colors.BgCyan) // cyan bg
        .replace(/`?\&b4`?/g, colors.BgRed) // red bg
        .replace(/`?\&b5`?/g, colors.BgMagenta) // purple/magenta bg
        .replace(/`?\&b6`?/g, colors.BgYellow) // yellow bg
        .replace(/`?\&b7`?/g, colors.BgWhite);// white bg
    return str + colors.Reset; // plus reset 
}

module.exports = {
    color,
    colors
}