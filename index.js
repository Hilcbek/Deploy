import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import { routerUser } from './router/user.router.js'
dotenv.config()
let app = express()
app.use(express.json())
let PORT = process.env.PORT;
let MONGODB = process.env.MONGODB;
mongoose
  .connect(MONGODB)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
mongoose.connection.on("connected", () =>
  console.log("mongodb start listening again")
);
mongoose.connection.on("disconnected", () =>
  console.log("mongodb stopped listening")
);
app.use("/api/auth", routerUser);
app.use((err, req, res, next) => {
  let errorMessage = err.message;
  let errorStatus = err.status;
  res.status(errorStatus).json(errorMessage);
});