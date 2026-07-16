# DWY — Done-With-You Growth

Landing page for the DWY SEO & GEO agency. Pure static HTML/CSS/JS — no build step, works on any free static host.

## Files

- `index.html` — the page (all sections and content)
- `style.css` — design, colors taken from the logo (navy + blue→purple gradient)
- `script.js` — mobile menu, scroll animations, contact form
- `logo.jpeg` — the agency logo (used in header, footer and favicon)

## Before you publish

Open `script.js` and change the contact email at the top:

```js
const CONTACT_EMAIL = "hello@dwy-growth.com";
```

The contact form works without any backend — it opens the visitor's email app with the message pre-filled. If you later want messages delivered without the email app step, a free [Formspree](https://formspree.io) form is an easy upgrade.

## Deploy to GitHub Pages (free)

1. Create a new repository on GitHub (e.g. `dwy-growth`).
2. Upload all files from this folder (or push with git):
   ```
   git init
   git add .
   git commit -m "DWY landing page"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/dwy-growth.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. After a minute your site is live at `https://YOUR-USERNAME.github.io/dwy-growth/`.

Also works as-is on Netlify, Cloudflare Pages, or Vercel — just drag and drop the folder.
