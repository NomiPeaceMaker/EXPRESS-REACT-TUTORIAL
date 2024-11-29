const express = require('express');
const Task = require('../models/Task');
const verifyToken = require('../middleware/auth')
const router = express.Router();
const secretKey = process.env.JWT_SECRET;

router.post('/', verifyToken, async (req, res) => {
  console.log('Task model:', Task); // Debugging log

  const { title, description, userId } = req.body;

  try {
    const task = await Task.query().insert({ title, description, user_id: userId });
    res.json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error('Error creating task:', error); // Debug log
    res.status(500).json({ error: 'Failed to create task' });
  }
});

router.get('/:userId', verifyToken, async (req, res) => {
    console.log('Request params:', req.params); // Debugging
    const { userId } = req.params;
  
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
  
    try {
      const tasks = await Task.query().where('user_id', userId);
      res.json(tasks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  });

router.put('/:taskId', verifyToken, async (req, res) => {
    const { title, description } = req.body;
    const task = await Task.query().patchAndFetchById(req.params.taskId, { title, description });
    res.json({ message: 'Task updated successfully', task });
});

router.delete('/:taskId', verifyToken, async (req, res) => {
    await Task.query().deleteById(req.params.taskId);
    res.json({ message: 'Task deleted successfully' });
});

// router.get('/test', async (req, res) => {
//     try {
//         const tasks = await Task.query(); // Fetch all tasks
//         res.json(tasks);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Database query failed' });
//     }
// });

module.exports = router;