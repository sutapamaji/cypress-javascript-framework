# UI Test Cases — Contact List Application

Note: All UI tests run on Desktop (1280×800) and Mobile (375×667) viewports.

---

## 1. User Login (login.cy.js)

**TC-01: Verify successful login with valid credentials**

Steps:
1. Navigate to login page.
2. Enter valid email and password.
3. Click Submit.

Expected Result: User is redirected to `/contactList` and the page loads correctly.

**TC-02: Verify login fails with invalid password**

Steps:
1. Navigate to login page.
2. Enter valid email and incorrect password.
3. Click Submit.

Expected Result: Error message "Incorrect username or password" is displayed.

**TC-03: Verify login fails with unregistered email**

Steps:
1. Navigate to login page.
2. Enter an unregistered email and a valid password.
3. Click Submit.

Expected Result: Error message "Incorrect username or password" is displayed.

**TC-04: Verify login fails with empty email and empty password**

Steps:
1. Navigate to login page.
2. Click Submit without entering any credentials.

Expected Result: User remains on the login page.

**TC-05: Verify login fails with valid email but empty password**

Steps:
1. Navigate to login page.
2. Enter valid email, leave password empty.
3. Click Submit.

Expected Result: User remains on the login page.

**TC-06: Verify login fails with empty email but valid password**

Steps:
1. Navigate to login page.
2. Leave email empty, enter valid password.
3. Click Submit.

Expected Result: User remains on the login page.

**TC-07: Verify login fails with invalid email format**

Steps:
1. Navigate to login page.
2. Enter an invalid email format (e.g. `not-an-email`) and a valid password.
3. Click Submit.

Expected Result: Error message "Incorrect username or password" is displayed.

---

## 2. User Signup (signup.cy.js)

**TC-08: Verify successful signup for a new user**

Steps:
1. Navigate to signup page.
2. Fill first name, last name, email, and password.
3. Click Submit.

Expected Result: User is redirected to `/contactList` and "Add Contact" button is visible.

**TC-09: Verify signup fails with a duplicate email**

Steps:
1. Navigate to signup page.
2. Fill the form using an already registered email.
3. Click Submit.

Expected Result: Error message "Email address is already in use" is displayed.

**TC-10: Verify signup fails with a short password**

Steps:
1. Navigate to signup page.
2. Fill all fields with a 4-character password.
3. Click Submit.

Expected Result: Error message about validation failure is displayed.

**TC-11: Verify progressive field validation on the signup form**

Steps:
1. Click Submit on an empty form.
2. Fill first name, click Submit.
3. Fill last name, click Submit.
4. Fill email, click Submit.

Expected Result: Each step reduces the number of visible validation errors by one.

**TC-12: Verify signup fails with missing last name**

Steps:
1. Navigate to signup page.
2. Fill first name, email, and password. Skip last name.
3. Click Submit.

Expected Result: Error message indicating last name is required is displayed.

---

## 3. Add Contact (addContact.cy.js)

**TC-13: Verify adding a contact with all fields populated**

Steps:
1. Login and navigate to Contact List.
2. Click "Add Contact".
3. Fill all fields.
4. Click Submit.

Expected Result: Contact appears in the contact list.

**TC-14: Verify adding a contact with only required fields**

Steps:
1. Login and navigate to Contact List.
2. Click "Add Contact".
3. Fill only first name and last name.
4. Click Submit.

Expected Result: Contact appears in the contact list.

**TC-15: Verify newly added contact appears in the contact list**

Steps:
1. Login and navigate to Contact List.
2. Look for the previously added contact.

Expected Result: The contact is visible in the list.

**TC-16: Verify error when submitting empty contact form**

Steps:
1. Login and navigate to Contact List.
2. Click "Add Contact".
3. Click Submit without filling any field.

Expected Result: An error message is visible on the form.

**TC-17: Verify contact is not saved when cancel is clicked**

Steps:
1. Login and navigate to Contact List.
2. Click "Add Contact".
3. Fill the form with data.
4. Click Cancel.

Expected Result: Contact does NOT appear in the contact list.

---

## 4. Edit Contact (editContact.cy.js)

**TC-18: Verify editing address details of an existing contact**

Steps:
1. Login and navigate to Contact List.
2. Click on an existing contact.
3. Click "Edit Contact".
4. Update street, city, state, postal code, and country.
5. Click Submit.

Expected Result: User is redirected to the contact details page. All updated address fields reflect the new values.

---

## 5. Delete Contact (deleteContact.cy.js)

**TC-19: Verify deleting an existing contact**

Steps:
1. Login and navigate to Contact List.
2. Click on a contact.
3. Click "Delete Contact".
4. Confirm the deletion dialog.

Expected Result: Contact is removed from the contact list.

---

## 6. Contact List Navigation (contactList.cy.js)

**TC-20: Verify returning to the contact list from the contact detail view**

Steps:
1. Login and navigate to Contact List.
2. Click on a contact to view its details.
3. Click "Return to Contact List".

Expected Result: User returns to the contact list and the contact is still visible.

**TC-21: Verify contact list page renders correctly after login**

Steps:
1. Login and navigate to Contact List.

Expected Result: "Add Contact" button and "Logout" button are both visible.

---

## 7. Multi-User Registration and Login (multiUserLogin.cy.js)

**TC-22: Verify 5 users can be registered and logged in successfully**

Steps:
1. Register a new user.
2. Login with the new user.
3. Verify "Add Contact" button is visible on the contact list.
4. Logout and repeat for 5 users total.

Expected Result: All 5 users can register, login, and access their own contact list successfully.
