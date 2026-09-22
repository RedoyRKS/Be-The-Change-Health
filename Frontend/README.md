# Be The Change Health & Wellness Center

Static frontend for Be The Change Health — CMS-style project layout. Display-only UI.

## Quick Start

```bash
cd Frontend
python -m http.server 8000
```

Open **http://localhost:8000**

## Project Structure

```
Be The Change Health/
├── .git/
└── Frontend/
    ├── index.html                 # Home (MediLab theme)
    ├── about/                     # Practice, medicine types, doctors
    ├── our-process/               # Care process
    ├── conditions/                # Condition pages
    ├── services/                  # Therapy / service pages
    ├── blog/                      # Blog index + articles
    ├── book-appointment.html      # Appointment booking form
    ├── contact.html
    ├── memberships.html
    ├── patients.html
    ├── new-patient-questions.html
    ├── privacy-policy.html
    ├── terms-conditions.html
    └── assets/
        ├── css/
        │   ├── theme.css          # Brand theme (home + about + booking)
        │   └── legacy-fixes.css   # Fixes for remaining pages
        ├── js/
        │   ├── appointment.js     # Booking form validation
        │   └── legacy-fixes.js
        ├── uploads/               # Clinic images & media
        ├── vendor/                # Bootstrap, icons, AOS, Swiper, theme
        └── legacy/                # Avada/Fusion assets for unrebuilt pages
```

## Design

- **Colors:** Navy `#003048`, Teal `#308ca0`, Accent Green `#a2c08a`
- **Font:** Poppins
- **Home / About / Our Process / Book Appointment:** MediLab + brand theme
- **Other sections:** Existing static pages (shared chrome assets under `assets/legacy`)
