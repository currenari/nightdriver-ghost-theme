# Changelog
All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [Unreleased]

## [1.3.0] - 2026-02-22
### Added
- Added a built-in Koenig image/gallery lightbox for post/page content with fullscreen viewing, backdrop close, `Esc` close, caption support, and keyboard/click navigation (`prev`/`next`).
- Enabled HTML rendering in `Signal Notes` cards (with fallback to custom excerpt/excerpt/title when HTML is unavailable).

### Changed
- Refined frontend typography system toward a cleaner editorial style: unified content sizing/leading/tracking tokens, normalized heading hierarchy spacing, tightened paragraph/list rhythm, and aligned content measure behavior across post/page/content selectors.
- Unified H1 display treatment across hero/post/content contexts using shared H1 tokens for size, line-height, transform, and letter spacing.
- Updated card typography hierarchy: featured post titles, latest post titles/excerpts/meta, and Drift Zone card title lines now use cleaner, more consistent headline/body pairings.
- Tightened Koenig gallery density by reducing image row/column gaps and removing extra row/image margins.
- Inverted featured and Layby media hover mood behavior so thumbnails are crisp at rest and apply the visual mood effect on hover.
- Refined lightbox arrow control visuals for clearer, premium navigation affordance.

### Fixed
- Standardized Drift Zone `Pinout` and `Zones` chip spacing so labels/tags/buttons use the same visual distance as other theme controls, including rotating tag row spacing.
- Unified post/page image presentation so feature images and Koenig image cards align exactly to the text container (no full-bleed), with improved figure spacing and subtler left-aligned captions.
- Removed conflicting content tracking/line-height behavior (including night-mode inflation) so body copy spacing remains consistent across modes.
- Fixed Koenig gallery/layout breakage by neutralizing unsafe `kg-width-wide`/`kg-width-full` breakout behavior in content flow and preventing horizontal overflow.
- Fixed latest-post card edge spacing in single-column homepage layout by restoring intentional top inset on the first card and bottom inset on the last card.
- Fixed media “milky” look caused by global link opacity by forcing media-link wrappers to full opacity.
- Fixed lightbox initial-open regression by enforcing hidden state display handling.
- Removed duplicate Layby thumbnail title overlay text (top-left) when the title already appears in the card header.
- Removed forced border/radius styling on rich-note badge images so linked badge graphics render cleanly.

## [1.2.1] - 2026-02-16
### Fixed
- Restored mobile header menu visibility by scoping `.nightdriver-nav-toggle` hide behavior to desktop-only breakpoints.

## [1.2.0] - 2026-02-14
### Added
- Added a homepage `Signal Notes` section powered by posts tagged `note` (latest 3).
- Added a homepage `Layby` section powered by posts tagged `layby` (up to 6) with adaptive card layouts.
- Added a `latest_posts_layout` custom setting (`Single` / `Double`) for homepage Latest Posts.
- Added release tooling: `npm run validate:custom` and `RELEASE_CHECKLIST.md`.

### Changed
- Refined post/page typography and integrated it as core stylesheet behavior.
- Reordered Portal CTA setting fields in Ghost Admin to match rendered line order.
- Updated Signal Notes visual treatment and added configurable tint control (`signal_notes_gradient_tint`).
- Improved visual consistency across cards, buttons, section headings, utility controls, and responsive spacing.
- Upgraded Layby YouTube presentation to poster cards with thumbnail fallback, visible title label, play badge, and click-through to YouTube.
- Updated single-post video behavior: first embed uses lead presentation; additional embeds use compact inline presentation on desktop, full width on mobile.
- Completed a CSS/JS cleanup and maintainability pass (deduplicated rules, removed dead code, consolidated tokens and comments).
- Standardized single-post header alignment so all post types (including notes) use the same left-aligned header presentation.
- Constrained single-post feature images to text-column width for cleaner visual alignment with body content.
- Unified single-post content container width for notes and normal posts so header/body/media share identical layout behavior.

### Fixed
- Isolated special feeds by excluding `note` and `layby` posts from homepage Latest Posts.
- Excluded Signal Notes / `note` (`signal-notes`) and `layby` posts from post Previous/Next navigation.
- Excluded `note` and `layby` posts from Related Posts suggestions; Related Posts stays enabled for normal posts.
- Improved Layby mixed-media rendering consistency for embed and non-embed entries.

## [1.1.1] - 2026-02-13
### Changed
- Added default hex color references to all Ghost Admin custom color setting descriptions, so site owners can quickly reset values to theme defaults.
- Removed the unused `nightdriver_custom_mode_header_bg` custom setting from Ghost Admin and theme templates.
- Removed the `portal_cta_button_label` custom setting and standardized Portal CTA button text to `Sign up`.
- Unified utility control bracket color with control text/icon color so all three stay visually consistent.

## [1.1.0] - 2026-02-12
### Added
- Added Snipcart cart summary controls (`count` and `total`) in the header: desktop top bar and mobile utility bar.

### Changed
- Reduced the header-to-content spacing on the homepage by tightening the top padding of the Featured Posts section.
- Updated Snipcart setup to use the official embed pattern while continuing to source the public API key from Ghost Admin custom settings.

### Fixed
- Corrected Snipcart add-to-cart button styling so enabling the API key no longer forces an unintended white/default-looking button style.
- Cleaned and consolidated duplicated/conflicting Snipcart and CTA CSS rules.

## [1.0.0] - 2026-02-08
### Added
- Initial release.
