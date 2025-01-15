const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
const db = require("./config/mongoose-connection")
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const flash = require('connect-flash');
const session = require('express-session')
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/indexRouter');
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

app.use(session(
  {  resave: false,
     saveUninitialized: false,
     secret: process.env.EXPRESS_SESSION_SECRET_KEY,
  }
))

app.use(flash());
//-----------------------------------------------------------------------------------------

app.set('view engine', 'ejs');

//---------------------------------------Routes------------------------------------------------

app.use("/", indexRouter);
app.use("/owner" , ownersRouter);
app.use("/users" , usersRouter);
app.use("/products", productsRouter);



app.listen(process.env.PORT);
