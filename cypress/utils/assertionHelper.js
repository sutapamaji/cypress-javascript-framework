/**
 * Assertion helper utilities with descriptive logging.
 * Covers both UI and API assertions.
 */

import logger from './logger';

/**
 * Assert that an element is visible on the page.
 * @param {string} selector - CSS selector
 * @param {string} label - Human-readable label for logging
 */
export function assertVisible(selector, label) {
    logger.info(`Asserting element is visible: ${label} (${selector})`);
    cy.get(selector).should('be.visible').then(() => {
        logger.info(`✅ PASS — Element is visible: ${label}`);
    });
}

/**
 * Assert that an element contains expected text.
 * @param {string} selector - CSS selector
 * @param {string} expected - Expected text content
 * @param {string} label - Human-readable label
 */
export function assertText(selector, expected, label = '') {
    const description = label || `"${expected}" in (${selector})`;
    logger.info(`Asserting text content: ${description}`);
    cy.get(selector).should('contain.text', expected).then(() => {
        logger.info(`✅ PASS — Text matches: ${description}`);
    });
}

/**
 * Assert that the current URL contains the expected value.
 * @param {string} expected - Expected URL or partial URL
 */
export function assertURL(expected) {
    logger.info(`Asserting URL contains: "${expected}"`);
    cy.url().should('include', expected).then(() => {
        logger.info(`✅ PASS — URL contains: "${expected}"`);
    });
}

/**
 * Assert that a given number of elements matching a selector exist.
 * @param {string} selector - CSS selector
 * @param {number} count - Expected count
 */
export function assertElementCount(selector, count) {
    logger.info(`Asserting element count: ${count} for (${selector})`);
    cy.get(selector).should('have.length', count).then(() => {
        logger.info(`✅ PASS — Element count is ${count} for (${selector})`);
    });
}

// ──────────────────────────────────────
// API Assertion Helpers
// ──────────────────────────────────────

/**
 * Assert the HTTP response status code.
 * @param {object} response - Cypress response object
 * @param {number} expectedStatus - Expected status code
 */
export function assertStatus(response, expectedStatus) {
    logger.info(`Asserting response status: expected ${expectedStatus}, got ${response.status}`);
    expect(response.status).to.eq(expectedStatus);
    logger.info(`✅ PASS — Status is ${expectedStatus}`);
}

/**
 * Assert that the response body contains a specific key.
 * @param {object} response - Cypress response object
 * @param {string} key - Key expected in the body
 */
export function assertBodyHasKey(response, key) {
    logger.info(`Asserting response body has key: "${key}"`);
    expect(response.body).to.have.property(key);
    logger.info(`✅ PASS — Body has key: "${key}"`);
}

/**
 * Assert that a value is an array.
 * @param {*} value - Value to check
 * @param {string} label - Description for logging
 */
export function assertIsArray(value, label) {
    logger.info(`Asserting value is an array: ${label}`);
    expect(value).to.be.an('array');
    logger.info(`✅ PASS — "${label}" is an array`);
}

/**
 * Assert that a value is a non-empty string.
 * @param {*} value - Value to check
 * @param {string} label - Description for logging
 */
export function assertIsNonEmptyString(value, label) {
    logger.info(`Asserting value is a non-empty string: ${label}`);
    expect(value).to.be.a('string').and.not.be.empty;
    logger.info(`✅ PASS — "${label}" is a non-empty string`);
}

/**
 * Assert that a value is a positive number.
 * @param {*} value - Value to check
 * @param {string} label - Description for logging
 */
export function assertIsPositiveNumber(value, label) {
    logger.info(`Asserting value is a positive number: ${label} = ${value}`);
    expect(value).to.be.a('number');
    expect(value).to.be.greaterThan(0);
    logger.info(`✅ PASS — "${label}" is a positive number (${value})`);
}

/**
 * Assert that a value is a boolean.
 * @param {*} value - Value to check
 * @param {string} label - Description for logging
 */
export function assertIsBoolean(value, label) {
    logger.info(`Asserting value is a boolean: ${label} = ${value}`);
    expect(value).to.be.a('boolean');
    logger.info(`✅ PASS — "${label}" is a boolean (${value})`);
}
