# RBU Event Manager

A scalable Event & Attendee Management System for RBU and RBU clubs.

## Stack

- Frontend: React + Vite + Tailwind CSS + shadcn/ui-style components
- Backend: Node.js + Express.js
- Database: SQLite
- API: REST + JSON
- Validation: Zod
- Icons: Lucide React
- UI patterns: responsive dashboard, data table, right-side drawer, dialogs, search, filters

## Features

- Create, view, search and delete events
- Create/register attendees against an event
- Search attendees by name, email or event
- Duplicate registration prevention
- Full-event capacity validation
- Non-existent event validation
- Email validation
- Delete attendee/event records
- Event capacity tracking
- Responsive dashboard
- Right-side event/attendee drawers
- Data tables with sorting/filtering
- Seeded RBU club data
- SQLite database included
- Clean separation between client and server

## Project structure

```text
rbu-event-manager/
├── client/                 # React + Vite frontend
├── server/                 # Express REST API
├── database/
│   └── rbu-events.db       # SQLite database
├── package.json
└── README.md
```

## Requirements

- Node.js 18+
- npm 9+

## Run

### 1. Install backend

```bash
cd server
npm install
npm run dev
```

API runs on `http://localhost:5000`.

### 2. Install frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

The Vite dev server proxies `/api` requests to the Express server.

### Production build

```bash
cd client
npm run build
```

Then:

```bash
cd ../server
npm start
```

The backend can serve the built frontend if you copy/build according to your deployment setup.

## REST API

### Events

- `GET /api/events`
- `GET /api/events/:id`
- `POST /api/events`
- `DELETE /api/events/:id`

### Attendees

- `GET /api/attendees`
- `GET /api/attendees/search?q=...`
- `POST /api/attendees/register`
- `DELETE /api/attendees/:id`

### Dashboard

- `GET /api/dashboard/stats`
- `GET /api/health`

## Example event

```json
{
  "name": "RBU Tech Fest",
  "date": "2026-11-20",
  "venue": "RBU Main Auditorium",
  "club": "CodeBreakers Club",
  "capacity": 250
}
```

## Notes for viva/demo

This project demonstrates:

1. Full-stack CRUD
2. Express middleware and routing
3. HTTP methods and JSON
4. SQLite relational schema
5. One-to-many Event → Attendee relationship
6. Foreign keys and cascading deletes
7. Frontend Fetch API integration
8. Client and server-side validation
9. Duplicate registration handling
10. Dynamic UI rendering without page reload
