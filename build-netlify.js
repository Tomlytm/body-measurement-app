#!/usr/bin/env node

// Import and run the react-scripts build with legacy OpenSSL provider
const spawn = require('child_process').spawn;

const child = spawn('node', [
  '--openssl-legacy-provider',
  './node_modules/.bin/react-scripts',
  'build'
], {
  stdio: 'inherit',
  env: {
    ...process.env,
    GENERATE_SOURCEMAP: 'false'
  }
});

child.on('exit', (code) => {
  process.exit(code);
});