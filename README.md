# Be The Change Health & Wellness Center — UI Frontend

Modern MediLab-based homepage for [Be The Change Health](https://www.bethechangewellnesscenter.com/). Display-only UI — no backend APIs.

## Quick Start

```bash
python -m http.server 8000
```

Open **http://localhost:8000**

## What’s new (Home)

- Homepage redesigned with the [MediLab](https://themewagon.github.io/MediLab/index.html) layout
- Brand colors: Navy `#003048`, Teal `#308ca0`, Accent `#a2c08a`, Poppins
- All original home content preserved (approach, 8 conditions, therapies, doctors, reviews, newsletter offer, contact/hours)
- Previous Avada home saved as `index.avada.backup.html`
- Other pages still use the previous static HTML until redesigned

## Structure

```
├── index.html                 # New MediLab-style home
├── index.avada.backup.html    # Previous home (backup)
├── css/btc-theme.css          # Brand overrides for MediLab
├── MediLab-1.0.0/             # MediLab template assets
├── about/, conditions/, services/, …
└── assets/media/              # Clinic images & logos
```

## Design

- **Colors:** Navy `#003048`, Teal `#308ca0`, Accent Green `#a2c08a`
- **Font:** Poppins
- **Layout:** MediLab (Bootstrap 5) + BTC theme
