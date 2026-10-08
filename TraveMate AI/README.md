# TraveMate AI 🌍✈️

**TraveMate AI** is a full-stack AI-powered travel planning application that helps users create, manage, personalize, save, and share structured travel itineraries.

The application combines a **React + Vite frontend**, **Node.js + Express backend**, **MongoDB/Mongoose persistence**, and **Google Gemini 2.5 Flash** for AI-assisted itinerary generation. It also includes JWT authentication, Google Sign-In, password recovery, public trip sharing, favorites, PDF export, user profiles, and an admin dashboard.

> **Creator / Portfolio Owner:** Tanay Gupt

---

## ✨ Features

### 🤖 AI-Powered Trip Planning

- Generate structured day-by-day travel itineraries with **Google Gemini 2.5 Flash**.
- Provide trip preferences such as:
  - Destination city and country
  - Trip duration
  - Number of travelers
  - Budget level
  - Travel style
  - Interests
  - Start date
- The backend sends a structured prompt to Gemini and parses the returned JSON itinerary.
- Generated itineraries can include:
  - Trip summary and highlights
  - Daily morning, afternoon, and evening plans
  - Hotels and booking links
  - Restaurant recommendations
  - Transportation suggestions
  - Budget breakdown
  - Travel tips
  - Packing list
  - Emergency contacts
  - Weather information
  - Must-visit places
  - Hidden gems
  - Food recommendations
  - Shopping spots
  - Nearby attractions
  - Map locations

### 🔐 Authentication & Authorization

- Email/password registration and login.
- Passwords are hashed using **bcryptjs** before storage.
- JWT-based authentication with:
  - Short-lived access tokens
  - Refresh-token flow
  - HTTP-only refresh-token cookie
- Google Sign-In using **Google Identity Services**.
- Backend verification of Google credentials before authentication.
- Password-reset workflow using expiring reset tokens and SMTP email.
- Protected frontend routes for authenticated users.
- Role-based backend authorization for admin-only operations.

### 🗺️ Trip Management

Authenticated users can:

- Generate AI itineraries.
- Save trips to MongoDB.
- View previously created trips.
- Open individual trip details.
- Update trip information.
- Delete trips.
- View trip statistics on the dashboard.
- Create public share links.
- View shared trips without authentication.

### ⭐ Favorites

- Save favorite destinations to the user's account.
- View saved destinations from the dashboard.
- Remove destinations from favorites.

### 📄 PDF Export

- Export a generated itinerary as a downloadable PDF.
- Uses browser-side rendering with **html2canvas** and **jsPDF**.

### 👤 User Profile & Settings

- View and update profile information.
- Upload an avatar.
- Change password.
- Delete account.
- Configure application preferences such as theme and notifications.
- Light/dark/system theme support.

### 🛡️ Security Measures

The backend includes multiple security layers:

- **Helmet** for HTTP security headers.
- **Express rate limiting** for general API traffic and authentication endpoints.
- Dedicated generation rate limiting for AI itinerary requests.
- **MongoDB query sanitization** with `express-mongo-sanitize`.
- Request validation with `express-validator`.
- Password hashing with bcrypt.
- HTTP-only refresh-token cookies.
- Controlled CORS configuration.
- Content Security Policy configuration for production.
- Controlled update fields and protected API routes.
- Centralized error handling.

### 👨‍💼 Admin Dashboard

Administrators can access protected admin functionality for:

- Dashboard statistics.
- Viewing users.
- Deleting users.
- Viewing trips.
- Deleting trips.

New accounts are created with the `user` role by default.

---

## 🧰 Tech Stack

### Frontend

- **React 19**
- **Vite**
- **React Router DOM**
- **Tailwind CSS**
- **Framer Motion**
- **Axios**
- **React Hook Form**
- **Zod**
- **Lucide React**
- **React Hot Toast**
- **date-fns**
- **jsPDF**
- **html2canvas**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT / JSON Web Tokens**
- **bcryptjs**
- **Nodemailer**
- **Google Auth Library**
- **Multer**

