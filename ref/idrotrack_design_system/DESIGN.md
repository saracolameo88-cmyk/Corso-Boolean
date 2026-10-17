---
name: IdroTrack Design System
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3d494c'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6d797d'
  outline-variant: '#bcc9cd'
  surface-tint: '#00687a'
  primary: '#00687a'
  on-primary: '#ffffff'
  primary-container: '#06b6d4'
  on-primary-container: '#00424f'
  inverse-primary: '#4cd7f6'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#006781'
  on-tertiary: '#ffffff'
  tertiary-container: '#60b1cf'
  on-tertiary-container: '#004253'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#acedff'
  primary-fixed-dim: '#4cd7f6'
  on-primary-fixed: '#001f26'
  on-primary-fixed-variant: '#004e5c'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#b9eaff'
  tertiary-fixed-dim: '#81d1f0'
  on-tertiary-fixed: '#001f29'
  on-tertiary-fixed-variant: '#004d62'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-hero:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Outfit
    fontSize: 38px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Outfit
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-md:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 22px
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Outfit
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The design system establishes a high-end wellness and hydration interface combining clinical precision with editorial refinement. Moving beyond utilitarian tracking, the aesthetic is pristine, invigorating, and fluid—evoking mineral-pure water and alpine freshness through luminous whites, mineral blues, and hyper-crisp cyan highlights.

### Brand Archetype & Tone
- **Archetype**: The Vital Purist (Editorial Wellness & Elevated Health).
- **Tone**: Pristine, restorative, kinetic, mathematically balanced.
- **Visual Style**: Clean Minimalist Luminescence. Structured around generous breathing room, ultra-clean pure white surfaces (`#FFFFFF`) floating above a crystalline tinted ground, delicate optical boundaries, and dynamic cyan energy accents that evoke hydration in motion.

### Core Visual Principles
1. **Purity of Surface**: Pure white structural cards sit atop an ultra-pale mineral mist background, giving hydration cards tactile separation without heavy outlines.
2. **Kinetic Fluidity**: Hydration volume, completion rings, and metrics leverage crystalline cyan and ocean gradients that feel alive, refractive, and tactile.
3. **Editorial Typography**: Pairing Outfit’s sharp, modern geometric display letterforms with Manrope’s balanced, analytical body copy to project clinical reliability and premium lifestyle appeal.

## Colors

The color palette centers on light transmission, mineral refraction, and high-contrast readability. 

### Palette Architecture
- **Primary (`#06B6D4` - Vibrant Cyan)**: Represents dynamic aquatic energy, quick-action logging, progress fills, interactive states, and active visual accents.
- **Secondary (`#0284C7` - Vivid Ocean)**: Provides structural contrast for interactive anchors, primary buttons, hero gauge progress arcs, and data visual markers.
- **Tertiary (`#0E7490` - Deep Reef)**: Deeper aquatic blue for secondary data markers, active navigation icons, and refined micro-copy emphasis.
- **Neutral Dark (`#0F172A` - Midnight Slate)**: High-contrast typography base to ensure effortless readability for metrics, timestamps, and long-form advice.
- **Surface & Canvas Tinting**:
  - `canvas-background`: `#F0F7FC` (Pale Mineral Water).
  - `surface-card`: `#FFFFFF` (Pure Crystalline White).
  - `surface-subtle`: `#E2F1F8` (Glacial Ice tint for empty states, track wells, and unselected chips).
  - `border-subtle`: `#D1E6F3` (Gentle aquatic hairline dividers).

## Typography

The type system blends the sleek, geometric charisma of **Outfit** for structural impact, daily volume tracking, and component triggers, with the balanced humanist legibility of **Manrope** for analytical logs, notifications, and educational body copy.

- **Numbers & Metrics**: Numeric statistics (milliliters, daily percentages, streaks) must always render in **Outfit** with tabular figures enabled (`font-variant-numeric: tabular-nums`) to prevent jittering during animated transitions.
- **Tracking / Letter Spacing**: Large display numbers take slight negative tracking (`-0.03em` to `-0.02em`) for an editorial, chiseled posture. Small caps and micro-labels carry slight uppercase tracking (`0.04em` to `0.06em`) to preserve legibility against light backgrounds.

## Layout & Spacing

A disciplined 4px/8px incremental rhythm underpins the layout, calibrated to deliver an expansive, airy feel that prevents dashboard clutter.

