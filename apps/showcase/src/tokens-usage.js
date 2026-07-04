// Plain-JavaScript consumer example: import the compiled package output and
// use it without any TypeScript, path aliases, or private imports.
import { violetLight } from '@vynx/themes';
import {
  resolveButtonStyle,
  resolveFormFieldStyle,
  resolveInputStyle,
  resolveToggleStyle
} from '@vynx/ui';

// Resolve a solid primary button style from the violet light theme tokens.
const primary = resolveButtonStyle(violetLight, {
  variant: 'solid',
  tone: 'primary',
  size: 'md'
});

console.log('primary background:', primary.container.backgroundColor); // violet brand primary
console.log('primary label colour:', primary.label.color); // onPrimary token

// Resolve form foundation styles the same way - all token-driven.
const field = resolveFormFieldStyle(violetLight, { invalid: true });
const input = resolveInputStyle(violetLight, { size: 'md', invalid: true });
const checkbox = resolveToggleStyle(violetLight, { variant: 'checkbox', checked: true });
const toggle = resolveToggleStyle(violetLight, { variant: 'switch', checked: true });

console.log('invalid field label colour:', field.label.color); // danger token
console.log('invalid input border colour:', input.container.borderColor); // danger token
console.log('checked checkbox background:', checkbox.control.backgroundColor); // primary token
console.log('checked switch background:', toggle.control.backgroundColor); // primary token

export { primary, field, input, checkbox, toggle };
