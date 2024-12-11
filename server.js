const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());

// Routes

app.get("/dummy-data/groceries", (req, res) => {
  const groceries = require("./dummy-data/groceries.json");
  res.json(groceries);
});

app.get("/api/groceries", (req, res) => {
  const groceries = require("./db/groceries.json");
  res.json(groceries);
});

app.get("/api/employees", (req, res) => {
  const employees = require("./db/employees.json");
  res.json(employees);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Employees
app.get('/company-home/employees', (req, res) => {
  try {
    const employees = require("./db/employees.json");
    res.json(employees);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
})
// Login
app.get('/company-home/login', (req, res) => {
  try {

  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
})
// Users
app.get('/company-home/users', (req, res) => {
  try {

  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
})
// Update Employee

// Delete Employee

// Update User

// Delete User