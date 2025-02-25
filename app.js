require('dotenv').config();
require('express-async-errors');

//extra security packages

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limiter')

const express = require('express');
const app = express();
//connectDb
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

//routers

const authROuter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(rateLimiter({
  windowMs: 15*60*1000,// 15minutes
  max:100 // limit eact Ip to 100 requests per windowMs
}))

app.use(express.json());
app.use(helmet())
app.us(cors())
app.use(xss())
// extra packages

// routes

app.use('/api/v1/auth',authROuter)
app.use('/api/v1/jobs',authenticateUser,jobsRouter)


app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
