/** Mirrors Rails ActiveSupport String#first — first character for display. */
export function first(value: string): string {
  return value.at(0) ?? '';
}
