# Ranajob

A mobile-first Nigerian services marketplace where workers advertise their skills and clients hire them directly. Built with Next.js 15 App Router, fully frontend — no backend or database required.

---

## What it does

Ranajob connects two types of users:

- **Workers** — skilled individuals (teachers, tailors, plumbers, designers, caterers, etc.) who post service listings and get hired
- **Clients** — individuals or businesses who browse listings, save favourites, and reach out to workers

The platform is localised for the Nigerian market: prices are in ₦ Naira, listings are filtered by Nigerian cities, and location is auto-detected using the device's GPS.

---

## Features

### For everyone
- Sign up with role selection (Worker or Client)
- Onboarding flow after registration
- Auto GPS location detection (reverse-geocoded to Nigerian city names)
- Messaging — view and reply to conversations
- Notifications — dismissal and read state persisted across sessions
- Profile page — view and edit personal information
- Settings

### For Clients
- Browse all service listings
- Search listings by keyword with live result highlighting
- Filter by category, price range, and location
- Sort listings by newest, oldest, or price
- Clear all active filters with one tap
- Save / bookmark any listing
- View saved jobs on the profile page
- View full listing detail page

### For Workers
- Post a new service listing
- View own posted listings on the home dashboard
- Profile shows live "Active Listings" count
- Quick "Post a new service" shortcut on the profile
- Coins system (UI ready — feature coming soon)

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| UI library | React 19 |
| Language | TypeScript 5 |
| Component styling | Emotion (`@emotion/styled`) |
| Component library | MUI 6 (`@mui/material`) |
| Icons | Phosphor Icons (`@phosphor-icons/react`) |
| Utility CSS | Tailwind CSS 4 |
| Data persistence | Browser `localStorage` |
| Location | Browser Geolocation API + Nominatim (OpenStreetMap) |
| Auth | Session cookie + `localStorage` (client-side only) |

---

## Project structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout — wraps every page with Header + Footer
│   ├── page.tsx            # Home — routes to HomeClient or HomeWorker
│   ├── signin/             # Sign-in page
│   ├── signup/             # Sign-up page
│   ├── onboarding/         # Post-signup onboarding
│   ├── profile/            # Profile page
│   ├── settings/           # Settings page
│   ├── post-job/           # Post a service (workers only)
│   ├── job/[id]/           # Listing detail page
│   ├── Messages/           # Conversations list + chat
│   └── notification/       # Notifications
│
├── modules/                # Page-level feature modules
│   ├── Home/
│   │   ├── index.tsx       # Thin router → HomeClient or HomeWorker
│   │   ├── HomeClient.tsx  # Browse, search, filter, sort listings
│   │   ├── HomeWorker.tsx  # Worker dashboard with posted jobs
│   │   └── JobFilter.tsx   # Filter bar component
│   ├── Profile/
│   │   ├── index.tsx       # Profile page (role-aware)
│   │   ├── ProfileEdit.tsx # Edit profile drawer form
│   │   └── SavedJobs.tsx   # Saved jobs section (searches both static + posted jobs)
│   ├── Auth/               # SignIn + SignUp forms
│   ├── PostJob/            # Post a service form (workers only)
│   ├── Messages/           # Chat UI
│   ├── Notifications/      # Notifications list
│   ├── Onboarding/         # Onboarding steps
│   └── Settings/           # Settings page content
│
├── components/
│   ├── Layout/
│   │   ├── Header.tsx      # Desktop nav with auto location detection
│   │   ├── Footer/         # Mobile bottom navigation bar
│   │   └── styles.tsx      # Header styled components
│   ├── Card/               # Job listing card with bookmark toggle
│   ├── Buttons/            # Reusable button components
│   ├── Drawer/             # Slide-up drawer (used for Edit Profile)
│   ├── Inputs/             # Text inputs, search bar
│   ├── Select/             # Dropdown select component
│   └── StarRating/         # Star rating display
│
├── utils/
│   ├── hooks/
│   │   ├── useLocalStorage.tsx   # Generic localStorage state hook
│   │   └── useSavedJobs.tsx      # Saved job IDs hook
│   ├── constants.ts        # Nav links, filter options, category lists
│   ├── colors.util.ts      # Design token colours
│   └── typography.tsx      # Typography styled components
│
├── types/
│   └── index.ts            # Shared TypeScript types (PostedJob, etc.)
│
├── db.tsx                  # All mock data — jobs, users, messages, notifications
└── middleware.ts            # Route protection (redirects unauthenticated users)
```

---

## Getting started

### Prerequisites
- Node.js 18 or later
- npm or yarn

### Install and run

```bash
# Install dependencies
npm install

# Start the development server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

```bash
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint
npx tsc --noEmit  # TypeScript type check (no output = clean)
```

---

## Account types

The app has two distinct account types, chosen at sign-up and stored in `localStorage`.

