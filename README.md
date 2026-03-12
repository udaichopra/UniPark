# UniPark
UniPark is a full stack parking spot booking application that allows users to list their own parking spots and book available spots for specific time ranges. The application is designed for university students who want to rent out unused parking spots or find more affordable parking options near campus.

The system prevents overlapping bookings and uses a PostgreSQL database to ensure data integrity and persistent storage.

This project was built to practice full-stack development using React, Express, and PostgreSQL.

Current Features

• Create and list parking spots
• View all available parking spots
• Book parking spots with fullname, start time, and end time
• Cancel Exisitng bookings
• Prevent overlapping bookings using backend validation 
• Persistent storage using Supabase PostgreSQL database
• View booking history
• Interactive map displaying parking spot locations
• Parking spots shown as markers using Leaflet
• User authentication using Supabase (email/password sign up and sign in)


Tech Stack:
Frontend: React, JavaScript, Leaflet
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
Core functionality now includes parking spot creation, booking creation, booking cancellation, overlap validation, booking history, and persistent storage using Supabase PostgreSQL

Planned future improvements include:
• Improved Maps integration
• User authentication for managing personal listings and bookings  
• Ability to edit parking spot listings  
• Improved UI and UX design  
• Deployment for public access

Udai Chopra
Computer Science Student – Wilfrid Laurier University

GitHub: https://github.com/udaichopra