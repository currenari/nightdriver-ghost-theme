# Nightdriver

Nightdriver — Premium Ghost Theme

Nightdriver is a high-control, performance-focused Ghost theme for creators who value precision and clarity—built for focused reading and long-form publishing, with three display modes and 20 configurable settings managed directly in Ghost Admin.

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

**Demo:** <https://currenari.com>

**Version:** 1.1.0  
**Changelog:** See `CHANGELOG.md`

---

## Highlights

- Three display modes: Day, Nightdriver (Custom), Night
- Collapsible utility bar (scroll-aware) with pin/unpin on long-press
- Bento-style Drift Zone section on the homepage
- Featured posts grid and latest posts list
- Optional reading progress bar on posts
- Local fonts bundled (Inter, JetBrains Mono)
- Custom SVG icon sprite, no third-party dependencies
- Koenig editor buttons styled to match the theme

---

## Requirements

Ghost 5.0.0 or higher.

---

## Installation

1. Download the theme `.zip`
2. Go to Ghost Admin > Settings > Design > Change theme > Upload theme
3. Activate

---

## Configuration

All settings are accessed via Ghost Admin > Settings > Site - Design & branding > Customize > Theme.

### Snipcart

| Setting | Default |
|---------|---------|
| `snipcart_public_api_key` | (empty) |

Set this in Ghost Admin: `Settings → Design → Customize`.

### Reading Progress Bar

| Setting | Default |
|---------|---------|
| `progress_bar_color` | `#0ea5e9` |
| `progress_track_color` | `#1a1a1a` |
| `progress_bar_height` | `2px` (can be turned off) |

### Custom Mode Colours

These control the appearance of the middle "Nightdriver" mode.

**Backgrounds**

| Setting | Default |
|---------|---------|
| `nightdriver_custom_mode_background` | `#1e293b` |
| `nightdriver_custom_mode_surface` | `#334155` |
| `nightdriver_custom_mode_header_bg` | `#0f172a` |
| `nightdriver_custom_mode_header_utility_bg` | `#1d3348` |
| `nightdriver_custom_mode_footer_bg` | `#0f172a` |
| `nightdriver_custom_mode_ui_spacer_bg` | `#1e293b` |

**Text**

| Setting | Default |
|---------|---------|
| `nightdriver_custom_mode_text` | `#f1f5f9` |
| `nightdriver_custom_mode_text_secondary` | `#cbd5e1` |
| `nightdriver_custom_mode_text_tertiary` | `#94a3b8` |

**Borders**

| Setting | Default |
|---------|---------|
| `nightdriver_custom_mode_border` | `#475569` |

### Mode Labels

| Setting | Default |
|---------|---------|
| `mode_labels` | `DAY MODE\|NIGHTDRIVER MODE\|NIGHT MODE` |

Use the pipe character `|` as a separator between labels. The format must follow one of these patterns:

`NAME ONE|NAME TWO|NAME THREE` or `NAMEONE|NAMETWO|NAMETHREE`

Incorrect formatting will break the theme.

### Portal CTA

| Setting | Default |
|---------|---------|
| `portal_cta_heading` | `Stay Updated` |
| `portal_cta_brand_text` | `Thoughts, stories and ideas.` |
| `portal_cta_subtext_line1` | `Get new posts by email.` |
| `portal_cta_button_label` | `Sign up` |

### Footer

| Setting | Default | Options |
|---------|---------|---------|
| `show_footer_copyright` | `true` | `true` (visible) / `false` (hidden) |

---

## Features

### Utility Bar

The utility bar auto-hides on scroll down and reappears on scroll up. Tap the handle to toggle. Long-press to pin (prevents auto-hide). Keyboard accessible via Enter/Space.

### Navigation

**Primary:** Ghost Admin > Settings > Navigation (Primary)

**Secondary:** Ghost Admin > Settings > Navigation (Secondary). Rendered as plain text links. Used in Drift Zone and footer.

### Drift Zone

The bento-style homepage section. Located in `partials/content/drift-zone.hbs`. Contains dynamic tiles (authors, tags, secondary nav, Portal CTA) and static tiles (support, repository). Edit the partial to customise static content.

### Products Page

*Planned for next update. Not available in current release.*

1. Create a page with slug `products`
2. Tag product pages with `product`
3. The products page will list all pages with that tag

### Author Pages

Minimal by design. Pulls name, bio, location, website, and social links from Ghost's author profile. For a custom profile page, build it as a standard Ghost page and link to it.

---

## Browser Support

Modern evergreen browsers: Chrome, Firefox, Safari, Edge.

---

## Support

**Need help?** <support@currenari.com>

**Support the Lab** — [tip or become a member](https://currenari.com) — keeps open hardware and open source alive.

---

## Credits

- [Ghost](https://ghost.org)
- Inter typeface by Rasmus Andersson
- JetBrains Mono by JetBrains

---

## License

Copyright 2026 Currenari Lab

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this theme except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

---

**Supporting the project** through tips or membership helps fund continued development, documentation, and community support.
