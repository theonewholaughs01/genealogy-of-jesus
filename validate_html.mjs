import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('./genealogy_interactive.html', import.meta.url), 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);

if (!scriptMatch) {
  throw new Error('No inline script was found in genealogy_interactive.html.');
}

new Function(scriptMatch[1]);

const expectedFragments = [
  'Matthew 1:1&ndash;17',
  'Sources and interpretation notes',
  'SOURCE_AWARE_OVERRIDES',
  'SOURCE BOUNDARY',
  'enhanceRenderedControls',
  'prefers-reduced-motion',
  'skip-link',
];

for (const fragment of expectedFragments) {
  if (!html.includes(fragment)) {
    throw new Error(`Expected fragment missing: ${fragment}`);
  }
}

if (/\bid:41\b/.test(html)) {
  throw new Error('Mary must not remain as a numbered primary-chain record.');
}

console.log('Genealogy page validation passed.');
