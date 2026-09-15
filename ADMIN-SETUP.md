# CSST Website Setup — School Admin Guide

This is the simple version. You do not need to be a developer. Follow the steps in order.

You’ll receive a folder of **source files** (the website code). Those files go into GitHub. Netlify reads GitHub and puts the site on the internet.

---

## What each service does

| Service | What it is | Cost |
|---|---|---|
| **GitHub** | Safe storage + version history for the website files | Free |
| **Netlify** | Hosts the live website and publishes updates | **Free.** Custom domains and HTTPS (the padlock) are included. You do **not** pay Netlify just to use `csrockets.org`. |
| **Cursor** | The editor we recommend. AI can help change the site | Free to start |
| **Behold.so** | Pulls the school Instagram photos onto the site | Free tier |
| **Your domain registrar** | Where `csrockets.org` (and extra domains) are purchased | Already owned |

Optional later: the email-update system for staff, open houses, and closure/late-start banners. Setup is in `HANDOVER.md`. Staff wording is in `STAFF-GUIDE.md`.

---

## 1. Create a school GitHub account (free)

GitHub is where the website files live. Every change is saved here, like a history of the site.

1. Go to [github.com](https://github.com) and create an account with a **school email** (not a personal one).
2. Write down the username and password somewhere the school can find later.
3. We recommend making the website repository **public**. This is a school website — there are no passwords in the files — and public repos are easiest to connect to Netlify’s free plan.

You will upload the source files in Step 4.

---

## 2. Create a school Netlify account (this hosts the website)

Netlify is the company that actually puts the site on the internet.

1. Go to [app.netlify.com](https://app.netlify.com) and sign up with the **same school email**.
2. Choose **Sign up with GitHub** so the two accounts are linked. That’s the easiest path.
3. If GitHub asks “allow Netlify to access your repositories,” click **Authorize**.

---

## 3. Save the source files on a school computer

1. Put the folder we give you somewhere easy to find, for example:
   `Documents / CSST-Website`
2. Do **not** rename or delete files inside that folder unless Cursor (or a developer) tells you to.
3. Keep a second copy on Google Drive or a school backup drive.

This computer is where you’ll open the project in Cursor when you want to make changes.

---

## 4. Put the files on GitHub, then connect Netlify

### A. Create a GitHub repository and upload the files

1. In GitHub, click **New repository**.
2. Name it something like `csst-website`.
3. Leave it empty (don’t add a README). Create it.
4. Upload the source files:
   - Easiest: in GitHub, click **Add file → Upload files**, then drag the whole project folder in (all files and folders, including hidden ones if GitHub shows them).
   - Better long-term: a developer or Cursor can “push” the files for you the first time.

When that’s done, you should see folders like `app`, `components`, `public`, and files like `package.json`.

### B. Connect Netlify to GitHub

1. In Netlify: **Add new site → Import an existing project**.
2. Choose **GitHub** and pick the `csst-website` repo.
3. Netlify should detect Next.js. You usually don’t need to change the build settings.
4. Click **Deploy**.

Wait 2–3 minutes. You’ll get a temporary address like `something.netlify.app`. Open it. That’s the live site (before your real domain is attached).

**From now on:** when files are updated on GitHub, Netlify rebuilds automatically and the live site updates.

---

## 5. For editing the website: download Cursor

We recommend [Cursor](https://cursor.com) — it’s like a word processor for the website, with AI that can make the changes for you.

**Typical update flow:**

1. Open the CSST website folder in Cursor.
2. Ask the AI, in plain English, what you want changed  
   (“Change the open house date to October 8” / “Update Mr. Smith’s title”).
3. Review what it changed.
4. Ask it to **push to GitHub**.
5. Netlify deploys. The live site updates in a couple of minutes.

You do **not** edit the live Netlify site by hand. Always: change files → GitHub → Netlify publishes.

For day-to-day announcements and open houses without touching code, see `STAFF-GUIDE.md` (email updates) once that system is turned on.

---

## 6. Behold.so — Instagram photo feed

This is the extra service. It pulls photos from **@csrockets_cos** onto the “Celebrate Life With Us at CSST” section.

1. Go to [behold.so](https://behold.so) and create a free account.
2. Connect the school Instagram: **@csrockets_cos**.
3. Create a feed and copy the **Feed ID**.
4. In the website files, open `components/CelebrationsSection.tsx`.
5. Find this line near the top:

   `const BEHOLD_FEED_ID = "";`

6. Paste the Feed ID between the quotes.
7. Save, push to GitHub, wait for Netlify.

Until that’s done, the site shows placeholder photos. After it’s done, new Instagram posts can appear on the site automatically.

Someone with Instagram admin access for `@csrockets_cos` needs to approve the Behold connection.

---

## 7. Point the main domain (`csrockets.org`) at Netlify

**You do not need to upgrade Netlify for this.** The free plan includes custom domains and a free SSL certificate (the padlock in the browser).

What *does* cost money is the domain name itself — that’s an annual fee at whoever already registered `csrockets.org` (GoDaddy, Google Domains, Namecheap, etc.). The school is almost certainly already paying that. Netlify does not charge extra to attach that name to the site.

The domain is bought from a registrar. Netlify hosts the site; the registrar just needs to point at Netlify.

1. In Netlify: open the site → **Domain management → Add a domain**.
2. Add **csrockets.org**.
3. Netlify will show DNS records to add. Typical pattern:
   - **A record** for `csrockets.org` → Netlify’s IP (Netlify shows the exact number)
   - **CNAME** for `www` → `csrockets.org` or the Netlify hostname they give you
4. Log into the registrar where `csrockets.org` is registered and add those records.
5. Wait (sometimes a few minutes, sometimes up to 24 hours).
6. Netlify adds a free HTTPS certificate (the padlock) automatically.

When it works, `https://csrockets.org` loads the new site.

---

## 8. Extra domains — transfer and redirect to the main site

If the school also owns names like `csst.org`, `coloradospringsschooloftechnology.org`, or old campaign domains, they should all send visitors to **csrockets.org**.

### If you already own the extra domains

1. In Netlify → **Domain management → Add domain** for each extra name.
2. At the registrar, point that domain at Netlify the same way as Step 7.
3. In Netlify, set each extra domain as a **redirect / alias** to the primary domain `csrockets.org`.  
   Example: `www.oldname.org` → `https://csrockets.org`
4. Keep **csrockets.org** as the primary domain.

Visitors who type the old address still arrive at the real site. Search engines also learn that `csrockets.org` is the official one.

### If a domain needs to be transferred to the school

1. At the current registrar, **unlock** the domain and get an **auth / EPP code**.
2. At the school’s registrar, start a **domain transfer** and paste that code.
3. Approve the transfer email. It can take a few days.
4. After transfer, repeat the DNS + Netlify redirect steps above.

Don’t let extra domains expire — even after they redirect, they should stay renewed.

---

## Quick checklist

- [ ] School GitHub account created  
- [ ] School Netlify account created and linked to GitHub  
- [ ] Source files saved on a school computer (and backed up)  
- [ ] Files uploaded to a GitHub repository  
- [ ] Netlify site connected to that repository and first deploy succeeded  
- [ ] Cursor installed for future edits  
- [ ] Behold.so connected to @csrockets_cos; Feed ID pasted into the site  
- [ ] `csrockets.org` DNS pointed at Netlify  
- [ ] Extra domains added in Netlify and redirected to `csrockets.org`  

---

## Who to call if you’re stuck

| Problem | Who helps |
|---|---|
| Can’t log into GitHub or Netlify | School IT / the person who created the accounts |
| Site deploys but looks wrong | Open Cursor, describe the problem, or contact Mervil |
| Instagram photos not showing | Behold.so dashboard + Instagram login for @csrockets_cos |
| Domain still shows the old site | DNS at the registrar (can take up to 24 hours) |
| Extra domain doesn’t redirect | Netlify Domain management → domain aliases / redirects |

More technical detail (API keys, email CMS) is in **`HANDOVER.md`**. Day-to-day announcement wording is in **`STAFF-GUIDE.md`**.
