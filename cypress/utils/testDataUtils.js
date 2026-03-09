/**
 * Test Data Utilities
 *
 * Centralised helpers for generating dynamic, unique test data
 * (emails, passwords, phone numbers) to ensure test isolation.
 */

/**
 * Generates a unique email address for test isolation.
 *
 * @param {string} prefix  - A short label describing the test context (e.g. 'login_valid').
 * @param {string} [suffix] - An optional qualifier such as a viewport name.
 * @returns {string} A unique email in the form `<prefix>_<timestamp>_<suffix>@fdjtest.com`.
 */
function generateUniqueEmail(prefix, suffix = '') {
    const uniqueId = Date.now();
    const parts = [prefix, uniqueId, suffix].filter(Boolean).join('_');
    return `${parts}@fdjtest.com`;
}

/**
 * Generates a fake / unregistered email for negative-path tests.
 *
 * @param {string} [suffix] - An optional qualifier such as a viewport name.
 * @returns {string} A unique fake email guaranteed not to exist in the system.
 */
function generateFakeEmail(suffix = '') {
    const uniqueId = Date.now();
    const parts = ['nonexistent', uniqueId, suffix].filter(Boolean).join('_');
    return `${parts}@fdjtest.com`;
}

/**
 * Generates a dynamic password that satisfies typical validation rules
 * (uppercase, lowercase, digit, special character, ≥ 10 chars).
 *
 * @returns {string} A unique password string.
 */
function generatePassword() {
    const uniqueId = Date.now().toString(36); // compact alphanumeric id
    return `Pass${uniqueId}1!`;
}

/**
 * Generates a random phone number in E.164-style format (10 digits).
 *
 * @param {string} [countryCode='1'] - Country dial code without the '+'
 * @returns {string} A phone number string, e.g. '+12125551234'
 */
function generatePhoneNumber(countryCode = '1') {
    const areaCode = Math.floor(200 + Math.random() * 800); // 200–999
    const subscriber = Math.floor(1000000 + Math.random() * 9000000); // 7 digits
    return `+${countryCode}${areaCode}${subscriber}`;
}

/**
 * Generates a random alphabetical name string.
 *
 * @param {string} prefix - A short label describing the test context (e.g. 'User').
 * @returns {string} A random string like 'UserKhjBv'.
 */
function generateRandomName(prefix = 'User') {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomStr = '';
    for (let i = 0; i < 6; i++) {
        randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${prefix}${randomStr}`;
}

module.exports = {
    generateUniqueEmail,
    generateFakeEmail,
    generatePassword,
    generatePhoneNumber,
    generateRandomName,
};