### AI

- **Google Gemini 2.5 Flash**
- Google GenAI SDK: `@google/genai`

### Security / Validation

- **Helmet**
- **express-rate-limit**
- **express-mongo-sanitize**
- **express-validator**
- **CORS**
- **cookie-parser**

### Deployment

- **Vercel** can be used for the React frontend.
- **Render** can be used for the backend or a same-origin full-stack deployment.
- **MongoDB Atlas** is recommended for hosted database storage.

---

## 🏗️ Application Architecture

```text
┌───────────────────────────────────────────────┐
│                  React Client                 │
│                                               │
│  Pages • Components • Context • Hooks         │
│  React Router • Axios • Tailwind CSS          │
└───────────────────────┬───────────────────────┘
                        │ HTTP / JSON
                        ▼
┌───────────────────────────────────────────────┐
│              Express REST API                 │
│                                               │
│  Routes → Middleware → Controllers → Services │
│                                               │
│  Auth • Trips • Users • Favorites • Admin     │
└───────────────┬───────────────────┬───────────┘
                │                   │
                ▼                   ▼
┌──────────────────────┐   ┌──────────────────────┐
│      MongoDB         │   │    Google Gemini     │
│                      │   │                      │
│ Users • Trips        │   │ AI itinerary         │
│ Favorites • Tokens   │   │ generation           │
└──────────────────────┘   └──────────────────────┘
                │
                ▼
       ┌─────────────────┐
       │ SMTP / Nodemailer│
       │ Password reset   │
       └─────────────────┘
```

### Request flow for AI trip generation

```text
User submits trip preferences
            ↓
React Generate Trip page
            ↓
Axios request to POST /api/trips/generate
            ↓
JWT authentication + request validation
            ↓
Trip controller
            ↓
Gemini service
            ↓
Gemini 2.5 Flash
            ↓
Structured JSON response
            ↓
Backend parses/validates response
            ↓
Trip saved in MongoDB
            ↓
Frontend displays itinerary
```

---

## 📁 Project Structure

```text
TraveMate-AI/
│
├── backend/
│   ├── controllers/
│   │   ├── admin.controller.js
│   │   ├── auth.controller.js
│   │   ├── favorite.controller.js
│   │   ├── trip.controller.js
│   │   └── user.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── upload.middleware.js
│   │   └── validate.middleware.js
│   │
│   ├── models/
│   │   ├── Trip.model.js
│   │   └── User.model.js
│   │
│   ├── routes/
│   │   ├── admin.routes.js
│   │   ├── auth.routes.js
│   │   ├── favorite.routes.js
│   │   ├── trip.routes.js
│   │   └── user.routes.js
│   │
│   ├── services/
│   │   └── gemini.service.js
│   │
│   ├── utils/
│   │   ├── apiResponse.js
│   │   ├── email.utils.js
│   │   └── jwt.utils.js
│   │
│   ├── validators/
│   │   ├── auth.validators.js
│   │   └── trip.validators.js
│   │
│   ├── scripts/
│   │   └── promote-admin.js
│   │
│   ├── .env.example
│   ├── package.json
│   ├── render.yaml
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── layout/
│   │   │   ├── trip/
│   │   │   └── ui/
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── usePDF.js
│   │   │   └── useTrip.js
│   │   │
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
│
├── .gitignore
├── LICENSE
├── NOTICE.md
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

- **Node.js 20+**
- **npm 10+**
- **MongoDB Atlas** account or a local MongoDB installation
- **Google AI Studio / Gemini API key**
- **Google Cloud OAuth client** if Google Sign-In is required
- **SMTP credentials** if password-reset emails are required

---

## 1. Clone the Repository

```bash
git clone <your-github-repository-url>
cd TraveMate-AI
```

---

## 2. Install Dependencies

From the project root:

```bash
npm run install:all
```

This installs backend dependencies with `npm ci` and frontend dependencies with the required legacy-peer-deps option.

Alternatively:

```bash
cd backend
npm ci

