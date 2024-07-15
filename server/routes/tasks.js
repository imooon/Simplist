import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /todolist.
const router = express.Router();

// This section will help you get a list of all the tasks.
router.get("/", async (req, res) => {
  let collection = await db.collection("todolist");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single task by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("todolist");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new task.
router.post("/", async (req, res) => {
  try {
    let newTodo = {
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      completed: req.body.completed || false, // Default to false if not provided
    };

    let collection = await db.collection("todolist");
    let result = await collection.insertOne(newTodo);
    res.status(201).send(result); // Send result and use 201 status code for created
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding item");
  }
});


// This section will help you update a task by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    let collection = await db.collection("todolist");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating item");
  }
});

// This section will help you delete a task
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("todolist");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting item");
  }
});

export default router;