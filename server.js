const express = require('express');
const connect = require('./lib/db');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorhandler');
const dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: './.env' });

const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/posts', postRouter);

app.use(errorHandler);

const dbUrl =
	process.env.DB_URI || 'mongodb://localhost:27017/multer-m3ntorship';

const port = 3000;
connect(dbUrl)
	.then(() => {
		app.listen(port, function () {
			console.log('Listening on, port number ' + port);
		});
	})
	.catch((err) => {
		console.log(err);
	});
