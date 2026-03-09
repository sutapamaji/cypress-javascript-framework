import AuthPage from '../../../pages/AuthPage';
import ContactListPage from '../../../pages/ContactListPage';
import logger from '../../../utils/logger';
import { generateUniqueEmail, generateFakeEmail, generatePassword } from '../../../utils/testDataUtils';
import ValidationMessages from '../../../constants/validationMessages';
import viewports from '../../../constants/viewports';

const authPage = new AuthPage();
const contactListPage = new ContactListPage();

viewports.forEach((viewport) => {
    describe(`User Login flow — ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
        const validEmail = generateUniqueEmail('login_valid', viewport.name);
        const validPassword = generatePassword();

        let loginToken;

        before(() => {
            cy.signupViaApi('Login', 'Tester', validEmail, validPassword).then((response) => {
                loginToken = response.body.token;
            });
        });

        beforeEach(() => {
            cy.viewport(viewport.width, viewport.height);
            cy.intercept('POST', '/users/login').as('loginRequest');
            cy.intercept('GET', '/contacts').as('getContacts');

            authPage.navigateTo();
        });

        after(() => {
            if (loginToken) {
                cy.deleteUserViaApi(loginToken);
            }
        });

        it('should login successfully with valid credentials', () => {
            logger.info(`Logging in: ${validEmail}`);
            authPage.login(validEmail, validPassword);

            contactListPage.verifyPageLoaded();
            logger.info('User is able to login successfully');
        });

        it('should fail login with invalid password', () => {
            logger.info('Attempting login with wrong password');

            authPage.login(validEmail, generatePassword());

            authPage.verifyErrorMessage(ValidationMessages.LOGIN.INCORRECT_CREDENTIALS);
            logger.info('User should not be able to login with wrong password');
        });

        it('should fail login with unregistered email', () => {
            const fakeEmail = generateFakeEmail(viewport.name);

            logger.info(`Attempting login with unregistered email: ${fakeEmail}`);
            authPage.login(fakeEmail, validPassword);

            authPage.verifyErrorMessage(ValidationMessages.LOGIN.INCORRECT_CREDENTIALS);
            logger.info('User should not be able to login with unregistered email');
        });

        it('should fail login with empty credentials', () => {
            logger.info('Attempting login with empty credentials');
            authPage.submitLogin();

            cy.url().should('include', '/');
            logger.info('User should not be able to login with empty credentials');
        });

        it('should fail login with valid email but empty password', () => {
            logger.info('Attempting login with empty password');
            authPage.fillLoginForm(validEmail, '{backspace}');
            authPage.submitLogin();

            cy.url().should('include', '/');
            logger.info('User should not be able to login with empty password');
        });

        it('should fail login with empty email but valid password', () => {
            logger.info('Attempting login with empty email');
            authPage.fillLoginForm('{backspace}', validPassword);
            authPage.submitLogin();

            cy.url().should('include', '/');
            logger.info('User should not be able to login with empty email');
        });

        it('should fail login with invalid email format', () => {
            logger.info('Attempting login with invalid email format');
            authPage.login('not-an-email', validPassword);

            authPage.verifyErrorMessage(ValidationMessages.LOGIN.INCORRECT_CREDENTIALS);
            logger.info('User should not be able to login with invalid email format');
        });
    });
});
