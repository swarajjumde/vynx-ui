# Changelog

All notable changes to Vynx UI are documented here. This project adheres to
[Semantic Versioning](https://semver.org/).

## [0.1.0] — 2026-07-05

The first open-source release. All six component tiers are shipped and tested.

### Added

- **43 Vue Lynx components** across six tiers:
  - **Foundation** — VButton, VCard, VInputText, VTextarea, VCheckbox, VSwitch,
    VFormField, VBadge.
  - **Primitives & display** — VText, VHeading, VDivider, VAvatar, VTag,
    VProgressBar, VSkeleton, VIcon, VList, VListItem, VStack, VScrollView.
  - **Forms** — VRadioGroup, VSelectButton, VToggleButton, VInputNumber,
    VRating, VSearchInput.
  - **Overlays & feedback** — VBottomSheet, VDialog, VActionSheet, VDrawer,
    VToast, VConfirmDialog.
  - **Navigation** — VAppBar, VTabs, VAccordion, VSelect, VTabBar.
  - **Data** — VDataView, VTimeline, VCarousel, VTable, VPaginator, VEmptyState.
- **`@vynx/themes`** — a three-layer design-token system (primitive → semantic →
  component) with prebuilt light/dark themes and Violet/Neutral presets.
- **Runtime theming** — `provideTheme` accepts a `Ref<Theme>` so scheme and
  preset can switch live across the whole component tree.
- **`apps/showcase`** — a tiered catalog that dogfoods every component on the
  real Lynx/Rspeedy toolchain.
- **`apps/starter`** — Vynx Admin, an original admin/dashboard template built
  entirely with Vynx UI.
- **Docs** — per-component reference docs, an authoring standard, and
  architecture decision records (overlays, Lynx runtime).
- **152 DOM-free tests** covering public component behaviour.

[0.1.0]: https://github.com/swarajjumde/vynx-ui/releases/tag/v0.1.0
