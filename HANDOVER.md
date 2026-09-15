# CSST Website — Technical Handover

Everything needed to take ownership of and maintain the CSST website.

---

## Stack at a Glance

| Layer | Technology | Where |
|---|---|---|
| Framework | Next.js 16 (App Router) | This repo |
| Styling | Tailwind CSS v4 + CSS custom properties | `app/globals.css` |
| Animations | Framer Motion | Component files |
| Hosting | Netlify | Auto-deploys on every push to `main` |
| Domain | csrockets.org (configure DNS in Netlify) | Netlify dashboard |
| CMS | Email → Claude AI → GitHub API | `netlify/functions/cms-email.ts` |
| Instagram feed | Behold.so | `components/CelebrationsSection.tsx` |
| Fonts | Google Fonts (Orbitron, Space Grotesk) | `app/layout.tsx` |

---

## Repository

**GitHub:** https://github.com/Mervil-Studio/Mervil-Catalyst

The `main` branch is the live branch. Every push triggers a Netlify deploy (~2 min).

---

## Accounts to Create / Take Over

### 1. Anthropic (Claude API)
- **URL:** https://console.anthropic.com
- **What it's for:** Powers the email CMS
- **Cost:** Pay-per-use. At school update volume (~5-20 emails/month) expect < $1/month
- **Action:** Create account → Billing → Add payment method → API Keys → Create key
- **Env var:** `ANTHROPIC_API_KEY`

### 2. GitHub
- **URL:** https://github.com/Mervil-Studio/Mervil-Catalyst
- **What it's for:** Source code + content storage. CMS commits JSON changes here
- **Action:** Transfer repo ownership to school's GitHub org, OR create a deploy bot account
- **Personal Access Token:** github.com → Settings → Developer settings → Personal access tokens → Tokens (classic) → New token
  - Scopes needed: `repo` (full repo access)
  - Set expiration to "No expiration" or 1 year with a reminder to rotate
- **Env vars:** `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`

### 3. Netlify
- **URL:** https://app.netlify.com
- **What it's for:** Hosting + serverless functions + auto-deploy from GitHub
- **Cost:** Free tier is sufficient
- **Action:** Transfer site ownership to school's Netlify account
- **Env vars:** All secrets are set here (see below)

### 4. Behold.so (Instagram feed)
- **URL:** https://behold.so
- **What it's for:** Pulls @csrockets_cos Instagram posts into the Celebrations section
- **Cost:** Free tier (sufficient for this use)
- **Action:** Sign up → Connect Instagram @csrockets_cos → Create feed → Copy Feed ID
- **Where to paste it:** `components/CelebrationsSection.tsx` line 13: `const BEHOLD_FEED_ID = "YOUR_ID_HERE";`
- Then commit and push — site will show live Instagram feed within minutes

### 5. Email forwarding (for the CMS)
- **What it's for:** Forwards staff emails to the Netlify CMS function
- **Recommended:** Zapier (free tier works)
  - Trigger: "New Email" in Gmail (use a dedicated Gmail: updates@csrockets.org or similar)
  - Action: "Webhooks by Zapier" → POST
  - URL: `https://[your-netlify-site].netlify.app/.netlify/functions/cms-email`
  - Body (JSON):
    ```json
    {
      "from": "{{from_email}}",
      "subject": "{{subject}}",
      "body": "{{body_plain}}"
    }
    ```
  - Header: `x-cms-secret: [your CMS_WEBHOOK_SECRET value]`

---

## Netlify Environment Variables

Set all of these in: **Netlify dashboard → Site → Site configuration → Environment variables**

| Variable | Value | Notes |
|---|---|---|
| `ANTHROPIC_API_KEY` | `sk-ant-...` | From Anthropic console |
| `GITHUB_TOKEN` | `ghp_...` | GitHub PAT with `repo` scope |
| `GITHUB_OWNER` | `Mervil-Studio` | GitHub org/user that owns the repo |
| `GITHUB_REPO` | `Mervil-Catalyst` | Repository name |
| `CMS_ALLOWED_SENDERS` | `principal@csrockets.org,staff@csrockets.org` | Comma-separated. Only these addresses can update the site |
| `CMS_WEBHOOK_SECRET` | any random string | Must match what Zapier sends in the `x-cms-secret` header |

