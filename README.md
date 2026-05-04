# AuthFlow — FreeAPI Authentication App

A clean React authentication app built with Vite.

## Tech Stack
- React 18
- Vite 5
- Vanilla CSS (no Tailwind dependency needed)
- FreeAPI.app for auth endpoints

## Features
- Register with username, email, password
- Login / Logout
- Session restore on page reload (via cookies)
- Current user profile display
- Toast notifications for success/errors
- Loading states on all actions
- Password visibility toggle

## Run Locally

```bash
npm install
npm run dev
```

## Deploy on Vercel (1 click)

1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → import repo
3. Framework preset: **Vite** (auto-detected)
4. Click Deploy — done!

No environment variables or backend needed. The app calls FreeAPI directly.

## Deploy on Netlify

1. Push to GitHub
2. netlify.com → Add new site → Import from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

## API Endpoints Used
- `POST /api/v1/users/register`
- `POST /api/v1/users/login`
- `POST /api/v1/users/logout`
- `GET  /api/v1/users/current-user`
