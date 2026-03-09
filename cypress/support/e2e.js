/**
 * Global support file for Cypress e2e tests.
 * Loaded before every spec file. Registers custom commands,
 * the global exception handler, and any global hooks.
 */

// Import custom commands
import './commands';

// Import and register the global exception handler
import { registerGlobalExceptionHandler } from '../utils/exceptionHandler';
registerGlobalExceptionHandler();
