const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config({path: './.env.development'});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// const productSchema = require('./models/Products');
const userSchema = require('./models/Users');
const employeeSchema = require('./models/Employees');

const connections = {};
const models = {};

const bankUserSchema = new mongoose.Schema({});

const uri = process.env.MONGO_DEV_SERVER_URI;

const client = new MongoClient(uri);
const path = require('path');

//
async function startServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    // Initialize both database connections
    // const serverDB = await connectServerDB();
    // const clientDB = await connectClientDB();

    // Create your models using the appropriate connection
    // const Users = serverDB.model('User', userSchema);
    // const Products = clientDB.model('Product', productSchema);

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
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

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