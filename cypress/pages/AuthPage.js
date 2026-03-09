class AuthPage {
    constructor() {
        this.loginEmailInput = '#email';
        this.loginPasswordInput = '#password';
        this.loginSubmitButton = '#submit';
        this.signupLink = '#signup';

        this.signupFirstNameInput = '#firstName';
        this.signupLastNameInput = '#lastName';
        this.signupEmailInput = '#email';
        this.signupPasswordInput = '#password';
        this.signupSubmitButton = '#submit';
        this.signupCancelButton = '#cancel';

        this.errorMessage = '#error';
    }

    /**
     * Navigate to the login page
     */
    navigateTo() {
        cy.visit('/');
    }

    /**
     * Navigate to the signup page
     */
    navigateToSignup() {
        cy.visit('/addUser');
    }

    /**
     * Fill the login form
     * @param {string} email - email id of the user
     * @param {string} password - password of the user
     */
    fillLoginForm(email, password) {
        cy.get(this.loginEmailInput).clear().type(email);
        cy.get(this.loginPasswordInput).clear().type(password);
    }

    /**
     * Submit the login form
     */
    submitLogin() {
        cy.get(this.loginSubmitButton).click();
    }

    /**
     * Login with email and password
     * @param {string} email - email id of the user
     * @param {string} password - password of the user
     */
    login(email, password) {
        this.fillLoginForm(email, password);
        this.submitLogin();
    }

    /**
     * Click on the signup link
     */
    clickSignupLink() {
        cy.get(this.signupLink).click();
    }

    /**
     * Fill the signup form
     * @param {string} firstName - first name of the user
     * @param {string} lastName - last name of the user
     * @param {string} email - email id of the user
     * @param {string} password - password of the user
     */
    fillSignupForm(firstName, lastName, email, password) {
        cy.get(this.signupFirstNameInput).clear().type(firstName);
        cy.get(this.signupLastNameInput).clear().type(lastName);
        cy.get(this.signupEmailInput).clear().type(email);
        cy.get(this.signupPasswordInput).clear().type(password);
    }

    /**
     * Submit the signup form
     */
    submitSignup() {
        cy.get(this.signupSubmitButton).click();
    }

    /**
     * Signup with first name, last name, email and password
     * @param {string} firstName - first name of the user
     * @param {string} lastName - last name of the user
     * @param {string} email - email id of the user
     * @param {string} password - password of the user
     */
    signup(firstName, lastName, email, password) {
        this.fillSignupForm(firstName, lastName, email, password);
        this.submitSignup();
    }

    /**
     * Type first name into the signup form without full submission
     * @param {string} firstName - first name of the user
     */
    typeSignupFirstName(firstName) {
        cy.get(this.signupFirstNameInput).clear().type(firstName);
    }

    /**
     * Type last name into the signup form without full submission
     * @param {string} lastName - last name of the user
     */
    typeSignupLastName(lastName) {
        cy.get(this.signupLastNameInput).clear().type(lastName);
    }

    /**
     * Type email into the signup form without full submission
     * @param {string} email - email id of the user
     */
    typeSignupEmail(email) {
        cy.get(this.signupEmailInput).clear().type(email);
    }

    /**
     * Type password into the signup form without full submission
     * @param {string} password - password of the user
     */
    typeSignupPassword(password) {
        cy.get(this.signupPasswordInput).clear().type(password);
    }

    /**
     * Verify the error message
     * @param {string} message - error message to verify
     */
    verifyErrorMessage(message) {
        cy.get(this.errorMessage).should('be.visible').and('contain.text', message);
    }
}

export default AuthPage;
