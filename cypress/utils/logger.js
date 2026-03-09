/**
 * Structured logging utility for Cypress tests.
 * Provides INFO, WARN, ERROR, DEBUG levels with timestamps.
 * Uses Cypress.log() for in-runner visibility and console.* for terminal output.
 *
 * Usage: import logger from '../utils/logger';
 *        logger.info('Test step completed');
 */

const LOG_LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
};

class Logger {
    constructor() {
        this.level = LOG_LEVELS.DEBUG;
    }

    _getTimestamp() {
        return new Date().toISOString();
    }

    _formatMessage(level, message) {
        return `[${this._getTimestamp()}] [${level}] ${message}`;
    }

    _log(level, levelName, message) {
        if (level < this.level) return;

        const formattedMessage = this._formatMessage(levelName, message);

        // Cypress runner log (visible in the Cypress GUI command log)
        Cypress.log({
            name: levelName,
            message: formattedMessage,
            consoleProps: () => ({
                Level: levelName,
                Timestamp: this._getTimestamp(),
                Message: message,
            }),
        });

        // Terminal output
        switch (levelName) {
            case 'ERROR':
                // eslint-disable-next-line no-console
                console.error(formattedMessage);
                break;
            case 'WARN':
                // eslint-disable-next-line no-console
                console.warn(formattedMessage);
                break;
            case 'DEBUG':
                // eslint-disable-next-line no-console
                console.debug(formattedMessage);
                break;
            default:
                // eslint-disable-next-line no-console
                console.log(formattedMessage);
        }
    }

    info(message) {
        this._log(LOG_LEVELS.INFO, 'INFO', message);
    }

    warn(message) {
        this._log(LOG_LEVELS.WARN, 'WARN', message);
    }

    error(message) {
        this._log(LOG_LEVELS.ERROR, 'ERROR', message);
    }

    debug(message) {
        this._log(LOG_LEVELS.DEBUG, 'DEBUG', message);
    }

    setLevel(level) {
        if (LOG_LEVELS[level] !== undefined) {
            this.level = LOG_LEVELS[level];
        }
    }
}

// Export as singleton
const logger = new Logger();
export default logger;
