import AuthPage from '../../../pages/AuthPage';
import ContactListPage from '../../../pages/ContactListPage';
import logger from '../../../utils/logger';
import { generateUniqueEmail, generatePassword, generateRandomName } from '../../../utils/testDataUtils';
import ValidationMessages from '../../../constants/validationMessages';
import viewports from '../../../constants/viewports';

const authPage = new AuthPage();
const contactListPage = new ContactListPage();

viewports.forEach((viewport) => {
    describe(`User Signup flow — ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
        const successEmail = generateUniqueEmail('signup_success', viewport.name);
        const dupEmail = generateUniqueEmail('signup_dup', viewport.name);
        const signupPassword = generatePassword();
        const firstName = generateRandomName();
        const lastName = generateRandomName();

        let dupUserToken;
        let successUserToken;

        before(() => {
            cy.signupViaApi('Dup', 'User', dupEmail, signupPassword).then((response) => {
                dupUserToken = response.body.token;
            });
        });

        beforeEach(() => {
            cy.viewport(viewport.width, viewport.height);
            cy.intercept('POST', '/users').as('signupRequest');
            cy.intercept('GET', '/contacts').as('getContacts');

            authPage.navigateToSignup();
        });

        after(() => {
            if (dupUserToken) {
                cy.deleteUserViaApi(dupUserToken);
            }
            if (successUserToken) {
                cy.deleteUserViaApi(successUserToken);
            }
        });

        it('should successfully sign up a new user', () => {
            logger.info(`Signing up: ${successEmail} (${firstName} ${lastName})`);

            authPage.signup(firstName, lastName, successEmail, signupPassword);

            cy.wait('@signupRequest').then((interception) => {
                expect(interception.response.statusCode).to.eq(201);
                expect(interception.response.body.token).to.exist;
                successUserToken = interception.response.body.token;
            });

            cy.wait('@getContacts').its('response.statusCode').should('eq', 200);

            cy.url().should('include', '/contactList');
            cy.get(contactListPage.addContactButton).should('be.visible');
            logger.info('Signup successful redirected to contact list');
        });

        it('should fail signup with duplicate email', () => {
            logger.info(`Attempting duplicate signup for ${dupEmail}`);

            authPage.signup(firstName, lastName, dupEmail, generatePassword());

            authPage.verifyErrorMessage(ValidationMessages.SIGNUP.DUPLICATE_EMAIL);
            logger.info('Duplicate email error displayed');
        });

        it('should fail signup with a short password', () => {
            const email = generateUniqueEmail('signup_short', viewport.name);
            logger.info(`Attempting signup with short password: ${email}`);

            authPage.signup(firstName, lastName, email, 'Ab1!');

            authPage.verifyErrorMessage(ValidationMessages.SIGNUP.SHORT_PASSWORD);
            logger.info('Short password error displayed');
        });

        it('should validate each required field progressively on the signup form', () => {
            const email = generateUniqueEmail('signup_progressive', viewport.name);
            logger.info('Step 1: Submit with empty form');
            authPage.submitSignup();
            authPage.verifyErrorMessage(ValidationMessages.SIGNUP.FIRST_NAME_REQUIRED);
            authPage.verifyErrorMessage(ValidationMessages.SIGNUP.LAST_NAME_REQUIRED);
            authPage.verifyErrorMessage(ValidationMessages.SIGNUP.PASSWORD_REQUIRED);
            authPage.verifyErrorMessage(ValidationMessages.SIGNUP.INVALID_EMAIL);

            logger.info('Step 2: Fill first name, submit');
            authPage.typeSignupFirstName(firstName);
            authPage.submitSignup();
            authPage.verifyErrorMessage(ValidationMessages.SIGNUP.LAST_NAME_REQUIRED);
            authPage.verifyErrorMessage(ValidationMessages.SIGNUP.PASSWORD_REQUIRED);
            authPage.verifyErrorMessage(ValidationMessages.SIGNUP.INVALID_EMAIL);

            logger.info('Step 3: Fill last name, submit');
            authPage.typeSignupLastName(lastName);
            authPage.submitSignup();
            authPage.verifyErrorMessage(ValidationMessages.SIGNUP.PASSWORD_REQUIRED);
            authPage.verifyErrorMessage(ValidationMessages.SIGNUP.INVALID_EMAIL);

            logger.info('Step 4: Fill email, submit');
            authPage.typeSignupEmail(email);
            authPage.submitSignup();
            authPage.verifyErrorMessage(ValidationMessages.SIGNUP.PASSWORD_REQUIRED);
        });

        it('should fail signup with missing last name', () => {
            const email = generateUniqueEmail('signup_nolast', viewport.name);
            logger.info(`Attempting signup without last name: ${email}`);

            authPage.typeSignupFirstName(firstName);
            authPage.typeSignupEmail(email);
            authPage.typeSignupPassword(generatePassword());
            authPage.submitSignup();

            authPage.verifyErrorMessage(ValidationMessages.SIGNUP.LAST_NAME_REQUIRED);
            logger.info('Missing last name error displayed as expected');
        });
    });
});
