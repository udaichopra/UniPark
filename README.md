# UniPark
UniPark is a full-stack parking marketplace that allows users to list and book parking spots.  
Users can create accounts, list their own parking spaces, and book available spots from other users.

The system prevents overlapping bookings and uses a PostgreSQL database to ensure data integrity and persistent storage.

This project was built to practice full-stack development using React, Express, and PostgreSQL.

## Features

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
• Users can view their own parking listings  
• Users only see available spots that are not theirs
• Users only see their own bookings
• Parking spot owners can see bookings made for their listed spots


##Tech Stack:

Frontend: 
• React
• JavaScript
• Leaflet(maps)

Backend:
 • Node.js
 • Express

Database: 
• Supabase
• PostgreSQL

APIs:
• OpenStreetMap Nominatim (geocoding)

Tools: 
•Git
•GitHub
•Vscode

##How to Run: 
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
• Allow users to delete their own parking listings  
• Allow users to edit parking spot listings  
• Restrict bookings so users only see their own bookings  
• Improve map interaction and filtering  
• Improve UI and UX design  
• Deploy the application for public access

Udai Chopra
Computer Science Student – Wilfrid Laurier University

GitHub: https://github.com/udaichopra