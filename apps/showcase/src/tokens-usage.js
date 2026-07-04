// Plain-JavaScript consumer example: import the compiled package output and
// use it without any TypeScript, path aliases, or private imports.
import { violetLight } from '@vynx/themes';
import { resolveButtonStyle } from '@vynx/ui';

// Resolve a solid primary button style from the violet light theme tokens.
const primary = resolveButtonStyle(violetLight, {
  variant: 'solid',
  tone: 'primary',
  size: 'md'
});

console.log('primary background:', primary.container.backgroundColor); // violet brand primary
console.log('primary label colour:', primary.label.color); // onPrimary token

export { primary };
