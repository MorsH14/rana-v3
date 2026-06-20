-- ============================================================
-- RANAJOB — Full Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================


-- ── 1. PROFILES ─────────────────────────────────────────────
-- One row per user, linked to Supabase Auth (auth.users)

CREATE TABLE public.profiles (
  id              UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name            TEXT        NOT NULL,
  phone           TEXT        UNIQUE NOT NULL,
  account_type    TEXT        NOT NULL DEFAULT 'client'
                              CHECK (account_type IN ('worker', 'client')),
  role            TEXT,
  location        TEXT,
  profile_image   TEXT,
  coins_left      INTEGER     NOT NULL DEFAULT 0,
  verified        BOOLEAN     NOT NULL DEFAULT false,
  verified_date   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "profiles_update" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_insert" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);


-- ── 2. LISTINGS ─────────────────────────────────────────────
-- Services posted by workers

CREATE TABLE public.listings (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id     UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title         TEXT        NOT NULL,
  company       TEXT        NOT NULL,
  category      TEXT        NOT NULL,
  description   TEXT        NOT NULL,
  salary        TEXT        NOT NULL,
  salary_value  INTEGER     NOT NULL DEFAULT 0,
  location      TEXT        NOT NULL,
  logo          TEXT,
  chips         TEXT[]      NOT NULL DEFAULT '{}',
  rating        NUMERIC(3,2),
  review_count  INTEGER     NOT NULL DEFAULT 0,
  is_active     BOOLEAN     NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "listings_select" ON public.listings
  FOR SELECT USING (is_active = true);

CREATE POLICY "listings_insert" ON public.listings
  FOR INSERT WITH CHECK (auth.uid() = worker_id);

CREATE POLICY "listings_update" ON public.listings
  FOR UPDATE USING (auth.uid() = worker_id);

CREATE POLICY "listings_delete" ON public.listings
  FOR DELETE USING (auth.uid() = worker_id);

CREATE INDEX listings_category_idx    ON public.listings (category);
CREATE INDEX listings_location_idx    ON public.listings (location);
CREATE INDEX listings_salary_idx      ON public.listings (salary_value);
CREATE INDEX listings_worker_idx      ON public.listings (worker_id);
CREATE INDEX listings_created_at_idx  ON public.listings (created_at DESC);


-- ── 3. SAVED JOBS ────────────────────────────────────────────

CREATE TABLE public.saved_jobs (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  listing_id  UUID        NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, listing_id)
);

ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "saved_select" ON public.saved_jobs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "saved_insert" ON public.saved_jobs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "saved_delete" ON public.saved_jobs
  FOR DELETE USING (auth.uid() = user_id);


-- ── 4. CONVERSATIONS ─────────────────────────────────────────

CREATE TABLE public.conversations (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id        UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  worker_id        UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  listing_id       UUID        REFERENCES public.listings(id) ON DELETE SET NULL,
  last_message     TEXT,
  last_message_at  TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (client_id, worker_id, listing_id)
);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conv_select" ON public.conversations
  FOR SELECT USING (auth.uid() = client_id OR auth.uid() = worker_id);

CREATE POLICY "conv_insert" ON public.conversations
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "conv_update" ON public.conversations
  FOR UPDATE USING (auth.uid() = client_id OR auth.uid() = worker_id);

CREATE INDEX conv_client_idx ON public.conversations (client_id);
CREATE INDEX conv_worker_idx ON public.conversations (worker_id);


-- ── 5. MESSAGES ──────────────────────────────────────────────

CREATE TABLE public.messages (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id  UUID        NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id        UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  text             TEXT        NOT NULL,
  read             BOOLEAN     NOT NULL DEFAULT false,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "msg_select" ON public.messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id
        AND (c.client_id = auth.uid() OR c.worker_id = auth.uid())
    )
  );

CREATE POLICY "msg_insert" ON public.messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id
        AND (c.client_id = auth.uid() OR c.worker_id = auth.uid())
    )
  );

CREATE POLICY "msg_update" ON public.messages
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id
        AND (c.client_id = auth.uid() OR c.worker_id = auth.uid())
    )
  );

