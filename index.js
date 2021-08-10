const connectDB = require('./startup/db');
const express = require('express');
const cors = require('cors')
const app = express();
const travelers = require('./routes/travelers')
const tourGuides = require('./routes/tourGuides')
const tours = require('./routes/tours')

connectDB();

app.use(express.json()); 
app.use(cors())
app.use('/api/travelers', travelers); 
app.use('/api/tourGuides', tourGuides);
app.use('/api/tours', tours);

const port = process.env.PORT || 5000;
app.listen(port, () => {
 console.log(`Server started on port: ${port}`);
});