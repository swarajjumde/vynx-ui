import { inject, provide, ref, type Ref } from 'vue';
import { violetLight, type Theme } from '@vynx/themes';

const THEME_KEY = Symbol('vynx-theme');

/**
 * Provide a theme to descendant Vynx components. Call inside a component
 * `setup()`. Consumers may pass any theme from `@vynx/themes` or a custom one.
 */
export function provideTheme(theme: Theme): void {
  provide(THEME_KEY, ref(theme));
}

/**
 * Read the active theme. Defaults to the violet light brand theme when no
 * ancestor has provided one.
 */
export function useTheme(): Ref<Theme> {
  return inject<Ref<Theme>>(THEME_KEY, ref(violetLight));
}
