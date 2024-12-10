const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const path = require('path');
const fs = require('fs').promises;

// Middleware
app.use(cors());

// Routes

app.get("/db/users", (req, res) => {
  const users = require("./db/users.json");
  res.json(users);
});

app.get("/api/users", (req, res) => {
  const users = require("./db/users.json");
  res.json(users);
});

app.get("/db/employees", (req, res) => {
  const employees = require("./db/employees.json");
  res.json(employees);
});

app.get("/api/employees", (req, res) => {
  const employees = require("./db/employees.json");
  res.json(employees);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/find/:database/:employees", async (req, res) => {

});

app.get("/find/:database/:users", async (req, res) => {

});
////
app.post("/user/create-user", async (req, res) => {

})
app.put("/user/update-user/:id/:email/:password", async (req, res) => {
  const { email, password } = req.params;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and Password are required' });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.password = password;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(`Error updating user: ${error.message}`)
    res.status(500).json({ message: 'Server Error' });
  }
});

app.delete("/user/delete-user/:email(or id)/", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
////
app.post("/employee/create-employee/:email(or id)", async (req, res) => {

});
app.put("/employee/update-employee/:id/:email/:password", async (req, res) => {
  const { email, password } = req.params;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and Password are required' });
  }
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    employee.password = password;
    const updatedEmployee = await employee.save();
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(`Error updating employee: ${error.message}`)
    res.status(500).json({ message: 'Server Error' });
  }
});

app.delete("/employee/delete-employee/:email(or id)/", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

