# Open questions for the client

None of these blocked the build. Each was resolved with the assumption stated,
and each is a small change once answered.

## 1. Product prices — placeholders in use

The comp shows no price anywhere, which is unusual for a storefront. Prices were
seeded so the cart could total correctly:

| Product | Seeded | Product | Seeded |
|---|---|---|---|
| Beetroot | ₹349 | Tomato | ₹319 |
| Spinach | ₹299 | Carrot | ₹299 |
| Turmeric | ₹399 | Onion | ₹279 |
| Moringa | ₹449 | Ginger | ₹369 |
| Amla | ₹329 | Garlic | ₹339 |

All ten live in `src/data/products.ts` as integer paise.

Because the comp shows no price, **the card does not display one**. The value is
still carried on each product and is announced as part of the add-to-cart
button's accessible name, so the cart totals correctly and screen-reader users
hear it. Showing it visibly is a one-block change in `product-card.tsx`.

**Ask:** confirm real prices, and whether price should be visible on the card.

## 2. Fonts are inferred

The comp is flat artwork with no font spec. Shipped as **Playfair Display**
(display serif) + **Inter** (interface sans), self-hosted, Latin subset only.
These are the closest free match to the lettering in the comp.

**Ask:** the real font names from the designer's source file. Swapping is two
lines in `src/styles/tokens.css`.

## 3. Hero seal and statement are inside the photograph

See `ASSET-MANIFEST.md` §3. Requesting a clean hero photograph lets these become
live, resizable, translatable text.

## 4. Product categories

The footer offers *Vegetable / Leaf / Spice / Combo Packs*, but nothing in the
comp says which powder belongs where. Assigned as:

- **Vegetable** — beetroot, tomato, carrot, onion, garlic
- **Leaf** — spinach, moringa
- **Spice** — turmeric, ginger
- **Fruit** — amla (botanically a fruit; it has no footer category)

**Ask:** confirm, and say what a *Combo Pack* contains — no combo SKU exists yet.

## 5. Impact figures are unverified claims

“500+ women-led sourcing partners”, “250+ women given fair opportunity”,
“20+ rural communities impacted”, “10,000+ families”.

**Ask:** confirm these are approved for publication. Published impact claims can
attract scrutiny.

## 6. Testimonials name real people

Priya S. (Pune), Neha R. (Bengaluru) and Anjali M. (Nashik) ship verbatim with
photographs.

**Ask:** confirm each person consented to their words, name, city and likeness
being published.

## 7. Payment brand marks

UPI, VISA, Mastercard and RuPay render as set wordmarks rather than official
brand logos, because shipping third-party marks needs licence confirmation.

**Ask:** confirm the client is entitled to display them, and supply official
SVGs. One file: `src/components/composites/payment-methods/`.

## 8. Contact details are placeholders

`+91 12345 67890` and `hello@naturallite.in` are taken from the comp and are
clearly stand-ins. **Ask:** real phone, email and postal address.

## 9. Social handles

Instagram `@naturallite.india` is from the comp. Facebook, YouTube and WhatsApp
URLs were inferred. **Ask:** real URLs for all four.

---

## Decisions already made and applied

- **Gold text contrast.** The comp's gold on cream measures 2.31:1, below the
  4.5:1 WCAG AA minimum. Gold is used for decoration — seal rings, stars, rules —
  and any gold *text* renders in a darker gold at 4.74:1. Visually
  indistinguishable at these sizes.
- **Trust marks repeat three times** on one page (announcement bar, hero badges,
  Trust band). Built exactly as drawn; flagged only for awareness.
- **No autoplay on the testimonial carousel.** Moving text a reader cannot pause
  fails WCAG 2.2. Swipe, arrows and dots are all available.
