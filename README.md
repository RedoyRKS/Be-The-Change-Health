# Be The Change Health & Wellness Center — UI Frontend

Static HTML/CSS/JS frontend for [bethechangewellnesscenter.com](https://www.bethechangewellnesscenter.com/). Display-only — no backend, APIs, or third-party service integrations.

## Quick Start

```bash
python -m http.server 8000
```

Open **http://localhost:8000**

## Structure

```
├── index.html              # Homepage
├── about/                  # Practice, medicine types, doctors
├── conditions/             # Condition pages
├── services/               # Therapy / service pages
├── our-process/            # Process page
├── blog.html + articles    # Blog archive and posts
├── memberships.html
├── contact.html, patients.html, new-patient-questions.html
├── privacy-policy.html, terms-conditions.html
├── css/static-fixes.css    # Local UI patches
├── js/site-fixes.js        # Sticky header, nav, animations
└── assets/                 # Images, fonts, Fusion CSS/JS, vendor
```

## Design

- **Colors:** Navy `#003048`, Teal `#308ca0`, Accent Green `#a2c08a`
- **Font:** Poppins
- **Layout:** Avada / Fusion Builder static markup

## Notes

- Forms, booking, and membership buttons are visual only (no submissions or payments).
- Google review widgets render from local markup/CSS; remote review avatars may still load for display.