| Feature | Client | Worker |
|---|---|---|
| Browse all listings | Yes | Yes |
| Search and filter | Yes | Yes |
| Save / bookmark jobs | Yes | Yes |
| View saved jobs on profile | Yes | Yes |
| Post a service | No | Yes |
| Worker home dashboard | No | Yes |
| Profile stat — first card | Saved Jobs count | Active Listings count |
| "Post a new service" CTA on profile | No | Yes |

To switch account type during development, change `accountType` in `src/db.tsx` → `initialUserData` between `"client"` and `"worker"`.

---

## Data and persistence

There is no backend. All data is either mock data in `src/db.tsx` or stored in the browser's `localStorage`.

### Mock data (`src/db.tsx`)
| Export | Contents |
|---|---|
| `jobData` | 9 static service listings across categories |
| `initialUserData` | Default user profile (name, role, accountType, coins, etc.) |
| `messagesData` | Mock conversation threads |
| `notificationsData` | Mock notifications |
| `savedFilters` | Example saved search filters |

### localStorage keys

| Key | Type | Contents |
|---|---|---|
| `rana-user-profile` | Object | User's full profile — name, role, location, phone, accountType, coins |
| `rana-posted-jobs` | Array | Jobs posted by the current worker |
| `rana-saved-jobs` | Array | IDs of jobs the user has bookmarked |
| `rana-notifications` | Array | Notification read / dismissed state |
| `rana-geo-location` | Object | `{ city, ts }` — cached GPS result with 1-hour TTL |
| `rana-session` | Cookie | Session presence flag written on sign-in |

All persistent state goes through the `useLocalStorage` hook (`src/utils/hooks/useLocalStorage.tsx`). Never call `localStorage` directly in a component.

---

## Location detection

On first load, the Header component requests the device's GPS position via the browser Geolocation API. Coordinates are reverse-geocoded through [Nominatim](https://nominatim.openstreetmap.org/) (OpenStreetMap — free, no API key required). A lookup table of ~100 Nigerian LGA names maps administrative names (e.g. "Eti-Osa", "Abuja Municipal Area Council") to recognisable city names (e.g. "Lagos", "Abuja"). The resolved city is cached in localStorage for 1 hour so the GPS request is not repeated on every page load.

---

## Authentication

Authentication is client-side only — this is a prototype with no server-side session validation.

On sign-in / sign-up, a `rana-session` cookie is written with `SameSite=Strict` and a 7-day expiry. The Next.js middleware (`src/middleware.ts`) checks for this cookie and redirects unauthenticated requests to `/signin`. The `from` query parameter is validated to only allow relative paths, preventing open-redirect attacks.

---

## Pages and routes

| Route | Description | Auth required |
|---|---|---|
| `/` | Home — browse listings (client) or dashboard (worker) | Yes |
| `/signin` | Sign in | No |
| `/signup` | Create account | No |
| `/onboarding` | Post-signup onboarding flow | No |
| `/profile` | User profile with saved jobs and stats | Yes |
| `/settings` | Account settings | Yes |
| `/post-job` | Post a new service listing (workers only) | Yes |
| `/job/[id]` | Full listing detail page | Yes |
| `/Messages` | Conversations and chat | Yes |
| `/notification` | Notifications | Yes |

---

## Design conventions

- **Colours** — defined as tokens in `src/utils/colors.util.ts`
- **Typography** — Emotion-styled text components in `src/utils/typography.tsx`
- **Icons** — always imported from `@phosphor-icons/react/dist/ssr` (SSR-safe path)
- **Styling** — Emotion `styled()` for all components; raw MUI `sx` props used only for layout overrides where a full styled component would be excessive
- **Mobile-first** — the desktop Header is hidden on mobile via `HiddenOnMobile`; the bottom Footer nav is the primary mobile navigation
- **Role-based UI** — branches on `user.accountType === "worker"` inside shared components rather than separate pages

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make changes and verify TypeScript: `npx tsc --noEmit`
4. Commit and open a pull request

### Code conventions
- Use `useLocalStorage` for any state that should survive a page refresh
- Import Phosphor icons from `@phosphor-icons/react/dist/ssr` — never from the root package
- Shared types belong in `src/types/index.ts`
- The `src/db.tsx` file is the single source of truth for all mock data

---

## Roadmap

- [ ] Backend API integration (Node.js / Supabase)
- [ ] Real authentication (JWT / OTP via phone number)
- [ ] Coins / credits payment system (Paystack integration)
- [ ] Image upload for listings and profile photos
- [ ] Real-time messaging (WebSockets / Supabase Realtime)
- [ ] Worker ratings and reviews
- [ ] Push notifications (PWA)
- [ ] Map view with search radius filter
- [ ] Admin dashboard for listing moderation

---

## License

Private project. All rights reserved.
