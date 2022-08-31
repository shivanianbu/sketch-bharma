const mongoose = require('mongoose')
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection
    .once("open", () => console.log("DB Connected Successfully..."))
    .on("error", (error) => console.log("Error connecting to MongoDB:", error));