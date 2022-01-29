const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

global.__basedir = "./public/"; // set base directory

//routes
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

//port
const port = process.env.PORT || 5000

//listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})