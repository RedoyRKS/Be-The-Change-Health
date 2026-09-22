# Be The Change Health & Wellness Center — UI Frontend

Modern MediLab-based homepage for Be The Change Health. Display-only UI.

## Quick Start

```bash
python -m http.server 8000
```

Open **http://localhost:8000**

## Structure

```
├── index.html              # MediLab-style home (branded)
├── css/btc-theme.css       # Brand theme (navy/teal/green)
├── UI/assets/   # Bootstrap + MediLab CSS/JS (runtime only)
├── about/, conditions/, services/, …
├── *.html                  # Other site pages
└── assets/                 # Clinic images + styles for other pages
```

## Design

- **Colors:** Navy `#003048`, Teal `#308ca0`, Accent Green `#a2c08a`
- **Font:** Poppins
- **Home layout:** MediLab (Bootstrap 5) + BTC theme