cd ../frontend
npm ci --legacy-peer-deps
```

---

## 3. Configure Backend Environment Variables

Create a `.env` file inside `backend/`:

```bash
cd backend
cp .env.example .env
```

Configure:

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/travemate-ai

JWT_ACCESS_SECRET=your_long_random_access_secret
JWT_REFRESH_SECRET=your_long_random_refresh_secret
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

GOOGLE_CLIENT_ID=your_google_client_id
GEMINI_API_KEY=your_gemini_api_key

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

CLIENT_URL=http://localhost:5173
CORS_ORIGINS=

ADMIN_EMAIL=admin@example.com
```

### Environment variable overview

| Variable | Purpose |
|---|---|
| `PORT` | Backend server port |
| `NODE_ENV` | Development/production mode |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_ACCESS_SECRET` | Signs access tokens |
| `JWT_REFRESH_SECRET` | Signs refresh tokens |
| `JWT_ACCESS_EXPIRES` | Access-token lifetime |
| `JWT_REFRESH_EXPIRES` | Refresh-token lifetime |
| `GOOGLE_CLIENT_ID` | Backend Google credential verification |
| `GEMINI_API_KEY` | Gemini API access |
| `EMAIL_HOST` | SMTP host |
| `EMAIL_PORT` | SMTP port |
| `EMAIL_USER` | SMTP account |
| `EMAIL_PASS` | SMTP password/app password |
| `CLIENT_URL` | Frontend URL used by the backend |
| `CORS_ORIGINS` | Optional comma-separated additional origins |
| `ADMIN_EMAIL` | Optional admin configuration |

> **Never commit real API keys, passwords, JWT secrets, database credentials, or SMTP credentials to GitHub.**

---

## 4. Configure Frontend Environment Variables

Create `frontend/.env.local`:

```bash
cd frontend
cp .env.example .env.local
```

Set:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

The Google client ID should match the backend `GOOGLE_CLIENT_ID` value.

---

## 5. Configure MongoDB

Create a MongoDB Atlas cluster or use a local MongoDB instance.

For Atlas:

1. Create a cluster.
2. Create a database user.
3. Add your development IP address to the network access list.
4. Copy the connection string.
5. Put it in `MONGODB_URI`.

The application uses two main MongoDB models:

- `User`
- `Trip`

The `Trip` model stores the generated itinerary as a flexible MongoDB `Mixed` field so the structured Gemini response can be persisted without forcing every AI-generated field into a rigid database schema.

---

## 6. Configure Gemini

Create a Gemini API key through Google AI Studio and add it to:

```env
GEMINI_API_KEY=your_api_key
```

The backend uses the Google GenAI SDK and the **`gemini-2.5-flash`** model.

The Gemini service requests JSON-only output with a predefined itinerary structure and attempts to clean/parse the returned response before it is stored.

---

## 7. Configure Google Sign-In

Create a Web OAuth client in Google Cloud Console.

For local development, add the frontend origin:

```text
http://localhost:5173
```

Then use the same client ID in:

```env
# backend/.env
GOOGLE_CLIENT_ID=your_client_id
```

and:

```env
# frontend/.env.local
VITE_GOOGLE_CLIENT_ID=your_client_id
```

The frontend loads Google Identity Services and renders the Google Sign-In button. The resulting credential is sent to the backend, where it is verified before the user is authenticated.

---

## 8. Configure Password Reset Email

Password recovery uses **Nodemailer**.

For Gmail, use an App Password rather than your normal account password:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_character_app_password
```

If you are not testing password reset, SMTP configuration can be left for later.

---

## 9. Run Locally

### Option A — Run both applications together

From the root directory:

```bash
npm run dev
```

### Option B — Run separately

Backend:

```bash
npm --prefix backend run dev
```

Frontend:

```bash
npm --prefix frontend run dev
```

