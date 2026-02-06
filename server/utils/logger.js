const log = (...args) => console.log(...args);
const info = (...args) => console.log('[info]', ...args);
const warn = (...args) => console.warn('[warn]', ...args);
const error = (...args) => console.error('[error]', ...args);

module.exports = { log, info, warn, error };
