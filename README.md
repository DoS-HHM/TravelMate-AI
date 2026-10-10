
# TravelMate AI – Intelligent Travel Planning & Itinerary Assistant

TravelMate AI is a full-stack web application that helps users generate, save, and manage personalized travel itineraries using AI.

## Features

- **AI-Powered Itineraries:** Generate day-by-day travel plans based on destination, duration, budget, travel style, and interests using Google Gemini.
- **Trip Management:** Create, view, edit, and manage travel plans.
- **Authentication:** User registration and login, JWT-based authentication, Google OAuth, and password reset.
- **Trip Sharing & Export:** Share trips through public links and export itineraries as PDFs.
- **Favorites & Admin:** Manage favorite destinations and access administrative features.
- **Security:** Includes request validation, rate limiting, security headers, and MongoDB query sanitization.

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI Integration:** Google Gemini API
- **Authentication:** JWT, Google OAuth
- **Additional Tools:** jsPDF, Helmet, express-validator

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB database
- Google Gemini API key

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   cd "TraveMate AI"
   ```

2. Install frontend dependencies:

   ```bash
   cd frontend
   npm install --legacy-peer-deps
   ```

3. Install backend dependencies:

   ```bash
   cd ../backend
   npm install
   ```

4. Configure environment variables using the provided `backend/.env.example` file. Create a `.env` file inside the `backend` directory and provide the required credentials and configuration.

5. Start the backend:

   ```bash
   npm run dev
   ```

6. In a separate terminal, start the frontend:

   ```bash
   cd frontend
   npm run dev
   ```

Open the local URL displayed by Vite in your terminal.

**Note:** Some features require additional configuration, including MongoDB, Gemini API access, Google OAuth, and email credentials.

## Future Improvements

- Add automated testing for key application features.
- Improve itinerary personalization and error handling.
- Enhance the overall user experience.
