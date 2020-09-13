const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const rootDir = path.join(__dirname);
require('dotenv').config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// Load all routers here
var loginRouter = require('./routes/login');
var fileRouter = require('./routes/file');

// DB Config
// const db = process.env.mongoURI;
const db = "mongodb+srv://levanah:xxxxx11111@cluster0-vq9tq.mongodb.net/markdown";
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// app.use(express.static(rootDir + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());


// Global variables
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user/', loginRouter);
app.use('/api/file/', fileRouter);

app.get('*', (req, res, next) => {
  // console.log()
});


app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
