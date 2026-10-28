# bycaeL — skincare & beauty storefront

Responsive, mobile-first Indonesian skincare storefront concept with a minimal, elegant visual style.

## Current implementation

- `index.html`, `styles.css`, `app.js`: storefront, product detail modal, demo cart, category filters, login/register UI, policies, contact and review placeholders.
- WhatsApp contact CTA: **0857-3183-8324** (click-to-chat link).
- `supabase/schema.sql`: initial PostgreSQL tables and Row Level Security policies for products, profiles, orders, order items and reviews.
- `.env.example`: variable-name template only; it contains no credentials.
- `.github/workflows/deploy-pages.yml`: automatic GitHub Pages workflow.

## Important status

This remains a **prototype**. Product names, images, prices, ingredients, size/packaging descriptions and inventory are sample content and are not verified offers. There are no fabricated customer reviews. Email, business city, NIB, social media, and final shipping/returns/privacy/payment terms must be supplied by the owner. The WhatsApp number was supplied by the owner; test the link before launch. No payment provider is connected, and checkout does not submit orders or process payments.

## Preview / deployment

GitHub Pages target URL: https://aleiaa791.github.io/aleiiyyaa/

The workflow deploys static files after pushes to `main`. The URL is only live once GitHub Pages is enabled for this repository and the Actions workflow succeeds. HTTPS is provided by GitHub Pages once published. Verify the result in [GitHub Actions](https://github.com/aleiaa791/aleiiyyaa/actions) and [Pages settings](https://github.com/aleiaa791/aleiiyyaa/settings/pages).

## Supabase setup

Project: `glow-atelier`, region Singapore, project ref `dlphrewywirnvvgjleon`.

The frontend currently uses the project URL and public publishable key in `app.js`. Publishable keys are intended for browser clients; never place a Supabase service-role or secret key in client-side files. Email/password sign-up, sign-in, session detection and sign-out are implemented, but a complete real-email confirmation round-trip has not been verified. Set the Supabase Site URL and allowed redirect URLs to the deployed Pages URL before testing email confirmation.

## Payments and order safety

No payment provider is configured. Before enabling checkout, implement a server-side or Supabase Edge Function that creates payment sessions using a provider secret stored as a server secret. Validate the provider's signed webhook before marking an order paid. Recalculate prices and stock on the server; never trust totals or payment status sent by the browser. Do not collect raw card numbers or CVV on this site.

## Before launch

- Replace demo product details with verified label information, licensed images and actual inventory.
- Confirm the WhatsApp contact is active.
- Add official email, business city, social media and legal business information only after verification.
- Finalize accurate shipping, return, privacy and payment policies.
- Add moderation and verified-purchase checks before accepting reviews.
- Enable GitHub Pages, verify HTTPS and configure the Supabase redirect URLs.
- Test mobile layouts, authentication, database access policies and payment callbacks.

