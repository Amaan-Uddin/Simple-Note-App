require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const cookieParser = require('cookie-parser');
const mime = require('mime');
const methodOverride = require('method-override');
const path = require('path');

const authRouter = require('./routes/auth');
const mainRouter = require('./routes/main');
const noteRouter = require('./routes/note');

const PORT = process.env.PORT || 3000;

// pre-requisites
connectDB();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', mime.getType(req.url));
  }
  next();
});

app.get('/', (req, res) => {
  const data = {
    sign: 'Sign up',
    log: 'Log in',
  };
  res.render('index', { data: data });
});

app.use('/auth', authRouter);
app.use('/main', mainRouter);
app.use('/note', noteRouter);

mongoose.connection.once('open', () => {
  console.log('Successfully connected to mongoDB');
  app.listen(PORT, console.log(`Server running at port ${PORT}`));
});
