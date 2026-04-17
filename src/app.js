import express from 'express'
import notes from './routes/userRoutes.js'
import router2 from './routes/verify.user.js'
import {connectDB} from './config/db.js';
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  handler: (req, res) => {
    res.status(429).json({
      message: "Too many requests. Please try again later.",
      code: "RATE_LIMIT",
    });
  },
});
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(limiter)

app.use(express.json());
connectDB();


app.use('/api/notes', notes);
app.use('/auth',router2)

app.get('/', (req, res) => {
    res.send('Home Page');
});
app.listen(process.env.PORT,()=>{
    console.log('server is running......')
})

export default app;