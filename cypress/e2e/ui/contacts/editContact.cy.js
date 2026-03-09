import ContactListPage from '../../../pages/ContactListPage';
import ContactFormPage from '../../../pages/ContactFormPage';
import logger from '../../../utils/logger';
import viewports from '../../../constants/viewports';
import { generateUniqueEmail, generatePassword } from '../../../utils/testDataUtils';

const contactListPage = new ContactListPage();
const contactFormPage = new ContactFormPage();

let contactsFixture;

viewports.forEach((viewport) => {
    describe(`Edit Contact Address — ${viewport.name} (${viewport.width}x${viewport.height})`, () => {

        const testEmail = generateUniqueEmail('editcontact', viewport.name);
        const testPassword = generatePassword();

        let loginToken;
        let activeContact;
        let updatedAddress;

        before(() => {
            cy.fixture('contacts').then((data) => {
                contactsFixture = data;
            });

            cy.signupViaApi('EditContact', 'Tester', testEmail, testPassword)
                .then((response) => {
                    loginToken = response.body.token;
                });
        });

        beforeEach(() => {

            cy.viewport(viewport.width, viewport.height);

            activeContact = {
                ...contactsFixture.newContact,
                email: generateUniqueEmail('editcontact', viewport.name),
            };

            updatedAddress = contactsFixture.updatedAddress;

            cy.addContactViaApi(loginToken, activeContact);

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

        it('should edit address details of an existing contact and verify changes persist', () => {

            cy.intercept('GET', '/contacts/*').as('getContact');
            cy.intercept('PUT', '/contacts/*').as('updateContact');

            logger.info(`Opening contact: ${activeContact.firstName} ${activeContact.lastName}`);
            contactListPage.getContactByName(`${activeContact.firstName} ${activeContact.lastName}`).click();
            cy.url().should('include', '/contactDetails');

            logger.info('Clicking edit contact button');
            contactFormPage.clickEditContact();
            cy.url().should('include', '/editContact');

            cy.wait('@getContact').its('response.statusCode').should('eq', 200);

            contactFormPage.verifyStreet1InputHasValue(activeContact.street1);

            logger.info('Updating address fields');
            contactFormPage.fillAddressFields(updatedAddress);
            contactFormPage.submitEdit();

            cy.wait('@updateContact').then((interception) => {
                const errorMsg = 'Error Body: ' + JSON.stringify(interception.response.body);
                expect(interception.response.statusCode, errorMsg).to.be.oneOf([200, 204]);
            });

            cy.url().should('include', '/contactDetails');

            contactFormPage.verifyStreet1(updatedAddress.street1);
            contactFormPage.verifyCity(updatedAddress.city);
            contactFormPage.verifyStateProvince(updatedAddress.stateProvince);
            contactFormPage.verifyPostalCode(updatedAddress.postalCode);
            contactFormPage.verifyCountry(updatedAddress.country);

            logger.info('Address details updated and verified successfully');
        });
    });
});
