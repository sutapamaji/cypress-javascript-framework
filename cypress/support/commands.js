/**
 * Custom Cypress commands for the Contact List App.
 * Provides API-based shortcuts for common operations like login and signup.
 */

/**
 * Login via API and store the auth token.
 * This is faster than UI-based login for test setup.
 */
Cypress.Commands.add('loginViaApi', (email, password) => {
    return cy.request({
        method: 'POST',
        url: '/users/login',
        body: { email, password },
        failOnStatusCode: false,
    }).then((response) => {
        if (response.status === 200 && response.body.token) {
            cy.setCookie('token', response.body.token);
            window.localStorage.setItem('token', response.body.token);
        }
        cy.wrap(response);
    });
});

/**
 * Signup via API to create a new user.
 * Returns the response for further assertions.
 */
Cypress.Commands.add('signupViaApi', (firstName, lastName, email, password) => {
    return cy.request({
        method: 'POST',
        url: '/users',
        body: { firstName, lastName, email, password },
        failOnStatusCode: false,
    });
});

/**
 * Delete the current user via API (cleanup).
 * Requires a valid auth token.
 */
Cypress.Commands.add('deleteUserViaApi', (token) => {
    return cy.request({
        method: 'DELETE',
        url: '/users/me',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        failOnStatusCode: false,
    });
});

/**
 * Add a contact via API for quick test setup.
 */
Cypress.Commands.add('addContactViaApi', (token, contactData) => {
    return cy.request({
        method: 'POST',
        url: '/contacts',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: contactData,
        failOnStatusCode: false,
    });
});

/**
 * Get all contacts via API.
 */
Cypress.Commands.add('getContactsViaApi', (token) => {
    return cy.request({
        method: 'GET',
        url: '/contacts',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        failOnStatusCode: false,
    });
});

/**
 * Delete a contact via API.
 */
Cypress.Commands.add('deleteContactViaApi', (token, contactId) => {
    return cy.request({
        method: 'DELETE',
        url: `/contacts/${contactId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        failOnStatusCode: false,
    });
});
/**
 * UI-based login command.
 * Navigates to the login page and performs the login flow.
 * @param {string} email - user email
 * @param {string} password - user password
 */
Cypress.Commands.add('login', (email, password) => {
    const AuthPage = require('../pages/AuthPage').default;
    const authPage = new AuthPage();
    authPage.navigateTo().login(email, password);
});

/**
 * UI-based signup command.
 * Navigates to the signup page and performs the signup flow.
 */
Cypress.Commands.add('signup', (firstName, lastName, email, password) => {
    const AuthPage = require('../pages/AuthPage').default;
    const authPage = new AuthPage();
    authPage.navigateToSignup().signup(firstName, lastName, email, password);
});