Default local URLs:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:5000
Health:   http://localhost:5000/health
```

The health endpoint should return a response similar to:

```json
{
  "status": "OK",
  "timestamp": "..."
}
```

---

## 🔑 Authentication Flow

### Email / Password

```text
Register
  ↓
Validate request
  ↓
Hash password with bcrypt
  ↓
Create User document
  ↓
Login
  ↓
Issue access token + refresh token
  ↓
Access protected resources
```

### Access / Refresh Tokens

The application uses two JWT concepts:

- **Access token:** short-lived token used for authenticated API requests.
- **Refresh token:** longer-lived token maintained through an HTTP-only cookie and used to obtain a new access token.

This keeps the normal API authorization flow separate from the longer-lived session mechanism.

### Google Sign-In

```text
Google Identity Services
          ↓
Google credential
          ↓
POST /api/auth/google
          ↓
Backend verifies Google credential
          ↓
Find/create user
          ↓
Issue application authentication tokens
```

### Password Reset

```text
User enters email
      ↓
Backend generates reset token
      ↓
Token is hashed and stored with expiry
      ↓
Nodemailer sends reset link
      ↓
User opens reset page
      ↓
New password submitted
      ↓
Token validated + password updated
```

---

## 🧭 Application Routes

### Public Routes

| Route | Purpose |
|---|---|
| `/` | Landing page |
| `/destinations` | Destination discovery |
| `/trip/shared/:token` | Public shared trip |
| `/login` | Login |
| `/register` | Registration |
| `/forgot-password` | Password recovery request |
| `/reset-password/:token` | Password reset |

### Protected User Routes

| Route | Purpose |
|---|---|
| `/dashboard` | User dashboard and trip statistics |
| `/generate` | Generate a new AI itinerary |
| `/trips` | View saved trips |
| `/trips/:id` | View trip details |
| `/favorites` | Manage favorite destinations |
| `/profile` | Manage profile |
| `/settings` | Application settings |

### Protected Admin Route

| Route | Purpose |
|---|---|
| `/admin` | Admin dashboard |

---

## 🔌 API Reference

### Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a user | Public |
| `POST` | `/api/auth/login` | Login | Public |
| `POST` | `/api/auth/google` | Google Sign-In | Public |
| `POST` | `/api/auth/logout` | Logout | User |
| `POST` | `/api/auth/refresh` | Refresh access token | Refresh cookie |
| `POST` | `/api/auth/forgot-password` | Request password reset | Public |
| `POST` | `/api/auth/reset-password/:token` | Reset password | Public |
| `GET` | `/api/auth/me` | Get current user | User |

### Trips

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/trips/generate` | Generate AI itinerary | User |
| `GET` | `/api/trips/stats` | Get user trip statistics | User |
| `GET` | `/api/trips` | List user's trips | User |
| `POST` | `/api/trips` | Save a trip | User |
| `GET` | `/api/trips/:id` | Get a trip | Optional |
| `PUT` | `/api/trips/:id` | Update a trip | User |
| `DELETE` | `/api/trips/:id` | Delete a trip | User |
| `POST` | `/api/trips/:id/share` | Create public share link | User |
| `GET` | `/api/trips/shared/:token` | Read shared trip | Public |

### Favorites

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/favorites` | Get favorites | User |
| `POST` | `/api/favorites` | Add destination | User |
| `DELETE` | `/api/favorites/:destination` | Remove destination | User |

### Users

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/users/profile` | Get profile | User |
| `PUT` | `/api/users/profile` | Update profile | User |
| `POST` | `/api/users/avatar` | Upload avatar | User |
| `PUT` | `/api/users/change-password` | Change password | User |
| `DELETE` | `/api/users/account` | Delete account | User |

