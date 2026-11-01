# Lab 1: Node.js and Express Server

## Student Details

- **Name:** Sambu Bhavishya
- **Section:** 223 (CSE-2E)
- **Registration Number:252U1R1224

## Objective

To understand Node.js, create a basic HTTP server, build an Express server, handle GET requests, return JSON responses, and handle unknown routes using a 404 status code.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- Git and GitHub
- Render

## Project Structure

- `plain-server.js` — Basic Node.js HTTP server
- `server.js` — Express server and routes
- `package.json` — Project dependencies and scripts
- `screenshots/` — Screenshots of the working endpoints

## Setup and Run

1. Install Node.js.
2. Open the `Lab-01` folder in a terminal.
3. Install dependencies:
   `npm install`
4. Start the server:
   `npm start`
5. Open `http://localhost:3000` in your browser.

## API Endpoints

| Method | Endpoint   | Expected response             |
| ------ | ---------- | ----------------------------- |
| GET    | `/`        | Welcome message               |
| GET    | `/about`   | Student information in JSON   |
| GET    | `/time`    | Current date and time in JSON |
| GET    | `/unknown` | 404 - Route not found         |

## Live Deployment

https://bhavishya-lab01-express.onrender.com

## Screenshots

- Home: `screenshots/homee.png`
- About: `screenshots/about.png`
- Time: `screenshots/time.png`
- 404 Error: `screenshots/Error.png`

## Learning Outcomes

- Understood Node.js and Express basics.
- Created GET routes and returned text and JSON responses.
- Used HTTP status codes, including 200 and 404.
- Deployed an Express application using Render.
