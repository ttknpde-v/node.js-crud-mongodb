import { createLogger, format, transports } from 'winston'
import {modulesApp} from "../service/modules.app.js"
class LogApp {
    static get winstonLogging() {
        return createLogger({
            level: 'silly',
            format: format.combine(
                // get current file for output with logging
                format.label({ label: modulesApp.path.basename(modulesApp.process.argv[1]) }),
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.printf(format => `${format.timestamp} ${format.level} [${format.label}] : ${format.message}`)
            ),
            transports: [
                new transports.Console // get logging to console
            ]
        }) // createLogger({})
    }

}

export default LogApp.winstonLogging

// LogApp.winstonLogging.info(new Date().toISOString())