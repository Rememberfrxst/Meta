---
name: ProductCard layout rules
description: Permanent design constraints for ProductCard in the Griper mobile app.
---

## Rules

1. **Title always 2-line height** — `name` Text uses `minHeight: 36` (2 × lineHeight 18) with `numberOfLines={2}`. Even 1-line titles leave a blank second line so the rating row always starts at a consistent vertical position across all cards.

2. **No EXPRESS badge on cards** — The EXPRESS badge has been permanently removed from `ProductCard`. Do NOT re-add it to the card image or info area, even if `product.isExpress` is true. Express info lives only on the product detail page.

**Why:** User explicitly requested consistent card alignment and EXPRESS removal (July 2026). These are permanent product decisions, not temporary states.

**How to apply:** When editing `ProductCard.tsx`, always keep `minHeight: 36` on the `name` style and never render the EXPRESS badge.
