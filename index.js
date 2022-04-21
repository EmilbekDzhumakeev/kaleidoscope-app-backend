const connectDB = require('./startup/db');
const express = require('express');
const cors = require('cors')
const app = express();

const users = require('./routes/users')
const tours = require('./routes/tours')
const bookedTours = require('./routes/bookedTours')

connectDB();

app.use(express.json()); 
app.use(cors())
 
app.use('/api/users', users);
app.use('/api/tours', tours);
app.use('/api/bookedTours', bookedTours);

const port = process.env.PORT || 8000;
app.listen(port, () => {
 console.log(`Server started on port: ${port}`);
});