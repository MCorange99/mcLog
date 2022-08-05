const Logger = require("./src/index")
const logger = new Logger(
                        debug_mode=            true,
                        enable_file_logging=   false,
                        // full_log_file_path=    "./logs/{DATE-LESS}-full.log",
                        // info_log_file_path=    "./logs/{DATE-LESS}-info.log",
                        // debug_log_file_path=   "./logs/{DATE-LESS}-debug.log",
                        // debug_text=            "[{FILE}][{POS}][debug]: {TEXT}",
                        // info_text=             "[{FILE}][{POS}][info]: {TEXT}",
                        // warn_text=             "[{FILE}][{POS}][warn]: {TEXT}",
                        // error_text=            "[{FILE}][{POS}][error]: {TEXT}",
                        // critical_text=         "[{FILE}][{POS}][critical]: {TEXT}"
                    )

function hack_nasa(){

}


logger.debug("hi", __filename, "hack_nasa")
logger.info("hi", __filename, "hack_nasa")
logger.warn("hi", __filename, "hack_nasa")
logger.error("hi", __filename, "hack_nasa")
logger.critical("hi", __filename, "hack_nasa")