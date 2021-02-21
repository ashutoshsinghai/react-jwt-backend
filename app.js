const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5000;

// bodyparser
app.use(express.json());
app.use(cors());

//mongoose
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .on("open", (e) => console.log("MongoDB Connected"))
  .on("error", (err) => console.log(err));

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(PORT, (e) => console.log("SERVER STARTED ON " + PORT));