CREATE INDEX msg_conversation_idx ON public.messages (conversation_id, created_at);


-- ── 6. NOTIFICATIONS ─────────────────────────────────────────

CREATE TABLE public.notifications (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type        TEXT        NOT NULL DEFAULT 'system'
              CHECK (type IN ('application', 'job', 'interview', 'system')),
  title       TEXT        NOT NULL,
  message     TEXT        NOT NULL,
  read        BOOLEAN     NOT NULL DEFAULT false,
  action_href TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notif_select" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "notif_update" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "notif_delete" ON public.notifications
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX notif_user_idx ON public.notifications (user_id, created_at DESC);


-- ── 7. USER PREFERENCES ──────────────────────────────────────

CREATE TABLE public.user_preferences (
  user_id                  UUID    PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  categories               TEXT[]  NOT NULL DEFAULT '{}',
  location_visible         BOOLEAN NOT NULL DEFAULT true,
  phone_visible            BOOLEAN NOT NULL DEFAULT true,
  notif_job_matches        BOOLEAN NOT NULL DEFAULT true,
  notif_application_updates BOOLEAN NOT NULL DEFAULT true,
  notif_profile_tips       BOOLEAN NOT NULL DEFAULT true,
  notif_reviews            BOOLEAN NOT NULL DEFAULT true,
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "prefs_all" ON public.user_preferences
  FOR ALL USING (auth.uid() = user_id);


-- ── 8. AUTO-UPDATE updated_at ────────────────────────────────

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ── 9. AUTO-CREATE PROFILE ON SIGN-UP ────────────────────────
-- When a new user signs up via Supabase Auth, create their profile row.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
    COALESCE(NEW.phone, NEW.id::text)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ── 10. SEED DATA ─────────────────────────────────────────────
-- Insert a system auth user first (SQL editor has superuser access to auth schema).
-- This account is never surfaced in the UI — it owns the default seed listings only.

INSERT INTO auth.users (id, phone, created_at, updated_at, role, aud, encrypted_password)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  '+2340000000000',
  NOW(), NOW(),
  'authenticated', 'authenticated', ''
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, name, phone, account_type)
VALUES ('00000000-0000-0000-0000-000000000000', 'RanaJob System', '+2340000000000', 'worker')
ON CONFLICT (id) DO NOTHING;

-- The 9 default listings that appear on the browse page.
INSERT INTO public.listings
  (id, worker_id, title, company, category, description, salary, salary_value, location, logo, chips, rating, review_count)
VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000000',
    'Lesson Teacher (Maths & English)',
    'Chidi Okafor',
    'education',
    'Experienced lesson teacher available for primary 3–6 pupils. I cover Mathematics, English Language, and Basic Science. I can visit your home in Lagos or teach online via Zoom. Very flexible schedule including weekends and public holidays.',
    '₦15,000/month', 15000, 'Lagos', '/assets/images/logo.jpeg',
    ARRAY['Education','Home Visit','Online'], 4.8, 47
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000000',
    'Professional Tailor & Fashion Designer',
    'Fatima Bello Designs',
    'fashion',
    'Skilled tailor with 8 years of experience in ladies'' wear, men''s native attire, and alterations. Specialising in Ankara, lace, and corporate styles. I deliver within 5–7 working days with quality finish guaranteed. Free minor alterations within 2 weeks.',
    '₦8,000/outfit', 8000, 'Abuja', '/assets/images/logo.jpeg',
    ARRAY['Fashion','On-site','Ankara'], 4.9, 132
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000000',
    'Full Stack Web Developer',
    'DevHub Nigeria',
    'tech',
    'We build fast, responsive websites and web applications for Nigerian businesses. Services include landing pages, e-commerce stores, dashboards, and custom software. Technologies: React, Next.js, Node.js, and PostgreSQL. Portfolio available on request.',
    '₦200,000/project', 200000, 'Lagos', '/assets/images/logo.jpeg',
    ARRAY['Tech','Remote','Web Dev'], 4.7, 64
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000000',
    'Caterer & Event Chef',
    'Mama Tee Catering',
    'food-events',
    'Professional catering service for weddings, birthdays, corporate events, and family gatherings. We handle everything from menu planning to serving staff. Specialties include Jollof rice, small chops, pepper soup, and all Nigerian cuisines. Minimum 20 guests.',
    '₦50,000/event', 50000, 'Port Harcourt', '/assets/images/logo.jpeg',
    ARRAY['Food & Events','On-site','All Cuisines'], 4.9, 218
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000000',
    'Professional Home Cleaner',
    'CleanPro Services',
    'home-services',
    'Thorough, reliable home cleaning for apartments and houses in Lagos. Services include deep cleaning, regular maintenance cleaning, post-renovation cleanup, and move-in/move-out cleaning. All cleaning supplies provided. Background-checked staff.',
    '₦5,000/session', 5000, 'Lagos', '/assets/images/logo.jpeg',
    ARRAY['Home Services','On-site','Deep Clean'], 4.6, 89
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    '00000000-0000-0000-0000-000000000000',
    'Dispatch Rider / Delivery',
    'Rapid Dispatch Lagos',
    'transport',
    'Fast and reliable dispatch and delivery service within Lagos. Available for e-commerce deliveries, document dispatch, food delivery, and errand runs. Covering all Lagos areas including Island and Mainland. Real-time tracking available. Own bike and phone.',
    '₦3,000/day', 3000, 'Lagos', '/assets/images/logo.jpeg',
    ARRAY['Transport','On-site','Same Day'], 4.5, 156
  ),
  (
    '00000000-0000-0000-0000-000000000007',
    '00000000-0000-0000-0000-000000000000',
    'Graphic Designer & Brand Identity',
    'Tunde Visuals',
    'tech',
    'Creative graphic designer specialising in brand identity, social media graphics, flyers, banners, and business card design. Tools: Adobe Illustrator, Photoshop, and Canva Pro. Fast delivery with unlimited revisions. Over 200 satisfied clients.',
    '₦25,000/project', 25000, 'Abuja', '/assets/images/logo.jpeg',
    ARRAY['Tech','Remote','Branding'], 4.8, 203
  ),
  (
    '00000000-0000-0000-0000-000000000008',
    '00000000-0000-0000-0000-000000000000',
    'Licensed Plumber',
    'Ade Plumbing Works',
    'home-services',
    'Licensed and experienced plumber available for pipe installations, leak repairs, bathroom fittings, and general plumbing maintenance. I carry my own tools and source quality materials at fair prices. Emergency call-outs available. Serving Ibadan and environs.',
    '₦10,000/job', 10000, 'Ibadan', '/assets/images/logo.jpeg',
    ARRAY['Home Services','On-site','Emergency'], 4.7, 73
  ),
  (
    '00000000-0000-0000-0000-000000000009',
    '00000000-0000-0000-0000-000000000000',
    'Professional Makeup Artist',
    'Glam by Sola',
    'fashion',
    'Certified makeup artist specialising in bridal, aso-ebi, photoshoot, and everyday glam. I use high-end, skin-safe products suitable for all skin tones including dark skin. Available for home visits across Lagos. Bookings close 2 weeks before event date.',
    '₦30,000/occasion', 30000, 'Lagos', '/assets/images/logo.jpeg',
    ARRAY['Fashion','Home Visit','Bridal'], 4.9, 311
  );


-- ── 11. ROLE GRANTS ───────────────────────────────────────────
-- Required because tables were created via SQL editor (not dashboard UI).
-- Without these, the authenticated/anon roles have no table-level access
-- even if RLS policies exist.

GRANT SELECT ON public.listings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.listings TO authenticated;

GRANT SELECT ON public.profiles TO anon, authenticated;
GRANT INSERT, UPDATE ON public.profiles TO authenticated;

GRANT SELECT, INSERT, DELETE ON public.saved_jobs TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.conversations TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.messages TO authenticated;
GRANT SELECT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_preferences TO authenticated;
