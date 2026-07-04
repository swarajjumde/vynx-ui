// Lightweight docs integrity check - no dependencies, no browser/DOM APIs.
// Verifies that each foundation component has a JavaScript-first doc with the
// required sections, and that the Lynx runtime decision doc is present.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Auto-discover components from the source tree so this gate scales as the
// library grows — every `V*.ts` render module under packages/ui/src/components
// must have a matching doc. No manual list to keep in sync.
const componentsDir = join(root, 'packages', 'ui', 'src', 'components');
const components = readdirSync(componentsDir)
  .filter((file) => /^V[A-Za-z0-9]+\.ts$/.test(file))
  .map((file) => file.replace(/\.ts$/, ''))
  .sort();

if (components.length === 0) {
  console.error('Docs integrity check failed: no V*.ts components found to verify.');
  process.exit(1);
}

const errors = [];
const check = (cond, message) => {
  if (!cond) errors.push(message);
};

for (const name of components) {
  const rel = `docs/components/${name}.md`;
  const path = join(root, 'docs', 'components', `${name}.md`);
  if (!existsSync(path)) {
    errors.push(`Missing component doc: ${rel}`);
    continue;
  }
  const text = readFileSync(path, 'utf8');
  check(text.includes(name), `${rel} should mention the component name`);
  check(/^##\s+Props/m.test(text), `${rel} should document a Props section`);
  check(/^##\s+Events/m.test(text), `${rel} should document an Events section`);
  check(/```(js|javascript|vue)/i.test(text), `${rel} should include a JavaScript/Vue example`);
  check(!/lang="ts"/.test(text), `${rel} must stay JavaScript-first (no lang="ts")`);
}

const decisionRel = 'docs/decisions/lynx-runtime.md';
const decisionPath = join(root, 'docs', 'decisions', 'lynx-runtime.md');
if (!existsSync(decisionPath)) {
  errors.push(`Missing runtime decision doc: ${decisionRel}`);
} else {
  const text = readFileSync(decisionPath, 'utf8');
  for (const keyword of ['Rspeedy', 'Lynx Explorer', 'ReactLynx', 'https://lynxjs.org']) {
    check(text.includes(keyword), `${decisionRel} should mention ${keyword}`);
  }
}

if (errors.length > 0) {
  console.error('Docs integrity check failed:');
  for (const message of errors) console.error(`  - ${message}`);
  process.exit(1);
}

console.log(`Docs integrity check passed (${components.length} components + runtime decision).`);
