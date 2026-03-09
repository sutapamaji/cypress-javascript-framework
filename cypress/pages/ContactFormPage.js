const SELECTORS = {
    firstNameInput: '#firstName',
    lastNameInput: '#lastName',
    birthdateInput: '#birthdate',
    emailInput: '#email',
    phoneInput: '#phone',
    street1Input: '#street1',
    street2Input: '#street2',
    cityInput: '#city',
    stateProvinceInput: '#stateProvince',
    postalCodeInput: '#postalCode',
    countryInput: '#country',
    submitButton: '#submit',
    cancelButton: '#cancel',
    editContactButton: '#edit-contact',
    deleteContactButton: '#delete',
    returnButton: '#return',
    errorMessage: '#error',
};

class ContactFormPage {
    constructor() {
        this.firstNameInput = SELECTORS.firstNameInput;
        this.lastNameInput = SELECTORS.lastNameInput;
        this.birthdateInput = SELECTORS.birthdateInput;
        this.emailInput = SELECTORS.emailInput;
        this.phoneInput = SELECTORS.phoneInput;
        this.street1Input = SELECTORS.street1Input;
        this.street2Input = SELECTORS.street2Input;
        this.cityInput = SELECTORS.cityInput;
        this.stateProvinceInput = SELECTORS.stateProvinceInput;
        this.postalCodeInput = SELECTORS.postalCodeInput;
        this.countryInput = SELECTORS.countryInput;

        this.submitButton = SELECTORS.submitButton;
        this.cancelButton = SELECTORS.cancelButton;
        this.editContactButton = SELECTORS.editContactButton;
        this.deleteContactButton = SELECTORS.deleteContactButton;
        this.returnButton = SELECTORS.returnButton;
        this.errorMessage = SELECTORS.errorMessage;
    }

    /**
     * Fills the contact form with the given contact data
     * @param {object} contactData - Contact data to fill
     */
    fillContactForm(contactData) {
        if (contactData.firstName) {
            cy.get(this.firstNameInput).clear().type(contactData.firstName);
        }
        if (contactData.lastName) {
            cy.get(this.lastNameInput).clear().type(contactData.lastName);
        }
        if (contactData.birthdate) {
            cy.get(this.birthdateInput).clear().type(contactData.birthdate);
        }
        if (contactData.email) {
            cy.get(this.emailInput).clear().type(contactData.email);
        }
        if (contactData.phone) {
            cy.get(this.phoneInput).clear().type(contactData.phone);
        }
        if (contactData.street1) {
            cy.get(this.street1Input).clear().type(contactData.street1);
        }
        if (contactData.street2) {
            cy.get(this.street2Input).clear().type(contactData.street2);
        }
        if (contactData.city) {
            cy.get(this.cityInput).clear().type(contactData.city);
        }
        if (contactData.stateProvince) {
            cy.get(this.stateProvinceInput).clear().type(contactData.stateProvince);
        }
        if (contactData.postalCode) {
            cy.get(this.postalCodeInput).clear().type(contactData.postalCode);
        }
        if (contactData.country) {
            cy.get(this.countryInput).clear().type(contactData.country);
        }
    }

    /**
     * Fills the address fields with the given address data
     * @param {object} addressData - Address data to fill
     */
    fillAddressFields(addressData) {
        if (addressData.street1) {
            cy.get(this.street1Input).clear().type(addressData.street1);
        }
        if (addressData.street2) {
            cy.get(this.street2Input).clear().type(addressData.street2);
        }
        if (addressData.city) {
            cy.get(this.cityInput).clear().type(addressData.city);
        }
        if (addressData.stateProvince) {
            cy.get(this.stateProvinceInput).clear().type(addressData.stateProvince);
        }
        if (addressData.postalCode) {
            cy.get(this.postalCodeInput).clear().type(addressData.postalCode);
        }
        if (addressData.country) {
            cy.get(this.countryInput).clear().type(addressData.country);
        }
    }

    /**
     * Submits the contact form
     */
    submitForm() {
        cy.get(this.submitButton).click();
    }

    /**
     * Submits the edit contact form
     */
    submitEdit() {
        cy.get(this.submitButton).click();
    }

    /**
     * Clicks the edit contact button
     */
    clickEditContact() {
        cy.get(this.editContactButton).click();
    }

    /**
     * Clicks the delete contact button
     */
    clickDeleteContact() {
        cy.get(this.deleteContactButton).click();
    }

    /**
     * Clicks the return button
     */
    clickReturn() {
        cy.get(this.returnButton).click();
    }

    /**
     * Cancels the contact form
     */
    cancelForm() {
        cy.get(this.cancelButton).click();
    }

    /**
     * Verifies the detail field with the given field selector and expected value
     * @param {string} fieldSelector - Field selector
     * @param {string} expectedValue - Expected value
     */
    verifyDetailField(fieldSelector, expectedValue) {
        cy.get(fieldSelector).should('have.text', expectedValue);
    }

    /**
     * Verifies the street1 field with the given expected value
     * @param {string} expected - Expected value
     */
    verifyStreet1(expected) {
        this.verifyDetailField(this.street1Input, expected);
    }

    /**
     * Verifies the city field with the given expected value
     * @param {string} expected - Expected value
     */
    verifyCity(expected) {
        this.verifyDetailField(this.cityInput, expected);
    }

    /**
     * Verifies the state province field with the given expected value
     * @param {string} expected - Expected value
     */
    verifyStateProvince(expected) {
        this.verifyDetailField(this.stateProvinceInput, expected);
    }

    /**
     * Verifies the postal code field with the given expected value
     * @param {string} expected - Expected value
     */
    verifyPostalCode(expected) {
        this.verifyDetailField(this.postalCodeInput, expected);
    }

    /**
     * Verifies the country field with the given expected value
     * @param {string} expected - Expected value
     */
    verifyCountry(expected) {
        this.verifyDetailField(this.countryInput, expected);
    }

    /**
     * Verifies that the street1 input field contains the expected value
     * @param {string} expectedValue - Expected value
     */
    verifyStreet1InputHasValue(expectedValue) {
        cy.get(this.street1Input).should('have.value', expectedValue);
    }
}

export default ContactFormPage;
