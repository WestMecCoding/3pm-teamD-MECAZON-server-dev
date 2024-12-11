const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const fs = require('fs');
const cors = require("cors");
const app = express();
const PORT = 3000;

if (fs.existsSync('.env')) {
  require('dotenv').config();
}

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

// Middleware
// app.use(cors());
app.use(express.json());

//
async function startServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if the connection fails
  }
}

startServer();

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


//find users endpoint
app.get("/all-users/:database/:collection", async (req, res) => {
  try {
    const { database, collection } = req.params;
    const db = client.db(database);
    const documents = await db.collection(collection).find({}).toArray();
    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/add-user/:database/:collection", async (req, res) => {
  try {
    const { document } = req.body;
    const { database, collection } = req.params;
    const db = client.db(database);
    const allDocuments = await db.collection(collection).find({}).toArray();
    // allDocuments.forEach(())
    const result = await db.collection(collection).insertOne(document);
    res.status(201).send(`Document inserted with ID: ${result.insertedId}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete("/delete-user/:database/:collection/:id", async (req, res) => {
  try {
    const { database, collection, id } = req.params;
    const db = client.db(database);
    const result = await db
      .collection(collection)
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).send(`Document with ID ${id} deleted successfully.`);
    } else {
      res.status(404).send(`Document with ID ${id} not found.`);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

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