### Admin

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/admin/stats` | Dashboard statistics | Admin |
| `GET` | `/api/admin/users` | List users | Admin |
| `DELETE` | `/api/admin/users/:id` | Delete user | Admin |
| `GET` | `/api/admin/trips` | List trips | Admin |
| `DELETE` | `/api/admin/trips/:id` | Delete trip | Admin |

---

## 👨‍💼 Admin Setup

New users receive the `user` role by default.

For a local/mock-interview environment, promote your account to admin with:

```bash
cd backend
node scripts/promote-admin.js your@email.com
```

Then log out and log back in before opening:

```text
/admin
```

> Do not expose an admin account or admin credentials in a public repository.

---

## 🏭 Production Build

The backend contains a Render build script that:

1. Installs backend dependencies.
2. Installs frontend dependencies.
3. Builds the React application.
4. Copies the generated frontend `dist` directory into `backend/public`.
5. Allows Express to serve the React SPA in production.

Run locally with:

```bash
cd backend
npm run render-build
npm start
```

For a same-origin production deployment, the frontend API URL can be:

```env
VITE_API_URL=/api
```

For a separate Vercel frontend and Render backend, use the deployed backend API URL instead.

---

## ☁️ Deployment Overview

### Option 1 — Vercel + Render

```text
Vercel
  │
  │ React frontend
  ▼
Render
  │
  │ Express API
  ▼
MongoDB Atlas

Express API ─────► Google Gemini
       │
       ├──────────► Google OAuth
       │
       └──────────► SMTP provider
