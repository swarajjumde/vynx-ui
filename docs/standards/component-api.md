# Component API Standard

- Public component names use PascalCase with a `V` prefix.
- Props describe state; events report user intent or completed changes.
- Keep component contracts small and stable.
- Prefer explicit variant, size, disabled, and tone props over style escape hatches.
- Public APIs must be usable from JavaScript without TypeScript-only requirements.
- Document defaults and emitted events beside examples.
