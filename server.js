const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const favicon = require("serve-favicon");

dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(express.json());

app.use(morgan("dev"));

const connectDB = require("./config/db");
connectDB();

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.set("trust proxy", true);
app.use("/api", express.static("./public"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/items", require("./routes/api/items"));
app.use("/api/orders", require("./routes/api/orders"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server on port ${port}`));
