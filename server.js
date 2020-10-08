const express = require('express');
const connect = require('./lib/db');
const postRouter = require('./routes/postRoutes');
const errorHandler = require('./middleware/errorhandler');
const { googleLogin } = require('./middleware/auth');
require('dotenv').config();

const app = express();

app.use(express.json());
app.post('/google-login', googleLogin);
app.use('/posts', postRouter);

app.use(errorHandler);
const dbUrl =
  process.env.DB_URI || 'mongodb://localhost:27017/multer-m3ntorship';
const port = 4000;
connect(dbUrl)
  .then(() => {
    app.listen(port, function () {
      console.log('Listening on, port number ' + port);
    });
  })
  .catch(err => {
    console.log(err);
  });
