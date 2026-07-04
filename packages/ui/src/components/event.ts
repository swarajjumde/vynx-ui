/**
 * Read the text value from a Lynx input/textarea event without relying on any
 * browser DOM event classes. Lynx surfaces the current value on `event.detail`.
 */
export function readInputValue(event: unknown): string {
  const detail = (event as { detail?: { value?: unknown } } | null | undefined)?.detail;
  const value = detail?.value;
  if (typeof value === 'string') return value;
  return value == null ? '' : String(value);
}
