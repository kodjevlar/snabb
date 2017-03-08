// @flow
import { spawn } from 'child_process';

const folder = process.argv;

const componentTestFolder = folder[2];

if (!componentTestFolder) {
  throw new Error(`A valid path must be passed in order to test a single unit.

    Usage: npm run test:single /path/to/unit

  `);
}

spawn('node_modules/mocha/bin/mocha', [
  `${componentTestFolder}/**/*-spec.js`,
  '--compilers',
  'js:babel-core/register',
  '--watch',
  '--slow 12'
], {
  stdio: 'inherit'
});
