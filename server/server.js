const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const tasRroutes = require('./Routes/tasksRoutes');
const userRoutes = require('./Routes/userRoutes');
const cors = require('cors');

// const users = require('./Models/users');
// const task = require('../Models/tasks');
mongoose.connect('mongodb+srv://mongo:359157@cluster0.9bxjzdi.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log("connect successfully");
}).catch((error) => {
    console.log(error, "error in connection");
})

app.use(express.json());
app.use(cors());

app.use(tasRroutes);
app.use(userRoutes);


app.listen(8000, console.log(`app running in 8000`));