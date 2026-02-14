#!/usr/bin/env node
'use strict';

/**
 * Validate Ghost custom theme settings wiring.
 *
 * Checks:
 * 1) Every @custom.key used in templates/CSS/JS is declared in package.json.
 * 2) Declared-but-unused keys are reported as warnings (allowed by Ghost).
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const packageJsonPath = path.join(rootDir, 'package.json');

const scanExtensions = new Set(['.hbs', '.css', '.js']);
const skipDirs = new Set(['node_modules', '.git', '.DS_Store']);
const scanRoots = [
  path.join(rootDir, 'partials'),
  path.join(rootDir, 'assets', 'css'),
  path.join(rootDir, 'assets', 'js')
];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    if (skipDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, out);
      continue;
    }
    if (scanExtensions.has(path.extname(entry.name))) {
      out.push(fullPath);
    }
  }
  return out;
}

function getRootTemplates() {
  if (!fs.existsSync(rootDir)) return [];
  return fs
    .readdirSync(rootDir, {withFileTypes: true})
    .filter((entry) => entry.isFile() && path.extname(entry.name) === '.hbs')
    .map((entry) => path.join(rootDir, entry.name));
}

function getDeclaredKeys() {
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const custom = (pkg.config && pkg.config.custom) || {};
  return new Set(Object.keys(custom));
}

function getReferencedKeys(files) {
  const keyRegex = /@custom\.([A-Za-z0-9_]+)/g;
  const refs = new Set();

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = keyRegex.exec(content)) !== null) {
      refs.add(match[1]);
    }
  }

  return refs;
}

function sortedDiff(left, right) {
  return [...left].filter((x) => !right.has(x)).sort();
}

const files = Array.from(new Set([
  ...getRootTemplates(),
  ...scanRoots.flatMap((dir) => walk(dir))
]));
const declared = getDeclaredKeys();
const referenced = getReferencedKeys(files);

const usedButUndeclared = sortedDiff(referenced, declared);
const declaredButUnused = sortedDiff(declared, referenced);

if (usedButUndeclared.length) {
  console.error('\nUsed but not declared in package.json:');
  for (const key of usedButUndeclared) {
    console.error(`- ${key}`);
  }
  console.error(`\nDeclared: ${declared.size}, Referenced: ${referenced.size}`);
  process.exit(1);
}

if (declaredButUnused.length) {
  console.warn('\nDeclared but unused in templates/assets (allowed):');
  for (const key of declaredButUnused) {
    console.warn(`- ${key}`);
  }
}

console.log('\nCustom setting wiring OK.');
console.log(`Declared: ${declared.size}, Referenced: ${referenced.size}`);
process.exit(0);
