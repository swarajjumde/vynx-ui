import { describe, expect, it } from 'vitest';
import { violetDark, violetLight } from '@vynx/themes';
import { resolveBadgeStyle, resolveButtonStyle, resolveCardStyle } from '../src/styles';
import { VBadge, VButton, VCard } from '../src/index';

describe('resolveButtonStyle', () => {
  it('uses solid primary tokens by default', () => {
    const { container, label } = resolveButtonStyle(violetLight);
    expect(container.backgroundColor).toBe(violetLight.colors.primary);
    expect(label.color).toBe(violetLight.colors.onPrimary);
    expect(container.opacity).toBe(1);
  });

  it('outline variant keeps a transparent background and toned label', () => {
    const { container, label } = resolveButtonStyle(violetLight, { variant: 'outline', tone: 'danger' });
    expect(container.backgroundColor).toBe('transparent');
    expect(container.borderColor).toBe(violetLight.colors.danger);
    expect(label.color).toBe(violetLight.colors.danger);
  });

  it('ghost variant has no border or background', () => {
    const { container } = resolveButtonStyle(violetLight, { variant: 'ghost' });
    expect(container.backgroundColor).toBe('transparent');
    expect(container.borderColor).toBe('transparent');
  });

  it('dims disabled buttons', () => {
    expect(resolveButtonStyle(violetLight, { disabled: true }).container.opacity).toBe(0.5);
  });

  it('reflects the active theme (dark)', () => {
    expect(resolveButtonStyle(violetDark).container.backgroundColor).toBe(violetDark.colors.primary);
  });
});

describe('resolveBadgeStyle', () => {
  it('maps tone to background and readable label token', () => {
    const { container, label } = resolveBadgeStyle(violetLight, { tone: 'success' });
    expect(container.backgroundColor).toBe(violetLight.colors.success);
    expect(label.color).toBe(violetLight.colors.onSuccess);
    expect(container.borderRadius).toBe(violetLight.radius.full);
  });
});

describe('resolveCardStyle', () => {
  it('uses the surface token by default and elevates on request', () => {
    expect(resolveCardStyle(violetLight).container.backgroundColor).toBe(violetLight.colors.surface);
    const elevated = resolveCardStyle(violetLight, { elevated: true }).container;
    expect(elevated.backgroundColor).toBe(violetLight.colors.surfaceElevated);
    expect(elevated.boxShadow).toBe(violetLight.shadow.md);
  });
});

describe('component contracts', () => {
  it('exposes stable public names, props and events', () => {
    expect(VButton.name).toBe('VButton');
    expect(VCard.name).toBe('VCard');
    expect(VBadge.name).toBe('VBadge');
    expect(VButton.emits).toContain('tap');
    expect((VButton.props as Record<string, unknown>).variant).toBeDefined();
    expect((VBadge.props as Record<string, unknown>).tone).toBeDefined();
  });
});
