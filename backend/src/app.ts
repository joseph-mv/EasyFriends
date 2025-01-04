import express, { Application,Request, Response,NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import { errorHandler } from './middleware/errorHandler';
import logger from './utils/logger';
import router from './routes/userRoutes';
// import helmet from 'helmet';




// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app: Application = express();


const allowedOrigins: string[] = [
  'http://localhost:5173'
  
];

// app.use(cors({
//   origin: function(origin, callback) {
//     console.log('Request Origin:', origin); // Log the origin
//     if (typeof origin === 'undefined' || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: 'GET,POST,PUT,DELETE',
//   credentials: true
// }));


// Middleware
app.use(express.json());
app.use(cors());
// app.use(helmet());
app.use(logger);

// Routes
app.use('/', router);

// Error Handler Middleware
app.use(errorHandler);
app.use(function (err:Error, req:Request, res:Response, next:NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.render("error");
  });

export default app;
