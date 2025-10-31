#!/usr/bin/env node

// Set the legacy OpenSSL provider before requiring anything else
process.env.NODE_OPTIONS = '--openssl-legacy-provider';

// Import and run the react-scripts build
const spawn = require('child_process').spawn;

const child = spawn('npm', ['run', 'build'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_OPTIONS: '--openssl-legacy-provider',
    GENERATE_SOURCEMAP: 'false'
  }
});

child.on('exit', (code) => {
  process.exit(code);
});