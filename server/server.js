const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const habitsRouter = require('./routes/habits');
const authRouter = require('./routes/auth');
const verifyToken = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/habits', verifyToken, habitsRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
