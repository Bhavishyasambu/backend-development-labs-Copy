
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Home route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to my Express server!");
});

// About route
app.get("/about", (req, res) => {
  res.status(200).json({
    name: "Sambu Bhavishya",
    section: "223 (CSE-2E)"
  });
});

// Time route
app.get("/time", (req, res) => {
  res.status(200).json({
    currentDateTime: new Date().toString()
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).send("404 - Route not found");
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