```

Configure the following production values carefully:

- `MONGODB_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GEMINI_API_KEY`
- SMTP variables
- `CLIENT_URL`
- `CORS_ORIGINS`
- `VITE_API_URL`
- `VITE_GOOGLE_CLIENT_ID`

For Vercel, remember that `VITE_*` variables are embedded into the frontend at build time, so configure them **before rebuilding** the frontend.

---

## 🧪 Development Checks

The root project includes basic validation commands.

### Backend syntax check + frontend build

```bash
npm run check
```

This runs the configured backend `node --check` commands and then creates a production frontend build.

### Backend syntax check only

```bash
npm run check:backend
```

### Frontend production build

```bash
npm run build
```

These checks are useful before pushing changes to GitHub.

> A successful build or syntax check does **not** replace end-to-end testing. External services such as MongoDB, Gemini, Google OAuth, and SMTP still need to be configured and tested separately.

---

## ✅ Recommended Manual Test Checklist

Before treating a local build as interview-ready, test the major user journeys:

### Authentication

- [ ] Register a new account
- [ ] Log in with email/password
- [ ] Log out
- [ ] Refresh the page while authenticated
- [ ] Verify protected routes reject unauthenticated users
- [ ] Test Google Sign-In
- [ ] Request a password reset
- [ ] Complete password reset

### Trip generation

- [ ] Enter destination details
- [ ] Generate an itinerary
- [ ] Confirm Gemini response is parsed correctly
- [ ] Confirm the generated itinerary renders correctly
- [ ] Save the trip
- [ ] View it from My Trips
- [ ] Edit the trip
- [ ] Delete the trip

### Sharing & export

- [ ] Generate a public share link
- [ ] Open the shared trip while logged out
- [ ] Export the itinerary to PDF

### Favorites / profile

- [ ] Add a favorite destination
- [ ] Remove a favorite
- [ ] Update profile
- [ ] Upload avatar
- [ ] Change password
- [ ] Test theme/settings

### Admin

- [ ] Promote a test account to admin
- [ ] Open admin dashboard
- [ ] View users
- [ ] View trips
- [ ] Test protected admin actions

### Security / edge cases

- [ ] Invalid login
- [ ] Invalid registration input
- [ ] Expired/invalid reset token
- [ ] Invalid trip ID
- [ ] Unauthorized trip update/delete attempt
- [ ] Unauthorized admin request
- [ ] Excessive authentication attempts
- [ ] Excessive AI generation attempts

---

## 🧠 Interview-Relevant Technical Decisions

### Why MERN?

The application uses React for a component-based frontend, Express/Node.js for REST APIs and server-side business logic, and MongoDB/Mongoose for document-oriented persistence. This keeps the primary application stack JavaScript-based while allowing the frontend and backend to share familiar concepts and tooling.

### Why Gemini on the backend?

The Gemini API key is kept on the server rather than exposed in browser code. The frontend sends trip preferences to the backend, and the backend is responsible for constructing the AI request and communicating with Gemini.

This also provides a central location for request validation, rate limiting, error handling, and future AI-provider changes.

### Why access + refresh tokens?

A short-lived access token limits the useful lifetime of a leaked access token, while the refresh-token mechanism allows the user to maintain a session without repeatedly entering credentials. The refresh token is maintained using an HTTP-only cookie rather than exposing it directly to normal client-side JavaScript.

### Why store the itinerary as a flexible field?

AI-generated content can evolve as the prompt and response schema evolve. The `generatedItinerary` field uses Mongoose's `Mixed` type so the application can persist the structured JSON without creating a large set of rigid database sub-schemas for every generated field.

### Why validate requests on the server?

Frontend validation improves user experience, but it cannot be treated as a security boundary. Server-side validation prevents malformed or unexpected input from reaching business logic and database operations.

### Why rate-limit AI generation?

AI generation can be significantly more expensive than ordinary CRUD requests. A dedicated generation limiter helps prevent accidental or abusive repeated calls while keeping normal application traffic separate from AI usage.

---

## ⚠️ AI Accuracy & Data Disclaimer

TraveMate AI generates travel suggestions using a language model. AI-generated information can become outdated or may contain incorrect details.

In particular, users should independently verify:

- Attraction opening hours
- Holiday closures
- Ticket prices
- Hotel availability and prices
- Restaurant addresses and operating hours
- Transportation schedules
- Visa requirements
- Weather forecasts
- Emergency information

The current AI prompt requests specific travel information and INR-based cost estimates, but the application **does not independently verify those claims through a live travel-data provider**.

Therefore, the project should be described as an **AI-assisted travel planning application**, not as a guaranteed real-time travel information platform.

---

## 🔒 Security Notes

Before publishing or deploying:

1. Never commit `.env`, `.env.local`, or other secret files.
2. Use strong random JWT secrets.
3. Restrict MongoDB network access appropriately.
4. Configure production CORS origins explicitly.
5. Use HTTPS in production.
6. Use a dedicated SMTP credential/app password.
7. Keep Gemini and OAuth credentials server/configuration-side where appropriate.
8. Review file-upload limits and storage strategy before exposing avatar uploads publicly.
9. Do not expose admin credentials or manually elevated accounts.
10. Rotate credentials immediately if they are accidentally committed.

---

## 📌 Resume Feature Mapping

The following implementation areas correspond directly to the project's resume description:

| Resume Claim | Implementation |
|---|---|
| Full-stack MERN travel planning application | React + Node.js + Express.js + MongoDB/Mongoose |
| Creating, saving, editing and managing trips | Trip generation, CRUD controllers/routes, dashboard and trip pages |
| Gemini 2.5 Flash | `backend/services/gemini.service.js` |
| Structured day-by-day itineraries | Gemini prompt + JSON parsing + `TripItinerary` UI |
| JWT-based authentication | JWT utilities + auth middleware + AuthContext |
| Access/refresh tokens | Short-lived access token + refresh-token cookie flow |
| Google OAuth | Google Identity Services frontend + backend credential verification |
| Password reset | Reset token workflow + Nodemailer |
| Protected user/admin routes | `protect` + `adminOnly` middleware and frontend route guards |
| Public trip sharing | UUID share token + public shared-trip endpoint/page |
| PDF itinerary export | `usePDF.js` + html2canvas + jsPDF |
| Favorite destinations | Favorites API + Favorites page |
| Helmet | Express security headers |
| Rate limiting | Global, authentication, and AI-generation limits |
| MongoDB sanitization | `express-mongo-sanitize` |
| Request validation | `express-validator` middleware/validators |

---

## 👨‍💻 Author

**Tanay Gupt**

Full-stack developer focused on building practical web applications with **React, Node.js, Express, MongoDB, Python, and AI-integrated technologies**.
