const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Routes
app.use('/api/persons', require('./routes/person'));
app.use('/api/cars', require('./routes/car'));
app.use('/api/accidents', require('./routes/accident'));
app.use('/api/owns', require('./routes/owns'));
app.use('/api/participated', require('./routes/participated'));

app.get("/", (req, res) => {
  res.send("Home Page");
})

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
