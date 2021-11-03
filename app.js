const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const dados = require('./routes/dados');
const novoUsuario = require('./routes/newUser')
const ClientList = require('./routes/ClientList')
const login = require('./routes/Login')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  app.use(cors())
  next();
})

const Mongoose = require('mongoose')

Mongoose.Promise = global.Promise
Mongoose.connect("mongodb://localhost/sharenergy").then(()=>{
    console.log('conectado')
}).catch((e)=>{
    console.log('não conectou' + e )
})

app.use('/', indexRouter);
app.use('/dadosUsina', dados);
app.use('/novoUsuario', novoUsuario);
app.use('/listarClientes', ClientList)
app.use('/login', login)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
res.json({
  message: err.message,
  error: err
});
});

module.exports = app;
