import { inject, isRef, provide, ref, type Ref } from 'vue';
import { violetLight, type Theme } from '@vynx/themes';

const THEME_KEY = Symbol('vynx-theme');

/**
 * Provide a theme to descendant Vynx components. Call inside a component
 * `setup()`. Consumers may pass any theme from `@vynx/themes` or a custom one.
 *
 * Pass a plain `Theme` for a fixed theme, or a `Ref<Theme>` to switch presets
 * at runtime — components read the injected ref reactively, so mutating
 * `themeRef.value` re-themes the whole tree (e.g. a light/dark or preset toggle).
 */
export function provideTheme(theme: Theme | Ref<Theme>): void {
  provide(THEME_KEY, isRef(theme) ? theme : ref(theme));
}

/**
 * Read the active theme. Defaults to the violet light brand theme when no
 * ancestor has provided one.
 */
export function useTheme(): Ref<Theme> {
  return inject<Ref<Theme>>(THEME_KEY, ref(violetLight));
}
