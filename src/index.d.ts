declare let colors: {
    Reset: string;
    Bright: string;
    Dim: string;
    Underscore: string;
    Blink: string;
    Reverse: string;
    Hidden: string;
    FgBlack: string;
    FgRed: string;
    FgGreen: string;
    FgYellow: string;
    FgBlue: string;
    FgMagenta: string;
    FgCyan: string;
    FgWhite: string;
    BgBlack: string;
    BgRed: string;
    BgGreen: string;
    BgYellow: string;
    BgBlue: string;
    BgMagenta: string;
    BgCyan: string;
    BgWhite: string;
};

declare function color(str: string): void;

declare class mcLog {
        public debug_mode: boolean;
        public enable_colored_logging: boolean;
        public enable_file_logging: boolean;
        public full_log_file_path: string;
        public info_log_file_path: string;
        public debug_log_file_path: string;
        public log_dir: string;
        public debug_text: string;
        public info_text: string;
        public warn_text: string;
        public error_text: string;
        public critical_text: string;
        public debug_text_color: string;
        public info_text_color: string;
        public warn_text_color: string;
        public error_text_color: string;
        public critical_text_color: string;
        public color: (str: string) => string;
        public colors: {
        	[Property in keyof(typeof colors)]: string;
        };

	public constructor (
		debug_mode?: boolean,
		enable_file_logging?: boolean,
		enable_colored_logging?: boolean,
		full_log_file_path?: string,
		info_log_file_path?: string,
		debug_log_file_path?: string,
		debug_text?: string,
		info_text?: string,
        warn_text?: string,
        error_text?: string,
        critical_text?: string,
        debug_text_color?: string,
        info_text_color?: string,
        warn_text_color?: string,
        rror_text_color?: string,
        critical_text_color?: string
	);

    /**
    * 
    * @param  {...any} args Rust like formating, use {} as placeholders. example: format("Hello {}!", "MCorange"); would return "Hello MCorange!".
    * @returns Formated string.
    */
	public static format(...args: any[]): string;
	public get_date(mode?: getDateString): string;
	public replace_placeholders(
		str?: string,
		filepath?: any,
		position?: any,
		text?: any
	): string;
	private _init_log_files(): void;
	public _log_to_file(txt: string, type: logString): void;

	public debug(text: string, file?: string, pos?: string): void;
	public info(text: string, file?: string, pos?: string): void;
	public warn(text: string, file?: string, pos?: string): void
	public error(text: string, file?: string, pos?: string): void;
	public critical(text: string, file?: string, pos?: string): void;
}

type getDateString = "time" | "time-full" | "date-less" | "full";
type logString = "full" | "info" | "debug";

export = mcLog