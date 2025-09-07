const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/PostRoutes'))
app.use('/api/posts/:postId/comments', require('./routes/commentRoutes'));

app.get('/', (req, res) => {
  res.send('Blog Platform API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on ${PORT}`));

