const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const path = require('path');

// Define a custom log format
const _simpleFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const _formats = {
    simple: _simpleFormat
};

// Set the log label
const _label = 'localhost';

// Define transports for logging
const _transports = {
    // Console transport for logging to the console (CloudWatch Logs)
    console: new transports.Console({ level: 'debug' }),
    // File transport for logging to a file in /tmp directory
    logFile: new transports.File({ filename: path.join('/tmp', 'localhost.log'), level: 'info'}),
    errorFile: new transports.File({ filename: path.join('/tmp', 'error.log'), level: 'error' })
};

// Create the logger with the specified format and transports
const logger = createLogger({
    level: 'info',
    format: combine(
        label({ label: _label }),
        timestamp(),
        _formats.simple
    ),
    transports: [
        _transports.console,  // Log to console
        _transports.logFile,  // Log to file /tmp/localhost.log
        _transports.errorFile // Log to file /tmp/error.log
    ]
});

module.exports = logger;
