var express = require('express');
var path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/PersonalBankingSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.error('Failed to connect to MongoDB', err));

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: '*'
}))

const Login=require('./routes/login')
app.use('/login',Login)

const Register=require('./routes/register');
app.use('/register',Register)

const Profile=require('./routes/profile');
app.use('/update-profile',Profile)

const Account=require('./routes/createaccount');
app.use('/update-account',Account)

const Credit=require('./routes/credit-debit');
app.use('/credit-debit',Credit)

const History=require('./routes/transactionhistory');
app.use('/transaction-history',History)

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use(bodyParser.urlencoded({
    extended: false
}));


app.listen('3050', () => {
    console.log('listen port number on 3050')
})

module.exports = app