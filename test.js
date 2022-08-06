const Logger = require("@mcorange9/mclog")
const logger = new Logger(
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
                    )

logger.debug("This will only show if debug mode is enabled", __filename, "hack_nasa")
logger.info(logger.format("User connected with id {}", user.id), __filename, "on_connect")
logger.warn(logger.format("Api latency is higher than expected ({}), maybe im being attacked?"), ping, __filename, "api_ping_tester")
if (!token instanceof String){
    logger.error(logger.format("Expected token type String, but found {}", typeof token), __filename, "init")
}
logger.critical("Database not responding, trying again in 30 seconds", __filename, "database.connect")








