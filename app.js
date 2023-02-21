const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRouter = require("./routes/authRoutes");

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("DB connection success"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running to port ${PORT}`);
});
