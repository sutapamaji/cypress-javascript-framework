import ContactListPage from '../../../pages/ContactListPage';
import ContactFormPage from '../../../pages/ContactFormPage';
import AuthPage from '../../../pages/AuthPage';
import logger from '../../../utils/logger';
import viewports from '../../../constants/viewports';
import { generateUniqueEmail, generatePassword, generatePhoneNumber } from '../../../utils/testDataUtils';
import ValidationMessages from '../../../constants/validationMessages';

const contactListPage = new ContactListPage();
const contactFormPage = new ContactFormPage();
const authPage = new AuthPage();

viewports.forEach((viewport) => {
    describe(`Add Contact List — ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
        const testEmail = generateUniqueEmail('addcontact', viewport.name);
        const testPassword = generatePassword();

        let loginToken;

        before(() => {
            cy.signupViaApi('AddContact', 'Tester', testEmail, testPassword).then((response) => {
                loginToken = response.body.token;
            });
        });

        beforeEach(() => {
            cy.viewport(viewport.width, viewport.height);
            cy.intercept('POST', '/contacts').as('createContact');
            cy.intercept('GET', '/contacts').as('getContacts');
            cy.loginViaApi(testEmail, testPassword);
            cy.visit('/contactList');
        });

        after(() => {
            if (loginToken) {
                cy.deleteUserViaApi(loginToken);
            }
        });

        it('should add a contact with all fields populated', () => {
            cy.fixture('contacts').then((contacts) => {
                const contact = {
                    ...contacts.newContact,
                    email: generateUniqueEmail('contact', viewport.name),
                    phone: generatePhoneNumber(),
                };
                logger.info(`Adding contact: ${contact.firstName} ${contact.lastName}`);

                contactListPage.clickAddContact();
                contactFormPage.fillContactForm(contact);
                contactFormPage.submitForm();

                cy.wait('@createContact').its('response.statusCode').should('eq', 201);

                contactListPage.verifyPageLoaded();
                contactListPage.verifyContactExists(contact.firstName, contact.lastName);
                logger.info('Contact added with all fields');
            });
        });

        it('should add a contact with only required fields', () => {
            const minimalContact = {
                firstName: `MinReq${viewport.name}`,
                lastName: 'Contact',
            };
            logger.info(`Adding minimal contact: ${minimalContact.firstName}`);

            contactListPage.clickAddContact();
            contactFormPage.fillContactForm(minimalContact);
            contactFormPage.submitForm();

            cy.wait('@createContact').its('response.statusCode').should('eq', 201);

            contactListPage.verifyPageLoaded();
            contactListPage.verifyContactExists(minimalContact.firstName, minimalContact.lastName);
            logger.info('Minimal contact added successfully');
        });

        it('should verify new contact appears in the contact list', () => {
            cy.fixture('contacts').then((contacts) => {
                const contact = contacts.newContact;
                logger.info(`Verifying contact exists: ${contact.firstName} ${contact.lastName}`);
                contactListPage.verifyContactExists(contact.firstName, contact.lastName);
                logger.info('Contact verified in list');
            });
        });

        it('should show error when submitting empty contact form', () => {
            logger.info('Attempting to add contact with empty form');
            contactListPage.clickAddContact();
            contactFormPage.submitForm();

            authPage.verifyErrorMessage(ValidationMessages.CONTACT.CONTACT_VALIDATION_FAILED);
            logger.info('Empty form error displayed');
        });

        it('should not save contact when cancel is clicked', () => {
            const cancelContact = {
                firstName: `Cancel${viewport.name}`,
                lastName: 'NoSave',
            };
            logger.info(`Filling form then cancelling: ${cancelContact.firstName}`);

            contactListPage.clickAddContact();
            contactFormPage.fillContactForm(cancelContact);
            contactFormPage.cancelForm();

            contactListPage.verifyPageLoaded();
            contactListPage.verifyContactNotExists(cancelContact.firstName, cancelContact.lastName);
            logger.info('Cancelled contact not saved');
        });
    });
});
