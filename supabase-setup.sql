-- Run this entire script in Supabase Dashboard → SQL Editor

-- ── profiles ──────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id              uuid        primary key references auth.users(id) on delete cascade,
  name            text        not null,
  email           text,
  phone           text,
  account_type    text        not null default 'worker'
                              check (account_type in ('worker', 'client')),
  role            text,
  location        text,
  profile_image   text,
  coins_left      integer     not null default 0,
  verified        boolean     not null default false,
  verified_date   timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Anyone logged in can read any profile (needed for browsing workers)
drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select"
  on public.profiles for select
  using (true);

-- Users can create their own profile row
drop policy if exists "profiles_insert" on public.profiles;
create policy "profiles_insert"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Users can update their own profile
drop policy if exists "profiles_update" on public.profiles;
create policy "profiles_update"
  on public.profiles for update
  using (auth.uid() = id);

grant all on public.profiles to service_role;

-- ── user_preferences ──────────────────────────────────────────────────────
create table if not exists public.user_preferences (
  user_id                   uuid        primary key references auth.users(id) on delete cascade,
  categories                text[]      not null default '{}',
  location_visible          boolean     not null default true,
  phone_visible             boolean     not null default true,
  notif_job_matches         boolean     not null default true,
  notif_application_updates boolean     not null default true,
  notif_profile_tips        boolean     not null default true,
  notif_reviews             boolean     not null default true,
  updated_at                timestamptz not null default now()
);

alter table public.user_preferences enable row level security;

drop policy if exists "prefs_all" on public.user_preferences;
create policy "prefs_all"
  on public.user_preferences for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant all on public.user_preferences to service_role;

-- ── otp_codes (already exists, keep it) ───────────────────────────────────
-- No changes needed, just ensuring service_role access
grant all on table public.otp_codes to service_role;
