const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const issueRouter = require("./routes/issueRoutes");
const adminRouter = require("./routes/adminRoutes");
const notificationRouter = require("./routes/notificationRoute");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/auth", authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/issue', issueRouter);
app.use('/api/v1/notification', notificationRouter);

app.use('/api/v1/admin', adminRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("DB connection success"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running to port ${PORT}`);
});
