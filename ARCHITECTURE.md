# Architecture

Vynx UI is a temporary codename for a Vue Lynx UI framework.

## Intended Shape

- `packages/ui`: reusable Vue Lynx components.
- `packages/themes`: token definitions and theme outputs.
- `apps/showcase`: JavaScript-first Vue Lynx showcase app.
- `docs/standards`: permanent engineering standards.
- `.ai/tasks`: task specifications for Claude Code implementation.

## Principles

- Token-driven styling is the foundation for visual consistency.
- Public examples must work for JavaScript consumers.
- Framework internals may use TypeScript when compiled JavaScript output remains consumable.
- Components target Vue Lynx, not browser DOM Vue.
- Admin starter work must be original and may be usability-inspired by other products only; no copied source, assets, branding, or visual identity.
