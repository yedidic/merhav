const express = require('express');
const bodyParser = require('body-parser');
//session
const session = require('express-session');
//cookie
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
var http = require('http').Server(app);
// const io = require('socket.io')(http);

app.use(cookieParser());

app.use(
  session({
    secret: 'secret string',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: null
    }
  })
);

app.use(bodyParser.json());
app.use(express.static('frontend/dist'));
app.use(
  cors({
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
  })
);
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/baba', (req, res) => res.send('Hello BabaJi!'));

require('./routes/UserRoute')(app);
require('./routes/ExamRoute')(app);
require('./routes/QuestRoute')(app);



const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`App listening on port ${port} !`);
});

// const socketConnect = require('./routes/services/socketService');
// socketConnect(io);

