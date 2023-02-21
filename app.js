const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./.env" });

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_BASE_URL || "http://localhost:3000",
  })
);
app.use(express.json({ limit: "10kb" }));

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("DB connection success"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running to port ${PORT}`);
});
