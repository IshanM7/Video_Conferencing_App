const express = require('express');

const userRoutes = require('./routes/user');

const meetingRoutes = require('./routes/meeting');

const errorController = require('./controllers/error');

const app = express();

const ports = process.env.PORT || 3000

const server = require('http').Server(app)
const io = require('socket.io')(server)



app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, X-Custom-Header, Authorization'
  );
  next();
});

app.use('/users', userRoutes)
app.use('/meeting', meetingRoutes)

app.use(errorController.get404);

app.use(errorController.get500);



app.listen(3000,() => console.log(`listening on port ${ports}`));