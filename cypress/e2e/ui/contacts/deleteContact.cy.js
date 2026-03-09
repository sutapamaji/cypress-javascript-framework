import ContactListPage from '../../../pages/ContactListPage';
import ContactFormPage from '../../../pages/ContactFormPage';
import logger from '../../../utils/logger';
import viewports from '../../../constants/viewports';
import { generateUniqueEmail, generatePassword } from '../../../utils/testDataUtils';

const contactListPage = new ContactListPage();
const contactFormPage = new ContactFormPage();

viewports.forEach((viewport) => {
    describe(`Delete Contact — ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
        const testEmail = generateUniqueEmail('deletecontact', viewport.name);
        const testPassword = generatePassword();
        let loginToken;
        let activeContact;

        before(() => {
            cy.signupViaApi('DeleteContact', 'Tester', testEmail, testPassword).then((response) => {
                loginToken = response.body.token;
            });
        });

        beforeEach(() => {
            cy.viewport(viewport.width, viewport.height);
            cy.fixture('contacts').then((contacts) => {
                activeContact = {
                    ...contacts.deleteContact,
                    email: generateUniqueEmail('delcontact', viewport.name),
                };
                cy.addContactViaApi(loginToken, activeContact);
            });
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

        it('should delete an existing contact and verify it is removed', () => {
            cy.intercept('DELETE', '/contacts/*').as('deleteContact');

            contactListPage.verifyContactExists(activeContact.firstName, activeContact.lastName);

            logger.info('Opening contact to delete');
            contactListPage.getContactByName(`${activeContact.firstName} ${activeContact.lastName}`).click();
            cy.url().should('include', '/contactDetails');

            logger.info('Deleting contact');
            cy.on('window:confirm', () => true);
            contactFormPage.clickDeleteContact();

            cy.wait('@deleteContact').its('response.statusCode').should('eq', 200);

            contactListPage.verifyPageLoaded();
            contactListPage.verifyContactNotExists(activeContact.firstName, activeContact.lastName);
            logger.info('Contact deleted and verified as removed');
        });
    });
});
