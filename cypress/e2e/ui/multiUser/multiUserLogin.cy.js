import ContactListPage from '../../../pages/ContactListPage';
import logger from '../../../utils/logger';
import viewports from '../../../constants/viewports';
import { generateUniqueEmail, generatePassword } from '../../../utils/testDataUtils';

const contactListPage = new ContactListPage();

viewports.forEach((viewport) => {
    describe(`Multi-User registration and login — ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
        let createdTokens = [];

        after(() => {
            createdTokens.forEach((token) => {
                cy.deleteUserViaApi(token);
            });
        });

        it('should register 5 users and login with each successfully', () => {
            cy.viewport(viewport.width, viewport.height);

            cy.fixture('users').then((users) => {
                users.forEach((user, index) => {
                    const email = generateUniqueEmail(user.firstName.toLowerCase(), viewport.name);
                    const password = generatePassword();

                    logger.info('Register new user via API');
                    cy.signupViaApi(user.firstName, user.lastName, email, password).then((response) => {
                        createdTokens.push(response.body.token);
                    });
                    logger.info(`User ${index + 1} : ${user.firstName} ${user.lastName} registered successfully`);

                    logger.info('Login with the newly created user via API');
                    cy.intercept('GET', '/contacts').as('getContacts');
                    cy.loginViaApi(email, password);
                    cy.visit('/contactList');

                    cy.wait('@getContacts').its('response.statusCode').should('eq', 200);
                    logger.info(`User ${index + 1} logged in successfully`);

                    logger.info('Verify contact list access');
                    cy.get(contactListPage.addContactButton).should('be.visible');
                    logger.info(`User ${index + 1} can access their contact list`);

                    logger.info('Logout via state clear for the next user');
                    cy.clearCookies();
                    cy.clearLocalStorage();
                });

                logger.info('All 5 users registered and logged in successfully');
            });
        });
    });
});
