# Cypress Automation Framework — Contact List App

Production-grade Cypress test automation framework for the [Contact List App](https://thinking-tester-contact-list.herokuapp.com/), built with Page Object Model, structured logging, and cross-browser/viewport support.

---

## Prerequisites

| Requirement | Version |
|---|---|
| Node.js | >= 18.x |
| npm | >= 9.x |
| Cypress | ^15.x |
| Browsers | Chrome, Firefox (installed locally) |

---

## Installation

```bash
git clone <repository-url>
cd cypress-javascript-framework
npm install
```

---

## Running Tests

### All UI Tests

```bash
# Chrome
npm run test:ui

# Firefox
npm run test:ui:firefox
```

### Parallel UI Tests (Fastest)

Runs the UI tests in 2 parallel chunks on your local machine using `cypress-split` and `concurrently`.

```bash
npm run test:ui:parallel
```

### All API Tests

```bash
npm run test:api
```

### Headed Mode (Watch Tests Execute)

```bash
npm run test:staging:headed
```

### Interactive Mode (Cypress GUI)

```bash
npm run cy:open
```

---

## Optimized Workflows

This framework includes automated reporting and cleanup:

```bash
# Clean all reports
npm run clean

# Run ALL tests + Merge reports + Generate HTML Report (Production Workflow)
npm run test:full

# Generate and open report manually
npm run report:all
npm run report:open
```

---

## Viewing the HTML Report

After running tests, generate and open the Mochawesome HTML report:

```bash
npm run report:merge
npm run report:generate
npm run report:open
```

Reports are saved in the `reports/` directory.

---

## Project Structure

```
cypress-javascript-framework/
├── cypress/
│   ├── e2e/                          # Test specs by feature area
│   │   ├── ui/
│   │   │   ├── authentication/
│   │   │   │   ├── login.cy.js       # Login tests (happy + negative paths)
│   │   │   │   └── signup.cy.js      # Signup tests (happy + negative paths)
│   │   │   ├── contacts/
│   │   │   │   ├── addContact.cy.js      # Add contact tests
│   │   │   │   ├── contactList.cy.js     # Contact list navigation tests
│   │   │   │   ├── deleteContact.cy.js   # Delete contact tests
│   │   │   │   └── editContact.cy.js     # Edit contact tests
│   │   │   └── multiUser/
│   │   │       └── multiUserLogin.cy.js  # Multi-user registration + login
│   │   └── api/
│   │       └── pokeapi/
│   │           ├── pokemonDetails.cy.js  # Pokémon detail endpoint tests
│   │           └── pokemonList.cy.js     # Pokémon list endpoint tests
│   ├── pages/                        # Page Object Model classes
│   │   ├── AuthPage.js               # Login + Signup page actions
│   │   ├── ContactListPage.js        # Contact list page actions
│   │   └── ContactFormPage.js        # Add / Edit / Delete contact actions
│   ├── constants/                    # Shared constants & enums
│   │   ├── viewports.js              # Centralized viewport config (Desktop/Mobile)
│   │   └── validationMessages.js     # Shared error/validation messages
│   ├── fixtures/                     # Static test data (JSON)
│   │   ├── users.json                # Multi-user test data (firstName + lastName)
│   │   └── contacts.json             # Contact test data (add, edit, delete)
│   ├── support/
│   │   ├── commands.js               # Custom Cypress commands (API shortcuts)
│   │   └── e2e.js                    # Global hooks and imports
│   └── utils/
│       ├── testDataUtils.js          # Dynamic test data generators (email, password, phone)
│       ├── logger.js                 # Structured logging utility
│       ├── assertionHelper.js        # Wrapped assertion helpers (UI + API)
│       └── exceptionHandler.js       # Global exception handler
├── environments/                     # Environment config
│   └── stage.json                    # Stage environment config
├── reports/                          # Generated reports (git-ignored)
├── cypress.config.js                 # Main Cypress config
├── .eslintrc.json                    # ESLint config
├── .prettierrc                       # Prettier config
├── .gitignore
├── package.json
└── README.md
```

---

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `CYPRESS_ENV` | Environment config to load (`staging`) | `staging` |
| `CYPRESS_BASE_URL` | Override the base URL | `https://thinking-tester-contact-list.herokuapp.com` |

---

## Test Coverage

### UI Tests

| Feature | Spec File | Tests |
|---|---|---|
| Login | `authentication/login.cy.js` | Valid login, wrong password, unregistered email, empty credentials, empty password, empty email, invalid email format |
| Signup | `authentication/signup.cy.js` | New user, duplicate email, missing fields, short password, missing last name |
| Add Contact | `contacts/addContact.cy.js` | All fields, required fields only, verify in list, empty form error, cancel without saving |
| Contact List | `contacts/contactList.cy.js` | Return from detail view, list renders after login |
| Delete Contact | `contacts/deleteContact.cy.js` | Delete and verify removal |
| Edit Contact | `contacts/editContact.cy.js` | Edit address and verify persistence |
| Multi-User Login | `multiUser/multiUserLogin.cy.js` | Register 5 users and login with each |

All UI tests run across **desktop (1280×800)** and **mobile (375×667)** viewports.

### API Tests

| Endpoint | Spec File | Tests |
|---|---|---|
| `GET /pokemon` | `pokeapi/pokemonList.cy.js` | Status, count, results structure, pagination, default limit |
| `GET /pokemon/{id}` | `pokeapi/pokemonDetails.cy.js` | Status, id, name, base_experience, height, weight, abilities, types, stats, sprites |

---

## Linting

```bash
npm run lint
npm run lint:fix
```

---

## Troubleshooting

### Cypress Fails to Start (`MODULE_NOT_FOUND`)

If you see an error like `Error: Cannot find module '.../index.js'` with a `MODULE_NOT_FOUND` code, it means the environment variable `ELECTRON_RUN_AS_NODE` is currently set in your terminal. 

**Why this happens:** This variable tells Electron (which powers Cypress) to behave like a standard Node process instead of a browser app. This prevents Cypress from launching correctly. It might have been set by a debugging tool or a previous command in your terminal session.

**Fix:**
Unset the variable before running Cypress:
```bash
unset ELECTRON_RUN_AS_NODE
npm run test:ui
```
---

## Future Framework Improvements

1. **Secret Management (.env)**: While security best practices typically dictate using `cypress-dotenv` to read from local `.env` files (rather than chaining `CYPRESS_ENV=stage` inline), this was intentionally omitted. Implementing it would require reviewers and new developers to manually create local `.env` files before running tests, increasing setup complexity and friction for this project.
