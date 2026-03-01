# nearish

**nearish** is a long-distance couples travel and memory-planning web app designed to make shared experiences more intentional and meaningful.

It gives couples a space to plan visits, count down to seeing each other, organize daily activities, save memories with photos or videos, and keep shared wishlists.

This project is currently under active development. See [setup.md](setup.md) for app setup instructions

---

## Features

- **Google Authentication (Firebase Auth)**
  - Secure, passwordless sign-in
  - Private, couple-only access

- **Couple Connection**
  - Create or join a couple using a short invite code
  - Seamless onboarding flow

- **Visit Planning**
  - Plan upcoming visits with start/end dates
  - Automatic visit status (planned, active, complete)
  - Countdown-focused home dashboard

- **Daily Schedules**
  - Plan activities day-by-day
  - Mix custom plans with saved activities
  - Delete schedules per day or per visit

- **Activities Library**
  - Save reusable activities by category
  - Get random activity suggestions

- **Memories**
  - Save notes with optional photos or videos
  - Media stored securely in AWS S3
  - Memories tied to visits and sorted by recency

- **Wishlists**
  - Separate personal and partner wishlists
  - Fulfillment tracking

---

## Tech Stack

### Frontend
- React
- TypeScript
- Firebase Authentication
- Figma (UI/UX design)

### Backend
- FastAPI
- PostgreSQL (AWS RDS)
- AWS S3
- Firebase Admin SDK

---

## Design

**Figma Prototype:**  
https://www.figma.com/design/j6v6r3BGDCvw9iIf1iSzXt/Untitled

---

## API Overview

The backend exposes REST endpoints for:
- Authentication & couple connection
- Home dashboard state
- Visits & schedules
- Activities
- Memories & media uploads
- Wishlists

Authentication is handled via **Firebase ID tokens**:

