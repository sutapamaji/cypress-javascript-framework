/**
 * Centralized viewport configurations for multi-device testing.
 * These are used to dynamically generate test suites across different resolutions.
 */
const viewports = [
    { name: 'desktop', width: 1280, height: 800 },
    { name: 'mobile', width: 375, height: 667 },
];

export default viewports;