---

## Content Files (what staff can update via email)

| File | What it controls |
|---|---|
| `data/announcements.json` | Site-wide announcement banner |
| `data/events.json` | Upcoming Open Houses / Info Nights section |
| `content/leadership.json` | Leadership team cards |
| `content/faculty.json` | Faculty cards |
| `content/board.json` | Board member cards |

All files are plain JSON — can also be edited directly in GitHub's web editor if needed.

---

## Theme System

The site has 4 pathway themes — visitors can switch between them.

| Theme ID | Colors | Pathway |
|---|---|---|
| `leadership` | Teal (CSST brand blue) | Leadership — **default** |
| `aerospace` | Deep space + green | Aerospace |
| `cyber` | Near-black + cyan | Cybersecurity |
| `entrepreneurship` | Warm white + orange | Entrepreneurship |

Default theme is set in:
- `app/globals.css` — `:root` block
- `app/theme-context.tsx` — `useState("leadership")`
- `app/layout.tsx` — FOUC-prevention inline script

---

## Deploying

Deploys are automatic. Any push to `main` on GitHub triggers a Netlify rebuild (~2 minutes).

To force a manual deploy: Netlify dashboard → Deploys → Trigger deploy.

---

## DNS / Domain Setup

To connect `csrockets.org` to Netlify:
1. Netlify → Site → Domain management → Add custom domain
2. Follow Netlify's DNS instructions (add A record or CNAME to your domain registrar)
3. Netlify handles SSL automatically via Let's Encrypt

---

## Development Setup (for future developers)

```bash
git clone https://github.com/Mervil-Studio/Mervil-Catalyst.git
cd Mervil-Catalyst
npm install
npm run dev
# → http://localhost:3000
```

Node.js 18+ required.

---

## File Structure

```
app/
  page.tsx              ← Main page (section order lives here)
  layout.tsx            ← Root layout, fonts, announcement bar
  globals.css           ← Theme CSS variables + base styles
  theme-context.tsx     ← Theme state management
  apply/page.tsx        ← Application form
components/
  Navigation.tsx        ← Top nav + mobile drawer
  HeroSection.tsx       ← Hero / above the fold
  ThemeSelectorSection.tsx ← Pathway theme switcher bar
  StatsBar.tsx          ← Key numbers bar
  EventsSection.tsx     ← Upcoming Open Houses
  CelebrationsSection.tsx ← Instagram / photo feed
  DiverseThinkersSection.tsx ← "Our Students Are"
  TheSpaceSection.tsx   ← Facility / campus section
  ProgramTracks.tsx     ← Academic pathways
  EcosystemSection.tsx  ← Industry partners
  TeamSection.tsx       ← Staff directory
  FAQSection.tsx        ← FAQ accordion
  AnnouncementBar.tsx   ← Persistent top bar
  AnnouncementModal.tsx ← Rocket launch modal
  ImageBreak.tsx        ← Full-width image dividers
  Footer.tsx
content/
  leadership.json       ← Leadership team data
  faculty.json          ← Faculty data
  board.json            ← Board data
data/
  announcements.json    ← Site announcement banner
  events.json           ← Upcoming events
netlify/
  functions/
    cms-email.ts        ← AI-powered email CMS function
public/
  csst-logo.png         ← Main logo (WebP format, rename if replacing)
  csst-rocket.png       ← Rocket cut from logo (used in modals)
  csst-rocket-icon.png  ← Rocket icon asset
STAFF-GUIDE.md          ← How staff update the site via email
HANDOVER.md             ← This document
```

---

## Replacing Placeholder Photos

All Unsplash placeholder images are marked with `caption="Placeholder · Replace with CSST student photos"` in `app/page.tsx`. To replace:

1. Upload real photos to `/public/` or an image host
2. Find the `<ImageBreak>` or `<img>` tags in the relevant component
3. Replace the `src` URL
4. Commit and push

For the student life grid (`CelebrationsSection`), once Behold.so is connected this happens automatically from Instagram posts.

---

*Built by Mervil Studio · 2026*
