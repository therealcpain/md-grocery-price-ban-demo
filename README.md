# MD Grocery Price Ban Clock

**Paste (1) Maryland shopper? yes/no, (2) context chip: large grocery (≥15,000 sq ft) / third-party food delivery / other merchant, (3) view date → one shareable card:**  
giant **days until Oct 1 ban / ban live / not covered (non-MD / non-food-retailer)** · **food retailer + third-party food delivery: personalized higher price from personal data generally prohibited** chip · **loyalty / subscription / consented-discount exceptions exist — not a blanket price-freeze** strip · Maryland **Chapter 154 (HB 895)** + **AG Consumer Protection Division** pointer (**no private right of action** on §13–321; **45-day cure** before AG enforcement).

Brand on the surface: **MD Grocery Price Ban Clock** only.

**Not legal advice.** User-pasted chips only — zero grocery / Instacart price scrape. Never invent a named chain’s personalization status or allege Section 5 violations. **Distinct from Personalized Price Disclosure** (national FTC proposed disclosure ≠ MD food ban). **Hard-avoid** class-action lead-gen — AG Consumer Protection pointer only.

## Hypothesis

MD grocery/delivery shoppers ask “will my app stop charging *me* more than my neighbor?” while loyalty-program exception fine print muddies expectations. Flip that fog into an **effective-date-honest share clock** — without scraping store APIs or naming a chain as a violator. Success = “screenshot this — ban starts Oct 1 for big grocery + food delivery” shares in the two weeks before Oct 1.

## How to test (local)

```bash
cd kb/mde/md-grocery-price-ban
npm run build          # copies assets → dist/
npm run verify         # Oct 1 ban gate + MD/channel outs + brand-clean
# either open the file:
open index.html        # or dist/index.html
# or serve:
npm start              # http://localhost:4248
```

Manual checklist:

1. Open the page → click **MD grocery · Sep 13 · 18 days** → giant **18 days until Oct 1 ban**.
2. Click **Ban live · Oct 5** → **Ban live**.
3. Click **Non-MD · not covered** → Not covered (non-MD).
4. Click **Other merchant · not covered** → Not covered (non-food-retailer).
5. Click **Empty / missing date** → honest miss.
6. Click **MD delivery · Sep 13 · 18 days** → countdown (delivery in scope).
7. Paste your own flags → **Show ban clock**.
8. **Copy summary** → clipboard has status + scope chip + Chapter 154 cite + disclaimer.
9. **Share link** → `#p=` restores the card.
10. **Export PNG** → dark clock card with giant status + disclaimer on the face (not color-only).
11. Surface brand is **MD Grocery Price Ban Clock** only (no Conglomerate / personal names).

### GitHub Pages

This folder is static-ready. Point Pages at `/` of a dedicated repo (or `/docs` after copying `dist/`), with `index.html` at the site root. Relative paths (`styles.css`, `app.js`) work on project pages.

```bash
npm run build   # optional artifact in dist/
```

Do **not** create the public repo or post from this build step — Steward handles Pages + distro. Distro stays product-linked only (e.g. r/maryland, r/baltimore, r/frugal in the Sep 20–Oct 5 window). **No sock accounts.** No “grocery chains are racist-pricing” farms. No private-lawsuit CTA.

## Seed cohort (MVP)

Labeled teaching dates — not live store scrapes. Never invent a chain’s personalization status.

| Chip | Inputs | Teaching point |
|------|--------|----------------|
| MD grocery · Sep 13 · 18 days | MD · grocery · view 2026-09-13 | 18 days until Oct 1 ban |
| Ban live · Oct 5 | MD · grocery · view 2026-10-05 | Ban live |
| Non-MD · not covered | mdShopper = no | Not covered (non-MD) |
| Other merchant · not covered | channel = other | Not covered (non-food-retailer) |
| Empty / missing date | blank view date | Honest miss |
| MD delivery · Sep 13 · 18 days | MD · delivery · view 2026-09-13 | Delivery in scope · countdown |

## Ban logic (public statute framing)

| Rule | Framing |
|------|---------|
| Effective | **Oct 1 2026** (Chapter 154 / HB 895) |
| Not MD | → **not covered (non-MD)** |
| Other merchant | → **not covered (non-food-retailer)** |
| MD + grocery/delivery + view &lt; Oct 1 | → **days until Oct 1 ban** |
| MD + grocery/delivery + view ≥ Oct 1 | → **ban live** |
| Scope | Food retailers ≥**15,000** sq ft + third-party food delivery |
| Exceptions | Loyalty / subscription / consented — **not a blanket price-freeze** |
| Enforcement | AG Consumer Protection · **45-day cure** · **no private ROA** on §13–321 |
| Distinct | ≠ FTC Personalized Price Disclosure (national proposed triad) |
| Pointers | Chapter 154 PDF · Morgan Lewis Apr 29 2026 · IAPP Apr 2026 |

## Ads pathway (ad-only free utility — do not spend yet)

| Path | Notes |
|------|--------|
| **Revenue (primary)** | **AdSense / display under the card + “what does Maryland’s grocery personalized-pricing ban actually cover?” explainer** (not inside the PNG). Inventory spikes Sep 20–Oct 10. Justified when sessions cover hosting. Free card forever — **no paywall**, no Gumroad. |
| **Brand-safe** | Informational clock + public Chapter 154 / Morgan Lewis / IAPP cites. **Not legal advice.** Ads **not** inside PNG. **Hard-avoid** class-action lead-gen affiliates. AG Consumer Protection pointer only. |
| **Acquisition (gated)** | Google “Maryland grocery personalized pricing ban October 2026” / “HB 895 Protection From Predatory Pricing” + Reddit MD promo. Creative = “MD grocery shopper? Days until the Oct 1 personalization ban”. Max CPA abort ~$0.30–0.50 without a completed share. Debit/cash only. **Spend only after one organic maryland-thread test.** |
| **UTM** | Example: `?utm_source=reddit&utm_medium=organic&utm_campaign=md_grocery_price_ban_mvp` |
| **Tracking** | Card gens + share clicks (GoatCounter path when Pages is live). |
| **Abort sketch** | Pause paid if CPA exceeds band without share / “ban starts Oct 1” replies. |

**No spend from this ready_for_pages step.** Ads are the monetization path (**ad-only OK**).

## Product constraints

- Single static site (no backend).
- **Flags only from user paste** (or labeled seeds). Never invent chain personalization status, Section 5 allegations, or coverage beyond paste.
- Brand: **MD Grocery Price Ban Clock** only on surface.
- Status text-labeled (not color-only). Disclaimer always visible on page + share PNG.
- Share = URL hash + PNG + copy summary.
- No price scrape. No class-action funnel. No Gumroad. No sock farms.
- Distinct JTBD from Personalized Price Disclosure.

## Files

| Path | Role |
|------|------|
| `index.html` | App shell (GitHub Pages entry) |
| `app.js` | Oct 1 ban gate, MD/channel outs, seeds, card, share hash, PNG |
| `styles.css` | MD Grocery Price Ban Clock UI |
| `scripts/build.js` | `npm run build` → `dist/` |
| `scripts/verify.js` | `npm run verify` — Oct 1 + outs |
| `package.json` | build / start / preview / verify scripts |

## Opportunity

Internal card: `opp_consumer_md_grocery_price_ban` (consumer / grocery pricing).  
Experiment stub: `institutions/mde/experiments/exp_md_grocery_price_ban.md`.
