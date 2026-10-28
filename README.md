# Glow Atelier — skincare storefront

Responsive, mobile-first Indonesian skincare storefront concept with a minimal, elegant visual style.

## What's included

- `index.html`, `styles.css`, `app.js`: storefront, product detail modal, demo cart, category filters, account UI, policies and contact placeholders.
- `supabase/schema.sql`: initial PostgreSQL tables and Row Level Security policies for products, profiles, orders, order items and reviews.
- `.env.example`: names of configuration values only; no credentials.

## Current status

This is a **prototype**, not yet a live store. Product names, images, prices and product details are sample content. Stock is not verified. No genuine customer reviews are included. Contact channels, business city, NIB, social links, store policies and domain must be supplied by the owner. Checkout and newsletter forms do not transmit data. No payment provider is connected.

## Preview

Open `index.html` in a browser or deploy the static files to a static hosting service. HTTPS is provided by the hosting service after deployment; a custom domain needs to be configured separately.

## Supabase setup

1. Create a Supabase project in the organization you choose.
2. Review and run `supabase/schema.sql` in that project's SQL Editor.
3. Configure email authentication and allowed redirect URLs in Supabase Auth.
4. Set the project URL and publishable key in `CONFIG` in `app.js` (the current values are blank). These are browser-public configuration values; **never** put a service-role or secret key in this file.
5. Verify sign-up, email confirmation, sign-in and sign-out before launch.

## Payments and order safety

No payment provider is configured. Before enabling checkout, implement a server-side or Supabase Edge Function that creates payment sessions using a provider's secret key stored as a server secret. Validate the provider's signed webhook before marking an order paid. Recalculate prices and stock on the server; never trust totals or payment status sent by the browser. Do not collect raw card numbers or CVV on this site.

## Before launch

- Replace demo product details with verified product/label information and real inventory.
- Confirm product image rights and replace demo photography if needed.
- Add real WhatsApp, email, city, social media and legal business information.
- Publish accurate shipping, return, privacy and payment policies.
- Add moderation and verified-purchase checks before accepting reviews.
- Configure hosting, HTTPS, domain, redirects and security headers.
- Test mobile layouts, authentication, database access policies and payment callbacks.

## Technology

Plain HTML/CSS/JavaScript prototype; Supabase JavaScript client is loaded on demand from a pinned CDN version when configured. The database schema is an initial starting point and requires review before production use.
