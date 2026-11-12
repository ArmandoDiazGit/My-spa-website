## 💆‍♀️ Massage Spa Website (Booking App)

This project is the booking portion of a Massage Spa website built with React + Vite.
It allows customers to submit booking requests through a clean and responsive interface.

The app is designed to work alongside a separate Admin Panel where bookings can be viewed and managed.

## 🚀 Tech Stack

* Frontend
    * React
    * Vite
    * JavaScript
    * HTML
    * CSS
    * Backend (In Progress)
    * FastAPI (planned)
    * REST API

## 🧱 Architecture

The source is organized by feature, not by file type. A new engineer should be
able to find everything for a section in one folder.

```text
src/
  app/                 # app shell: root component, providers, global styles
  features/            # one folder per page section
    home/
    about/
    services/
    reviews/           # includes testimonials.js, only used here
    location/
    contact/
    navigation/
    footer/
  shared/              # cross-cutting code only
    api/               # axios client, env config, EmailJS wrapper
    booking/           # booking dialog, calendar, API, hooks, date helpers
    data/              # spa info, services, images
    ui/                # Button, Select, Toast, Toaster
    assets/            # static images
  main.jsx             # entry point
```

Rules enforced by ESLint (`no-restricted-imports`):

* Features may import from `shared/` and their own files.
* Features must not import each other. If two features need the same code, it
  moves to `shared/`.
* `shared/` must not import from `features/` or `app/`.
* `app/` owns routing, providers, and global layout.

State layering:

* Server state lives in TanStack Query. There is no global store.
* The booking flow lives in `shared/booking/` because three features open it.
* `BookingDialog` lazy-loads the calendar and EmailJS only when opened, so the
  initial page does not pay for them.

Secrets/config are read in one place (`shared/api/env.js`). Copy `.env.example`
to `.env` and fill in the values to override the API origin or EmailJS keys.

## ✨ Current Features

* Booking form for spa & massage services

* Client-side form validation

* Clean and responsive UI

* Structured booking payload ready for backend integration

## 🔗 Related Projects

Admin Panel (Angular)
Used to view and manage bookings submitted from this app
👉 Link to admin panel repo:
[admin-panel-angular](https://github.com/ArmandoDiazGit/angular-admin-panel)

## ⚙️ Setup & Installation

* Clone the repository

* git clone https://github.com/your-username/massage-spa-booking.git

* Install dependencies

* npm install

* Run the app

* npm run dev

* Open in browser
  
* Navigate to http://localhost:5173

## 🧪 Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build |
| `npm run size` | Check brotli bundle budgets against `dist/` |
| `npm run verify` | Lint, build, and check bundle budgets |
| `npm run test:e2e` | Cypress end-to-end tests |
| `npm run test:component` | Cypress component tests |
| `npm run test:all` | Both Cypress suites |

## 🎯 Project Goal

This project was built to:

  * Create a real-world booking flow for a service-based business

  * Practice React + Vite setup and performance

  * Prepare frontend logic for backend integration

  * Connect a customer-facing app with an admin dashboard

## 🚧 Status

🚧 Backend integration is currently in progress
The FastAPI backend will handle booking persistence, validation, and admin access.

## 🛠️ Planned Improvements

* Connect booking form to FastAPI backend

* Persist bookings in a database

* Add confirmation messages and error handling

* Improve UI and accessibility

## 🤝 Contributions

Suggestions and feedback are welcome. Feel free to open an issue or submit a pull request.
