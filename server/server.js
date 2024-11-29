const express = require('express');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('./knexfile');
const redisClient = require('./redis/redisClient');
const app = express();
const knex = Knex(knexConfig.development);
const cors = require('cors');

Model.knex(knex);

app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));