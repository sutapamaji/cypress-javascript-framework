import ContactListPage from '../../../pages/ContactListPage';
import logger from '../../../utils/logger';
import viewports from '../../../constants/viewports';
import { generateUniqueEmail, generatePassword } from '../../../utils/testDataUtils';

const contactListPage = new ContactListPage();

viewports.forEach((viewport) => {
    describe(`Contact List Navigation — ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
        const testEmail = generateUniqueEmail('navcontact', viewport.name);
        const testPassword = generatePassword();

        let loginToken;

        before(() => {
            cy.signupViaApi('NavContact', 'Tester', testEmail, testPassword).then((response) => {
                loginToken = response.body.token;
            });
        });

        beforeEach(() => {
            cy.viewport(viewport.width, viewport.height);
            cy.intercept('GET', '/contacts').as('getContacts');
            cy.loginViaApi(testEmail, testPassword);
            cy.visit('/contactList');
            cy.wait('@getContacts').its('response.statusCode').should('eq', 200);
        });

        after(() => {
            if (loginToken) {
                cy.deleteUserViaApi(loginToken);
            }
        });

        it('should return to contact list from contact detail view', () => {
            cy.fixture('contacts').then((contacts) => {
                const contact = {
                    ...contacts.newContact,
                    email: generateUniqueEmail('navcontact', viewport.name),
                };

                cy.intercept('GET', '/contacts/*').as('getContact');

                cy.addContactViaApi(loginToken, contact);
                cy.visit('/contactList');
                cy.wait('@getContacts');

                logger.info('Opening contact details');
                contactListPage.getContactByName(`${contact.firstName} ${contact.lastName}`).click();
                cy.url().should('include', '/contactDetails');

                cy.wait('@getContact').its('response.statusCode').should('eq', 200);

                logger.info('Returning to contact list');
                contactListPage.clickReturnToContactList();
                cy.wait('@getContacts').its('response.statusCode').should('eq', 200);

                contactListPage.verifyPageLoaded();
                contactListPage.verifyContactExists(contact.firstName, contact.lastName);
                logger.info('Successfully returned to contact list');
            });
        });

        it('should verify contact list renders correctly after login', () => {
            logger.info('Verifying contact list renders after login');
            contactListPage.verifyPageLoaded();
            cy.get(contactListPage.addContactButton).should('be.visible');
            cy.get(contactListPage.logoutButton).should('be.visible');
            logger.info('Contact list rendered correctly');
        });
    });
});
