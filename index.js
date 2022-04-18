const express = require("express");
const path = require("path");

const app = express();
require("./config")(app);
require("./models")
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const routes = require('./routes');

// serve client bundle
app.use(express.static(path.resolve(__dirname, "./client/build")));

// parse json
app.use(express.json());

// prefixes all routes with /api
app.use("/api", [...routes]);

// fallback is to always serve react bundle
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// start server
app.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST} port ${PORT}`);
});
