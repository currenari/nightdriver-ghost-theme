# Nightdriver Release Checklist

Use this checklist before shipping a premium build.

## 1. Theme Integrity

- [x] `node scripts/validate-custom-settings.js` passes (all `Referenced` settings are declared)
- [x] Ghost theme validation passes (no unknown custom settings / no helper errors)
- [x] All custom settings visible in Ghost Admin match current `package.json`

## 2. Visual QA

- [x] Day mode checked (desktop + mobile)
- [x] Nightdriver custom mode checked (desktop + mobile)
- [x] Night mode checked (desktop + mobile)
- [x] Latest Posts `Single` and `Double` layouts both verified
- [x] Featured Posts and Signal Notes stack correctly on mobile
- [x] Utility bar: hover, click toggle, long-press pin verified

## 3. Content Routing QA

- [x] Posts tagged `note` appear in `Signal Notes`
- [x] Posts tagged `note` are excluded from homepage Latest Posts
- [x] Posts tagged `layby` appear in `Layby` mixed-media section (max 6)
- [x] Posts tagged `layby` are excluded from homepage Latest Posts
- [x] Layby grid count behavior verified (`1`, `2`, `3`, `4`, `5`, `6`)
- [x] Posts tagged `note` and `layby` are excluded from post Previous/Next navigation
- [x] Posts tagged `note` are excluded from related posts

## 4. Commerce/Portal QA

- [x] Snipcart button/cart summary verified with API key present
- [x] Snipcart fallback state verified with API key empty
- [x] Portal CTA links and labels verified

## 5. Visual Consistency Pass Log (2026-02-14)

- [x] Introduced radius/shadow consistency tokens in `assets/css/screen.css` `:root`
- [x] Utility handle radius tokenized (`.nightdriver-header-utility-handle`)
- [x] Unified card hover lift via `--card-hover-lift` for:
  - [x] `.nightdriver-bento-card:hover`
  - [x] `.nightdriver-grid-card:hover`
  - [x] `.nightdriver-note-card:hover`
  - [x] `.nightdriver-product-card:hover`
- [x] Product card shell aligned with global card shadow system:
  - [x] base shadow `var(--shadow-1)`
  - [x] hover shadow `var(--shadow-2)`
- [x] Double-column Latest Posts card shadow values tokenized:
  - [x] `.nightdriver-posts-list--double .nightdriver-post-item`
  - [x] `.nightdriver-posts-list--double .nightdriver-post-item:hover`
- [x] Mobile/drawer control radii and drawer shadow tokenized:
  - [x] `.nightdriver-nav-toggle`
  - [x] `.nightdriver-nav-drawer-panel`
  - [x] `.nightdriver-nav-drawer-nav .nightdriver-nav-item a`
