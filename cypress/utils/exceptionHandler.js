/**
 * Global exception handler for Cypress tests.
 * Provides selective suppression of known errors and context-rich error wrapping.
 *
 * Usage:
 *   In e2e.js: import { registerGlobalExceptionHandler } from '../utils/exceptionHandler';
 *              registerGlobalExceptionHandler();
 *
 *   In tests:  import { handleException } from '../utils/exceptionHandler';
 *              handleException(error, 'login flow');
 */

import logger from './logger';

// Regex patterns for errors that should be suppressed (not fail tests)
const SUPPRESSED_PATTERNS = [
    /ResizeObserver loop/i,
    /Cannot read properties of null/i,
    /Script error/i,
    /Non-Error promise rejection/i,
];

/**
 * Register a global uncaught exception handler with Cypress.
 * Suppresses known errors matching the configured regex patterns.
 * @param {RegExp[]} additionalPatterns - Optional additional patterns to suppress
 */
export function registerGlobalExceptionHandler(additionalPatterns = []) {
    const allPatterns = [...SUPPRESSED_PATTERNS, ...additionalPatterns];

    Cypress.on('uncaught:exception', (err) => {
        const errorMessage = err.message || String(err);

        // Check if the error matches any suppressed pattern
        const isSuppressed = allPatterns.some((pattern) => pattern.test(errorMessage));

        if (isSuppressed) {
            logger.warn(`Suppressed known error: ${errorMessage}`);
            return false; // Prevent Cypress from failing the test
        }

        logger.error(`Uncaught exception: ${errorMessage}`);
        logger.error(`Stack trace: ${err.stack || 'N/A'}`);

        // Return true to let Cypress fail the test for unknown errors
        return true;
    });

    logger.info('Global exception handler registered');
}

/**
 * Handle an exception manually with context-rich messaging.
 * Use this in catch blocks or custom command error handling.
 * @param {Error} error - The error object
 * @param {string} context - Description of where/when the error occurred
 */
export function handleException(error, context) {
    const errorMessage = error.message || String(error);
    const contextMessage = `Exception in [${context}]: ${errorMessage}`;

    logger.error(contextMessage);

    if (error.stack) {
        logger.debug(`Stack trace for [${context}]: ${error.stack}`);
    }

    // Attach the error context to the Cypress log for debugging
    Cypress.log({
        name: 'EXCEPTION',
        message: contextMessage,
        consoleProps: () => ({
            Context: context,
            Error: errorMessage,
            Stack: error.stack || 'N/A',
            Timestamp: new Date().toISOString(),
        }),
    });
}
