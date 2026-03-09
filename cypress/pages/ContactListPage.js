/**
 * Page Object: Contact List Page
 * URL: /contactList
 * Handles the contact list view, navigation, and contact interactions.
 */
class ContactListPage {
    constructor() {
        this.addContactButton = '#add-contact';
        this.contactTable = '.contactTable';
        this.contactTableRows = '.contactTableBodyRow';
        this.logoutButton = '#logout';
        this.returnButton = '#return';
        this.pageHeader = 'h1';
    }

    /**
     * Retrieves all contact rows from the contact table.
     * @returns {Chainable<Element>} Cypress chainable element
     */
    getContactRows() {
        return cy.get(this.contactTableRows);
    }

    /**
     * Clicks the "Add Contact" button to navigate to the contact form.
     */
    clickAddContact() {
        cy.get(this.addContactButton).click();
    }

    /**
     * Clicks a contact row to navigate to the contact details page.
     * @param {number} index - The index of the contact row to click (default is 0)
     */
    clickContact(index = 0) {
        cy.get(this.contactTableRows).eq(index).click();
    }

    /**
     * Clicks the "Logout" button to navigate to the login page.
     */
    clickLogout() {
        cy.get(this.logoutButton).click();
    }

    /**
     * Retrieves a contact row by name from the contact table.
     * @param {string} name - The name of the contact to retrieve
     * @returns {Chainable<Element>} Cypress chainable element
     */
    getContactByName(name) {
        return cy.get(this.contactTableRows).contains(name);
    }

    /**
     * Clicks the "Return" button to navigate back to the contact list.
     */
    clickReturnToContactList() {
        cy.get(this.returnButton).click();
    }

    /**
     * Verifies that the contact list page is loaded.
     */
    verifyPageLoaded() {
        cy.url().should('include', '/contactList');
        cy.get(this.addContactButton).should('be.visible');
    }

    /**
     * Verifies that a contact exists in the contact table.
     * @param {string} firstName - The first name of the contact
     * @param {string} lastName - The last name of the contact
     */
    verifyContactExists(firstName, lastName) {
        cy.get(this.contactTableRows)
            .should('be.visible')
            .and('contain.text', `${firstName} ${lastName}`);
    }

    /**
     * Verifies that a contact does not exist in the contact table.
     * @param {string} firstName - The first name of the contact
     * @param {string} lastName - The last name of the contact
     */
    verifyContactNotExists(firstName, lastName) {
        cy.get(this.contactTableRows).should('not.contain.text', `${firstName} ${lastName}`);
    }
}

export default ContactListPage;
