# Testing Standard

- Add targeted tests for public behaviour changed by a task.
- Prefer tests that exercise props, emitted events, rendered states, and token output.
- Avoid broad snapshot tests as the primary assertion.
- Include build verification when package output or exports change.
- Keep tests scoped to the task and avoid unrelated rewrites.
