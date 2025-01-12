const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
const db = require("./config/mongoose-connection")
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');

const app = express();

// Database connection
db();

//------------------------------------ Middleware-----------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//for using Static files 
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())


//-----------------------------------------------------------------------------------------

app.set('view engine', 'ejs');

//---------------------------------------Routes------------------------------------------------

app.get('/', (req, res) => {
  res.send('Yo!');
});

app.use("/owner" , ownersRouter);
app.use("/users" , usersRouter);
app.use("/products", productsRouter);



app.listen(process.env.PORT , () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
