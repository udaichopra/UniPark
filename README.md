# UniPark
UniPark is a full stack parking spot booking application that allows users to list their own parking spots and book available spots for specific time ranges. The application is designed for university students who want to rent out unused parking spots or find more affordable parking options near campus.

The system prevents overlapping bookings and uses a PostgreSQL database to ensure data integrity and persistent storage.

This project was built to practice full-stack development using React, Express, and PostgreSQL.

Current Features

• Create and list parking spots
• View all available parking spots
• Book parking spots with fullname, start time, and end time
• Prevent overlapping bookings using backend validation 
• Persistent storage using Supabase PostgreSQL database
• View booking history


Tech Stack:
Frontend: React, JavaScript
Backend: Node.js, Express
Database: Supabase, PostgreSQL
Tools: Git, GitHub, Vscode

How to Run: 
Backend:
cd backend
npm install
node index.js

Frontend:
cd frontend
npm install
npm run dev

Status:
The application now uses a PostgreSQL database instead of temporary in-memory storage. Core functionality including spot creation, booking system, overlap validation, and persistent storage is fully implemented.

Planned future improvements include:
• Address and location support
• Google Maps integration
• User authentication
• Ability to cancel bookings
• UI and UX improvements
• Deployment

Udai Chopra
Computer Science Student – Wilfrid Laurier University

GitHub: https://github.com/udaichopra