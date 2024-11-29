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
  const { userId } = req.params;
  console.log(req.user.id)

  // Validate that the userId in the route matches the userId in the token
  if (parseInt(userId, 10) !== req.user.id) {
    return res.status(403).json({ error: 'Access Denied: Unauthorized Access' });
  }

  try {
    const tasks = await Task.query().where('user_id', userId);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
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