import express from 'express';
import db from '../db/connection.js';
import { ObjectId } from 'mongodb';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes with authMiddleware
router.use(authMiddleware);

// GET a list of all the tasks for the logged-in user.
router.get('/', async (req, res) => {
  try {
    const collection = await db.collection('todolist');
    const results = await collection.find({ userId: req.user.id }).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching tasks');
  }
});

// GET a single task by id for the logged-in user.
router.get('/:id', async (req, res) => {
  try {
    const collection = await db.collection('todolist');
    const query = { _id: new ObjectId(req.params.id), userId: req.user.id };
    const result = await collection.findOne(query);

    if (!result) return res.status(404).send('Not found');
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching task');
  }
});

// POST a new task for the logged-in user.
router.post('/', async (req, res) => {
  try {
    const newTodo = {
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      completed: req.body.completed || false, // Default to false if not provided
      userId: req.user.id, // Associate the task with the logged-in user
    };

    const collection = await db.collection('todolist');
    const result = await collection.insertOne(newTodo);
    res.status(201).send(result); // Send result and use 201 status code for created
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding item');
  }
});

// UPDATE a task by id for the logged-in user.
router.patch('/:id', async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id), userId: req.user.id };
    const updates = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        completed: req.body.completed,
      },
    };

    const collection = await db.collection('todolist');
    const result = await collection.updateOne(query, updates);
    if (result.matchedCount === 0) return res.status(404).send('Task not found');
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating item');
  }
});

// DELETE a task by id for the logged-in user.
router.delete('/:id', async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id), userId: req.user.id };

    const collection = await db.collection('todolist');
    const result = await collection.deleteOne(query);
    if (result.deletedCount === 0) return res.status(404).send('Task not found');
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting item');
  }
});

export default router;
