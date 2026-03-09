/**
 * Centralized constant for validation/error messages used across the test suite.
 * Acts as an enum for consistent assertion text.
 */
const ValidationMessages = {
    SIGNUP: {
        DUPLICATE_EMAIL: 'Email address is already in use',
        SHORT_PASSWORD: 'User validation failed: password: Path `password` (`Ab1!`) is shorter than the minimum allowed length (7).',
        FIRST_NAME_REQUIRED: 'firstName: Path `firstName` is required.',
        LAST_NAME_REQUIRED: 'lastName: Path `lastName` is required.',
        PASSWORD_REQUIRED: 'password: Path `password` is required.',
        INVALID_EMAIL: 'email: Email is invalid'
    },
    LOGIN: {
        INCORRECT_CREDENTIALS: 'Incorrect username or password'
    },
    CONTACT: {
        CONTACT_VALIDATION_FAILED: 'Contact validation failed'
    }
};

export default ValidationMessages;
