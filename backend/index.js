import express from "express";
import connectDB from './db.js';
import apiRouter from './routes/api.routes.js';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use('/api', apiRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