### Mobile Grid & Spatial Cadence
- **Canvas Margins**: `1.25rem` (20px) on mobile viewports ensures edge tap buffers without compressing internal card contents.
- **Component Padding**: Standard card internal padding is fixed at `space-lg` (24px) for prominent primary displays (e.g., Daily Ring Hero Card) and `space-md` (16px) for supplementary horizontal scroll cards (e.g., Quick Add vessels).
- **Vertical Rhythm**: Related elements (icon to caption) use `space-xs` (4px) or `space-sm` (8px). Structural cards and chart blocks stack with `space-md` (16px) separation. Major visual milestones use `space-xl` (32px).

## Elevation & Depth

Depth mimics the refraction and dispersion of daylight through pure water rather than stark neutral shadows.

### Elevation Hierarchy
- **Level 0 (Flat Canvas)**: `#F0F7FC` base canvas. Zero elevation.
- **Level 1 (Pristine Cards)**: Pure `#FFFFFF` surfaces with an ambient aquatic dispersion:
  - `box-shadow: 0 4px 20px -2px rgba(2, 132, 199, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.03);`
  - Subtle hairline outline: `border: 1px solid rgba(209, 230, 243, 0.6)`.
- **Level 2 (Interactive Floating Actions & Modals)**: Bottom sheets and Quick Add containers:
  - `box-shadow: 0 12px 32px -4px rgba(2, 132, 199, 0.16), 0 4px 12px -2px rgba(6, 182, 212, 0.08);`
- **Level 3 (Primary Action Glow)**: Primary water-logging triggers and FABs:
  - `box-shadow: 0 8px 24px -2px rgba(2, 132, 199, 0.35);`
  - Active tap depression flattens down to `0 2px 8px rgba(2, 132, 199, 0.25)`.

## Shapes

The geometric framework balances softened tactile ergonomics with architectural discipline:

- **Base Radius (`0.5rem` / 8px)**: Reserved for micro-elements, tooltips, and compact data tags.
- **Medium Radius (`1rem` / 16px)**: Applied to input fields, contextual notification toasts, and secondary modal elements.
- **Large Container Radius (`1.5rem` / 24px)**: Applied to core content cards, analytics modules, and bottom sheet containers.
- **Pill Shape (`9999px`)**: Reserved for buttons, quick-tap vessel presets (e.g., +250ml glass, +500ml bottle), active navigation indicators, and intake progress tracks.

## Components

### Buttons
- **Primary Action (Log Water / Main CTA)**: Full pill shape (`rounded-full`), height of 52px. Gradient fill from `#0284C7` (Ocean) to `#06B6D4` (Cyan) angled at 135 degrees. Text set in `Outfit`, `label-lg`, pure white (`#FFFFFF`). Soft colored glow elevation.
- **Secondary (Custom Volume / Reorder)**: Pill shape, background `#FFFFFF`, border `1.5px solid #06B6D4`, text `#0284C7`. Hover/active transitions to surface `#E2F1F8`.
- **Ghost / Tertiary**: Subtle slate text `#0F172A`, transparent ground, with immediate background feedback on press (`#F0F7FC`).

### Chips & Quick-Add Presets
- Height 40px, pill shape. Unselected: `#FFFFFF` card surface, `1px solid #D1E6F3`, displaying an aquatic icon and volume in `Outfit 14px SemiBold (#0F172A)`.
- Active / Pressed state: Instantly fills with `#E2F1F8` with a primary border `#06B6D4` and vibrant accent text `#0284C7`.

### Hydration Progress Indicator (Hero Ring & Linear)
- **Ring Well**: Background stroke uses `#E2F1F8` (Glacial Ice) with rounded caps.
- **Active Meter**: Filled with a gradient from `#0284C7` to `#06B6D4`. Center hero metric displays current intake in `Outfit` `display-hero-mobile` (`#0F172A`) paired with a `label-md` unit indicator (`ml` / `oz`).

### Input Fields (Custom Logging)
- Background `#FFFFFF`, height 52px, corner radius `1rem` (16px).
- Inactive state: Border `1.5px solid #D1E6F3`, placeholder `#94A3B8`.
- Focus state: Border `1.5px solid #06B6D4`, ring shadow `0 0 0 3px rgba(6, 182, 212, 0.15)`.

### Cards
- Surface `#FFFFFF`, corner radius `1.5rem` (24px), Level 1 elevation, internal padding `1.5rem` (24px).
- Internal divider lines: `#F0F7FC` thickness 1px.
- Section headers within cards use `headline-sm` with Midnight Slate `#0F172A`.

### Selection Controls (Checkboxes & Radios)
- Rounded circular checkboxes (20px diameter) and radio pills.
- Checked state: Filled with `#06B6D4`, displaying a crisp white tick mark with a gentle ambient cyan halo. Unchecked state: 1.5px border in `#CBD5E1`.