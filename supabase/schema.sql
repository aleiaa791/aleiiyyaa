-- bycaeL initial schema.
-- Apply only after reviewing in the intended Supabase project.
-- Public catalog rows may be read by visitors; writes are reserved for authenticated admins.
create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  price_idr integer not null check (price_idr >= 0),
  size_label text,
  ingredients text,
  package_contents text,
  image_url text,
  stock integer not null default 0 check (stock >= 0),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.products enable row level security;
drop policy if exists "Anyone can view published products" on public.products;
create policy "Anyone can view published products" on public.products
  for select to anon, authenticated using (is_published = true);
-- Do not create public insert/update/delete policies for products.
-- Manage catalog writes using a trusted admin/server path after defining admin roles.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
drop policy if exists "Users can read own profile" on public.profiles;
drop policy if exists "Users can create own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can read own profile" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);
create policy "Users can create own profile" on public.profiles
  for insert to authenticated with check ((select auth.uid()) = id);
create policy "Users can update own profile" on public.profiles
  for update to authenticated using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_email text not null,
  status text not null default 'pending' check (status in ('pending','awaiting_payment','paid','processing','shipped','completed','cancelled','refunded')),
  subtotal_idr integer not null check (subtotal_idr >= 0),
  shipping_idr integer not null default 0 check (shipping_idr >= 0),
  total_idr integer not null check (total_idr >= 0),
  shipping_address jsonb not null,
  payment_provider text,
  provider_reference text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.orders enable row level security;
drop policy if exists "Customers can read their own orders" on public.orders;
create policy "Customers can read their own orders" on public.orders
  for select to authenticated using ((select auth.uid()) = user_id);
-- No client-side order insert/update or payment confirmation policy by design.
-- Create orders and verify payment status through a trusted server/Edge Function using
-- the provider's signed webhook. Never accept client-supplied "paid" status.

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name_snapshot text not null,
  unit_price_idr integer not null check (unit_price_idr >= 0),
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now()
);
alter table public.order_items enable row level security;
drop policy if exists "Customers can read items from their own orders" on public.order_items;
create policy "Customers can read items from their own orders" on public.order_items
  for select to authenticated using (
    exists (select 1 from public.orders o where o.id = order_id and o.user_id = (select auth.uid()))
  );

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  display_name text not null,
  rating integer not null check (rating between 1 and 5),
  body text not null check (length(body) between 3 and 2000),
  verified_purchase boolean not null default false,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.reviews enable row level security;
drop policy if exists "Anyone can view published reviews" on public.reviews;
create policy "Anyone can view published reviews" on public.reviews
  for select to anon, authenticated using (is_published = true);
-- Review submission and moderation policies intentionally omitted until verified-purchase
-- checks and anti-spam controls are implemented.

-- Never store raw card numbers, CVV, payment passwords, or provider secret keys in these tables.
