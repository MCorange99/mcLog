const Color = require("./color")
const fs = require("fs")
// const path = require("path")


module.exports = class mcLog{
    constructor(
        debug_mode=                  false,
        enable_file_logging=         true,
        enable_colored_logging=      true,
        full_log_file_path=          "./logs/{DATE-LESS}-full.log",
        info_log_file_path=          "./logs/{DATE-LESS}-info.log",
        debug_log_file_path=         "./logs/{DATE-LESS}-debug.log",
        debug_text=                  "[{FILE}][{POS}][debug]: {TEXT}",
        info_text=                   "[{FILE}][{POS}][info]: {TEXT}",
        warn_text=                   "[{FILE}][{POS}][warn]: {TEXT}",
        error_text=                  "[{FILE}][{POS}][error]: {TEXT}",
        critical_text=               "[{FILE}][{POS}][critical]: {TEXT}",
        debug_text_color=            "&2[&5&u{FILE}&r&2][&5&u{POS}&r&2][&5debug&2]&r:&5 {TEXT}&r",
        info_text_color=             "&2[&4&u{FILE}&r&2][&4&u{POS}&r&2][&4info&2]&r:&4 {TEXT}&r",
        warn_text_color=             "&2[&6&u{FILE}&r&2][&6&u{POS}&r&2][&6warn&2]&r:&6 {TEXT}&r",
        error_text_color=            "&2[&1&u{FILE}&r&2][&1&u{POS}&r&2][&1error&2]&r:&1 {TEXT}&r",
        critical_text_color=         "&2[&1&u{FILE}&r&2][&1&u{POS}&r&2][&1critical&2]&r: &b1{TEXT}&r",
    ){
        this.debug_mode = debug_mode;
        this.enable_colored_logging = enable_colored_logging;
        this.enable_file_logging = enable_file_logging;
        this.full_log_file_path = full_log_file_path;
        this.info_log_file_path = info_log_file_path;
        this.debug_log_file_path = debug_log_file_path;
        this.log_dir = this.full_log_file_path.split("/").slice(0, -1).join("/");
        this.debug_text = debug_text;
        this.info_text = info_text;
        this.warn_text = warn_text;
        this.error_text = error_text;
        this.critical_text = critical_text;
        this.debug_text_color = debug_text_color;
        this.info_text_color = info_text_color;
        this.warn_text_color = warn_text_color;
        this.error_text_color = error_text_color;
        this.critical_text_color = critical_text_color;
        this._init_log_files()
        this.color = Color.color
        this.colors = Color.colors
    }

    /**
	* 
	* @param  {...any} args Rust like formating, use {} as placeholders. example: format("Hello {}!", "MCorange"); would return "Hello MCorange!".
	* @returns Formated string.
	*/
	format(...args){
        let str = args.shift()
        if (args.length < 1) return str;
    
        for (let i in args){
            str = str.replace(/`?{(?!{)}(?!})`?/, args[i]);
        }
    
    
        str = str.replace(/`?{{`?/g, "{");
        str = str.replace(/`?}}`?/g, "}");
    
        return str;
    }

    get_date(mode=null){
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        switch (mode) {
            case "time":
                return (hours + "." + minutes);
            case "time-full":
                return (hours + "." + minutes + "." + seconds);
            case "date-less":
                return (year + "-" + month + "-" + date + "-" + hours + "." + minutes);
            case "full":
            default:
                return (year + "-" + month + "-" + date + "-" + hours + "." + minutes + "." + seconds);
        }  
    }

    replace_placeholders(str="", filepath=null, position=null, text=null){
        str = str.replace(/`?{DATE}`?/g, this.get_date());
        str = str.replace(/`?{TIME}`?/g, this.get_date("time"));
        str = str.replace(/`?{TIME-FULL}`?/g, this.get_date("time-full"));
        str = str.replace(/`?{DATE-LESS}`?/g, this.get_date("date-less"));
        str = str.replace(/`?{FILE}`?/g, filepath);
        str = str.replace(/`?{POS}`?/g, position);
        str = str.replace(/`?{TEXT}`?/g, text);
        return str
    }

    _init_log_files(){
        if (!this.enable_file_logging) return

        if (!fs.existsSync(this.log_dir)) {
            fs.mkdirSync(this.log_dir)
        }

        try {
            fs.readFileSync(this.replace_placeholders(this.info_log_file_path));
        } catch {
            fs.appendFileSync(this.replace_placeholders(this.info_log_file_path), "");
        }

        try {
            fs.readFileSync(this.replace_placeholders(this.full_log_file_path));
        } catch {
            fs.appendFileSync(this.replace_placeholders(this.full_log_file_path), "");
        }
        
        fs.writeFileSync(this.replace_placeholders(this.info_log_file_path), "");
        fs.writeFileSync(this.replace_placeholders(this.full_log_file_path), "");
    }

    _log_to_file(txt, type){
        if (!this.enable_file_logging) return
        let file = "";
        switch (type){
            case "full":
                file = this.full_log_file_path
                break
            case "info":
                file = this.info_log_file_path
                break
            case "debug":
                file = this.debug_log_file_path
                break
            default:
                file = this.full_log_file_path
                break
        }
        file = this.replace_placeholders(file)
        // console.log(file)

        // (async (txt, fp) => {
        fs.appendFile(file, txt, 'utf-8', (err) => {
            if (err) throw err
        })
        // })(txt, file)
    }

    debug(text, file=null, pos=null){
        // console.log(this.debug_mode)
        if (this.debug_mode){
            this._log_to_file(this.replace_placeholders(this.debug_text, file, pos, text), "debug")
            if (this.enable_colored_logging){
                console.log(Color.color(this.replace_placeholders(this.debug_text_color, file, pos, text)))
            } else {
                console.log(this.replace_placeholders(this.debug_text, file, pos, text))  
            }
        }
    }

    info(text, file=null, pos=null){
        this._log_to_file(this.replace_placeholders(this.info_text, file, pos, text), "debug")
        this._log_to_file(this.replace_placeholders(this.info_text, file, pos, text), "full")
        this._log_to_file(this.replace_placeholders(this.info_text, file, pos, text), "info")
        if (this.enable_colored_logging){
            console.log(Color.color(this.replace_placeholders(this.info_text_color, file, pos, text)))
        } else {
            console.log(this.replace_placeholders(this.info_text, file, pos, text))
        }
    }

    warn(text, file=null, pos=null){
        this._log_to_file(this.replace_placeholders(this.warn_text, file, pos, text), "debug")
        this._log_to_file(this.replace_placeholders(this.warn_text, file, pos, text), "full")
        if (this.enable_colored_logging){
            console.log(Color.color(this.replace_placeholders(this.warn_text_color, file, pos, text)))
        } else {
            console.log(this.replace_placeholders(this.warn_text, file, pos, text))
        }
        // console.log(this.warn_text)
    }

    error(text, file=null, pos=null){
        this._log_to_file(this.replace_placeholders(this.error_text, file, pos, text), "debug")
        this._log_to_file(this.replace_placeholders(this.error_text, file, pos, text), "full")
        if (this.enable_colored_logging){
            console.log(Color.color(this.replace_placeholders(this.error_text_color, file, pos, text)))
        } else {
            console.log(this.replace_placeholders(this.error_text, file, pos, text))
        }
    }

    critical(text, file=null, pos=null){
        this._log_to_file(this.replace_placeholders(this.critical_text, file, pos, text), "debug")
        this._log_to_file(this.replace_placeholders(this.critical_text, file, pos, text), "full")
        if (this.enable_colored_logging){
            console.log(Color.color(this.replace_placeholders(this.critical_text_color, file, pos, text)))

        } else {
            console.log(this.replace_placeholders(this.critical_text, file, pos, text))
        }
    }
}