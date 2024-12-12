const mongoose = require('mongoose');
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



// export const connectServerDB = async () => {
//   try {
//     const serverDB = await mongoose.createConnection(process.env.MONGO_SERVER_URI);
//     console.log('Server database connected');
//     return serverDB;
//   } catch (error) {
//     console.error('Server database connection error:', error);
//     process.exit(1);
//   }
// };
// export const connectClientDB = async () => {
//   try {
//     const clientDB = await mongoose.createConnection(process.env.MONGO_CLIENT_URI);
//     console.log('Client database connected');
//     return clientDB;
//   } catch (error) {
//     console.error('Client database connection error:', error);
//     process.exit(1);
//   }
// };
// // Initialize both database connections
// const serverDB = await connectServerDB();
// const clientDB = await connectClientDB();
// // Create your models using the appropriate connection
// const Users = serverDB.model('User', userSchema);
// const Products = clientDB.model('Product', productSchema);